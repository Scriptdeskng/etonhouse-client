import type { GetServerSideProps } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.etonhouseng.com").replace(/\/$/, "");

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *\nAllow: /\nDisallow: /account\nDisallow: /cart\nDisallow: /checkout\nDisallow: /confirmation\nDisallow: /profile\nDisallow: /registry/checkout\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  res.end();
  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}
