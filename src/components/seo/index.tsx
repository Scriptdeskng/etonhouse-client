import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.etonhouseng.com").replace(/\/$/, "");
const SITE_NAME = "Eton House";
const DEFAULT_TITLE = "Eton House | Timeless Furniture for Modern Living";
const DEFAULT_DESCRIPTION =
  "Discover timeless furniture, curated home accessories, furniture packages and gift registries from Eton House Nigeria.";
const DEFAULT_IMAGE = `${SITE_URL}/assets/webp/logo-black.webp`;
const PRIVATE_PATH_PREFIXES = [
  "/account",
  "/cart",
  "/checkout",
  "/confirmation",
  "/profile",
  "/registry/checkout",
  "/registry/payment-success",
];

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  noIndex?: boolean;
}

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  image = DEFAULT_IMAGE,
  noIndex = false,
}: SEOProps) => {
  const router = useRouter();
  const path = canonicalPath || router.asPath.split("?")[0] || "/";
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const shouldNoIndex = noIndex || PRIVATE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    email: "customer@etonhouseng.com",
    telephone: "+2348090397777",
    address: {
      "@type": "PostalAddress",
      streetAddress: "59A Mainland Way, Dolphin Estate",
      addressLocality: "Ikoyi, Lagos",
      addressCountry: "NG",
    },
    sameAs: [
      "https://www.linkedin.com/company/etonhouse-nigeria/",
      "https://instagram.com/etonhouse",
      "https://www.facebook.com/EtonhouseNG",
    ],
  };

  return (
    <Head>
      <title key="title">{pageTitle}</title>
      <meta key="description" name="description" content={description} />
      <meta key="robots" name="robots" content={shouldNoIndex ? "noindex, nofollow" : "index, follow"} />
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={pageTitle} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      <meta key="og:image" property="og:image" content={imageUrl} />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={pageTitle} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={imageUrl} />
      <meta key="theme-color" name="theme-color" content="#141414" />
      <script
        key="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </Head>
  );
};

export default SEO;
