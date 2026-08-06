import Navbar from "../../components/common/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import StatsSection from "../../components/landing/StatsSection";
import HowItWorks from "../../components/landing/HowItWorks";

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorks />
    </>
  );
}

export default Landing;
