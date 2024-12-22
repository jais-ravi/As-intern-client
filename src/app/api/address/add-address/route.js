import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/user-model";
import { Types } from "mongoose"; // Import for generating ObjectId
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

    // Generate a new ObjectId for the address
    const newAddressId = new Types.ObjectId();

    const newAddress = {
      _id: newAddressId, // Assign the pre-generated ID
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

    // Retrieve the newly created address by its _id
    const createdAddress = user.addresses.find(
      (address) => address._id.toString() === newAddressId.toString()
    );

    return NextResponse.json(
      {
        success: true,
        message: "Address added successfully",
        address: createdAddress, // Return the new address
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
