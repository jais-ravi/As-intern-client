import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Extract search parameters
  const query = searchParams.get("query"); // Get the `query` parameter

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const decodedQuery = decodeURIComponent(query);
  try {
    // Ensure the database is connected
    await dbConnect();

    // Access the raw MongoDB database through Mongoose's connection
    const db = mongoose.connection.db;

    // Perform the MongoDB aggregation to search products
    const result = await db
      .collection("products") // Access the "products" collection
      .aggregate([
        {
          $search: {
            index: "productSearch", // Use the Atlas Search index
            text: {
              query: decodedQuery,
              path: [
                "productName",
                "productDes",
                "category",
                "productBrand",
                // Add more fields to search in
                "tags",
              ], // Fields to search in
              fuzzy: {
                maxEdits: 2,
                prefixLength: 1,
              },
            },
          },
        },
        {
          $project: {
            productName: 1,
            productDes: 1,
            category: 1,
            sellingPrice: 1,
            productImages: 1,
            discount: 1,
            freeDelivery: 1,
            deliveryCharge: 1,
            productPrice: 1,
          },
        },
      ])
      .toArray();

    return NextResponse.json({ products: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
