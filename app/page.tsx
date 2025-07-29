// app/page.tsx (or wherever your Page component is)
import Home from "@/components/Home";
import { fetchRecentVideos } from "@/lib/fetchRecentVideos"; // server-side function

export default async function Page() {
  const videoData = await fetchRecentVideos();

  return <Home videoData={videoData} />;
}
