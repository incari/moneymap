"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { formatNumberWithCommas } from "../utils/formatNumber";
import { MathCalculatorInput } from "@/app/components/MathCalculatorInput";

type FireCalculatorProps = {
  initialMonthlyExpenses?: number;
  initialYearsToRetire?: number;
  initialCurrentSavings?: number;
  initialMonthlyAddition?: number;
  initialExpectedReturn?: number;
};

export const FireCalculator = ({
  initialMonthlyExpenses = 2000,
  initialYearsToRetire = 20,
  initialCurrentSavings = 50000,
  initialMonthlyAddition = 1000,
  initialExpectedReturn = 7,
}: FireCalculatorProps) => {
  const { t } = useLanguage();
  const [monthlyExpenses, setMonthlyExpenses] = useState(
    initialMonthlyExpenses
  );
  const [yearsToRetire, setYearsToRetire] = useState(initialYearsToRetire);
  const [currentSavings, setCurrentSavings] = useState(initialCurrentSavings);
  const [monthlyAddition, setMonthlyAddition] = useState(
    initialMonthlyAddition
  );
  const [expectedReturn, setExpectedReturn] = useState(initialExpectedReturn);
  const [fireNumber, setFireNumber] = useState(0);
  const [projectedSavings, setProjectedSavings] = useState(0);

  useEffect(() => {
    // Calculate FIRE number (25 times annual expenses)
    const annualExpenses = monthlyExpenses * 12;
    const calculatedFireNumber = annualExpenses * 25;

    // Calculate projected savings
    let savings = currentSavings;
    for (let i = 0; i < yearsToRetire; i++) {
      savings = savings * (1 + expectedReturn / 100) + monthlyAddition * 12;
    }

    setFireNumber(calculatedFireNumber);
    setProjectedSavings(savings);
  }, [
    monthlyExpenses,
    yearsToRetire,
    currentSavings,
    monthlyAddition,
    expectedReturn,
  ]);

  const calculateRequiredMonthlyAddition = () => {
    const annualExpenses = monthlyExpenses * 12;
    const targetAmount = annualExpenses * 25 * 1.01; // 1% above FIRE number

    let low = 0;
    let high = 10000000; // Asumiendo un límite superior razonable
    let mid;

    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      let projectedSavings = currentSavings;

      for (let i = 0; i < yearsToRetire; i++) {
        projectedSavings =
          projectedSavings * (1 + expectedReturn / 100) + mid * 12;
      }

      if (Math.abs(projectedSavings - targetAmount) < 1) {
        setMonthlyAddition(mid);
        return;
      } else if (projectedSavings < targetAmount) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    mid && setMonthlyAddition(mid);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t("fireCalculatorTitle")}</CardTitle>
          <CardDescription>{t("fireDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">{t("monthlyExpenses")}</Label>
                <MathCalculatorInput
                  id="monthlyExpenses"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsToRetire">{t("yearsToRetire")}</Label>
                <MathCalculatorInput
                  id="yearsToRetire"
                  value={yearsToRetire}
                  onChange={(e) => setYearsToRetire(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentSavings">{t("currentSavings")}</Label>
                <MathCalculatorInput
                  id="currentSavings"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyAddition">{t("monthlyAddition")}</Label>
                <MathCalculatorInput
                  id="monthlyAddition"
                  value={monthlyAddition}
                  onChange={(e) => setMonthlyAddition(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedReturn">{t("expectedReturn")}</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  step="0.1"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                />
              </div>
              <div className="flex items-end">
                <Button
                  className="w-full "
                  onClick={calculateRequiredMonthlyAddition}
                >
                  {t("adjustMonthlyAddition")}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-red-50 rounded-md">
        <h3 className="text-lg font-semibold mb-2">{t("fireResults")}</h3>
        <p>
          {t("fireNumber")}: ${formatNumberWithCommas(Math.round(fireNumber))}
        </p>
        <p>
          {t("projectedSavings")}: $
          {formatNumberWithCommas(Math.round(projectedSavings))}
        </p>
        <p
          className={
            projectedSavings >= fireNumber ? "text-green-500" : "text-red-500"
          }
        >
          {projectedSavings >= fireNumber
            ? t("fireGoalAchieved")
            : t("fireGoalNotAchieved")}
        </p>
      </div>
    </>
  );
};
