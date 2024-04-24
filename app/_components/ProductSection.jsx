"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import GlobalApi from "../_utils/GlobalApi";
import { FaArrowRight } from "react-icons/fa";

const ProductSection = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = () => {
    GlobalApi.getLatestProducts().then((res) => {
      setProductList(res.data.data);
    });
  };

  const filterProductList = (category) => {
    const result = productList.filter(
      (item) => item.attributes.categories == category,
    );
    return result;
  };
  debugger;
  return (
    productList && (
      <div className="mx- md:mx-4 my-5">
        {/* latest product */}
        <div className="latest-product bg-white px-5 py-4 my-5">
          <h2 className="font-bold text-[22px] text-[#263248]">
            New Arrival
            <span className="font-bold float-right text-[14px] flex text-[#F49404] hover:text-[#f49404c9] cursor-pointer items-center ">
              View All Collection
              <FaArrowRight className="h-4 ms-2" />
            </span>
          </h2>
          <ProductList productList={filterProductList("new arrival")} />
        </div>

        {/* source code product */}
        <div className="shirt-section bg-white px-5 py-4 my-5">
          <h2 className="font-bold text-[22px] my-3 text-[#263248]">
            Shirts
            <span className="font-bold float-right text-[14px] flex text-[#F49404] hover:text-[#f49404c9]cursor-pointer items-center ">
              View All Collection
              <FaArrowRight className="h-4 ms-2" />
            </span>
          </h2>
          <ProductList productList={filterProductList("shirt")} />
        </div>

        {/* Icons pack*/}
        <div className="shirt-section bg-white px-5 py-4 my-5">
          <h2 className="font-bold text-[22px] my-3 text-[#263248]">
            T-shirt{" "}
            <span className="font-bold float-right text-[14px] flex text-[#F49404] hover:text-[#f49404c9] cursor-pointer items-center ">
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
