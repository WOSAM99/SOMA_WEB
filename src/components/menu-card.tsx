import { categoryMeta } from "@/config/site";
import { formatCurrency } from "@/lib/menu";
import type { MenuItem } from "@/lib/types";

type MenuCardProps = {
  item: MenuItem;
};

export function MenuCard({ item }: MenuCardProps) {
  return (
    <article className="card-surface group rounded-[1.75rem] border border-white/70 p-5 shadow-soft transition duration-200 hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-soma-green/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-soma-leaf">
            {categoryMeta[item.category].chip}
          </div>
          <h3 className="font-heading text-2xl font-bold leading-tight text-slate-900">
            {item.name}
          </h3>
        </div>
        <div className="rounded-full bg-soma-mint px-3 py-2 text-xs font-semibold text-soma-leaf">
          Available
        </div>
      </div>

      <div className="space-y-4 text-sm leading-6 text-slate-600">
        {item.ingredients ? (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-soma-green">
              Ingredients
            </p>
            <p>{item.ingredients}</p>
          </div>
        ) : null}

        {item.benefits ? (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-soma-green">
              Benefits
            </p>
            <p>{item.benefits}</p>
          </div>
        ) : null}

        {item.description ? (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-soma-green">
              Notes
            </p>
            <p>{item.description}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">Made fresh for today</p>
        <p className="font-heading text-3xl font-bold text-soma-leaf">
          {formatCurrency(item.price)}
        </p>
      </div>
    </article>
  );
}
