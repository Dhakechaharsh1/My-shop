import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { STORE } from "@/lib/store-config";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${STORE.siteUrl}/sitemap.xml` };
}
