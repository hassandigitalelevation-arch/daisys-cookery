import { categories } from "@/data/categories";

/** Gallery categories mirror the cakes page so the filters match. */
export type GalleryTag = (typeof categories)[number]["name"];

export type GalleryItem = {
  src: string;
  alt: string;
  tag: GalleryTag;
  /** tall or square for the masonry feel */
  ratio: "tall" | "square";
};

const dir = "/Gallery";

/** Named by category (same naming as the cakes page), e.g. Birthday, Special, Wedding, Gaye-holud, Anneversary. */
const photos = [
  "Anneversary.jpg",
  "Anneversary(2).jpg",
  "Birthday.jpg",
  "Birthday (2).jpg",
  "Birthday (3).jpg",
  "Birthday (4).jpg",
  "Birthday (5).jpg",
  "Birthday (6).jpg",
  "Birthday (7).jpg",
  "Birthday (8).jpg",
  "Birthday (9).jpg",
  "Birthday (10).jpg",
  "Birthday (11).jpg",
  "Birthday (12).jpg",
  "Gaye-holud.jpg",
  "Gaye-holud(2).jpg",
  "Gaye-holud(3).jpg",
  "Gaye-holud(4).jpg",
  "Special.jpg",
  "Special (2).jpg",
  "Special (3).jpg",
  "Special (4).jpg",
  "Special (5).jpg",
  "Wedding.jpg",
  "Wedding(2).jpg",
  "Wedding(3).jpg",
] as const;

function tagFor(file: string): GalleryTag {
  if (file.startsWith("Birthday")) return "Happy Birthday";
  if (file.startsWith("Special")) return "Special";
  if (file.startsWith("Wedding")) return "Wedding Special";
  if (file.startsWith("Gaye-holud")) return "Gaye Holud";
  return "Anniversary";
}

export const galleryItems: GalleryItem[] = photos.map((file, i) => {
  const tag = tagFor(file);
  const ratio = i % 2 === 0 ? "tall" : "square";
  return {
    src: `${dir}/${file}`,
    alt: `${tag} cake from Daisy's Cookery`,
    tag,
    ratio,
  };
});

export const galleryTags: readonly GalleryTag[] = categories.map((c) => c.name);