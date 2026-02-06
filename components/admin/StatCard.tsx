type StatCardProps = {
  label: string;
  value: string;
  trend?: string;
};

export default function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow transition hover:shadow-lg">
      <p className="text-xs uppercase tracking-[0.2em] text-[#b08fd9]">
        {label}
      </p>
      <div className="mt-3 flex items-baseline gap-3">
        <h3 className="text-3xl font-semibold">{value}</h3>
        {trend && <span className="text-sm text-[#fb397d]">{trend}</span>}
      </div>
    </div>
  );
}
