import type { MetadataRoute } from 'next';
import { projectCaseStudies } from '../data/content';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saitejakolan.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const workPages: MetadataRoute.Sitemap = projectCaseStudies.map((project) => ({
    url: `${BASE_URL}/works/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...workPages,
  ];
}
