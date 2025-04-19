import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    /* FIXME: Get base url from env */
    sitemap: `${"https://devplot.com"}/sitemap.xml`,
  };
}
