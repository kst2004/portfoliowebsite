import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectCaseStudy from '../../../components/ProjectCaseStudy';
import { getProjectCaseStudy, projectCaseStudies } from '../../../data/content';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectCaseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  const title = `${project.title} — ${project.category}`;
  const description = project.overview.slice(0, 155);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: project.heroImage,
          alt: `${project.title} — ${project.category}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
