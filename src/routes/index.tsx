import { createFileRoute } from "@tanstack/react-router";
import BmiCalculator from "@/components/BmiCalculator";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "حاسبة مؤشر كتلة الجسم | BMI Calculator" },
      { name: "description", content: "احسب مؤشر كتلة جسمك بسهولة - حاسبة BMI بالعربية والإنجليزية" },
    ],
  }),
});

function Index() {
  return <BmiCalculator />;
}
