import Navbar from "../../components/common/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import StatsSection from "../../components/landing/StatsSection";
import HowItWorks from "../../components/landing/HowItWorks";
import LiveEmergencyRequests from "../../components/landing/LiveEmergencyRequests";
import FeaturesSection from "../../components/landing/FeaturesSection";

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <LiveEmergencyRequests />
      <FeaturesSection />
    </>
  );
}

export default Landing;
