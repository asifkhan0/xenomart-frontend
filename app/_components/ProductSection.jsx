"use client";
import React, { useContext, useEffect, useState } from "react";
import ProductList from "./ProductList";
import GlobalApi from "../_utils/GlobalApi";
import { FaArrowRight } from "react-icons/fa";
import { AllProducts } from "../_context/Context";
import { useRouter } from "next/navigation";
import ErrorPage from "./ErrorPage";

const ProductSection = () => {
  const { productList, setProductList } = useContext(AllProducts);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = async () => {
    try {
      const res = await GlobalApi.getLatestProducts();
      setProductList(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products. Please try again later.");
    }
  };
  

  const filterProductList = (category) => {
    const result = productList.filter(
      (item) => item.attributes.category == category
    );
    return result;
  };

  const newCollection_ = (collectionType) => {
    const result = productList.filter(
      (item) => item.attributes.collectionType == collectionType
    );
    return result;
  }

  const viewAllCollection = (collectionTitle) => {
    router.push(`/products/${collectionTitle}`);
  };

  if(error) return <ErrorPage errorMessage={error}/>
  return (
    productList && (
      <div className="mx- md:mx-4 my-5">
        {/* latest product */}
        <div className="latest-product bg-white px-5 py-4 my-5">
          <h2 className="font-bold text-[22px] text-[#263248]">
            New Arrival
            <span
              className="font-bold float-right text-[14px] flex text-secondaryCustom hover:text-[#f49404c9] cursor-pointer items-center"
              onClick={() => viewAllCollection("new arrival")}
            >
              View All Collection
              <FaArrowRight className="h-4 ms-2" />
            </span>
          </h2>
          <ProductList productList={newCollection_("new arrival")} />
        </div>

        {/* source code product */}
        <div className="shirt-section bg-white px-5 py-4 my-5">
          <h2 className="font-bold text-[22px] my-3 text-[#263248]">
            Shirts
            <span
              className="font-bold float-right text-[14px] flex text-[#F49404] hover:text-[#f49404c9] cursor-pointer items-center"
              onClick={() => viewAllCollection("shirt")}
            >
              View All Collection
              <FaArrowRight className="h-4 ms-2" />
            </span>
          </h2>
          <ProductList productList={filterProductList("shirt")} />
        </div>

        {/* Icons pack*/}
        <div className="shirt-section bg-white px-5 py-4 my-5">
          <h2 className="font-bold text-[22px] my-3 text-[#263248]">
            T-shirt
            <span
              className="font-bold float-right text-[14px] flex text-[#F49404] hover:text-[#f49404c9] cursor-pointer items-center"
              onClick={() => viewAllCollection("t-shirt")}
            >
              View All Collection
              <FaArrowRight className="h-4 ms-2" />
            </span>
          </h2>
          <ProductList productList={filterProductList("t-shirt")} />
        </div>
      </div>
    )
  );
};

export default ProductSection;
