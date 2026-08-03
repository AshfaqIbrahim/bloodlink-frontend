import { useState } from "react";
import { Building, Droplet, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Reusable Button component
const Button = ({ children, variant = "primary", className, ...props }) => {
  const base =
    "w-full h-[52px] rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-[#7A2F2F] text-white hover:bg-[#631f1f] shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary:
      "bg-white text-[#1C2321] border border-[#8C8579]/30 hover:border-[#8C8579]/60 hover:bg-[#F6F3EC]/50 active:scale-[0.98]",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

function AccountSelectionPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const cards = [
    {
      id: "donor",
      title: "Recipient / Donor",
      icon: (
        <div className="w-14 h-14 bg-[#7A2F2F]/10 rounded-2xl flex items-center justify-center text-[#7A2F2F]">
          <Droplet className="w-7 h-7" />
          <Heart className="w-4 h-4 -ml-1 text-[#C23B22]" />
        </div>
      ),
      desc: "Register as a community member. Request blood during emergencies or volunteer as a donor whenever you're available.",
    },
    {
      id: "hospital",
      title: "Hospital",
      icon: (
        <div className="w-14 h-14 bg-[#3F6B5C]/10 rounded-2xl flex items-center justify-center text-[#3F6B5C]">
          <Building className="w-8 h-8" />
        </div>
      ),
      desc: "Register your hospital to create emergency blood requests and manage donations.",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F6F3EC] animate-fadeIn relative">
      {/* Page Label */}
      <div className="absolute top-6 left-6 bg-[#7A2F2F]/10 text-[#7A2F2F] px-4 py-1.5 rounded-full text-sm font-medium border border-[#7A2F2F]/20">
        Account Selection Page
      </div>

      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-[#7A2F2F] rounded-full" />
            </div>
          </div>
          <h1 className="font-poppins font-bold text-4xl text-[#1C2321]">
            Choose Your Account Type
          </h1>
          <p className="text-[#8C8579] text-lg mt-1">
            Select how you would like to use BloodLink.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                setSelected(card.id);

                setTimeout(() => {
                  if (card.id === "donor") {
                    navigate("/register");
                  } else {
                    navigate("/hospital-register");
                  }
                }, 150);
              }}
              className={`bg-[#FCFBF8] rounded-2xl p-8 shadow-lg shadow-[#1C2321]/5 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl flex flex-col ${
                selected === card.id
                  ? "ring-2 ring-[#7A2F2F] ring-offset-2 ring-offset-[#F6F3EC] shadow-[#7A2F2F]/10"
                  : ""
              }`}
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className="mb-4">{card.icon}</div>

                <h3 className="font-poppins font-semibold text-xl text-[#1C2321] mb-2">
                  {card.title}
                </h3>

                <p className="text-[#8C8579] text-sm leading-relaxed mb-6 flex-1">
                  {card.desc}
                </p>

                <Button
                  className="max-w-[180px] text-sm mt-auto"
                  variant={selected === card.id ? "primary" : "secondary"}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (card.id === "donor") {
                      navigate("/register");
                    } else {
                      navigate("/hospital-register");
                    }
                  }}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountSelectionPage;
