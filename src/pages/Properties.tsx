import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import PropertyShowcase from '../components/PropertyShowcase';

export default function Properties({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  return (
    <PageTransition>
      <Helmet>
        <title>Land & Property Listings Tamil Nadu | DHAYATRADERS</title>
        <meta name="description" content="Browse DHAYATRADERS' elite portfolio: luxury villas, gated land plots, ready-made duplex homes, and commercial hubs. Double-audited titles, instant registry." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Land & Property Listings Tamil Nadu | DHAYATRADERS" />
        <meta name="twitter:image" content="https://dhayatraders.com/assets/og-image.webp" />
        <link rel="canonical" href="https://dhayatraders.com/properties" />
      </Helmet>

      <PropertyShowcase onOpenConsultation={onOpenConsultation} />
    </PageTransition>
  );
}
