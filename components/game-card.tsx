"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Rocket, Lock } from "lucide-react";

interface GameCardProps {
  title: string;
  image: string;
  description: string;
  isLocked?: boolean;
  unlockDate?: string;
  availableAt: string;
}

export function GameCard({
  title,
  image,
  description,
  isLocked,
  unlockDate,
}: GameCardProps) {
  return (
    <li
      className="bg-white/5 text-center rounded-2xl h-auto 
    flex flex-col justify-center items-center relative backdrop-blur-sm border border-white/10 "
    >
      {/* overlay */}
      <Image
        src={image}
        loading="lazy"
        alt={title}
        width={1000}
        height={200}
        className="object-fit object-center w-[16rem] h-[14rem] z-50"
      />
      <div className="w-80 h-80 bg-gray-50 rounded-full absolute"></div>
      <div className="p-6 flex flex-col items-center justify-center z-50">
        <h3 className="text-xl font-bold mb-2 text-md">{title}</h3>
        <p className="text-gray-400  w-1/2 line-clamp-3 text-sm">
          {description}
        </p>
        <button
          disabled={isLocked}
          className={`bg-white ${
            isLocked ? "cursor-not-allowed" : "cursor-pointer"
          }  rounded-md font-semibold flex justify-center border border-sky-100 items-center py-3 md:w-4/5 lg:w-[16rem] mt-3 text-md ${
            isLocked
              ? "text-[#dd4545] border border-gray-100 "
              : "shadow-lg shadow-sky-100 border border-sky-50 text-sky-400 hover:bg-gray-50"
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="mr-2 h-5 w-5" />
              Opens at {unlockDate}
            </>
          ) : (
            <>
              <Rocket className="mr-2 h-5 w-5" />
              Start Game
            </>
          )}
        </button>
      </div>{" "}
    </li>
  );
}
