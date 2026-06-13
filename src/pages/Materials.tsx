import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import MaterialsSection from '../components/MaterialsSection';

export default function Materials() {
  return (
    <PageTransition>
      <Helmet>
        <title>TMT Steel, Bricks, River Sand & Cement | DHAYATRADERS</title>
        <meta name="description" content="Direct-sourced Fe-550D TMT steel, Grade-A red clay bricks, triple-washed river sand, and OPC 53 cement. Bulk supply across Tamil Nadu with verified quality standards." />
        <link rel="canonical" href="https://dhayatraders.com/materials" />
      </Helmet>

      <MaterialsSection />
    </PageTransition>
  );
}
