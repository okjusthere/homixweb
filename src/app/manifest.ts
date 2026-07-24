import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Homix",
    short_name: "Homix",
    description: "Homix residential real estate brokerage.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F6F3EC",
    theme_color: "#F6F3EC",
    icons: [
      {
        src: "/icons/homix-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/homix-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/homix-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
