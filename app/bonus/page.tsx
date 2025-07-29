"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { bonuses } from "@/types/bonus";
import { Button } from "@/components/ui/button";

export default function BonusPage() {
  const handleClaimBonus = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Add padding top to account for fixed header */}
      <div className="pt-20 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground font-bold group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-4xl md:text-6xl font-black tracking-tight text-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ALL BONUSES
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-center text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Claim exclusive bonuses from our partner sites. Use code{" "}
              <span className="text-primary font-bold">&quot;TYNITE&quot;</span>{" "}
              for special offers!
            </motion.p>
          </motion.div>

          {/* All Bonuses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={bonus.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <motion.div
                  className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full min-h-[400px] flex flex-col"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Site Logo Area */}
                  <div className="relative h-40 bg-gradient-to-br from-card to-card/80 flex flex-col items-center justify-center border-b border-border/40 p-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border/20 mb-3">
                      <Image
                        src={bonus.imageUrl}
                        alt={bonus.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-foreground text-center leading-tight">
                      {bonus.title}
                    </h4>
                  </div>

                  {/* Site URL */}
                  <div className="px-4 py-3 border-b border-border/40 bg-muted/20">
                    <div
                      className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-muted/30 transition-colors duration-200 rounded-md p-2 -m-2"
                      onClick={() => handleClaimBonus(bonus.link)}
                    >
                      <ExternalLink className="w-3 h-3 text-primary" />
                      <span className="font-mono text-xs text-primary hover:text-primary/80 transition-colors">
                        {bonus.link}
                      </span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="p-4 space-y-4 flex-1 flex flex-col">
                    <div className="space-y-2 text-center flex-1 flex flex-col justify-center min-h-[80px]">
                      {bonus.description.split(" and ").map((benefit, i) => (
                        <div
                          key={i}
                          className="text-sm font-bold text-primary uppercase"
                        >
                          {benefit.trim()}
                        </div>
                      ))}
                    </div>

                    {/* Claim Button */}
                    <Button
                      onClick={() => handleClaimBonus(bonus.link)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      CLAIM BONUS
                    </Button>

                    {/* Use Code */}
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-sm font-bold text-foreground">
                          USE CODE
                        </span>
                        <code className="text-sm font-bold text-primary">
                          &quot;{bonus.code}&quot;
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                    initial={false}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
