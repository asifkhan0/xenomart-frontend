"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartContext, WishlistContext, AllProducts } from "./_context/Context";
import { useState } from "react";
import GlobalApi from "./_utils/GlobalApi";
import { Analytics } from "@vercel/analytics/react";

const inter = Outfit({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [productList, setProductList] = useState([]);

  return (
    <ClerkProvider>
      <AllProducts.Provider value={{ productList, setProductList }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <WishlistContext.Provider value={{ wishlist, setWishlist }}>
            <html lang="en">
              <body className={`${inter.className} bg-gray-200`}>
                <Analytics />
                <Header /> {children} <Footer />
              </body>
            </html>
          </WishlistContext.Provider>
        </CartContext.Provider>
      </AllProducts.Provider>
    </ClerkProvider>
  );
}
