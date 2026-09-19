import type { Metadata } from "next";

export const SITE_URL = "https://nabulab.org";

const SOCIAL_IMAGE = {
  url: "/branding/Logo-principal.png",
  width: 1024,
  height: 1024,
  alt: "NabuLab",
};

type PublicMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  absoluteTitle?: boolean;
};

export function createPublicMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PublicMetadataOptions): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "NabuLab",
      url: path,
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export function createPrivateMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}
