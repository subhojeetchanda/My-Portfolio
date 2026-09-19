import { MetadataRoute } from 'next';
import { profile } from '@/content/profile';

export default function sitemap(): MetadataRoute.Sitemap {
  // Placeholder domain for now, will be updated during launch checklist
  const baseUrl = 'https://forged.dev';

  const projects = profile.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug || project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/standard`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...projects,
  ];
}
