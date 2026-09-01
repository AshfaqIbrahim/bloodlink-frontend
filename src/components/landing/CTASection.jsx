import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import Button from "../common/Button";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#7A2F2F] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#7A2F2F]/0 to-white/5" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#631f1f]/30 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white/90 mb-6">
          <Heart className="w-4 h-4" />
          Join the Movement
        </div>

        <h2 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
          Become Part of BloodLink Today.
        </h2>

        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Join thousands of people helping save lives through intelligent blood
          donation.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/register")}
            className="bg-white text-[#7A2F2F] hover:bg-white/90 shadow-lg shadow-[#1C2321]/20"
          >
            Register Now <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
