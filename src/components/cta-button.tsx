import Link from "next/link";

type CtaButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function CtaButton({
  href,
  label,
  variant = "primary"
}: CtaButtonProps) {
  const isExternal = href.startsWith("http");
  const variantClasses = {
    primary:
      "bg-soma-green text-white shadow-soft hover:bg-soma-leaf focus-visible:outline-soma-green",
    secondary:
      "bg-white/80 text-soma-green ring-1 ring-soma-green/15 hover:bg-white focus-visible:outline-soma-green",
    ghost:
      "bg-transparent text-soma-green ring-1 ring-soma-green/15 hover:bg-soma-green/5 focus-visible:outline-soma-green"
  };

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClasses[variant]}`}
    >
      {label}
    </Link>
  );
}
