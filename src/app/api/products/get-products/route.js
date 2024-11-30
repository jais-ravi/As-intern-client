import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    // Ensure MongoDB connection is established
    await dbConnect();

    // Define the schema for products (direct query without using a model)
    const products = await mongoose.connection.db
      .collection("products")  // Access the 'products' collection directly
      .find({})
      .limit(10)  // Fetch only the first 10 products
      .toArray();  // Convert to array

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
