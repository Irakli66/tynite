"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gift, Crown, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const crGifts = [
  {
    id: "banner",
    title: "Exclusive Banner and Background",
    description: "1 x Furnace Fam Decoration + The Long Road Background.",
    type: "Banner and Background",
    rarity: "Epic",
    imageUrl: "/images/gifts-banners/FurnaceWalkBB.png", // You can add a banner preview image
    claimUrl:
      "https://link.clashroyale.com/?action=voucher&code=26660292-0b2e-441f-9747-4816b7427150",
    available: true,
    expiresAt: new Date("2025-08-27T09:00:00Z"), // August 26, 2025 at 09:00 UTC
  },
  // You can add more gifts here as they become available
  // {
  //   id: "emote",
  //   title: "Special Emote",
  //   description: "Limited edition emote from Tynite",
  //   type: "Emote",
  //   rarity: "Legendary",
  //   imageUrl: "/images/cr-emote.png",
  //   claimUrl:
  //     "https://link.clashroyale.com/?action=voucher&code=YOUR_EMOTE_CODE",
  //   available: true,
  //   expiresAt: new Date("2024-12-31T23:59:59Z"),
  // },
];

const rarityColors = {
  Common: "from-gray-400 to-gray-500",
  Rare: "from-blue-400 to-blue-500",
  Epic: "from-purple-400 to-purple-500",
  Legendary: "from-orange-400 to-orange-500",
  Champion: "from-yellow-400 to-yellow-500",
};

export default function CRGiftsPage() {
  const handleClaim = (url: string) => {
    window.open(url, "_blank");
  };

  const isGiftExpired = (expiresAt: Date) => {
    return new Date() > expiresAt;
  };

  const getTimeUntilExpiry = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden pt-10">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          {/* CR Logo and Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <Image
                  src="/images/cr.png"
                  alt="cr"
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-black tracking-tight text-foreground">
                  CLASH ROYALE
                </h1>
                <p className="text-lg font-bold text-orange-500">
                  ოფიციალური საჩუქრები
                </p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 bg-orange-500/10 px-6 py-3 rounded-full border border-orange-500/20 mb-6">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-bold text-orange-600">
                ოფიციალური Supercell კრეატორი
              </span>
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            მიიღეთ ექსკლუზიური Clash Royale საჩუქრები Tynite-სგან!
          </motion.p>
        </motion.div>

        {/* Gifts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              ხელმისაწვდომი საჩუქრები
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crGifts.map((gift, index) => {
              const isExpired = gift.expiresAt
                ? isGiftExpired(gift.expiresAt)
                : false;
              const timeUntilExpiry = gift.expiresAt
                ? getTimeUntilExpiry(gift.expiresAt)
                : null;

              return (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative"
                  >
                    {/* Card */}
                    <div className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Header with rarity */}
                      <div
                        className={`bg-gradient-to-r ${
                          rarityColors[gift.rarity as keyof typeof rarityColors]
                        } p-4 text-white`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold uppercase tracking-wider">
                            {gift.type}
                          </span>
                          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                            {gift.rarity}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Gift Image Preview */}
                        <div className="w-full h-40 0 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {gift.imageUrl ? (
                            <Image
                              src={gift.imageUrl}
                              alt={gift.title}
                              width={200}
                              height={160}
                              className="w-full h-full object-contain p-3"
                              quality={95}
                              priority
                            />
                          ) : (
                            <div className="text-center">
                              <Crown className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                              <p className="text-xs text-muted-foreground font-medium">
                                {gift.type} Preview
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Gift Info */}
                        <div className="text-center mb-6 flex-1">
                          <h3 className="text-xl font-black text-foreground mb-2">
                            {gift.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {gift.description}
                          </p>
                        </div>

                        {/* Bottom section with button and badge */}
                        <div className="mt-auto">
                          {/* Claim Button */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={() => handleClaim(gift.claimUrl)}
                              disabled={isExpired}
                              className={`w-full font-bold border-0 shadow-lg group-hover:shadow-xl transition-all duration-200 ${
                                isExpired
                                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                              }`}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              {isExpired ? "Expired" : "CLAIM GIFT"}
                            </Button>
                          </motion.div>

                          {/* Status Badge */}
                          <div className="mt-3 text-center">
                            {isExpired ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                Expired
                              </span>
                            ) : timeUntilExpiry ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                Expires in {timeUntilExpiry}
                              </span>
                            ) : gift.available ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Available Now
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl -z-10" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-12"
        >
          <div className="bg-card border border-border/40 rounded-2xl p-8">
            <h3 className="text-xl font-black text-foreground mb-4 text-center">
              როგორ მიიღოთ თქვენი საჩუქარი
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-orange-500">1</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">
                  დააჭირეთ მიღებას
                </h4>
                <p className="text-sm text-muted-foreground">
                  დააჭირეთ &quot;CLAIM GIFT&quot; ღილაკს ნებისმიერ ხელმისაწვდომ
                  საჩუქარზე
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-orange-500">2</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">
                  გადამისამართება თამაშში
                </h4>
                <p className="text-sm text-muted-foreground">
                  თქვენ გადამისამართდებით Clash Royale-ში საჩუქრის მისაღებად
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-orange-500">3</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">ისიამოვნეთ!</h4>
                <p className="text-sm text-muted-foreground">
                  თქვენი საჩუქარი დაემატება თქვენს Clash Royale ანგარიშს
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 px-6 py-3 rounded-full border border-orange-500/20">
            <span className="text-sm font-bold text-orange-500">🎮</span>
            <span className="text-sm font-bold text-foreground">
              მეტი საჩუქარი მალე! იყავით ყურადღებით
            </span>
            <span className="text-sm font-bold text-orange-500">🎮</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
