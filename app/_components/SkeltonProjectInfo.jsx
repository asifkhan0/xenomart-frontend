import React from "react";

const SkeltonProjectInfo = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-[400px] h-[30px] bg-slate-200 animate-pulse "></div>
      <div className="w-[100px] h-[30px] bg-slate-200 animate-pulse "></div>
      <div className="w-[400px] h-[30px] bg-slate-200 animate-pulse "></div>
      <div className="w-[400px] h-[30px] bg-slate-200 animate-pulse "></div>
      <div className="w-[400px] h-[30px] bg-slate-200 animate-pulse "></div>
      <div className="w-[400px] h-[30px] bg-slate-200 animate-pulse "></div>
      <div className="w-[200px] h-[50px] bg-slate-200 animate-pulse "></div>
    </div>
  );
};

export default SkeltonProjectInfo;
