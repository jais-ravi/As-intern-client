import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await dbConnect();
    const products = await mongoose.connection.db
      .collection("products")  
      .find({})
      .limit(10)  
      .toArray(); 

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
