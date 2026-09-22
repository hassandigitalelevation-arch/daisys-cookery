/**
 * DEMO IMAGE SOURCE
 * -----------------
 * No real Daisy's Cookery cake photography is available in this project yet
 * (the Facebook page cannot be accessed programmatically and no photos were
 * supplied), so product/gallery imagery uses verified free-licensed demo
 * photography. Replace any entry with `photo-<unsplash-id>` of the bakery's
 * own photos as they become available. Every image is marked `sample: true`.
 */

import { brandPhotos } from "@/data/photo-map";

const UNSPLASH_SOURCE = "https://images.unsplash.com";

export type SourceImage = {
  src: string;
  alt: string;
  /** true when the photo is a demo/sample, not an actual Daisy's cake */
  sample: boolean;
};

export function unsplash(id: string, width = 900, height = 1100) {
  return `${UNSPLASH_SOURCE}/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=75`;
}

/**
 * Returns the bakery's own photo (from `public/photos/`) when the owner has
 * added one for this key in `src/data/photo-map.ts`, otherwise the demo image.
 */
export function brandImage(key: string, fallback: string): string {
  const file = brandPhotos[key];
  return file ? `/photos/${file}` : fallback;
}

export const verifiedPhotoIds = {
  chocolateDrip: "photo-1578985545062-69928b1d9587",
  chocolateStack: "photo-1535141192574-5d4897c12636",
  strawberryCake: "photo-1565958011703-44f9829ba187",
  weddingTower: "photo-1533134486753-c833f0ed4866",
  weddingTable: "photo-1535254973040-607b474cb50d",
  weddingRomantic: "photo-1562777717-dc6984f65a63",
  cupcake: "photo-1563729784474-d77dbb933a9e",
  birthdayCake: "photo-1606890737304-57a1ca8a5b62",
  dessertPlatter: "photo-1486427944299-d1955d23e34d",
  cakeSlice: "photo-1558636508-e0db3814bd1d",
  berryCake: "photo-1588195538326-c5b1e9f80a1b",
  pastryCounter: "photo-1542826438-bd32f43d626f",
} as const;