import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import ServicesSection from '../components/ServicesSection';
import SecuritySection from '../components/SecuritySection';
import RatesSection from '../components/RatesSection';
import CarWashSection from '../components/CarWashSection';
import LocationSection from '../components/LocationSection';
import ReviewsSection from '../components/ReviewsSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <main id="top">
      <Navbar />

      <Hero />

      <IntroSection />

      <ServicesSection />

      <SecuritySection />

      <RatesSection />

      <CarWashSection />

      <LocationSection />

      <ReviewsSection />

      <ContactSection />
    </main>
  );
}