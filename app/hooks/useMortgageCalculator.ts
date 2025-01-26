import { useState, useEffect } from "react";

export const useMortgageCalculator = (
  propertyPrice: number,
  initialInvestment: number,
  interestRate: number,
  mortgageTerm: number,
  propertyRevaluation: number,
  initialCostsPercentage: number,
  initialCostsFixed: number,
  annualCostsPercentage: number,
  annualCostsFixed: number,
  maintenanceCosts: number
) => {
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalCost: number;
    totalInterest: number;
    yearlyData: Array<{ year: number; value: number; propertyValue: number }>;
    loanAmount: number;
    interestPaid: number;
    initialCostsPaid: number;
    annualCostsPaid: number;
    maintenancePaid: number;
    finalPropertyValue: number;
    totalProfit: number;
    profitPercentage: number;
    annualAdjustedPercentage: number;
    propertyPrice: number;
    initialInvestment: number;
  } | null>(null);

  useEffect(() => {
    const loanAmount = propertyPrice - initialInvestment;
    const monthlyRate = interestRate === 0 ? 0 : interestRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;

    let monthlyPayment: number;
    if (interestRate === 0) {
      monthlyPayment = loanAmount / (mortgageTerm * 12);
    } else {
      monthlyPayment =
        (loanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalCost = monthlyPayment * numberOfPayments;
    const totalInterest = totalCost - loanAmount;

    const initialCostsPaid =
      propertyPrice * (initialCostsPercentage / 100) + initialCostsFixed;
    const annualCostsPaid =
      (propertyPrice * (annualCostsPercentage / 100) + annualCostsFixed) *
      mortgageTerm;
    const maintenancePaid =
      propertyPrice * (maintenanceCosts / 100) * mortgageTerm;
    const totalAdditionalCosts =
      initialCostsPaid + annualCostsPaid + maintenancePaid;

    const yearlyData = [];
    let remainingBalance = loanAmount;
    for (let year = 1; year <= mortgageTerm; year++) {
      const yearlyInterest = remainingBalance * (interestRate / 100);
      const yearlyPrincipal = monthlyPayment * 12 - yearlyInterest;
      remainingBalance -= yearlyPrincipal;
      const propertyValue =
        propertyPrice * Math.pow(1 + propertyRevaluation / 100, year);
      yearlyData.push({
        year,
        value: propertyValue - remainingBalance,
        propertyValue: propertyValue,
      });
    }

    const finalPropertyValue =
      propertyPrice * Math.pow(1 + propertyRevaluation / 100, mortgageTerm);
    const totalProfit =
      finalPropertyValue - propertyPrice - totalInterest - totalAdditionalCosts;
    const profitPercentage = (totalProfit / (initialInvestment || 1)) * 100;
    console.log(totalProfit, initialInvestment, profitPercentage);
    const annualAdjustedPercentage =
      (Math.pow(1 + profitPercentage / 100, 1 / mortgageTerm) - 1) * 100;

    setResults({
      monthlyPayment: monthlyPayment || 0,
      totalCost: totalCost + totalAdditionalCosts || 0,
      totalInterest: totalInterest || 0,
      yearlyData,
      loanAmount: loanAmount || 0,
      interestPaid: totalInterest || 0,
      initialCostsPaid: initialCostsPaid || 0,
      annualCostsPaid: annualCostsPaid || 0,
      maintenancePaid: maintenancePaid || 0,
      finalPropertyValue: finalPropertyValue || 0,
      totalProfit: totalProfit || 0,
      profitPercentage: profitPercentage || 0,
      annualAdjustedPercentage: annualAdjustedPercentage || 0,
      propertyPrice: propertyPrice || 0,
      initialInvestment: initialInvestment || 0,
    });
  }, [
    propertyPrice,
    initialInvestment,
    interestRate,
    mortgageTerm,
    propertyRevaluation,
    initialCostsPercentage,
    initialCostsFixed,
    annualCostsPercentage,
    annualCostsFixed,
    maintenanceCosts,
  ]);

  return results;
};
