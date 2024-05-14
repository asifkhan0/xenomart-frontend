"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GlobalApi from "../../_utils/GlobalApi";
import ProductItem from "@/app/_components/ProductItem";
import ErrorPage from "@/app/_components/ErrorPage";

const Page = () => {
  const path = usePathname();
  const [filterProduct, setFilterProduct] = useState([]);
  const [error, setError] = useState(null);
  const [categoryTitle, setCategoryTitle]  = useState("");

  useEffect(() => {
    if (!path) return;
    const category = path.split("/").pop();
    setCategoryTitle(category)
    GlobalApi.getProductByCategory(category)
      .then((res) => {
        setFilterProduct(res.data.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
      });
  }, [path]);

  return (
    <>
      {error && <ErrorPage errorMessage={error} />}
      {!error && (
        <div className="main-container bg-white px-5 py-4 my-5">
          <h2 className="p-4 font-bold text-xl pt-0 ps-0 uppercase">{categoryTitle}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-6">
            {filterProduct.map((item) => (
              <ProductItem key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
