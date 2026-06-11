import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import ServicesSection from '../components/ServicesSection';

export default function Services() {
  return (
    <PageTransition>
      <Helmet>
        <title>Construction & Real Estate Services | DHAYATRADERS</title>
        <meta name="description" content="Explore DHAYATRADERS' 8 core services: house construction, land sales, ready-made homes, materials supply, bricks, river sand, TMT steel, and consultation." />
        <link rel="canonical" href="https://dhayatraders.com/services" />
      </Helmet>

      <ServicesSection />
    </PageTransition>
  );
}
