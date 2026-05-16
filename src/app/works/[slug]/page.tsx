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

  return {
    title: `${project.title} | Saiteja Kolan`,
    description: project.overview,
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