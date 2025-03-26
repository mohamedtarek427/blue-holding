import Img from "@/assets/footerImg.png";
import Image from "next/image";
export function Footer() {
  return (
    <footer className="bg-darkBlue py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="w-6 h-6" src={Img} alt="img" ></Image>
            <span className=" text-white font-semibold text-lg font-Vector">
              Abbott
            </span>
          </div>
          <p className="text-md text-gray-400">
            © 2025 Abbott. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
