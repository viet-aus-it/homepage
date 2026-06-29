/**
 * Dark centred hero for the community page.
 */
function CommunityHero() {
  return (
    <section className="relative overflow-hidden bg-brand-near-black px-5 py-20 md:px-12 md:py-[84px]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.045)_1px,transparent_1.5px)] bg-size-[24px_24px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[900px] text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-yellow">Who we are</p>
        <h1 className="font-display text-[clamp(2.5rem,8vw,3.75rem)] font-extrabold leading-none tracking-[-0.03em] text-white">It started as a group chat.</h1>
        <p className="mx-auto mt-5 max-w-[640px] text-[19px] leading-relaxed text-brand-on-dark-muted">
          A handful of Vietnamese-Australian devs swapping job tips and memes. Eight years on, it&apos;s 1,448 people across every state, and as of 2025 a
          proper not-for-profit. Same energy, bigger table.
        </p>
      </div>
    </section>
  );
}

export default CommunityHero;
