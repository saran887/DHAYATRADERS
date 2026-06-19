import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import ServicesSection from '../components/ServicesSection';

export default function Services() {
  return (
    <PageTransition>
      <Helmet>
        <title>Construction & Real Estate Services | DHAYATRADERS</title>
        <meta name="description" content="Explore DHAYATRADERS' 8 core services: house construction, land sales, ready-made homes, materials supply, bricks, river sand, TMT steel, and consultation." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Construction & Real Estate Services | DHAYATRADERS" />
        <meta name="twitter:image" content="https://dhayatraders.com/assets/og-image.webp" />
        <link rel="canonical" href="https://dhayatraders.com/services" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "House Construction",
            "description": "Premium construction services in Tamil Nadu including masonry, architectural design, concrete layout, and turn-key home builds.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "DHAYATRADERS"
            }
          })}
        </script>
      </Helmet>

      <ServicesSection />
    </PageTransition>
  );
}
