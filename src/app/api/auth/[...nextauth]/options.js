import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user-model";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials", 
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            email: credentials.email, 
          });
          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Email or Password incorrect");
          }
        } catch (err) {
          throw new Error(err.message); 
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.username = user.username || profile?.name; 
      }
      return token;
    },
    async session({ session, token }) {

      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
        session.user.username = token.username || ""; 
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        if (!profile?.email) {
          throw new Error("No email available from Google profile");
        }

        await dbConnect();
        try {
          await UserModel.findOneAndUpdate(
            { email: profile.email },
            {
              $set: {
                email: profile.email,
                username: profile.name,
                isVerified: true, 
                verifyCode:"",
              },
            },
            { upsert: true, new: true }
          );
        } catch (error) {
          throw new Error("Failed to upsert user");
        }
      }
      return true; 
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};