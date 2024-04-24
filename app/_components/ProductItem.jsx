import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiCategory } from "react-icons/bi";

const ProductItem = ({ product }) => {
  return (
    <Link href={"/project-detail/" + product.id}>
      <div className="hover:border p-1 rounded-lg border-blue-300 cursor-pointer">
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="banner"
          width={400}
          height={350}
          className="rounded-t-lg h-full w-full"
        />
        <div className="flex justify-between items-center">
          <div className="p-3">
            <h2 className="text-[14px] font-medium line-clamp-2">
              {product?.attributes?.title}
            </h2>
            {product?.attributes?.category && (
              <h2 className="text-[12px] text-gray-400 flex gap-2">
                <BiCategory className="h-4 w-4" />
                {product?.attributes?.category}
              </h2>
            )}
          </div>
          <h2 className="font-medium">Rs. {product.attributes?.price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
