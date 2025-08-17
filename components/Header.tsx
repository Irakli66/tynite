"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { name: "HOME", href: "#hero", isExternal: false, isHome: true },
  { name: "BONUSES", href: "/bonus", isExternal: true, isHome: false },
  { name: "VIDEOS", href: "#videos", isExternal: false, isHome: false },
  { name: "SOCIALS", href: "#socials", isExternal: false, isHome: false },
  { name: "LINKS", href: "/links", isExternal: true, isHome: false },
];

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isExternal) {
      // For external routes like /bonus, navigate using router
      return;
    } else if (item.isHome) {
      // For HOME, always go to homepage and scroll to top
      if (pathname !== "/") {
        router.push("/");
      } else {
        // If already on homepage, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // For other sections, scroll to section (only works on homepage)
      if (pathname === "/") {
        scrollToSection(item.href);
      } else {
        // If not on homepage, go to homepage first then scroll to section
        router.push("/" + item.href);
      }
    }
  };

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      // If already on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: headerOpacity }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/98 backdrop-blur-xl border-b border-border/80 shadow-2xl shadow-primary/5"
            : "bg-background/90 backdrop-blur-lg border-b border-border/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <motion.div
              className="flex items-center space-x-4 cursor-pointer group"
              style={{ scale: logoScale }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={handleLogoClick}
            >
              <div className="relative">
                {/* Animated background glow */}
                <motion.div
                  className="absolute -inset-2 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Logo with subtle border */}
                <div className="relative bg-card border border-border/40 rounded-lg p-1.5 group-hover:border-primary/30 transition-colors duration-300">
                  <Image
                    src="/images/tyniteLogo.png"
                    alt="Tynite Logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <motion.h1
                  className="text-xl font-black tracking-tight text-foreground leading-none"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  TYNITE
                </motion.h1>
                <span className="text-xs font-bold text-primary tracking-[0.15em] leading-none opacity-80">
                  REWARDS
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {item.isExternal ? (
                    <Link href={item.href}>
                      <motion.div
                        className={`relative cursor-pointer text-sm font-bold transition-colors duration-300 py-2 group ${
                          item.name === "BONUSES" 
                            ? "text-primary-foreground bg-gradient-to-r from-primary to-accent rounded-lg px-4 shadow-lg hover:shadow-xl hover:shadow-primary/25" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        whileHover={{ y: -1, scale: item.name === "BONUSES" ? 1.05 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name === "BONUSES" && (
                          <>
                            {/* Animated background glow for BONUSES */}
                            <motion.div
                              className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur-sm opacity-75"
                              animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.75, 0.9, 0.75],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            {/* Sparkle effect */}
                            <motion.div
                              className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: 0.5,
                              }}
                            />
                          </>
                        )}
                        
                        <span className="relative z-10">{item.name}</span>

                        {item.name !== "BONUSES" && (
                          <>
                            {/* Electric blue underline on hover for other items */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                              initial={{ width: 0, opacity: 0 }}
                              whileHover={{ width: "100%", opacity: 1 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            />

                            {/* Subtle glow effect for other items */}
                            <motion.div
                              className="absolute -inset-x-2 -inset-y-1 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={{ scale: 0.8 }}
                              whileHover={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          </>
                        )}
                      </motion.div>
                    </Link>
                  ) : item.isHome ? (
                    <motion.button
                      onClick={() => handleNavClick(item)}
                      className="relative cursor-pointer text-sm font-bold text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 group"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}

                      {/* Electric blue underline on hover */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0, opacity: 0 }}
                        whileHover={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />

                      {/* Subtle glow effect */}
                      <motion.div
                        className="absolute -inset-x-2 -inset-y-1 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => handleNavClick(item)}
                      className="relative cursor-pointer text-sm font-bold text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 group"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}

                      {/* Electric blue underline on hover */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0, opacity: 0 }}
                        whileHover={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />

                      {/* Subtle glow effect */}
                      <motion.div
                        className="absolute -inset-x-2 -inset-y-1 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Mobile BONUSES button - visible only on mobile */}
              <div className="md:hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Link href="/bonus">
                    <motion.div
                      className="relative cursor-pointer text-xs font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent rounded-lg px-3 py-2 shadow-lg hover:shadow-xl hover:shadow-primary/25 border border-primary/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Animated background glow for mobile BONUSES */}
                      <motion.div
                        className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur-sm opacity-60"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.6, 0.8, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Sparkle effect */}
                      <motion.div
                        className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-accent rounded-full"
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      />
                      
                      <span className="relative z-10">BONUSES</span>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              <ThemeToggle />

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileNavOpen(true)}
                    className="relative hover:bg-muted/60 transition-all duration-300 group border border-border/40 hover:border-primary/30"
                  >
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <Menu className="w-5 h-5 group-hover:text-primary transition-colors duration-300" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated gradient line at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        />

        {/* Subtle animated particles effect */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: "50%",
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
