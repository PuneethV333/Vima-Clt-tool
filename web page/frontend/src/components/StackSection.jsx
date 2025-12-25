import React from "react";
import VariantCard from "./VariantCard";

const StackSection = ({ title, data }) => {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">{title}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.values(data).map((variant, index) => (
          <VariantCard key={index} variant={variant} />
        ))}
      </div>
    </section>
  );
};

export default StackSection;
