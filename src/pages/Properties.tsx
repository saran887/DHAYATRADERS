import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import PropertyShowcase from '../components/PropertyShowcase';

export default function Properties() {
  return (
    <PageTransition>
      <Helmet>
        <title>Land & Property Listings Kerala | DHAYATRADERS</title>
        <meta name="description" content="Browse DHAYATRADERS' elite portfolio: luxury villas, gated land plots, ready-made duplex homes, and commercial hubs. Double-audited titles, instant registry." />
        <link rel="canonical" href="https://dhayatraders.com/properties" />
      </Helmet>

      <PropertyShowcase />
    </PageTransition>
  );
}
