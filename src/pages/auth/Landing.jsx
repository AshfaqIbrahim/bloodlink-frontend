import Navbar from "../../components/common/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import StatsSection from "../../components/landing/StatsSection";
import HowItWorks from "../../components/landing/HowItWorks";
import LiveEmergencyRequests from "../../components/landing/LiveEmergencyRequests";
import FeaturesSection from "../../components/landing/FeaturesSection";
import AboutSection from "../../components/landing/AboutSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import FAQSection from "../../components/landing/FAQSection";
import ContactSection from "../../components/landing/ContactSection";

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <LiveEmergencyRequests />
      <FeaturesSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}

export default Landing;
