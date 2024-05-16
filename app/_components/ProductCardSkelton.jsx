import React from "react";

const Card = ({hidden}) => {
  return (
    <div className={`lg:block md:block ${hidden}`}>
      <div className="flex flex-col gap-3">
        <div className="w-[170px] h-[200px] bg-slate-200 animate-pulse "></div>
        <div className="w-[170px] h-[30px] bg-slate-200 animate-pulse "></div>
        <div className="w-[170px] h-[30px] bg-slate-200 animate-pulse "></div>
        <div className="w-[170px] h-[30px] bg-slate-200 animate-pulse "></div>
      </div>
    </div>
  );
};

const ProductCardSkelton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 p-0 lg:p-4">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card hidden="hidden"/>
    </div>
  );
};

export default ProductCardSkelton;
