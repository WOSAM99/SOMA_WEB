type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="mb-6 max-w-xl sm:mb-8">
      <p className="mb-2 inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-soma-leaf">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl font-bold leading-tight text-soma-leaf sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}
