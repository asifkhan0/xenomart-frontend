import SkeltonProjectInfo from "@/app/_components/SkeltonProjectInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { IoCartOutline } from "react-icons/io5";
import { LuBadgeCheck, LuBadgeAlert } from "react-icons/lu";
import { CartContext, WishlistContext } from "@/app/_context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegHeart } from "react-icons/fa";
import StarRating from "@/app/_components/StarRating";
import { BiCategory } from "react-icons/bi";

const ProjectInfo = ({ product }) => {
  const descriptions = product?.attributes?.description || [];

  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);

  const calculateDiscountPercentage = (originalPrice, discountedPrice = 1) => {
    const discountPercentage = (
      (1 - discountedPrice / originalPrice) *
      100
    ).toFixed(2);

    return Math.round(discountPercentage);
  };

  // add to cart
  const onAddToCart = () => {
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
        }
      );
    }
  };

  // add to wishlist
  const onAddToWishlist = () => {
    toast("Added to wishlist");
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      const data = {
        data: {
          email: user.primaryEmailAddress.emailAddress,
          product: product?.id,
        },
      };

      GlobalApi.addToWishList(data).then(
        (res) => {
          if (res) {
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
        }
      );
    }
  };

  return (
    <div>
      {product ? (
        <div className="flex flex-col gap-3 p-5 lg:p-0">
          <ToastContainer />
          <h4 className="brand-title text-lg font-bold text-gray-500 uppercase">
            {product?.attributes?.brand}
          </h4>
          <div className="text-2xl text-black">{product?.attributes?.title}</div>
          <div className="flex items-center text-black">
          Category: <span className="text-gray-400 uppercase ms-3">{product?.attributes?.category}</span>
          </div>
          <div className="rating-section"><StarRating rating={product?.attributes?.rating} /></div>
          <h2 className="flex gap-2 items-center">
            {product?.attributes?.instantDelivery ? (
              <LuBadgeCheck className="text-green-500 text-[22px]" />
            ) : (
              <LuBadgeAlert className="text-yellow-400 text-[22px]" />
            )}
            Eligible for Instant Delivery
          </h2>
          {descriptions && (
            <ul className="list-disc list-inside text-[15px] text-gray-700">
              {descriptions.map((desc, index) => (
                <li key={index} className="mt-4 list-none">
                  {desc.children[0].text}
                </li>
              ))}
            </ul>
          )}
          <div className="price-section font-medium">
            <span className="text-green-600">Special Price</span>
            <h2 className="text-[30px] text-blue-600 font-medium flex gap-8">
              Rs. {product.attributes?.offerPrice}

              {product.attributes?.offerPrice && (
                <span className="text-green-600 text-xl flex items-center">
                  <del className="text-gray-500 me-9">
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
          <div className="flex gap-5 lg:gap-2">
            <button
              className="flex gap-2 p-3 bg-blue-600 hover:bg-blue-700 px-6 lg:px-10 mt-5 text-white rounded-lg "
              onClick={() => onAddToCart(product)}
            >
              <IoCartOutline className="text-[23px] " /> Add to Cart
            </button>

            <button
              className="flex gap-2 p-3 bg-blue-600 hover:bg-blue-700 px-6 lg:px-10 mt-5 text-white rounded-lg "
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
