"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { socials } from "@/types/socials";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "Bonuses", href: "#bonuses" },
    { name: "Videos", href: "#videos" },
    { name: "Socials", href: "#socials" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-t from-background/95 to-background border-t border-border/40 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-24 bg-primary/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-card border border-border/40 rounded-lg p-1.5">
                <Image
                  src="/images/tyniteLogo.png"
                  alt="Tynite Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-foreground">TYNITE</h3>
                <p className="text-xs font-bold text-primary tracking-wider">
                  REWARDS
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your ultimate destination for gaming promotions, exclusive
              bonuses, and the latest content from the gaming world.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform transition-transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Follow Me
            </h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <motion.button
                  key={social.id}
                  onClick={() => window.open(social.link, "_blank")}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 cursor-pointer bg-card/60 border border-border/40 rounded-lg flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 group"
                >
                  <Image
                    src={social.imageUrl}
                    alt={social.title}
                    width={20}
                    height={20}
                    className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} Tynite. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>for my comunity</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
