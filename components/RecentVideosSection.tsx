// components/RecentVideosSection.tsx
"use client";

import { VideoData } from "@/lib/fetchRecentVideos";
import { motion } from "framer-motion";
import {
  Play,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Video,
  Radio,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

type RecentVideosSectionProps = {
  videoData: VideoData;
};

type ContentType = "videos" | "streams";

export default function RecentVideosSection({
  videoData,
}: RecentVideosSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [contentType, setContentType] = useState<ContentType>("videos");

  // Get videos and streams from the already separated data
  const { regularVideos, liveStreams } = videoData;

  // Get current display videos based on selected type
  const displayVideos = contentType === "videos" ? regularVideos : liveStreams;

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = 320;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }, 100);
  };

  const formatDuration = (duration: string) => {
    if (!duration) return "0:00";

    // Parse ISO 8601 duration format (PT4M13S)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "0:00";

    const hours = parseInt(match[1] || "0");
    const minutes = parseInt(match[2] || "0");
    const seconds = parseInt(match[3] || "0");

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatViewCount = (viewCount: string) => {
    if (!viewCount) return "0 views";

    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  const formatUploadDate = (publishedAt: string) => {
    const date = new Date(publishedAt);
    const day = date.getDate().toString().padStart(2, "0");
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  if (!regularVideos.length && !liveStreams.length) {
    return (
      <section id="videos" className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">No recent videos found.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="videos"
      className="py-20 bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                  RECENT {contentType.toUpperCase()}
                </h2>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="border-primary/40 hover:bg-primary/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="border-primary/40 hover:bg-primary/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content Type Toggle */}
          <div className="flex items-center justify-center">
            <div className="bg-muted/30 p-1 rounded-lg border border-border/40">
              <div className="flex items-center space-x-1">
                <Button
                  variant={contentType === "videos" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setContentType("videos")}
                  className={`relative px-4 py-2 font-bold transition-all duration-200 ${
                    contentType === "videos"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Videos ({regularVideos.length})
                </Button>
                <Button
                  variant={contentType === "streams" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setContentType("streams")}
                  className={`relative px-4 py-2 font-bold transition-all duration-200 ${
                    contentType === "streams"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Radio className="w-4 h-4 mr-2" />
                  Streams ({liveStreams.length})
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {displayVideos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              {contentType === "videos" ? (
                <Video className="w-8 h-8 text-primary/50" />
              ) : (
                <Radio className="w-8 h-8 text-primary/50" />
              )}
            </div>
            <p className="text-muted-foreground">
              No {contentType} found. Try switching to{" "}
              {contentType === "videos" ? "streams" : "videos"}.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Videos Slider */}
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {displayVideos.map((video, index) => (
                  <motion.div
                    key={`${contentType}-${video.id.videoId}`}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-80 group"
                  >
                    <motion.a
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full min-h-[400px] flex flex-col">
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-muted overflow-hidden">
                          <Image
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            fill
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Play overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                              <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                            </div>
                          </div>

                          {/* Duration badge */}
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {formatDuration(
                              video.contentDetails?.duration || ""
                            )}
                          </div>

                          {/* Live indicator for streams */}
                          {contentType === "streams" && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              <span>LIVE</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3 flex-1 flex flex-col">
                          <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 min-h-[3rem] flex items-center">
                            {video.snippet.title}
                          </h3>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>
                                {formatViewCount(
                                  video.statistics?.viewCount || "0"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {formatUploadDate(video.snippet.publishedAt)}
                              </span>
                            </div>
                          </div>

                          {/* Channel info */}
                          <div className="flex items-center space-x-2 pt-2 border-t border-border/40 mt-auto">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <Image
                                src="/images/tyniteLogo.png"
                                alt="Tynite Logo"
                                width={50}
                                height={50}
                                className="rounded-md"
                              />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">
                              {video.snippet.channelTitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  </motion.div>
                ))}
              </div>

              {/* Mobile scroll indicators */}
              <div className="md:hidden flex justify-center space-x-2 mt-6">
                {Array.from({
                  length: Math.ceil(displayVideos.length / 2),
                }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-primary/30" />
                ))}
              </div>
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10 font-bold px-8 py-3"
                onClick={() =>
                  window.open("https://youtube.com/@tynite", "_blank")
                }
              >
                View All {contentType}
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
