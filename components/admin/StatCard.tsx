type StatCardProps = {
  label: string;
  value: string;
  trend?: string;
};

export default function StatCard({ label, value, trend }: StatCardProps) {
  const isPositive = trend?.includes("+");

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      {/* Subtle background decoration */}
      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#f1e9ff] opacity-20 transition-transform group-hover:scale-150" />

      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08fd9]">
        {label}
      </p>
      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-lg ${
              isPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-pink-50 text-[#c3003a]"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
