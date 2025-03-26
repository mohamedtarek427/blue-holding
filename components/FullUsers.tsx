import { IoIosArrowBack } from "react-icons/io";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import useGetUsers from "./hooks/reactQuery/useGetUsers";
import shadow from "@/assets/shadow.png";

const FullUsers = ({ setShowAllUsers }: any) => {
  const { data: users = [], isLoading, isError } = useGetUsers();
  const style = (index: any) => {
    return {
      color:
        index === 0
          ? "#F9A845" // Gold
          : index === 1
          ? "#5C5C5C" // Gray
          : index === 2
          ? "#EF8D61" // Bronze
          : "#000000", // White
    };
  };
  return (
    <div className="flex items-start justify-center  gap-4 w-4/5 mt-16">
      {/* Left Column (Back Button) */}
      <div
        onClick={() => setShowAllUsers(false)}
        className="flex  items-center font-semibold w-[30%]
          text-sky-500 justify-center gap-3 mt-3"
      >
        <IoIosArrowBack size={33} />
        <span className="flex cursor-pointer text-2xl">Back to home</span>
      </div>
      {/* Right Column (Leaderboard Section) */}
      <section className="relative w-[50%] flex justify-center flex-col bg-none ">
        <header className="relative mb-2 flex text-center flex-col items-center ">
          {/* Blurred Shadow Image (Positioned Absolutely Behind Text) */}
          <Image
            src={shadow}
            alt="Blurred shadow effect"
            width={800}
            height={132}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          />

          {/* Text Content (Higher z-index to be above shadow) */}
          <h1 className="text-darkGray/80 text-[48px] capitalize z-50 font-bold">
            See Where You Stand!
          </h1>
          <span className="text-[#8D8D8D] text-[34px] z-50 font-[400]">
            Explore the rankings, track your progress, and challenge yourself to
            climb higher!
          </span>
        </header>

        <div className="border-2 rounded-2xl bg-white mt-10 z-50 border-white/10">
          <div className="space-y-4 shadow-2xl z-50 border-gray-500 py-6 rounded-3xl">
            {users?.map((user: any, index: number) => {
              const getImagePath = (userId: string) => {
                // List of possible image extensions to try
                const extensions = [".png", ".jpg", ".jpeg", ".webp"];

                for (const ext of extensions) {
                  try {
                    return require(`../assets/persons/${userId}${ext}`);
                  } catch (e) {
                    continue; // Try next extension
                  }
                }

                // If no image found, return a default fallback
                return require("../assets/persons/1.jpg");
              };

              return (
                <div
                  key={index}
                  className="flex items-center justify-between px-6 py-1 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <span
                      style={style(Number(user.position) - 1)}
                      className="text-[24px] font-semibold w-8 text-black"
                    >
                      {user.position}
                    </span>
                    <Avatar className="w-16 h-16">
                      <Image
                        loading="lazy"
                        src={getImagePath(user.id)}
                        alt={user.name}
                        width={100}
                        height={100}
                        className="object-fit w-full h-full"
                      />
                    </Avatar>
                    <span className="font-medium text-[20px]">
                      {user?.name}
                    </span>
                  </div>
                  <span className="font-medium flex flex-col justify-center items-center">
                    <span className="text-[24px]" style={style(index)}>
                      {user?.points}
                    </span>
                    <span className="text-blue-400 text-[14px]"> Points</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullUsers;
