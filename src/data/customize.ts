import { unsplash, verifiedPhotoIds as P, brandImage } from "@/lib/images";

/**
 * CAKE STUDIO CONFIG
 * ------------------
 * Every selectable option the owner can realistically offer is defined here
 * so the flow can be edited without touching any component. All options are
 * DEMO options — descriptions are samples to be confirmed by the bakery.
 */

export type StudioOption = {
  id: string;
  label: string;
  description?: string;
  image?: string;
  swatch?: string;
  note?: string;
};

export type StudioStepKind = "singleselect" | "message";

export type StudioStep = {
  id: string;
  title: string;
  subtitle: string;
  kind: StudioStepKind;
  /** null when the step is handled specially (message input) */
  options: StudioOption[] | null;
};

export const studioConfig = {
  /**
   * "quote"  → prices are shown as "To be quoted". The estimated price line
   *            asks the bakery for a quote. SAFE default (no fabricated prices).
   * "calculated" → switch to this after real prices are added to priceTable.
   */
  priceMode: "quote" as "quote" | "calculated",

  /** Only used when priceMode === "calculated". Add real prices to enable. */
  priceTable: {
    base: 0,
    perKg: 0,
    flavorPremium: { premium: 0 },
    designPremium: { premium: 0 },
    messageAddOn: 0,
  },

  messageCharLimit: 30,
  uploadMaxMB: 4,

  cakeSizes: [
    { id: "1lb", label: "1 lb", note: "≈ 450 g (slightly under ½ kg)" },
    { id: "2lb", label: "2 lbs", note: "≈ 900 g (about 1 kg)" },
    { id: "3lb", label: "3 lbs", note: "≈ 1.35 kg" },
    { id: "4lb", label: "4 lbs", note: "≈ 1.8 kg (about 2 kg)" },
  ],

  flavors: [
    { id: "chocolate", label: "Chocolate", description: "Rich cocoa sponge" },
    { id: "vanilla", label: "Vanilla", description: "Classic soft vanilla" },
    { id: "red-velvet", label: "Red Velvet", description: "Velvety red sponge" },
    { id: "strawberry", label: "Strawberry", description: "Light fruity note" },
    { id: "pineapple", label: "Pineapple", description: "Tropical sweetness" },
  ],

  creams: [
    { id: "butter-cream", label: "Buttercream", description: "Smooth, classic finish" },
    { id: "chocolate-cream", label: "Chocolate Cream", description: "Deep cocoa cream" },
    { id: "fresh-cream", label: "Fresh Cream", description: "Light & airy" },
    { id: "tiramisu-cream", label: "Tiramisu Cream", description: "Coffee mascarpone note" },
  ],

  fruitFillings: [
    { id: "none", label: "None", description: "No fruit filling" },
    { id: "strawberry", label: "Strawberry", description: "Fresh strawberry" },
    { id: "cherry", label: "Cherry", description: "Sweet cherry" },
    { id: "mixed-fruit", label: "Mixed Fruit", description: "Seasonal fruit mix" },
  ],

  shapes: [
    { id: "round", label: "Round", description: "Classic round cake" },
    { id: "square", label: "Square", description: "Modern square cake" },
    { id: "custom", label: "Custom", description: "Talk to us about custom cuts" },
  ],

  designs: [
    { id: "skip", label: "Keep my own design", description: "No preset — use my selections", image: undefined },
    { id: "D01", label: "Design 01", description: "Classic smooth finish", image: brandImage("design-D013", unsplash(P.chocolateDrip, 640, 640)) },
    { id: "D02", label: "Design 02", description: "Blush & berries", image: brandImage("design-D014", unsplash(P.strawberryCake, 640, 640)) },
    { id: "D03", label: "Design 03", description: "Celebration brights", image: brandImage("design-D015", unsplash(P.birthdayCake, 640, 640)) },
    { id: "D04", label: "Design 04", description: "Elegant tiers", image: brandImage("design-D016", unsplash(P.weddingTower, 640, 640)) },
    { id: "D05", label: "Design 05", description: "Chocolate indulgence", image: brandImage("design-D017", unsplash(P.chocolateStack, 640, 640)) },
    { id: "D06", label: "Design 06", description: "Fresh fruit top", image: brandImage("design-D018", unsplash(P.berryCake, 640, 640)) },
    { id: "D07", label: "Design 07", description: "Soft romantic white", image: brandImage("design-D019", unsplash(P.weddingRomantic, 640, 640)) },
    { id: "D08", label: "Design 08", description: "Party ready", image: brandImage("design-D020", unsplash(P.cupcake, 640, 640)) },
  ],

  messageStyles: [
    { id: "chocolate", label: "Chocolate", swatch: "#4a3324" },
    { id: "white", label: "White", swatch: "#ffffff" },
    { id: "red", label: "Red", swatch: "#c0392b" },
    { id: "pink", label: "Pink", swatch: "#e78ab3" },
    { id: "black", label: "Black", swatch: "#1f2937" },
  ],

  steps: [
    {
      id: "shape",
      title: "Choose the cake shape",
      subtitle: "Round, square — or let us surprise you.",
      kind: "singleselect",
      options: null,
    },
    {
      id: "size",
      title: "Choose your cake weight",
      subtitle: "Bigger weight = bigger cake. Scales live in 3D.",
      kind: "singleselect",
      options: null,
    },
    {
      id: "flavor",
      title: "Choose your flavor",
      subtitle: "The sponge every layer is made from.",
      kind: "singleselect",
      options: null,
    },
    {
      id: "cream",
      title: "Choose your cream & filling",
      subtitle: "The cream between and around the layers.",
      kind: "singleselect",
      options: null,
    },
    {
      id: "fruitFilling",
      title: "Add a fruit filling",
      subtitle: "Optional — keep it plain or add sweetness on top.",
      kind: "singleselect",
      options: null,
    },
    {
      id: "design",
      title: "Choose a preset theme (optional)",
      subtitle: "Pick a ready-made look, or skip to keep your custom design.",
      kind: "singleselect",
      options: null,
    },
    {
      id: "message",
      title: "Personalize your cake",
      subtitle: "Add a message, pick its color and upload a design image.",
      kind: "message",
      options: null,
    },
  ],
} as const;

export type StudioSelection = {
  size?: string;
  flavor?: string;
  cream?: string;
  fruitFilling?: string;
  shape?: string;
  design?: string;
  message: string;
  messageStyle: string;
  referenceImage: { dataUrl: string; name: string } | null;
  name: string;
  phone: string;
  preferredDate: string;
  notes: string;
};

export function stepOptions(stepId: string): readonly StudioOption[] {
  switch (stepId) {
    case "size":
      return studioConfig.cakeSizes;
    case "flavor":
      return studioConfig.flavors;
    case "cream":
      return studioConfig.creams;
    case "fruitFilling":
      return studioConfig.fruitFillings;
    case "shape":
      return studioConfig.shapes;
    case "design":
      return studioConfig.designs;
    default:
      return [];
  }
}

export function optionLabel(stepId: string, optionId?: string) {
  if (!optionId) return "";
  return stepOptions(stepId).find((o) => o.id === optionId)?.label ?? "";
}