interface RouteMarqueeProps {
  routes: string[];
}

export function RouteMarquee({ routes }: RouteMarqueeProps) {
  const items = [...routes, ...routes];
  return (
    <div
      className="relative overflow-hidden border-y border-boarding-paper/10 py-4"
      role="marquee"
      aria-label="Routes we serve"
    >
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {items.map((route, i) => (
          <span
            key={`${route}-${i}`}
            aria-hidden={i >= routes.length}
            className="font-mono text-xs uppercase tracking-widest text-boarding-paper/50"
          >
            {route}
          </span>
        ))}
      </div>
    </div>
  );
}
