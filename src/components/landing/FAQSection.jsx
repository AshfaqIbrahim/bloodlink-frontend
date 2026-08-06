import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../data/faq";

const FAQSection = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#FCFBF8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#7A2F2F] bg-[#7A2F2F]/10 px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#1C2321] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#8C8579]">
            Everything you need to know about BloodLink
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#F6F3EC] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#F6F3EC]/50 transition-colors"
                onClick={() => toggleFAQ(idx)}
              >
                <span className="font-medium text-[#1C2321]">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#8C8579] transition-transform duration-300 ${activeFAQ === idx ? "rotate-180" : ""}`}
                />
              </button>
              {activeFAQ === idx && (
                <div className="px-6 pb-4 text-[#5a554a] text-sm leading-relaxed animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
