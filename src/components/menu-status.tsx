type MenuStatusProps = {
  source: "google-sheets" | "starter";
  error?: string;
};

export function MenuStatus({ source, error }: MenuStatusProps) {
  const isStarter = source === "starter";

  return (
    <section className="section-shell pt-8">
      <div className="rounded-[1.5rem] border border-soma-green/10 bg-white/80 px-4 py-4 text-sm text-slate-600 shadow-soft">
        <p className="font-semibold text-soma-leaf">
          {isStarter ? "Starter menu is active" : "Google Sheets is connected"}
        </p>
        <p className="mt-1 leading-6">
          {error
            ? error
            : "Menu updates refresh automatically after changes in Google Sheets."}
        </p>
      </div>
    </section>
  );
}
