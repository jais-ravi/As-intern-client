const dbConnect = require("@/lib/dbConnect");
const UserModel = require("@/model/user-model");
const { NextRequest, NextResponse } = require("next/server");
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
// export const PATCH = async (req) => {
//   const session = await getServerSession({ req, ...authOptions });
//   if (!session) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const userId = session.user._id;
//   await dbConnect();

//   const { productId, quantity } = await req.json();

//   try {
//     if (quantity <= 0) {
//       return NextResponse.json(
//         { message: "Quantity must be greater than 0" },
//         { status: 400 }
//       );
//     }

//     const updatedUser = await UserModel.findOneAndUpdate(
//       { _id: userId, "cart.productId": productId },
//       { $set: { "cart.$.quantity": quantity } },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return NextResponse.json(
//         { message: "Product not found in cart" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: "Product updated", cart: updatedUser.cart },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// };


export const DELETE = async (req) => {
  const session = await getServerSession({ req, ...authOptions });

  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user._id;
  if (!userId) {
    return NextResponse.json({ message: "User ID not found" }, { status: 400 });
  }

  await dbConnect();

  try {
    // Parse the request body
    const { addressId } = await req.json();

    // Update the user's document and remove the address
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } }, // Adjust field if it's not `_id`
      { new: true }
    );

    // If no user or address found
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Address deleted", addresses: updatedUser.addresses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing address:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
