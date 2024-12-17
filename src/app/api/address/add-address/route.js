import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/user-model";
const dbConnect = require("@/lib/dbConnect");

export async function POST(req) {
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

    const {
      name,
      mobileNumber,
      addressLine1,
      addressLine2,
      landmark,
      city,
      postalCode,
      state,
    } = await req.json();

    if (
      !name ||
      !mobileNumber ||
      !addressLine1 ||
      !city ||
      !postalCode ||
      !state
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Add the new address
    const newAddress = {
      name,
      mobileNumber,
      addressLine1,
      addressLine2: addressLine2 || "", 
      landmark: landmark || "", 
      city,
      postalCode,
      state,
    };

    user.addresses.push(newAddress); 
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Address added successfully",
        addresses: user.addresses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding address:", error);
    return NextResponse.json(
      { success: false, message: "Error adding address" },
      { status: 500 }
    );
  }
}
