"use client";
import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { FaArrowRight } from "react-icons/fa";
import { AllProducts } from "../_context/Context";
import { useRouter } from "next/navigation";
import ErrorPage from "./ErrorPage";
import ProductCardSkelton from "./ProductCardSkelton";

// Lazy load ProductList component
const ProductList = lazy(() => import("./ProductList"));

const ProductSection = () => {
  const router = useRouter();
  const { productList, setProductList } = useContext(AllProducts);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch latest products
  useEffect(() => {
    getLatestProducts_();
  }, []);

  // Fetch latest products
  const getLatestProducts_ = async () => {
    try {
      const res = await GlobalApi.getLatestProducts();
      setProductList(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products. Please try again later.");
    }
  };

  // Redirect to view all collection
  const viewAllCollection = (collectionTitle) => {
    router.push(`/products/${collectionTitle}`);
  };

  // Render product section
  const renderProductSection = (title, category, collectionType) => {
    return (
      <div className="shirt-section bg-white px-5 py-4 my-5" key={category}>
        <h2 className="font-bold text-[22px] my-3 text-[#263248]">
          {title}
          <span
            className="font-bold float-right text-[14px] flex text-secondaryCustom hover:text-[#f49404c9] cursor-pointer items-center"
            onClick={() => viewAllCollection(collectionType)}
          >
            View All Collection
            <FaArrowRight className="h-4 ms-2" />
          </span>
        </h2>
        {/* Product list section */}
        {loading ? (
          <ProductCardSkelton />
        ) : (
          <Suspense fallback={<ProductCardSkelton />}>
            {category === "new arrival" ? (
              <ProductList productList={newCollection_(category)} />
            ) : (
              <ProductList productList={filterProductList(category)} />
            )}
          </Suspense>
        )}
      </div>
    );
  };

  // Filter product list based on category
  const filterProductList = (category) => {
    return productList.filter((item) => item.attributes.category === category);
  };

  // Filter data based on new collection
  const newCollection_ = (collectionType) => {
    return productList.filter(
      (item) => item.attributes.collectionType === collectionType
    );
  };

  // Display error message if there's an error
  if (error) return <ErrorPage errorMessage={error} />;

  // Render product section
  return (
    <div className="mx- md:mx-4 my-5">
      {renderProductSection("New Arrival", "new arrival", "new collection")}
      {renderProductSection("Shirts", "shirt", "shirt")}
      {renderProductSection("T-shirts", "t-shirt", "t-shirt")}
    </div>
  );
};

export default ProductSection;
