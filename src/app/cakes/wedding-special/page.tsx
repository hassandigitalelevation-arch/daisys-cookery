import { redirect } from "next/navigation";

export default function WeddingSpecialRedirect() {
  redirect("/cakes?cat=wedding-special");
}