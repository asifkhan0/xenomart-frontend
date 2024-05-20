"use client";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { WishlistContext } from "../_context/Context";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import SkeltonAddCard from "../_components/SkeltonAddCard";
import StarRating from "../_components/StarRating";

const Wishlist = () => {
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.user?.primaryEmailAddress?.emailAddress) {
      getWishList(user.user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  const getWishList = (email) => {
    GlobalApi.getToWishList(email)
      .then((res) => {
        const result = res?.data?.data;
        if (result && result.length > 0) {
          setWishlist(
            result.map((prdct) => ({
              id: prdct.id,
              product: prdct?.attributes?.product?.data,
            }))
          );
        } else {
          setWishlist([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      });
  };

  function deletWishListItem_(id) {
    GlobalApi.deleteToWishList(id).then(
      (res) => {
        if (res) getWishList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // if (loading) {
  //   return <SkeltonAddCard />;
  // }

  return (
    <div className="section p-2 bg-white lg:p-4 min-h-[42rem]">
      {loading ? (
        <SkeltonAddCard />
      ) : (
        <div className="wishlist-section bg-white h-full shadow-white grid lg:grid-cols-12">
          {wishlist.map((item, index) => (
            <div
              className="shirt-section border col-span-6 lg:col-span-12 md:col-span-12 p-3 lg:px-5  lg:py-4 flex h-[8rem] lg:h-[10rem]"
              key={index}
            >
              <Link
                href="#"
                className="card grid grid-rows-1 grid-cols-12 w-full"
              >
                <div className="bannerImg col-span-3 lg:col-span-1">
                  <img
                    className="h-full w-full"
                    src={item.product.attributes.banner.data.attributes.url}
                    alt=""
                  />
                </div>
                <div className="content col-span-9 flex flex-col lg:gap-2 lg:col-span-11 p-2 pt-0 lg:p-0 lg:ps-6">
                  <div className="item_brand text-gray-500 uppercase text-base font-bold">
                    {item.product.attributes.brand}
                  </div>
                  <div className="content hover:text-blue-500 hover:underline">
                    <h2>{item.product.attributes.title}</h2>
                  </div>
                  <div className="item_rating lg:block hidden">
                    <StarRating rating={item.product.attributes.rating} />
                  </div>
                  <div className="item_price">
                    Rs. {item.product.attributes.price}
                  </div>
                </div>
              </Link>
              <div
                className="flex justify-end text-xl  lg:text-2xl cursor-pointer hover:text-red-600"
                onClick={() => deletWishListItem_(item.id)}
              >
                <MdDelete />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
