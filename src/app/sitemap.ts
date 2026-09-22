import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/cakes", "/customize", "/gallery", "/about", "/contact", "/faq", "/order"];
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : route === "/customize" ? 1 : 0.8,
    })),
    ...products.map((p) => ({
      url: `${site.url}/cakes/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}