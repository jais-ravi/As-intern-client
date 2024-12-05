import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user-model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req) {
  await dbConnect();

  try {
    const session = await getServerSession({ req, ...authOptions });
    const userId = session?.user?._id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart with product details:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching cart" },
      { status: 500 }
    );
  }
}
