"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socials } from "@/types/socials";

const donationLinks = [
  {
    id: "kisa",
    title: "Kisa.ge საქართველო",
    description: "მადლობა მხარდაჭერისთვის!",
    icon: "🇬🇪",
    link: "https://www.kisa.ge/donate/tynite",
    color: "from-green-600 to-emerald-700",
  },
  {
    id: "worldwide",
    title: "დონაცია Streamlabs-ით",
    description: "გლობალური დონაციის პლატფორმა",
    icon: "🌍",
    link: "https://streamlabs.com/tynite66/tip",
    color: "from-blue-600 to-indigo-700",
  },
];

export default function LinksPage() {
  const getPlatformColor = (title: string) => {
    const colors = {
      Twitch: "from-purple-600 to-purple-700",
      "X (Twitter)": "from-gray-700 to-gray-900",
      YouTube: "from-red-600 to-red-700",
      Instagram: "from-pink-600 to-purple-600",
      TikTok: "from-gray-800 to-black",
      Kick: "from-green-500 to-green-600",
      Discord: "from-indigo-600 to-purple-600",
    };
    return colors[title as keyof typeof colors] || "from-primary to-accent";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden pt-10">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative mx-auto w-24 h-24 mb-4">
              {/* Animated background glow */}
              <motion.div
                className="absolute -inset-2 bg-primary/20 rounded-full blur-md"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative bg-card border-4 border-card rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/images/tyniteLogo.png"
                  alt="Tynite Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover scale-90"
                />
              </div>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">
              TYNITE
            </h1>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
          >
            მხარი დაუჭირე ჩემს კონტენტს და გამომყევი სოციალურ ქსელებში!
          </motion.p>
        </motion.div>

        {/* Donation Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              დონაციის ლინკები
            </h2>
          </div>

          <div className="space-y-4">
            {donationLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative"
                >
                  <Button
                    onClick={() => window.open(link.link, "_blank")}
                    className={`w-full h-auto p-6 bg-card border border-border/40 hover:border-primary/30 transition-all duration-200 font-bold text-foreground shadow-sm rounded-2xl group-hover:shadow-md hover:bg-muted/30`}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className="text-2xl">{link.icon}</div>
                      <div className="flex-1 text-left">
                        <div className="text-lg font-black">{link.title}</div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {link.description}
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Button>

                  {/* Subtle hover glow effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl -z-10" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="md:text-2xl text-xl font-black tracking-tight text-foreground">
              გამომყევი სოციალურ ქსელებში
            </h2>
          </div>

          <div className="space-y-4">
            {socials.map((social, index) => (
              <motion.div
                key={social.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative"
                >
                  <Button
                    onClick={() => window.open(social.link, "_blank")}
                    className={`w-full h-auto p-6 bg-card border border-border/40 hover:border-primary/30 transition-all duration-200 font-bold text-foreground shadow-sm rounded-2xl group-hover:shadow-md hover:bg-muted/30`}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center">
                        <Image
                          src={social.imageUrl}
                          alt={social.title}
                          width={20}
                          height={20}
                          className="opacity-80"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-lg font-black">{social.title}</div>
                        <div className="text-sm text-muted-foreground font-medium">
                          @{social.code}
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Button>

                  {/* Subtle hover glow effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl -z-10" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full border border-primary/20">
            <span className="text-sm font-bold text-primary">✨</span>
            <span className="text-sm font-bold text-foreground">
              მადლობა გვერდში დგომისთვის!
            </span>
            <span className="text-sm font-bold text-primary">✨</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
