import { JsonLd } from "@/components/site/json-ld";
import { site } from "@/data/site";

export function BakeryJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Bakery",
        name: site.name,
        description: site.description,
        url: site.url,
        image: `${site.url}${site.logo.src}`,
        sameAs: [site.social.facebook],
      }}
    />
  );
}