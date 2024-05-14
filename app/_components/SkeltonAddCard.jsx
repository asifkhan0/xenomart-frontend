import React from "react";

const SkeltonAddCard = () => {
  return (
    <div className="flex bg-white gap-5 w-full m-2 p-5">
      <div className="w-[150px] h-[140px] bg-slate-200 animate-pulse"></div>
      <div className="flex flex-col gap-5">
        <div className="w-[400px] h-[20px] bg-slate-200 animate-pulse"></div>
        <div className="w-[80px] h-[20px] bg-slate-200 animate-pulse"></div>
        <div className="w-[400px] h-[20px] bg-slate-200 animate-pulse"></div>
        <div className="w-[200px] h-[20px] bg-slate-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeltonAddCard;
