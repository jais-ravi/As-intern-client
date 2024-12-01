import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const productId = url.searchParams.get("productId");

    if (!productId) {
      return new Response(
        JSON.stringify({ error: "Product ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch product details by ID
    const product = await mongoose.connection.db
      .collection("products")
      .findOne({ _id: new mongoose.Types.ObjectId(productId) });

    if (!product) {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ data: product }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch product details" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
