import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.clementenjolras.fr/", // replace this with your deployed domain
  author: "Clément Enjolras",
  desc: "Clément Enjolras, développeur front-end basé à Saint-Étienne. Portfolio et blog personnel.",
  title: "Clément Enjolras",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["fr-FR"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/CEnjolras",
    linkTitle: `Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/cl%C3%A9ment-enjolras-30958ab4/",
    linkTitle: `LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:hello@clementenjolras.fr",
    linkTitle: `hello@clementenjolras.fr`,
    active: true,
  },
];
