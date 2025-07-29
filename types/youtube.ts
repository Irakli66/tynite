export interface YoutubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
    channelTitle: string;
    liveBroadcastContent?: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
  contentDetails?: {
    duration: string; // ISO 8601 duration format (e.g., "PT4M13S")
  };
  liveStreamingDetails?: {
    actualStartTime?: string;
    actualEndTime?: string;
    scheduledStartTime?: string;
  };
}

export interface YoutubeSearchResponse {
  kind: string;
  etag: string;
  items: YoutubeVideo[];
}
