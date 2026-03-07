import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const Homecard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div>
      <section
        className={cn(
          "bg-[#FF742E] px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
          className,
        )}
        onClick={handleClick}
      >
        <div className="flex-center glassmorphism size-12 rounded-[10px]">
          <Image src={img} alt={title} width={24} height={24} />
        </div>{" "}
        <div className="flex flex-col gap-2 ">
          <h1 className="font-bold "> {title} </h1>
          <p className=""> {description} </p>
        </div>
      </section>
    </div>
  );
};

export default Homecard;
