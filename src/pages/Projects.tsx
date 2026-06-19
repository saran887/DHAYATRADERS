import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import ProjectsSection from '../components/ProjectsSection';
import GallerySection from '../components/GallerySection';

export default function Projects() {
  return (
    <PageTransition>
      <Helmet>
        <title>Completed Projects & Portfolio | DHAYATRADERS</title>
        <meta name="description" content="Witness DHAYATRADERS' completed landmark estates: luxury villa complexes, commercial hubs, and architectural transformations across Tamil Nadu." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Completed Projects & Portfolio | DHAYATRADERS" />
        <meta name="twitter:image" content="https://dhayatraders.com/assets/og-image.webp" />
        <link rel="canonical" href="https://dhayatraders.com/projects" />
      </Helmet>

      <ProjectsSection />
      <GallerySection />
    </PageTransition>
  );
}
