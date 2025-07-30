export type Social = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  code: string;
};
export const socials: Social[] = [
  {
    id: "1",
    title: "Twitch",
    description: "Follow me on Twitch for live streams",
    imageUrl: "/images/socials/twitch-logo.png",
    link: "https://www.twitch.tv/tynite66",
    code: "tynite66",
  },
  {
    id: "2",
    title: "X (Twitter)",
    description: "Follow me on X for updates",
    imageUrl: "/images/socials/x-white.png",
    link: "https://x.com/tynite66",
    code: "tynite66",
  },
  {
    id: "3",
    title: "YouTube",
    description: "Subscribe to my YouTube channel for videos",
    imageUrl: "/images/socials/yt-logo.png",
    link: "https://www.youtube.com/@tynite",
    code: "tynite",
  },
  // {
  //   id: "4",
  //   title: "Instagram",
  //   description: "Follow me on Instagram for photos",
  //   imageUrl: "/images/socials/instagram-logo.png",
  //   link: "https://www.instagram.com/tynite",
  //   code: "TYNITE",
  // },
  {
    id: "5",
    title: "TikTok",
    description: "Follow me on TikTok for short videos",
    imageUrl: "/images/socials/tiktok-logo.png",
    link: "https://www.tiktok.com/@tynite66",
    code: "tynite66",
  },
  {
    id: "6",
    title: "Kick",
    description: "Follow me on Kick for live streams",
    imageUrl: "/images/socials/kick-logo.png",
    link: "https://www.kick.com/tynite",
    code: "tynite",
  },
  {
    id: "7",
    title: "Discord",
    description: "Follow me on Discord for community chats",
    imageUrl: "/images/socials/discord-logo.png",
    link: "https://discord.com/invite/CpA3UChTF3",
    code: "tynite",
  },
];
