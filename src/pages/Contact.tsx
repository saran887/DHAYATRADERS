import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import ContactSection from '../components/ContactSection';

export default function Contact() {
  return (
    <PageTransition>
      <Helmet>
        <title>Book a Consultation | DHAYATRADERS</title>
        <meta name="description" content="Connect with DHAYATRADERS' master builders and material traders. Submit your project docket for immediate consultation and feasibility assessment." />
        <link rel="canonical" href="https://dhayatraders.com/contact" />
      </Helmet>

      <ContactSection />
    </PageTransition>
  );
}
