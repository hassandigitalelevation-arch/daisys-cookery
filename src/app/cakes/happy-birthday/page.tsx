import { redirect } from "next/navigation";

export default function HappyBirthdayRedirect() {
  redirect("/cakes?cat=happy-birthday");
}