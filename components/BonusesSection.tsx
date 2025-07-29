"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { bonuses } from "@/types/bonus";
import { Button } from "./ui/button";

export default function BonusesSection() {
  const handleClaimBonus = (link: string) => {
    window.open(link, "_blank");
  };

  // Extract domain from link for display
  const getDomainFromLink = (link: string) => {
    try {
      const url = new URL(link);
      return url.hostname;
    } catch {
      return link;
    }
  };

  return (
    <section
      id="bonuses"
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden py-20"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Main Title */}
          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tight text-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BONUSES
            </span>
          </motion.h2>

          {/* Featured Sites Header */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                FEATURED SITES
              </h3>
            </div>

            <Link href="/bonus">
              <Button
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10 font-bold px-6 py-2"
              >
                VIEW ALL
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bonuses.slice(0, 4).map((bonus, index) => (
            <motion.div
              key={bonus.id}
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
    </section>
  );
}
