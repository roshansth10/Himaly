import { Helmet } from 'react-helmet-async';

/** Canonical origin. Change this if the domain ever moves. */
const BASE_URL = 'https://himaly.vercel.app';

export interface SEOProps {
  title: string;
  description: string;
  /** Route path, e.g. `/destinations` or `/destination/kathmandu`. */
  canonicalPath: string;
  /** Absolute URL or a path under /img. */
  ogImage?: string;
  ogType?: 'website' | 'article';
}

function absoluteUrl(value: string): string {
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `${BASE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

/**
 * Per-page document metadata. Every page renders one of these so the title,
 * description, canonical and social tags change with the route instead of
 * staying whatever is hard-coded in index.html.
 */
export function SEO({ title, description, canonicalPath, ogImage = '/img/hero.jpeg', ogType = 'website' }: SEOProps) {
  const canonical = absoluteUrl(canonicalPath);
  const image = absoluteUrl(ogImage);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content="Himaly" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
