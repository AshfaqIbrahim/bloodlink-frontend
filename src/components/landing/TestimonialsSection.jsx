import React from "react";
import { Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";

const TestimonialCard = ({ name, role, content, image, rating }) => (
  <div className="bg-[#FCFBF8] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#8C8579]/5">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-[#7A2F2F]/10 flex items-center justify-center flex-shrink-0">
        <span className="font-poppins font-semibold text-[#7A2F2F] text-sm">
          {image}
        </span>
      </div>
      <div>
        <h4 className="font-semibold text-[#1C2321] text-sm">{name}</h4>
        <p className="text-xs text-[#8C8579]">{role}</p>
      </div>
    </div>
    <div className="flex gap-0.5 mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#7A2F2F] text-[#7A2F2F]" />
      ))}
    </div>
    <p className="text-sm text-[#1C2321]/80 leading-relaxed">"{content}"</p>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#7A2F2F] bg-[#7A2F2F]/10 px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#1C2321] mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-[#8C8579] max-w-2xl mx-auto">
            Real stories from our community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
