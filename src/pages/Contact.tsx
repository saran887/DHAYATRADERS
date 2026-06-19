import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import ContactSection from '../components/ContactSection';

export default function Contact() {
  return (
    <PageTransition>
      <Helmet>
        <title>Enquiry | DHAYATRADERS</title>
        <meta name="description" content="Submit your enquiry to DHAYATRADERS' master builders and material traders. Let's discuss your building construction, land sales, or premium materials requirement." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Enquiry | DHAYATRADERS" />
        <meta name="twitter:image" content="https://dhayatraders.com/assets/og-image.webp" />
        <link rel="canonical" href="https://dhayatraders.com/contact" />
      </Helmet>

      <ContactSection />
    </PageTransition>
  );
}
