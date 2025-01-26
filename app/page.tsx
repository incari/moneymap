"use client";
import LoanVsInvestmentCalculator from "./components/loan-vs-investment-calculator";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Home() {
  return (
    <LanguageProvider>
      <main className="container mx-auto py-10 px-4">
        <Header />
        <LoanVsInvestmentCalculator />
      </main>
    </LanguageProvider>
  );
}
const Header = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold font-mono">Money Map</h1>

        <Select
          value={language}
          onValueChange={(value: "en" | "es") => setLanguage(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="pb-4"> {t("subtitle")}</p>
    </div>
  );
};
