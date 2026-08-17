import React from "react";
import { Heart, Search } from "lucide-react";

const RoleSelector = ({ role, setRole }) => {
  return (
    <section className="w-full bg-[#F6F3EC] px-4 md:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FCFBF8] rounded-2xl p-2 border border-[#8C8579]/10 shadow-sm flex gap-2">
          {/* Donor */}
          <button
            onClick={() => setRole("donor")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
              role === "donor"
                ? "bg-[#7A2F2F] text-white shadow-sm"
                : "text-[#5a554a] hover:bg-[#F6F3EC]"
            }`}
          >
            <Heart className="w-4 h-4" />
            Donor
          </button>

          {/* Recipient */}
          <button
            onClick={() => setRole("recipient")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
              role === "recipient"
                ? "bg-[#7A2F2F] text-white shadow-sm"
                : "text-[#5a554a] hover:bg-[#F6F3EC]"
            }`}
          >
            <Search className="w-4 h-4" />
            Recipient
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoleSelector;
