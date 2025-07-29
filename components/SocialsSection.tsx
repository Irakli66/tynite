"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Users } from "lucide-react";
import { Button } from "./ui/button";
import { socials } from "@/types/socials";

export default function SocialsSection() {
  const getPlatformColor = (title: string) => {
    const colors = {
      Twitch: "from-purple-600 to-purple-700",
      "X (Twitter)": "from-gray-700 to-gray-900",
      YouTube: "from-red-600 to-red-700",
      Instagram: "from-pink-600 to-purple-600",
      TikTok: "from-gray-800 to-black",
      Kick: "from-green-500 to-green-600",
    };
    return colors[title as keyof typeof colors] || "from-primary to-accent";
  };

  const getPlatformIcon = (title: string) => {
    const icons = {
      Twitch: "🎮",
      "X (Twitter)": "🐦",
      YouTube: "📺",
      Instagram: "📸",
      TikTok: "🎵",
      Kick: "⚡",
    };
    return icons[title as keyof typeof icons] || "🔗";
  };

  return (
    <section
      id="socials"
      className="py-20 bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
              STAY CONNECTED
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow me across all platforms for the latest content, live streams,
            and updates
          </p>
        </motion.div>

        {/* Social Cards Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-${socials.length} gap-6 max-w-6xl mx-auto`}
        >
          {socials.map((social, index) => (
            <motion.div
              key={social.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
              >
                {/* Card */}
                <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Content */}
                  <div className="pt-8 pb-6 px-6 text-center space-y-4">
                    {/* Profile image */}
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 bg-card border-4 border-card rounded-full overflow-hidden shadow-lg">
                        <Image
                          src="/images/tyniteLogo.png"
                          alt="Tynite Logo"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover scale-90"
                        />
                      </div>
                    </div>

                    {/* Platform name */}
                    <h3 className="font-black text-foreground text-lg">
                      {social.code}
                    </h3>

                    {/* Platform icon and name */}
                    <div className="flex items-center justify-center space-x-2">
                      <Image
                        src={social.imageUrl}
                        alt={social.title}
                        width={20}
                        height={20}
                        className="opacity-80"
                      />
                      <span className="text-sm font-bold text-muted-foreground">
                        {social.title}
                      </span>
                    </div>

                    {/* Follow button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => window.open(social.link, "_blank")}
                        className={`w-full bg-gradient-to-r ${getPlatformColor(
                          social.title
                        )} hover:opacity-90 transition-all duration-200 font-bold text-white border-0 shadow-lg`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        FOLLOW
                      </Button>
                    </motion.div>
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${getPlatformColor(
                      social.title
                    )} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-2xl`}
                  />
                </div>

                {/* Animated border on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${getPlatformColor(
                    social.title
                  )} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-sm`}
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full border border-primary/20">
            <span className="text-sm font-bold text-primary">✨</span>
            <span className="text-sm font-bold text-foreground">
              Don&apos;t miss out on exclusive content and giveaways!
            </span>
            <span className="text-sm font-bold text-primary">✨</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
