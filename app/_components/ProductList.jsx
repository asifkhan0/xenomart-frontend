import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ productList }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 p-0 lg:p-4">
      {productList.map(
        (item, index) =>
          index <= 5 && (
            <div key={index}>
              <ProductItem product={item} />
            </div>
          ),
      )}
    </div>
  );
};

export default ProductList;
