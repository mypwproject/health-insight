export type Lang = "ar" | "en";

export const translations = {
  ar: {
    title: "حاسبة مؤشر كتلة الجسم",
    subtitle: "اكتشف مؤشر كتلة جسمك بسهولة",
    weight: "الوزن (كجم)",
    height: "الطول (سم)",
    calculate: "احسب",
    reset: "إعادة تعيين",
    result: "النتيجة",
    bmiValue: "مؤشر كتلة الجسم",
    category: "التصنيف",
    underweight: "نقص في الوزن",
    normal: "وزن طبيعي",
    overweight: "زيادة في الوزن",
    obese: "سمنة",
    severelyObese: "سمنة مفرطة",
    weightPlaceholder: "أدخل وزنك",
    heightPlaceholder: "أدخل طولك",
    bmiScale: "مقياس مؤشر كتلة الجسم",
    underweightRange: "أقل من 18.5",
    normalRange: "18.5 - 24.9",
    overweightRange: "25 - 29.9",
    obeseRange: "30 - 34.9",
    severelyObeseRange: "35 فأكثر",
  },
  en: {
    title: "BMI Calculator",
    subtitle: "Discover your Body Mass Index easily",
    weight: "Weight (kg)",
    height: "Height (cm)",
    calculate: "Calculate",
    reset: "Reset",
    result: "Result",
    bmiValue: "BMI",
    category: "Category",
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obese: "Obese",
    severelyObese: "Severely Obese",
    weightPlaceholder: "Enter your weight",
    heightPlaceholder: "Enter your height",
    bmiScale: "BMI Scale",
    underweightRange: "Below 18.5",
    normalRange: "18.5 - 24.9",
    overweightRange: "25 - 29.9",
    obeseRange: "30 - 34.9",
    severelyObeseRange: "35 or above",
  },
} as const;

export function getBmiCategory(bmi: number, lang: Lang) {
  const t = translations[lang];
  if (bmi < 18.5) return { label: t.underweight, color: "info" as const };
  if (bmi < 25) return { label: t.normal, color: "success" as const };
  if (bmi < 30) return { label: t.overweight, color: "warning" as const };
  if (bmi < 35) return { label: t.obese, color: "destructive" as const };
  return { label: t.severelyObese, color: "destructive" as const };
}
