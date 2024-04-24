import Image from "next/image";
import React from "react";

const ProjectBanner = ({ project }) => {
  return (
    <div className="w-full">
      {project ? (
        <Image
          src={project?.attributes?.banner?.data?.attributes?.url}
          alt="banner"
          className="rounded-lg object-cover h-[400px]"
          width={350}
          height={400}
        />
      ) : (
        <div className="w-[350px] h-[400px] bg-slate-200 animate-pulse "></div>
      )}
    </div>
  );
};

export default ProjectBanner;
