"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden flex items-center justify-center">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Logo and Brand */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-primary/20 rounded-xl blur-md"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-card border border-border/40 rounded-lg p-3">
                <Image
                  src="/images/tyniteLogo.png"
                  alt="Tynite Logo"
                  width={48}
                  height={48}
                  className="rounded-md"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-foreground">
                TYNITE
              </h1>
              <p className="text-xs font-bold text-primary tracking-wider">
                REWARDS
              </p>
            </div>
          </div>
        </motion.div>

        {/* 404 Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <motion.div
            className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back to exploring our gaming rewards!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="border-primary/40 text-primary hover:bg-primary/10 font-bold px-8 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 pt-8 border-t border-border/40"
        >
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Quick Navigation
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/#bonuses"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Bonuses
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/#videos"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Videos
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/#socials"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Socials
            </Link>
          </div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
