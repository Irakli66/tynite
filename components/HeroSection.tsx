"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "./ui/button";

// Fixed positions to avoid hydration mismatch
const particlePositions = [
  { left: "10%", top: "25%" },
  { left: "25%", top: "60%" },
  { left: "40%", top: "35%" },
  { left: "55%", top: "70%" },
  { left: "70%", top: "45%" },
  { left: "85%", top: "55%" },
];

export default function HeroSection() {
  const scrollToBonuses = () => {
    const element = document.querySelector("#bonuses");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToVideos = () => {
    const element = document.querySelector("#videos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-[85vh]  max-h-[900px] flex flex-col items-center justify-center relative bg-gradient-to-br from-background to-background/80 overflow-hidden px-4 sm:px-6"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Main content */}
      <div className="relative items-center flex flex-col z-10 text-center space-y-6 sm:space-y-8 w-full max-w-6xl">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 sm:space-y-2"
        >
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground tracking-wider px-4">
            Use code{" "}
            <span className="font-bold text-primary">&quot;TYNITE&quot;</span>{" "}
            and earn rewards
          </p>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground px-4">
            and bonuses with our partners.
          </p>
        </motion.div>

        {/* Main logo with intense neon effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-6 sm:my-8 md:my-12"
        >
          {/* Multiple neon glow layers */}
          <motion.div
            className="absolute inset-0 bg-primary/40 blur-2xl sm:blur-3xl rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-accent/30 blur-xl sm:blur-2xl rounded-full"
            animate={{
              scale: [1.1, 0.9, 1.1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main logo */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/3dtynite.png"
              alt="Tynite Logo"
              width={400}
              height={400}
              className="mx-auto drop-shadow-2xl w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 w-full"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={scrollToBonuses}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto min-w-[140px]"
            >
              BONUSES
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={scrollToVideos}
              variant="outline"
              className="border-2 border-primary/40 hover:border-primary hover:bg-primary/10 font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 group w-full sm:w-auto min-w-[140px]"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:text-primary transition-colors" />
              Videos
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          // className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToBonuses}
            className="flex cursor-pointer flex-col items-center space-y-1 sm:space-y-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="p-2 sm:p-3 rounded-full border-2 border-current group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}

      {/* Neon accent lines */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
      />

      {/* Additional neon effects with fixed positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
