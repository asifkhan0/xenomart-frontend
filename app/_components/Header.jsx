"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { FaRegHeart } from "react-icons/fa";
import { CartContext } from "../_context/CartContext";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../../public/xenoMartLogo2.png";
import Cart from "./Cart";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user } = useUser();
  const [isLogin, setIsLogin] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const router = useRouter();

  useEffect(() => {
    setIsLogin(window.location.href.toString().includes("sign-in"));
  }, []);

  useEffect(() => {
    if (user) {
      getCartItem();
    }
  }, [user]);

  const handleCart = () => {
    router.push("/cart");
  };
  const wishListHandle = () => {
    router.push("/wishlist");
  };
  const getCartItem = () => {
    GlobalApi.getUserCartItem(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        const result = res?.data?.data;
        if (result) {
          result.forEach((prdct) => {
            setCart((cart) => [
              ...cart,
              {
                id: prdct.id,
                product: prdct?.attributes?.product?.data,
              },
            ]);
          });
        }
      },
    );
  };

  return (
    !isLogin && (
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link href="/" className="h-[100%]">
                <Image src={logo} width={180} height={120} alt="logo" />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Explore
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Projects
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      About us
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Contact us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow"
                    href="/sign-in"
                  >
                    Login
                  </Link>

                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                      href="/sign-up"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-6 ">
                  <FaRegHeart
                    onClick={wishListHandle}
                    className="cursor-pointer text-[23px] text-[#263248]"
                  />
                  <h2 className="flex cursor-pointer gap-1 relative">
                    <MdOutlineShoppingCart
                      onClick={handleCart}
                      className=" text-[28px] text-[#263248]"
                    />
                    <span className="text-white absolute top-[-8px] end-[-4px] flex items-center justify-center rounded-xl w-5 h-5 bg-[#F49404]">
                      {cart?.length}
                    </span>
                  </h2>
                  <UserButton />
                </div>
              )}
              {openCart && <Cart />}

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
