const SectionHeading = ({ title, subtitle, light = false }) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance ${
          light ? "text-white" : "text-[#0f1d35]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base sm:text-lg leading-relaxed ${
            light ? "text-white/70" : "text-gray-500"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="w-8 h-0.5 rounded-full bg-[#c9a84c]/30" />
        <span className="w-12 h-0.5 rounded-full bg-[#c9a84c]" />
        <span className="w-8 h-0.5 rounded-full bg-[#c9a84c]/30" />
      </div>
    </div>
  );
};

export default SectionHeading;
