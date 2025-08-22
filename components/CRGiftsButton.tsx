"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";

export default function CRGiftsButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/cr-gifts");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative cursor-pointer"
      >
                 {/* Main button */}
         <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-300/30 shadow-green-500/50">
          {/* CR Emote Image */}
          <div className="absolute inset-0 flex items-center p-1 justify-center">
            <Image
              src="/images/cr-like.png"
              alt="Clash Royale Gift"
              width={30}
              height={30}
              className="w-40 h-40 object-contain"
              priority
            />
          </div>

          {/* Gift icon overlay */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
            <Gift className="w-3 h-3 text-white" />
          </div>
        </div>

                 {/* Outer glow effect */}
         <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl -z-10 animate-pulse" />
         
         {/* Tooltip */}
      </motion.button>
    </motion.div>
  );
}
