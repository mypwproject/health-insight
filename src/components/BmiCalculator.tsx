import { useState } from "react";
import { type Lang, translations, getBmiCategory } from "@/lib/i18n";
import { Moon, Sun, Languages } from "lucide-react";

function BmiGauge({ bmi }: { bmi: number }) {
  const clampedBmi = Math.min(Math.max(bmi, 10), 45);
  const percent = ((clampedBmi - 10) / 35) * 100;

  return (
    <div className="relative mt-4 h-4 w-full overflow-hidden rounded-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.6 0.15 240), oklch(0.65 0.18 145), oklch(0.78 0.15 75), oklch(0.58 0.22 25), oklch(0.45 0.2 25))",
        }}
      />
      <div
        className="absolute top-[-4px] h-6 w-1.5 rounded-full bg-foreground shadow-md transition-all duration-700 ease-out"
        style={{ left: `calc(${percent}% - 3px)` }}
      />
    </div>
  );
}

export default function BmiCalculator() {
  const [lang, setLang] = useState<Lang>("ar");
  const [dark, setDark] = useState(true);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const t = translations[lang];
  const isRtl = lang === "ar";
  const fontFamily = isRtl ? "var(--font-ar)" : "var(--font-en)";

  const toggleTheme = () => {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark");
  };

  const toggleLang = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      setBmi(Math.round((w / ((h / 100) * (h / 100))) * 10) / 10);
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
  };

  const cat = bmi !== null ? getBmiCategory(bmi, lang) : null;

  // Initialize dark mode on first render
  if (typeof document !== "undefined" && !document.documentElement.classList.contains("dark") && dark) {
    document.documentElement.classList.add("dark");
  }

  const scaleItems = [
    { label: t.underweight, range: t.underweightRange, colorClass: "bg-info" },
    { label: t.normal, range: t.normalRange, colorClass: "bg-success" },
    { label: t.overweight, range: t.overweightRange, colorClass: "bg-warning" },
    { label: t.obese, range: t.obeseRange, colorClass: "bg-destructive" },
    { label: t.severelyObese, range: t.severelyObeseRange, colorClass: "bg-destructive/80" },
  ];

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-10"
      dir={isRtl ? "rtl" : "ltr"}
      style={{ fontFamily }}
    >
      <div className="w-full max-w-md">
        {/* Header controls */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-card text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={toggleLang}
            className="flex h-10 items-center gap-2 rounded-xl bg-card px-4 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Languages className="h-4 w-4" />
            {lang === "ar" ? "English" : "عربي"}
          </button>
        </div>

        {/* Main card */}
        <div className="overflow-hidden rounded-2xl bg-card shadow-xl shadow-primary/5">
          {/* Title section */}
          <div className="bg-gradient-to-br from-primary to-primary/80 px-6 py-8 text-center">
            <h1
              className="text-2xl font-bold text-primary-foreground"
              style={{ fontFamily }}
            >
              {t.title}
            </h1>
            <p className="mt-1 text-sm text-primary-foreground/70">{t.subtitle}</p>
          </div>

          {/* Form */}
          <div className="space-y-5 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">
                {t.weight}
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={t.weightPlaceholder}
                className="h-12 w-full rounded-xl border border-input bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                style={{ fontFamily }}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">
                {t.height}
              </label>
              <input
                type="number"
                min="1"
                max="300"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={t.heightPlaceholder}
                className="h-12 w-full rounded-xl border border-input bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                style={{ fontFamily }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={calculate}
                className="flex-1 h-12 rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
              >
                {t.calculate}
              </button>
              <button
                onClick={reset}
                className="h-12 rounded-xl border border-border bg-secondary px-6 font-medium text-secondary-foreground transition-all hover:bg-accent active:scale-[0.98]"
              >
                {t.reset}
              </button>
            </div>

            {/* Result */}
            {bmi !== null && cat && (
              <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 rounded-2xl border border-border bg-muted/50 p-5">
                <p className="mb-1 text-sm font-medium text-muted-foreground">{t.result}</p>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-bold text-primary">{bmi}</span>
                  <span
                    className={`mb-1.5 inline-block rounded-lg px-3 py-1 text-sm font-semibold ${
                      cat.color === "success"
                        ? "bg-success/15 text-success"
                        : cat.color === "warning"
                          ? "bg-warning/15 text-warning-foreground"
                          : cat.color === "info"
                            ? "bg-info/15 text-info"
                            : "bg-destructive/15 text-destructive"
                    }`}
                  >
                    {cat.label}
                  </span>
                </div>
                <BmiGauge bmi={bmi} />
              </div>
            )}

            {/* Scale */}
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.bmiScale}
              </p>
              <div className="space-y-2">
                {scaleItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.colorClass}`} />
                      <span className="text-foreground">{item.label}</span>
                    </div>
                    <span className="font-medium text-muted-foreground">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
