"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: "HOME", href: "#hero", isExternal: false, isHome: true },
  { name: "VIDEOS", href: "#videos", isExternal: false, isHome: false },
  { name: "SOCIALS", href: "#socials", isExternal: false, isHome: false },
  { name: "LINKS", href: "/links", isExternal: true, isHome: false },
];

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onClose();
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isExternal) {
      // For external routes like /bonus, /links, navigate using router
      onClose();
      router.push(item.href);
    } else if (item.isHome) {
      // For HOME, always go to homepage and scroll to top
      onClose();
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
        onClose();
        router.push("/" + item.href);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Mobile menu */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header with close button */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-bold text-foreground">NAVIGATION</h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors border border-border/40 hover:border-primary/30"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.button>
              </div>

              {/* Navigation items */}
              <nav className="space-y-2 flex-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                  >
                    {item.isHome ? (
                      <motion.button
                        className="block w-full text-left text-lg font-bold text-muted-foreground hover:text-foreground transition-all duration-300 py-4 px-6 rounded-lg hover:bg-muted/30 border border-transparent hover:border-primary/20 group"
                        onClick={() => handleNavClick(item)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="relative">
                            {item.name}
                            {/* Underline effect */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary/40 opacity-0 group-hover:opacity-100"
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      </motion.button>
                    ) : (
                      <motion.button
                        className="block w-full text-left text-lg font-bold text-muted-foreground hover:text-foreground transition-all duration-300 py-4 px-6 rounded-lg hover:bg-muted/30 border border-transparent hover:border-primary/20 group"
                        onClick={() => handleNavClick(item)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="relative">
                            {item.name}
                            {/* Underline effect */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary/40 opacity-0 group-hover:opacity-100"
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Footer decoration */}
              <motion.div
                className="mt-auto pt-6 border-t border-border/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-center">
                  <p className="text-sm font-bold text-primary/80 tracking-wider">TYNITE</p>
                  <p className="text-xs text-muted-foreground mt-1">Gaming Hub</p>
                </div>
              </motion.div>
            </div>

            {/* Animated gradient border */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 