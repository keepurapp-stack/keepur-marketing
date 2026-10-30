/** Editorial section heading: mono index + label rule, display title with optional serif accent. */
export default function SectionHeading({ index, eyebrow, title, accent, subtitle, id, tone = "light", action }: {
  index?: string; eyebrow: string; title: string; accent?: string; subtitle?: string; id?: string;
  tone?: "light" | "dark"; action?: React.ReactNode;
}) {
  const dark = tone === "dark";
  // Without an explicit accent, set the last two words in the serif accent style.
  if (accent === undefined) {
    const words = title.split(" ");
    if (words.length > 3) {
      accent = words.slice(-2).join(" ");
      title = words.slice(0, -2).join(" ");
    }
  }
  return (
    <div>
      <div className={`flex items-center justify-between gap-4 border-b pb-4 ${dark ? "border-white/15" : "border-foreground/15"}`}>
        <span className={`mono-label ${dark ? "text-white/60" : "text-muted"}`}>
          {index && <span className={dark ? "text-marigold" : "text-primary"}>{index}</span>}
          {index && " · "}
          {eyebrow}
        </span>
        {action}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <h2 id={id} className={`text-4xl font-extrabold leading-[1.05] sm:text-5xl ${dark ? "text-white" : "text-foreground"}`}>
          {title}
          {accent && <>{" "}<span className={`accent-serif ${dark ? "text-primary-soft" : "text-primary"}`}>{accent}</span></>}
        </h2>
        {subtitle && <p className={`max-w-md text-base leading-7 lg:justify-self-end ${dark ? "text-white/70" : "text-muted"}`}>{subtitle}</p>}
      </div>
    </div>
  );
}
