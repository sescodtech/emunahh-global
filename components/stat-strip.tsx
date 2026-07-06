interface Stat {
  label: string;
  value: string;
}

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-boarding-paper/10 sm:grid-cols-4"
      aria-label="Company statistics"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="bg-ink-navy p-4 sm:p-6">
          <dt className="font-mono text-xs uppercase tracking-wide text-stamp-gold">
            {stat.label}
          </dt>
          <dd className="mt-1 font-display text-2xl sm:text-3xl italic text-boarding-paper">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
