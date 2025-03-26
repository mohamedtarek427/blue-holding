import Image from "next/image";
import React from "react";
import Img from "@/assets/footerImg.png";
import { RxAvatar } from "react-icons/rx";

const Header = ({ showAllUsers }: any) => {
  console.log("header", showAllUsers);
  return (
    <header
      className={` py-4 border-t ${
        showAllUsers ? "bg-[#8c8c8c]" : "bg-[#012350]"
      } border-white/10`}
    >
      <div className="container mx-auto md:px-8 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="w-6 h-6" src={Img} alt="img"></Image>
            <span className=" text-white font-semibold text-lg font-Vector">
              Abbott
            </span>
          </div>
          <p className="text-sm text-white">
            <RxAvatar size={35} />
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
