import React, { useContext, useEffect } from "react";
import { CartContext } from "../_context/CartContext";
import Link from "next/link";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  return (
    <div className="h-[300px] w-[250px] bg-gray-100 z-10 rounded-md absolute mx-10 right-10 top-12 p-5 border shadow overflow-auto">
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="flex items-center gap-4">
            <img
              src={item?.product?.attributes?.banner?.data?.attributes?.url}
              alt="productImg"
              className="h-16 w-16 rounded object-cover"
            />

            <div>
              <h3 className="text-sm text-gray-900 line-clamp-2">
                {item?.product?.attributes?.title}
              </h3>

              <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                <div>
                  <dt className="inline">
                    {item?.product?.attributes?.product?.category}
                  </dt>
                  {/* <dd className="inline">XXS</dd> */}
                </div>

                <div>
                  <dt className="inline">
                    Rs. {item?.product?.attributes?.price}
                  </dt>
                  {/* <dd className="inline">White</dd> */}
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-4 text-center mt-10">
        <Link
          href="/cart"
          className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
        >
          View my cart ({cart?.length})
        </Link>

        <a
          href="#"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
        >
          Continue shopping
        </a>
      </div>
    </div>
  );
};

export default Cart;
