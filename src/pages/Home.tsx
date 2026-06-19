import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSection from '../components/TestimonialsSection';

export default function Home({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Helmet>
        <title>DHAYATRADERS | Premium Construction & Land Sales Tamil Nadu</title>
        <meta name="description" content="DHAYATRADERS delivers luxury house construction, certified land sales, ready-made homes, TMT steel and premium building materials across Tamil Nadu. 15+ landmark estates completed." />
        <meta name="keywords" content="construction company Tamil Nadu, land sales Tamil Nadu, TMT steel supply, building materials Tamil Nadu, luxury villas, house construction, Dhaya Traders" />
        <meta property="og:title" content="DHAYATRADERS – Building Prosperity, Trusted Global Trading" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DHAYATRADERS | Premium Construction & Land Sales Tamil Nadu" />
        <meta name="twitter:image" content="https://dhayatraders.com/assets/og-image.webp" />
        <link rel="canonical" href="https://dhayatraders.com/" />
      </Helmet>

      <Hero 
        onExploreProperties={() => navigate('/properties')}
        onGetMaterialsQuote={() => navigate('/materials')}
        onBookConsultation={onOpenConsultation}
      />
      <AboutSection />
      <WhyChooseUs />
      <TestimonialsSection />
    </PageTransition>
  );
}
