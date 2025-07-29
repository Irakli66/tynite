import { useQuery } from "@tanstack/react-query";
import { fetchRecentVideos } from "@/lib/fetchRecentVideos";

export const useRecentVideos = () => {
  return useQuery({
    queryKey: ["recent-videos"],
    queryFn: fetchRecentVideos,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
