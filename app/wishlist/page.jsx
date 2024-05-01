"use client";
import React, { useContext, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { WishlistContext } from "../_context/CartContext";


const Wishlist = () => {
  const {wishlist, setWishlist} = useContext(WishlistContext);

  const user = useUser();

  useEffect(() => {
    getWishList_();
  },[]);

  console.log("wishlist---------", wishlist);

  const getWishList_ = () => {
    debugger
    GlobalApi.getToWishList(user?.user?.primaryEmailAddress?.emailAddress).then((res) => {
      const result = res?.data?.data;

      setWishlist([]);
      if (result.length > 0) {
        result.forEach((prdct) => {
          setWishlist((wishlist) => [
            ...wishlist,
            {
              id: prdct.id,
              product: prdct?.attributes?.product?.data,
            },
          ]);
        });
      }
    });
  };

  return (
    <div className="flex container m-4">
      {
        wishlist.map((item)=>{
          return <div className="shirt-section bg-white px-5 py-4 my-5">
            <h2>{item.title}</h2>
          </div>
        })
      }
    </div>
  );
};

export default Wishlist;
