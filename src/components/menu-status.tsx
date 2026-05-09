type MenuStatusProps = {
  source: "google-sheets" | "starter";
  error?: string;
};

export function MenuStatus({ source, error }: MenuStatusProps) {
  const isStarter = source === "starter";

  return (
    <section className="mx-auto max-w-4xl px-4 pt-3">
      <div className="border border-soma-green/10 bg-white/80 px-3 py-2 text-xs text-slate-600 shadow-soft">
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
