import type { Metadata } from "next";

import { CakeStudio } from "@/components/studio/cake-studio";

export const metadata: Metadata = {
  title: "Create Your Cake",
  description:
    "Design your own celebration cake in 3D — pick the shape, weight, flavor, cream, fruit topping, a preset theme, and add a message or design image before sending your order request.",
};

export default function CustomizePage() {
  return <CakeStudio />;
}