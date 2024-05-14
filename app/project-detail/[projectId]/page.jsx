"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import ProjectBanner from "../_components/ProjectBanner";
import ProjectInfo from "../_components/ProjectInfo";
import ProductList from "@/app/_components/ProductList";
import { usePathname } from "next/navigation";

const ProjectDetail = ({ params }) => {
  const path = usePathname();
  const [productData, setProductData] = useState();
  const [productList, setProductList] = useState();

  useEffect(() => {
    params?.projectId && getProductById_();
  }, [params?.projectId]);

  useEffect(() => {
    if (productData) {
      productListByCategory(productData);
    }
  }, [productData]);

  const getProductById_ = () => {
    const productId_ = params?.projectId;
    GlobalApi.getProductById(productId_).then((resp) => {
      setProductData(resp.data.data);
    });
  };
debugger
  console.log(productData);

  const productListByCategory = (productData) => {
    const category = productData?.attributes?.category;
    GlobalApi.getProductByCategory(category).then((res) => {
      setProductList(res.data.data);
    });
  };

  return (
    <div className="lg:p-5 lg:py-10 md:py-2 lg:px-10 md:px-2">
      <div className="bg-white">
        <Breadcrumbs path={path} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:p-14 sm:gap-10 bg-white shadow-sm">
          <ProjectBanner project={productData} />
          <ProjectInfo product={productData} />
        </div>
      </div>

      {productList && (
        <div className="bg-white shadow-sm px-2 mt-2">
          <h2 className="font-bold text-[20px] p-4">Similer Products</h2>
          <ProductList productList={productList} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
