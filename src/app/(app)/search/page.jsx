"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import SearchProductCard from "@/components/Product/SearchProductCard";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`/api/products/search-products?query=${encodeURIComponent(query)}`)
        .then((response) => {
          setSearchResults(response.data.products);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    }
  }, [query]); // Fetch search results when the query changes

  return (
    <div className="container min-h-[80vh] py-5 w-full">
      <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
      <div>
        {loading ? (
          <div className="space-y-2 sm:flex sm:flex-wrap sm:gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="my-4" key={index}>
                <SearchProductCard isLoading={true} />
              </div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className=" space-y-2 sm:flex sm:flex-wrap sm:gap-4">
            {searchResults.map((product) => (
              <SearchProductCard
                key={product._id}
                product={product}
                isLoading={false}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No products found...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
