"use client";
import LoanVsInvestmentCalculator from "./components/loan-vs-investment-calculator";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="container mx-auto py-10">
        <Header />
        <LoanVsInvestmentCalculator />
      </main>
    </LanguageProvider>
  );
}
const Header = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold font-mono">Money Map</h1>
      <p> {t("subtitle")}</p>
    </div>
  );
};
