import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "../contexts/LanguageContext";
import { useInvestmentCalculator } from "../hooks/useInvestmentCalculator";
import { formatNumberWithCommas } from "../utils/formatNumber";

type InvestmentCalculatorProps = {
  initialAmount: number;
  setInitialAmount: (value: number) => void;
  monthlyAddition: number;
  setMonthlyAddition: (value: number) => void;
  investmentReturn: number;
  setInvestmentReturn: (value: number) => void;
  investmentYears: number;
  setInvestmentYears: (value: number) => void;
};

export const InvestmentCalculator = ({
  initialAmount,
  setInitialAmount,
  monthlyAddition,
  setMonthlyAddition,
  investmentReturn,
  setInvestmentReturn,
  investmentYears,
  setInvestmentYears,
}: InvestmentCalculatorProps) => {
  const { t } = useLanguage();

  const results = useInvestmentCalculator(
    initialAmount,
    monthlyAddition,
    investmentReturn,
    investmentYears
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="initialAmount">{t("initialAmount")}</Label>
          <Input
            id="initialAmount"
            type="text"
            value={formatNumberWithCommas(initialAmount)}
            onChange={(e) =>
              setInitialAmount(Number(e.target.value.replace(/\D/g, "")))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyAddition">{t("monthlyAddition")}</Label>
          <Input
            id="monthlyAddition"
            type="text"
            value={formatNumberWithCommas(monthlyAddition)}
            onChange={(e) =>
              setMonthlyAddition(Number(e.target.value.replace(/\D/g, "")))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="investmentReturn">{t("expectedReturn")}</Label>
          <Input
            id="investmentReturn"
            type="number"
            step="0.1"
            value={investmentReturn}
            onChange={(e) => setInvestmentReturn(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="investmentYears">{t("years")}</Label>
          <Input
            id="investmentYears"
            type="number"
            value={investmentYears}
            onChange={(e) => setInvestmentYears(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
