import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const ProductItem = ({ product }) => {
  const calculateDiscountPercentage = (originalPrice, discountedPrice = 1) => {
    const discountPercentage = (
      (1 - discountedPrice / originalPrice) *
      100
    ).toFixed(2);

    return Math.round(discountPercentage);
  };

  return (
    <Link href={"/project-detail/" + product.id}>
      <div className="cursor-pointer relative hover:shadow-lg max-h-[24.5rem] overflow-hidden">
        {product?.attributes?.collectionType.includes("new arrival") && (
          <span className="item_badge absolute text-[10px] z-999 capitalize top-3 right-3 flex items-center px-2 py-1 bg-green-200 rounded-full font-semibold text-green-600">
            new arrival
          </span>
        )}
        <div className="group p-2">
          <Image
            src={product?.attributes?.banner?.data?.attributes?.url}
            alt="banner"
            width={400}
            height={350}
            className="h-full w-full aspect-[3/4] object-cover"
            loading="lazy"
          />
          <div className="flex flex-col bg-white group-hover:transform group-hover:-translate-y-9 transition-transform duration-300 ease-in-out">
            <div className="content flex flex-col gap-2 pt-1">
              <h4 className="brand-title text-[12px] font-bold text-gray-500 uppercase">
                {product?.attributes?.brand}
              </h4>
              <h2 className="title text-sm font-normal text-black group-hover:text-blue-700 group-hover:underline line-clamp-2">
                {product?.attributes?.title}
              </h2>
              <div className="price-section font-medium">
                <h2 className="flex lg:gap-3 md:gap-3  text-base flex-col md:flex-row lg:flex-row">
                  Rs. {product.attributes?.offerPrice}
                  {product.attributes?.offerPrice && (
                    <span className="text-green-600">
                      <del className="text-gray-500 text-sm me-3">
                        Rs. {product.attributes?.price}
                      </del>
                      {calculateDiscountPercentage(
                        product?.attributes?.price,
                        product?.attributes?.offerPrice
                      )}
                      % off
                    </span>
                  )}
                </h2>
              </div>

              <div className="rating-section flex justify-between">
                {product?.attributes?.category && (
                  <h2 className="text-sm text-gray-400 flex items-center gap-2">
                    <BiCategory className="h-4 w-4" />
                    {product?.attributes?.category}
                  </h2>
                )}
                {/* if rating contain value then render */}
                {product.attributes?.rating && (
                  <span className="flex text-sm items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    {product.attributes?.rating}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
