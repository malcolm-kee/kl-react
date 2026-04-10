export const siteMetadata = {
  title: "KL React",
  description: "Reacting in Kuala Lumpur, Malaysia",
  url: "https://kl-react.com",
  siteUrl: "https://kl-react.com",
  twitter: "@KlReact",
  keywords: ["reactjs", "react developer", "kuala lumpur", "meetup"],
} as const satisfies {
  title: string;
  description: string;
  url: string;
  siteUrl: string;
  twitter: string;
  keywords: readonly string[];
};
