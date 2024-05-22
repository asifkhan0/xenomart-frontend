import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";

const Hero = lazy(() => import("./_components/Hero"));
const ProductSection = lazy(() => import("./_components/ProductSection"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <ProductSection />
      </Suspense>
      <ToastContainer />
    </>
  );
}
