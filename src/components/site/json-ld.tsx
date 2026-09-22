import { site } from "@/data/site";

type JsonLdProps = {
  data: object;
};

/** Server-rendered JSON-LD: ships directly in the HTML for crawlers. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}