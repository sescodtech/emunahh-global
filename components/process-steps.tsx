import { Reveal } from "@/components/reveal";

interface Step {
  step: number;
  title: string;
  description: string;
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal key={s.step} delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
          <li className="border-t-2 border-ink-navy/10 pt-5">
            <span className="font-sans font-extrabold tracking-tight text-4xl text-stamp-gold">
              {String(s.step).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-body text-lg font-medium text-ink-navy">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{s.description}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
