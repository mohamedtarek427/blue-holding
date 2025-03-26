import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { CiMedal } from "react-icons/ci";
import { useRouter } from "next/navigation";
import useGetUsers from "./hooks/reactQuery/useGetUsers";
import LoadingComponent from "@/helpers/LoadingComponent";

export default function LeaderboardSection({ setShowAllUsers }: any) {
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
  const router = useRouter();
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <div className="text-center text-red-500 font-semibold p-4">
          ❌ Failed to load leaderboard. Please try again later.
        </div>
      ) : (
        <section className="relative bg-white text-black ">
          <div className="grid grid-cols-2 items-center justify-between  gap-x-16 pl-10">
            <div className="flex flex-col justify-center items-center text-center">
              <h3 className="text-4xl font-bold text-[#363636] mb-2">
                See How You Rank!
              </h3>
              <p className="text-[#9b9b9b] text-xl w-[60%]">
                Check out the full leaderboard and see where you stand. Complete
                your peers and climb to the top
              </p>
              <div
                onClick={() => setShowAllUsers(true)}
                className="w-44 h-44 rounded-full mt-5 bg-[#0180b7] text-lg capitalize text-white flex
          justify-center items-center flex-col cursor-pointer"
              >
                <CiMedal size={40} />
                view full <br /> leaderboard
              </div>
            </div>
            {/* table */}
            <div className=" border-2 max-w-[800px] rounded-2xl p-8  border-white/10">
              <div className="space-y-4 shadow-2xl border-gray-500 py-6 rounded-3xl">
                {(users.length >= 6 ? users.slice(0, 6) : users)?.map(
                  (user: any, index: number) => {
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
                        className="flex items-center justify-between px-4 py-1 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <span
                            style={style(Number(user.position) - 1)}
                            className="text-lg font-semibold w-8 text-black"
                          >
                            {user.position}
                          </span>
                          <Avatar className="w-12 h-12">
                            <Image
                              src={getImagePath(user.id)}
                              alt={user.name}
                              width={100}
                              height={100}
                              className="object-fit w-full h-full"
                            />
                          </Avatar>
                          <span className="font-medium">{user?.name}</span>
                        </div>
                        <span
                          className={`font-medium flex flex-col justify-center items-center `}
                        >
                          <span
                            style={style(index)}
                            onClick={() => console.log("clicked", index)}
                          >
                            {user?.points}
                          </span>
                          <span className="text-blue-400 text-xs"> Points</span>
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
