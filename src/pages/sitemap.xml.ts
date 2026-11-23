import type { GetServerSideProps } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.etonhouseng.com").replace(/\/$/, "");

const publicPaths = ["/", "/about", "/shop", "/packages", "/terms-and-conditions"];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls = publicPaths
    .map((path) => `  <url><loc>${SITE_URL}${path === "/" ? "" : path}</loc><changefreq>weekly</changefreq></url>`)
    .join("\n");

  res.setHeader("Content-Type", "application/xml");
  res.write(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
  res.end();
  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
