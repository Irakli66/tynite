export type Bonus = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  code: string;
};

export const bonuses: Bonus[] = [
  {
    id: "1",
    title: "CSGO-SKINS.COM",
    description: "free 0.5$ and 10% bonus on deposit",
    imageUrl: "/images/websites/csgoskins.jpeg",
    link: "https://csgo-skins.com/?ref=TYNITE",
    code: "TYNITE",
  },
  {
    id: "2",
    title: "Rain.GG",
    description: "3 free cases and 5% deposit bonus",
    imageUrl: "/images/websites/rain.png",
    link: "https://rain.gg/r/tynite",
    code: "TYNITE",
  },
  {
    id: "3",
    title: "CSGOEMPIRE.COM",
    description: "free gift case",
    imageUrl: "/images/websites/csgoempire.png",
    link: "https://csgoempire.com/r/tynite",
    code: "TYNITE",
  },
  {
    id: "4",
    title: "Packdraw",
    description: "10% deposit bonus",
    imageUrl: "/images/websites/packdraw.png",
    link: "https://packdraw.com?ref=tynite",
    code: "TYNITE",
  },
];
