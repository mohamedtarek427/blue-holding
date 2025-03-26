/* eslint-disable react/no-unescaped-entities */
import { Rocket } from "lucide-react";
import pipeImg1 from "../../assets/pipes/1.svg";
import pipeImg2 from "../../assets/pipes/2.svg";
import pipeImg3 from "../../assets/pipes/3.svg";
import useGetTopPerformers from "../hooks/reactQuery/useGetTopPerformers";
import background from "@/assets/background.jpg";
import Image from "next/image";
import { Avatar } from "@radix-ui/react-avatar";

export default function Leaderboard() {
  const {
    data: topPerformeres = [],
    isLoading,
    isError,
  } = useGetTopPerformers();

  const pipes: string[] = [pipeImg1, pipeImg2, pipeImg3];
  console.log("data: ", topPerformeres);
  return (
    <div
      className={`md:h-[39.8rem] relative lg:h-[40.5rem] xl:h-[42rem] 2xl:h-[46rem]
     w-full  bg-cover bg-center
      overflow-hidden flex flex-col items-center`}
    >
      <div className="h-[10rem] w-full">
        <Image
          src={background}
          fill
          alt="image"
          className="w-full h-full object-cover filter hue-[#0096D7]
           saturate-[500%] brightness-[80%]"
        />
      </div>
      {/* Title Section */}
      <div className="text-center absolute top-[4rem] z-50">
        <h1 className="text-5xl font-bold text-white flex items-center justify-center gap-4">
          🏆 Top Performers
        </h1>
        <h2 className="text-2xl text-white/90 mt-6">Who's Leading the Way?</h2>
        <button
          className="mt-6 bg-white text-[#0096D7] px-12 py-3 
          font-semibold flex items-center gap-2 mx-auto hover:bg-blue-50 transition"
        >
          <Rocket className="w-5 h-5" />
          Start Game
        </button>
      </div>
      {/* Podium Section */}
      <div className="flex items-end justify-center absolute -bottom-[8rem]">
        {topPerformeres?.map((performer: any, index: number) => (
          <div
            key={performer.rank}
            className={`flex flex-col justify-between relative  items-center ${
              index === 0 ? "-mx-4" : "-mx-2"
            }`}
          >
            {/* Avatar */}
            <Image
              onClick={() => console.log("Clicked", index)}
              src={performer.image}
              width={200}
              height={200}
              alt={performer.name}
              style={{
                borderColor: index !== 2 ? "#FDCD6D" : "#000000",
              }}
              className={`w-16 border-[4px] h-16 md:w-20 md:h-20 rounded-full border-4shadow-lg
                absolute z-50 mt-6 ${index == 2 && "mt-[8.25rem]"} ${
                index == 1 && "mt-[11rem]"
              } ${index == 0 && "mt-[8rem]"} `}
            ></Image>

            {/* SVG Podium */}

            <div className="relative">
              <svg
                width="150"
                height={`${index == 0 ? 640 : index == 1 ? 730 : 660}`}
                viewBox="0 0 283 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="136.562"
                  cy="27.8423"
                  rx="136.199"
                  ry="27.6443"
                  fill={`${
                    index == 0 ? "#ED8357" : index == 1 ? "#F9A441" : "#D1D1D1"
                  }`}
                />
                <defs>
                  <linearGradient
                    id={`gradient-${index}`}
                    x1="30%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0%"
                      stopColor={
                        index == 0
                          ? "#FCBF90"
                          : index == 1
                          ? "#FED778"
                          : "#D1D1D1"
                      }
                    />
                    <stop
                      offset="100%"
                      stopColor={
                        index == 0
                          ? "#ED8357"
                          : index == 1
                          ? "#F9A441"
                          : "#6e6e6e"
                      }
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M0.362549 26.7789C0.362549 26.7789 4.01074 54.6796 135.954 54.6796C267.897 54.6796 272.761 26.7789 272.761 26.7789L272.761 420.711C272.761 420.711 272.761 446.5 136.562 446.5C0.362549 446.5 0.362549 420.711 0.362549 420.711L0.362549 26.7789Z"
                  fill={`url(#gradient-${index})`}
                />
              </svg>

              {/* Points as a styled div */}
              <div
                className={`absolute inset-0  ${
                  index == 0 ? "mt-10" : index == 1 ? "mt-12" : "mt-10"
                } flex flex-col items-center justify-between text-[${
                  index == 0 ? "#CC5F2E" : index == 1 ? "#5B3303" : "#3C3C3C"
                }] font-bold text-2xl`}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className={`flex items-center  justify-center`}>
                  <span
                    className={`mt-${index == 1 && 5}  text-${
                      index == 1 ? "5" : "4"
                    }xl`}
                  >
                    {index == 0 ? 3 : index == 1 ? 1 : 2}
                  </span>
                  <span className="mb-2">
                    {index == 0 ? "rd" : index == 1 ? "st" : "nd"}
                  </span>
                </span>
                <span
                  className={`px-4 py-3 rounded-full  items-center mb-[10rem] justify-center flex flex-col  bg-white opacity-40`}
                >
                  <span className="text-md font-[700]">{performer.points}</span>
                  <span className="text-sm font-[400]">points</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 160">
            <path
              fill="#ffffff"
              fill-opacity="1"
              d="M0,80 C200,0 200,120 380,90 C700,10 0,300 5050,0 C1400,60 1250,140 1400,180 C1440,190 1440,200 1440,200 L0,200 Z"
            ></path>
          </svg>
        </div>
      </div>{" "}
    </div>
  );
}
