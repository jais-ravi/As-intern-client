import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user-model";
import { authOptions } from "../auth/[...nextauth]/options";

export const PATCH = async (req) => {
  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user._id;
  await dbConnect();

  const { productId, quantity } = await req.json();

  try {
    if (quantity <= 0) {
      return NextResponse.json(
        { message: "Quantity must be greater than 0" },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId, "cart.productId": productId },
      { $set: { "cart.$.quantity": quantity } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Product not found in cart" },
        { status: 404 }
      );
    }

    return NextResponse.json(
        { success: true, message: "Product updated", cart: updatedUser.cart },
        { status: 200 }
      );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user._id; 
  await dbConnect();

  try {
    const { productId } = await req.json();

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { productId } } },
      { new: true } 
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Product not found in cart" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted", cart: updatedUser.cart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
