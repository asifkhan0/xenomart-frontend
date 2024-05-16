"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { FaRegHeart } from "react-icons/fa";
import { CartContext } from "../_context/Context";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../../public/xenoMartLogo2.png";
import Cart from "./Cart";
import { useRouter } from "next/navigation";
import HeaderList from "./HeaderList";

const Header = () => {
  const { user } = useUser();
  const [isLogin, setIsLogin] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    setIsLogin(window.location.href.toString().includes("sign-in"));
  }, []);

  useEffect(() => {
    if (user) {
      getCartItem();
    }
  }, [user]);

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
      }
    );
  };

  return (
    !isLogin && (
      <header className="bg-white" id="headerSec">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link href="/" className="h-[100%]">
                <Image src={logo} width={180} height={120} alt="logo" />
              </Link>
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
                  <Link href="/wishlist">
                    <FaRegHeart className="cursor-pointer text-[23px] text-[#263248]" />
                  </Link>
                  <Link href="/cart">
                    <h2 className="flex cursor-pointer gap-1 relative">
                      <MdOutlineShoppingCart className=" text-[28px] text-[#263248]" />
                      <span className="text-white absolute top-[-8px] end-[-4px] flex items-center justify-center rounded-xl w-5 h-5 bg-[#F49404]">
                        {cart?.length}
                      </span>
                    </h2>
                  </Link>
                  <UserButton />
                </div>
              )}
              {openCart && <Cart />}
            </div>
          </div>
        </div>
        {/* header list */}
        <HeaderList />
      </header>
    )
  );
};

export default Header;
