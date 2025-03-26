"use client";

import dynamic from "next/dynamic";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { useState } from "react";
import FullUsers from "@/components/FullUsers";

const LeaderboardSection = dynamic(
  () => import("@/components/leaderboardSection")
);
const GamesSection = dynamic(() => import("../components/ui/GamesSection"));
const TopHighlightSection = dynamic(
  () => import("@/components/ui/TopHighlightSection")
);
const HowToRankSection = dynamic(
  () => import("@/components/ui/HowToRankSection")
);
const TopPerformers = dynamic(() => import("@/components/ui/TopPerformers"));
const Header = dynamic(() => import("@/components/ui/Header"));

export default function Home() {
  const [showAllUsers, setShowAllUsers] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-white text-black">
      <Header showAllUsers={showAllUsers} />
      <main>
        {showAllUsers != true && <TopPerformers />}
        {showAllUsers == true && (
          <FullUsers setShowAllUsers={setShowAllUsers} />
        )}
        {showAllUsers != true && (
          <>
            <LeaderboardSection setShowAllUsers={setShowAllUsers} />
            <GamesSection />
          </>
        )}
        <TopHighlightSection />
        <HowToRankSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
