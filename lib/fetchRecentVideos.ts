import { YoutubeVideo } from "@/types/youtube";

const API_KEY = process.env.YOUTUBE_API_KEY!;
const CHANNEL_ID = process.env.CHANNEL_ID!;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Cache configuration
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
let cachedData: VideoData | null = null;
let cacheTimestamp: number = 0;

export interface VideoData {
  regularVideos: YoutubeVideo[];
  liveStreams: YoutubeVideo[];
}

// Empty data structure for when API is not available
const emptyVideoData: VideoData = {
  regularVideos: [],
  liveStreams: []
};

// YouTube API response interfaces
interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

interface YouTubeVideoDetails {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    liveBroadcastContent?: string;
    thumbnails: {
      medium: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
  contentDetails: {
    duration: string;
  };
  liveStreamingDetails?: {
    actualStartTime?: string;
    actualEndTime?: string;
    scheduledStartTime?: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}

interface YouTubeVideoResponse {
  items: YouTubeVideoDetails[];
}

// Check if cached data is still valid
function isCacheValid(): boolean {
  return cachedData !== null && (Date.now() - cacheTimestamp) < CACHE_DURATION;
}

// Save data to cache
function saveToCache(data: VideoData): void {
  cachedData = data;
  cacheTimestamp = Date.now();
  console.log("📦 Data cached for 15 minutes");
}

async function getVideoDetails(videoIds: string[]): Promise<YouTubeVideoDetails[]> {
  if (videoIds.length === 0) return [];
  
  const detailsRes = await fetch(
    `${BASE_URL}/videos?key=${API_KEY}&id=${videoIds.join(',')}&part=snippet,statistics,contentDetails,liveStreamingDetails`
  );

  if (!detailsRes.ok) {
    const err = await detailsRes.json();
    console.error("❌ YouTube Videos API Error:", err);
    throw new Error(err?.error?.message || "Failed to fetch video details");
  }

  const detailsData: YouTubeVideoResponse = await detailsRes.json();
  return detailsData.items || [];
}

export async function fetchRecentVideos(): Promise<VideoData> {
  // Check cache first
  if (isCacheValid()) {
    console.log("🚀 Returning cached data (no API call needed)");
    return cachedData!;
  }

  // Check if we should use empty data (no API key or in development)
  if (!API_KEY || !CHANNEL_ID) {
    console.log("⚠️ No API credentials available - returning empty data");
    return emptyVideoData;
  }

  try {
    console.log("🌐 Fetching fresh data from YouTube API...");
    
    // Get all recent content from the channel
    const searchRes = await fetch(
      `${BASE_URL}/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20&type=video`
    );

    if (!searchRes.ok) {
      const err = await searchRes.json();
      console.error("❌ YouTube Search API Error:", err);
      
      // If quota exceeded or other API error, return empty data
      if (err?.error?.code === 403 || err?.error?.message?.includes('quota')) {
        console.log("⚠️ API quota exceeded - returning empty data");
        return emptyVideoData;
      }
      
      throw new Error(err?.error?.message || "Failed to fetch videos");
    }

    const searchData: YouTubeSearchResponse = await searchRes.json();
    const allItems = searchData.items.filter((item: YouTubeSearchItem) => item.id.videoId);

    if (allItems.length === 0) {
      console.log("⚠️ No videos found - returning empty data");
      return emptyVideoData;
    }

    // Get detailed information for all videos
    const videoIds = allItems.map((item: YouTubeSearchItem) => item.id.videoId);
    const detailsItems = await getVideoDetails(videoIds);

    // Separate videos and streams based on actual YouTube data
    const regularVideos: YoutubeVideo[] = [];
    const liveStreams: YoutubeVideo[] = [];

    allItems.forEach((searchItem: YouTubeSearchItem) => {
      const details = detailsItems.find((detail: YouTubeVideoDetails) => detail.id === searchItem.id.videoId);
      
      if (!details) return;

      const videoData: YoutubeVideo = {
        id: searchItem.id,
        snippet: {
          title: searchItem.snippet.title,
          thumbnails: {
            medium: {
              url: searchItem.snippet.thumbnails.medium.url
            }
          },
          publishedAt: searchItem.snippet.publishedAt,
          channelTitle: searchItem.snippet.channelTitle,
          liveBroadcastContent: details.snippet?.liveBroadcastContent
        },
        statistics: details.statistics || {
          viewCount: "0",
          likeCount: "0",
          commentCount: "0"
        },
        contentDetails: details.contentDetails || {
          duration: "PT0M0S"
        },
        liveStreamingDetails: details.liveStreamingDetails
      };

      // Determine if it's a live stream based on YouTube's own categorization
      const isLiveContent = details.snippet?.liveBroadcastContent === 'live' ||
                           details.snippet?.liveBroadcastContent === 'upcoming' ||
                           details.snippet?.liveBroadcastContent === 'completed' ||
                           details.liveStreamingDetails ||
                           details.contentDetails?.duration === 'P0D';

      if (isLiveContent) {
        liveStreams.push(videoData);
      } else {
        regularVideos.push(videoData);
      }
    });

    const result: VideoData = {
      regularVideos: regularVideos.slice(0, 8),
      liveStreams: liveStreams.slice(0, 8)
    };

    // Cache the result
    saveToCache(result);
    
    console.log(`✅ Fetched ${result.regularVideos.length} videos and ${result.liveStreams.length} streams`);
    return result;

  } catch (error) {
    console.error("❌ Error fetching YouTube videos:", error);
    console.log("⚠️ Returning empty data due to error");
    return emptyVideoData;
  }
}

// Backward compatibility - returns all videos combined
export async function fetchAllVideos(): Promise<YoutubeVideo[]> {
  const { regularVideos, liveStreams } = await fetchRecentVideos();
  return [...regularVideos, ...liveStreams];
}

// Utility function to manually clear cache (useful for development)
export function clearVideoCache(): void {
  cachedData = null;
  cacheTimestamp = 0;
  console.log("🗑️ Video cache cleared");
}
