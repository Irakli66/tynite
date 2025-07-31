// app/page.tsx
import Home from "@/components/Home";
import { fetchRecentVideos } from "@/lib/fetchRecentVideos";

// Configure Next.js caching for this page
export const revalidate = 300; // Revalidate every 5 minutes
export const dynamic = 'force-dynamic'; // Always fetch fresh data

export default async function Page() {
  const videoData = await fetchRecentVideos();

  return <Home videoData={videoData} />;
}
