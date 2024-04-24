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
    GlobalApi.getProductById(params?.projectId).then((resp) => {
      setProductData(resp.data.data);
    });
  };

  const productListByCategory = (productData) => {
    const category = productData?.attributes?.category;
    GlobalApi.getProductByCategory(category).then((res) => {
      setProductList(res.data.data);
    });
  };

  return (
    <div className="p-5 py-10 px-10 md:px-28">
      <Breadcrumbs path={path} />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-5 sm:gap-10">
        <ProjectBanner project={productData} />
        <ProjectInfo product={productData} />
      </div>

      {productList && (
        <div className="mt-20">
          <h2 className="font-medium text-[20px] mt-5">Similer Products</h2>
          <ProductList productList={productList} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
