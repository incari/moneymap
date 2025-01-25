"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "../contexts/LanguageContext";
import { MortgageCalculator } from "./MortgageCalculator";
import { InvestmentCalculator } from "./InvestmentCalculator";
import { useMortgageCalculator } from "../hooks/useMortgageCalculator";
import { useInvestmentCalculator } from "../hooks/useInvestmentCalculator";
import { Footer } from "./Footer";
import ResultsDisplay from "./ResultsDisplay";

export default function LoanVsInvestmentCalculator() {
  const { t, language, setLanguage } = useLanguage();

  // Mortgage/Loan state
  const [propertyPrice, setPropertyPrice] = useState(300000);
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [interestRate, setInterestRate] = useState(2.5);
  const [mortgageTerm, setMortgageTerm] = useState(30);
  const [propertyRevaluation, setPropertyRevaluation] = useState(4);
  const [initialCostsPercentage, setInitialCostsPercentage] = useState(6);
  const [initialCostsFixed, setInitialCostsFixed] = useState(2000);
  const [annualCostsPercentage, setAnnualCostsPercentage] = useState(1.5);
  const [annualCostsFixed, setAnnualCostsFixed] = useState(1500);
  const [maintenanceCosts, setMaintenanceCosts] = useState(1.5);

  // Index Fund state
  const [initialAmount, setInitialAmount] = useState(50000);
  const [monthlyAddition, setMonthlyAddition] = useState(100);
  const [investmentReturn, setInvestmentReturn] = useState(8);
  const [investmentYears, setInvestmentYears] = useState(mortgageTerm);

  const mortgageResults = useMortgageCalculator(
    propertyPrice,
    initialInvestment,
    interestRate,
    mortgageTerm,
    propertyRevaluation,
    initialCostsPercentage,
    initialCostsFixed,
    annualCostsPercentage,
    annualCostsFixed,
    maintenanceCosts
  );

  const investmentResults = useInvestmentCalculator(
    initialAmount,
    monthlyAddition,
    investmentReturn,
    investmentYears
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="flex justify-end">
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

      <Card>
        <CardHeader>
          <CardTitle>{t("mortgageTitle")}</CardTitle>
          <CardDescription>{t("mortgageDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <MortgageCalculator
            propertyPrice={propertyPrice}
            setPropertyPrice={setPropertyPrice}
            initialInvestment={initialInvestment}
            setInitialInvestment={setInitialInvestment}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            mortgageTerm={mortgageTerm}
            setMortgageTerm={setMortgageTerm}
            propertyRevaluation={propertyRevaluation}
            setPropertyRevaluation={setPropertyRevaluation}
            initialCostsPercentage={initialCostsPercentage}
            setInitialCostsPercentage={setInitialCostsPercentage}
            initialCostsFixed={initialCostsFixed}
            setInitialCostsFixed={setInitialCostsFixed}
            annualCostsPercentage={annualCostsPercentage}
            setAnnualCostsPercentage={setAnnualCostsPercentage}
            annualCostsFixed={annualCostsFixed}
            setAnnualCostsFixed={setAnnualCostsFixed}
            maintenanceCosts={maintenanceCosts}
            setMaintenanceCosts={setMaintenanceCosts}
          />
        </CardContent>
      </Card>

      {mortgageResults && (
        <ResultsDisplay
          results={mortgageResults}
          type="mortgage"
        />
      )}

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>{t("indexFundTitle")}</CardTitle>
          <CardDescription>{t("indexFundDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentCalculator
            initialAmount={initialAmount}
            setInitialAmount={setInitialAmount}
            monthlyAddition={monthlyAddition}
            setMonthlyAddition={setMonthlyAddition}
            investmentReturn={investmentReturn}
            setInvestmentReturn={setInvestmentReturn}
            investmentYears={investmentYears}
            setInvestmentYears={setInvestmentYears}
          />
        </CardContent>
      </Card>

      {investmentResults && (
        <ResultsDisplay
          results={investmentResults}
          type="investment"
        />
      )}

      <Separator />

      <Footer />
    </div>
  );
}
