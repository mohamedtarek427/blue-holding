import React, { useEffect, useState } from "react";
import useGetUsers from "../hooks/reactQuery/useGetUsers";
import Image from "next/image";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface User {
  name: string;
  points: number;
  avatar: string;
  acheivedTimePerSecond: number;
  attemptTimes: number;
  id: string;
}

const TopHighlightSection = () => {
  const { data: users = [], isLoading, isError } = useGetUsers();
  const [selectedFilter, setSelectedFilter] = useState("higher scores");
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  // Set the initial sorted state when users are fetched
  useEffect(() => {
    if (users.length > 0) {
      setSortedUsers([...users].sort((a, b) => b.points - a.points)); // Default sorting: higher scores
    }
  }, [users]);

  // Update sorting when the filter changes
  useEffect(() => {
    if (users.length === 0) return;

    // Sort based on the selected filter
    const newSortedUsers = [...users].sort((a, b) => {
      if (selectedFilter === "higher scores") return b.points - a.points;
      if (selectedFilter === "faster competition")
        return a.acheivedTimePerSecond - b.acheivedTimePerSecond;
      if (selectedFilter === "minimum attempts")
        return a.attemptTimes - b.attemptTimes;
      return 0;
    });

    // First update the state to reflect sorting
    setSortedUsers(newSortedUsers);

    // Then animate the user list items
    gsap.fromTo(
      ".user-item",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power2.out", stagger: 0.1 }
    );
  }, [selectedFilter, users]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users.</p>;

  const filterOptions = [
    "higher scores",
    "faster competition",
    "minimum attempts",
  ];

  return (
    <section className="mt-24">
      <h2 className="text-4xl font-bold text-darkGray text-center mb-8 capitalize">
        Top Highlights
      </h2>
      <p className="text-center text-gray-400 capitalize mb-8 w-full mx-auto text-md lg:text-lg xl:text-xl">
        See who&rsquo;s setting the bar high with outstanding scores,
        lightning-fast competitions, and unmatched efficiency.
      </p>

      {/* Filter Selection */}
      <ul className="ml-5">
        {filterOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => setSelectedFilter(option)}
            className={`capitalize inline-block justify-start mx-2 px-4 py-2 cursor-pointer transition-all duration-300 ${
              selectedFilter === option
                ? "text-sky-500 bg-[#f3f3f3]"
                : "text-gray-700 hover:text-gray-500"
            }`}
          >
            {option}
          </li>
        ))}
      </ul>

      {/* Swiper Slider */}
      <section className="flex items-center w-full mt-6 relative">
        {/* Navigation Buttons */}
        <div className="swiper-button-prev text-black rounded-full p-3 left-0 z-10 cursor-pointer"></div>
        <div className="w-full relative flex justify-center items-center">
          <div className="w-[95%]">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={500}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 6 },
              }}
              className="w-full px-12"
            >
              {sortedUsers.map((user, index) => {
                const getImagePath = (userId: string) => {
                  // List of possible image extensions to try
                  const extensions = [".png", ".jpg", ".jpeg", ".webp"];

                  for (const ext of extensions) {
                    try {
                      return require(`../../assets/persons/${userId}${ext}`);
                    } catch (e) {
                      continue; // Try next extension
                    }
                  }

                  // If no image found, return a default fallback
                  return require("../../assets/persons/1.jpg");
                };

                return (
                  <SwiperSlide key={user.name}>
                    <li className="user-item relative flex flex-col items-center p-1 border-gray-200">
                      {/* Rank Number Styling */}
                      <p
                        className={`mb-3 border p-2 rounded-full w-10 h-10 flex justify-center items-center font-semibold
                      ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-500 border-yellow-500"
                          : index === 1
                          ? "bg-gray-200 text-gray-400 border-gray-400"
                          : index === 2
                          ? "bg-[#ebdbcc] text-[#cd7f32] border-[#cd7f32]"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      >
                        {index + 1}
                      </p>

                      {/* User Avatar */}
                      <div className="w-full h-60 relative">
                        <Image
                          loading="lazy"
                          src={getImagePath(user.id)}
                          alt={user.name}
                          width={100}
                          height={100}
                          className="object-fit w-full h-full"
                        />
                      </div>

                      {/* Display the correct metric based on the selected filter */}
                      <span className="text-md mt-1 font-semibold text-gray-500">
                        {selectedFilter === "higher scores"
                          ? `${user.points} points`
                          : selectedFilter === "faster competition"
                          ? `${(user.acheivedTimePerSecond / 60).toFixed(
                              2
                            )} minutes`
                          : `${user.attemptTimes} attempts`}
                      </span>
                    </li>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className="swiper-button-next text-black rounded-full p-3 right-0 z-10 cursor-pointer"></div>
      </section>
    </section>
  );
};

export default TopHighlightSection;
