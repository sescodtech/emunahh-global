/**
 * Two soft blurred cloud shapes that drift very slowly once (40s,
 * non-repeating) to reinforce "international travel" without being
 * distracting. Pure CSS, no JS — cheap enough to always render.
 */
export function CloudLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden" aria-hidden>
      <div className="absolute -left-10 top-[12%] h-40 w-72 animate-cloud-drift rounded-full bg-boarding-paper/10 blur-3xl" />
      <div
        className="absolute right-[-4rem] top-[38%] h-32 w-96 animate-cloud-drift rounded-full bg-boarding-paper/[0.07] blur-3xl [animation-duration:55s]"
      />
    </div>
  );
}
