import React from "react";
import VariantCard from "./VariantCard";

const StackSection = ({ title, data }) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.values(data).map((variant, index) => (
          <VariantCard key={index} variant={variant} />
        ))}
      </div>
    </section>
  );
};

export default StackSection;
