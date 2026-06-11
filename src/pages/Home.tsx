import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSection from '../components/TestimonialsSection';

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Helmet>
        <title>DHAYATRADERS | Premium Construction & Land Sales Kerala</title>
        <meta name="description" content="DHAYATRADERS delivers luxury house construction, certified land sales, ready-made homes, TMT steel and premium building materials across Kerala. 15+ landmark estates completed." />
        <meta name="keywords" content="construction company Kerala, land sales Kerala, TMT steel supply, building materials Kerala, luxury villas, house construction, Dhaya Traders" />
        <meta property="og:title" content="DHAYATRADERS – Building Prosperity, Trusted Global Trading" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dhayatraders.com/" />
      </Helmet>

      <Hero 
        onExploreProperties={() => navigate('/properties')}
        onGetMaterialsQuote={() => navigate('/materials')}
        onBookSiteVisit={() => navigate('/contact')}
      />
      <AboutSection />
      <WhyChooseUs />
      <TestimonialsSection />
    </PageTransition>
  );
}
