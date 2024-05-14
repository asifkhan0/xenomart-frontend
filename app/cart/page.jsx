"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/Context";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const user = useUser();

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (cart && cart.length > 0) {
      getTotalAmount();
    } else {
      setTotalAmount(0);
    }
  }, [cart]);

  function getTotalAmount() {
    let total = 0;
    cart.forEach((item) => {
      total += Number(item?.product?.attributes?.price);
    });
    setTotalAmount(total);
  }

  function deletCartItem_(id) {
    GlobalApi.deleteCartItem(id).then(
      (res) => {
        if (res) getCartItem();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  const getCartItem = () => {
    GlobalApi.getUserCartItem(user?.user?.primaryEmailAddress?.emailAddress).then((res) => {
      const result = res?.data?.data;

      setCart([]);
      if (result.length > 0) {
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
    });
  };
  
  return (
      <div className="m-3 bg-white shadow-sm max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-2">
              {cart.length > 0 &&
                cart.map((item, index) => (
                  <li className="flex items-center border gap-4 p-2 cursor-pointer hover:border-blue-600" key={index}>
                    <img
                      src={
                        item?.product?.attributes?.banner?.data?.attributes?.url
                      }
                      alt=""
                      className="size-24 rounded object-cover"
                    />

                    <div className="flex-initial w-[75%]">
                      <h3 className="text-sm text-gray-900 hover:text-blue-600">
                        {item?.product?.attributes?.title}
                      </h3>
                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">
                            {item?.product?.attributes?.product?.category}
                          </dt>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-initial w-[25%] items-center justify-end gap-2">
                      <div>
                        <dt className="inline font-bold">
                          Rs. {item?.product?.attributes?.price}
                        </dt>
                      </div>
                      <button
                        className="text-gray-600 transition hover:text-red-600"
                        onClick={() => deletCartItem_(item?.id)}
                      >
                        {/* <span className="sr-only">Remove item</span> */}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>Rs. {totalAmount}</dd>
                  </div>
                </dl>

                {/* <div className="flex justify-end">
                  <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-xs">
                      2 Discounts Applied
                    </p>
                  </span>
                </div> */}

                <div className="flex justify-end">
                  <a
                    href="#"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </div>
            <h2 className="text-gray-400 text-[14px]">
              <span className="font-bold">Note </span>: All the Digital content
              will send on your registered email address
            </h2>
          </div>
        </div>
      </div>
  );
};

export default Cart;
