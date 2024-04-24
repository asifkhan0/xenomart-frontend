import SkeltonProjectInfo from "@/app/_components/SkeltonProjectInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { IoCartOutline } from "react-icons/io5";
import { LuBadgeCheck, LuBadgeAlert } from "react-icons/lu";
import { CartContext, WishlistContext } from "@/app/_context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegHeart } from "react-icons/fa";

const ProjectInfo = ({ product }) => {
  const descriptions = product?.attributes?.description || [];

  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);

  const onAddToCart = () => {
    debugger;
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          product: product?.id,
        },
      };

      GlobalApi.addToCart(data).then(
        (res) => {
          if (res) {
            router.push("/cart");
            setCart((cart) => [
              ...cart,
              {
                id: res.data.data.id,
                product: product,
              },
            ]);
          }
        },
        (error) => {
          console.log("add to cart error", error);
        },
      );
    }
  };

  const onAddToWishlist = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          product: product?.id,
        },
      };

      GlobalApi.addToWishList(data).then(
        (res) => {
          if (res) {
            router.push("/wishlist");
            setWishlist((wishlist) => [
              ...wishlist,
              {
                id: res.data.data.id,
                product: product,
              },
            ]);
          }
        },
        (error) => {
          console.log("add to wishlist error", error);
        },
      );
    }
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      {product ? (
        <div>
          <h2 className="text-[20px]">{product?.attributes?.title}</h2>
          <h2 className="text-[15px] text-gray-400">
            {product?.attributes?.category}
          </h2>
          <ul className="list-disc list-inside text-[15px] text-gray-700">
            {descriptions.map((desc, index) => (
              <li key={index} className="mt-4 list-none">
                {desc.children[0].text}
              </li>
            ))}
          </ul>
          <h2 className="flex gap-2 mt-5 items-center">
            {product?.attributes?.instantDelivery ? (
              <LuBadgeCheck className="text-green-500 text-[22px]" />
            ) : (
              <LuBadgeAlert className="text-yellow-400 text-[22px]" />
            )}
            Eligible for Instant Delivery
          </h2>
          <h2 className="text-[32px] mt-5 text-blue-600 font-medium">
            Rs. {product?.attributes?.price}
          </h2>
          <div className="flex gap-2">
            <button
              className="flex gap-2 p-3 bg-blue-600 hover:bg-blue-700 px-10 mt-5 text-white rounded-lg "
              onClick={() => onAddToCart(product)}
            >
              <IoCartOutline className="text-[23px] " /> Add to Cart
            </button>

            <button
              className="flex gap-2 p-3 bg-blue-600 hover:bg-blue-700 px-10 mt-5 text-white rounded-lg "
              onClick={() => onAddToWishlist(product)}
            >
              <FaRegHeart className="text-[23px] " /> Add to wishlist
            </button>
          </div>
        </div>
      ) : (
        <SkeltonProjectInfo />
      )}
    </div>
  );
};

export default ProjectInfo;
