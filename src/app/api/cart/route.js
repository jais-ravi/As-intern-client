import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/user-model";
import { NextRequest, NextResponse } from "next/server";

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

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const existingProduct = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: "Product added to cart successfully",
        cart: user.cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { success: false, message: "Error adding product to cart" },
      { status: 500 }
    );
  }
}
