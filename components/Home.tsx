// components/Home.tsx
import BonusesSection from "./BonusesSection";
import Header from "./Header";
import HeroSection from "./HeroSection";
import RecentVideosSection from "./RecentVideosSection";
import { VideoData } from "@/lib/fetchRecentVideos";
import SocialsSection from "./SocialsSection";

type HomeProps = {
  videoData: VideoData;
};

export default function Home({ videoData }: HomeProps) {
  return (
    <div className="min-h-screen mt-20">
      {/* <Header /> */}

      {/* Main content with padding-top to account for fixed header */}
      <main>
        <HeroSection />
        {/* <BonusesSection /> */}
        <RecentVideosSection videoData={videoData} />
        <SocialsSection />
      </main>
    </div>
  );
}
