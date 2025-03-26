import { Trophy } from "lucide-react";
import React, { useState } from "react";
import img1 from "@/assets/how-to-rank/1.png";
import img2 from "@/assets/how-to-rank/2.png";
import img3 from "@/assets/how-to-rank/3.png";
import Image from "next/image";
const HowToRankSection = () => {
  const data: { title: string; description: string; image: any }[] = [
    {
      title: "score big",
      description:
        "Your score is the primary factor in ranking. Answer correctly to earn points, and aim for perfection to stay ahead",
      image: img1,
    },
    {
      title: "fewer trials",
      description:
        "Efficiency matters! The fewer attempts you need to complete a level, the better your ranking will be",
      image: img2,
    },
    {
      title: "Beat the Clock",
      description:
        "Speed is key! Complete the challenges faster to climb the leaderboard and secure your spot at the top",
      image: img3,
    },
  ];
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  return (
    <section className="mt-24 py-16 bg-darkBlue">
      <div className="text-white">
        <h2 className="text-4xl font-bold text-center mb-8">How to Rank</h2>
        <p className="text-center mb-16 text-gray-400">
          Master the Game: Understand What It Takes to Climb the Leaderboard!
        </p>
        <ul
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl
         mx-auto px-4"
        >
          {data?.map((el: any, index: number) => (
            <li
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              key={index}
              className="bg-gradient-to-b flex flex-col items-center justify-center from-blue-900/30
             to-blue-900/10 p-8 rounded-2xl backdrop-blur-sm text-center"
            >
              <div
                className="w-28 h-28 rounded-lg 
              flex items-center justify-center mb-6"
              >
                <Image
                  src={el?.image}
                  alt={el.title}
                  className="w-full h-full object-contain"
                ></Image>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#007AAD]">
                {el?.title}
              </h3>
              <p
                style={{
                  color: hoveredItem == index ? "#EBEBEB" : "#9A9A9A",
                }}
              >
                {el?.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HowToRankSection;
