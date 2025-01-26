"use client";

import type React from "react";
import { createContext, useState, useContext, type ReactNode } from "react";

type Language = "en" | "es";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    title: "Loan vs Investment Calculator",
    name: "Money Map",
    madeBy: "Made by",
    madeUsing: "with AI using",
    subtitle:
      "Compare mortgage and investment scenarios to make smarter financial decisions",
    /* Mortgage */
    mortgageTitle: "Mortgage/Loan Calculator",
    mortgageDescription:
      "Calculate the costs of buying a property with a mortgage",
    propertyPrice: "Property Price ",
    initialInvestment: "Initial Investment ",
    interestRate: "Interest Rate (%)",
    mortgageTerm: "Mortgage Term (years , max 100)",
    maintenanceCost: "Yearly Maintenance Costs (%)",
    yearlyTaxes: "Yearly Taxes (%)",
    monthlyPayment: "Monthly Payment",
    totalCost: "Total Cost",
    totalInterest: "Total Interest",
    indexFundTitle: "Index Fund Calculator",
    indexFundDescription:
      "Calculate potential returns from investing in an index fund",
    initialAmount: "Initial Amount ($)",
    monthlyAddition: "Monthly Addition ($)",
    expectedReturn: "Expected Annual Return (%)",
    totalValue: "Total Value",
    language: "Language",
    years: "Years",
    additionalCosts: "Additional Costs",
    upfrontCosts: "Upfront Costs",
    yearlyMaintenance: "Yearly Maintenance",
    totalCostBreakdown: "Total Cost Breakdown",
    loanAmount: "Loan Amount",
    interestPaid: "Interest Paid",
    upfrontCostsPaid: "Upfront Costs Paid",
    maintenancePaid: "Maintenance Paid",
    taxesPaid: "Taxes Paid",
    yearlyValue: "Yearly Value",
    propertyRevaluation: "Yearly Property Revaluation (%)",
    initialCostsPercentage: "Initial Costs (%)",
    initialCostsFixed: "Initial Costs (Fixed)",
    annualCostsPercentage: "Annual Costs (%)",
    annualCostsFixed: "Annual Costs (Fixed)",
    maintenanceCosts: "Maintenance Costs (%)",
    initialCostsPercentageTooltip: "Purchase taxes",
    initialCostsFixedTooltip: "Notary and other expenses",
    annualCostsPercentageTooltip: "Property taxes (IBI) and other expenses",
    annualCostsFixedTooltip: "Community fees, garbage collection, insurance",
    maintenanceCostsTooltip: "Small renovations, bathroom/kitchen and painting",
    totalAnnualExpenses: "Total Annual Expenses",
    expenseDetails: "Expense Details",
    propertyValueAtEnd: "Property Value at End of Term",
    totalProfit: "Total Profit",
    profitPercentage: "Profit Percentage",
    fireCalculatorTitle:
      "FIRE Calculator (Financial Independence, Retire Early)",
    fireCalculatorDescription:
      "Calculate your Financial Independence, Retire Early (FIRE) number",
    monthlyWithdrawal: "Monthly Withdrawal",
    totalRequired: "Total Required for FIRE",
    initialExpenses: "Initial Expenses",
    totalExpenses: "Total Expenses",
    initialCosts: "Initial Costs",
    totalTaxes: "Total Taxes",
    monthlyPayments: "Monthly Payments",
    mortgage: "Mortgage",
    annualExpensesMonthly: "Annual Expenses (Monthly)",
    assets: "Assets (Price - Expenses)",
    finalPropertyValue: "Final Property Value",
    totalExpensesLong: "Total Expenses",
    profitability: "Profitability",
    percentageProfit: "Percentage Profit",
    annualAdjustedPercentage: "Annual Adjusted Percentage",
    mortgageResults: "Mortgage Results",
    investmentResults: "Investment Results",
    initialInvestmentWarning:
      "Normally banks require at least 10% of the property price",
    monthlyExpenses: "Monthly Expenses ($)",
    yearsToRetire: "Years to Retire",
    currentSavings: "Current Savings ($)",
    /* FIRE */

    fireResults: "FIRE Results",
    fireNumber: "FIRE Number",
    projectedSavings: "Projected Savings",
    fireGoalAchieved:
      "Congratulations! You're on track to achieve your FIRE goal.",
    fireGoalNotAchieved:
      "You may need to adjust your plan to reach your FIRE goal.",
    adjustMonthlyAddition: "Adjust Monthly Addition",
    fireDescription: "Discover your FIRE number for financial freedom",
  },
  es: {
    title: "Calculadora de Préstamo vs Inversión",
    name: "Money Map",
    subtitle:
      "Compara escenarios de hipoteca e inversión para tomar decisiones financieras más inteligentes",
    madeBy: "Hecho por",
    madeUsing: "con AI usando",
    /* Mortgage */
    mortgageTitle: "Calculadora de Hipoteca/Préstamo",
    mortgageDescription:
      "Calcula los costos de comprar una propiedad con una hipoteca",
    propertyPrice: "Precio de la Propiedad",
    initialInvestment: "Inversión Inicial",
    interestRate: "Tasa de Interés (%)",
    mortgageTerm: "Plazo de la Hipoteca (años, max 100)",
    maintenanceCost: "Costos de Mantenimiento Anuales (%)",
    yearlyTaxes: "Impuestos Anuales (%)",
    monthlyPayment: "Pago Mensual",
    totalCost: "Costo Total",
    totalInterest: "Interés Total",
    indexFundTitle: "Calculadora de Fondo Indexado",
    indexFundDescription:
      "Calcula los retornos potenciales de invertir en un fondo indexado",
    initialAmount: "Monto Inicial ($)",
    monthlyAddition: "Adición Mensual ($)",
    expectedReturn: "Retorno Anual Esperado (%)",
    totalValue: "Valor Total",
    language: "Idioma",
    years: "Años",
    additionalCosts: "Costos Adicionales",
    upfrontCosts: "Costos Iniciales",
    yearlyMaintenance: "Mantenimiento Anual",

    totalCostBreakdown: "Desglose del Costo Total",
    loanAmount: "Monto del Préstamo",
    interestPaid: "Intereses Pagados",
    upfrontCostsPaid: "Costos Iniciales Pagados",
    maintenancePaid: "Mantenimiento Pagado",
    taxesPaid: "Impuestos Pagados",
    yearlyValue: "Valor Anual",
    propertyRevaluation: "Revalorización Anual de la Propiedad (%)",
    initialCostsPercentage: "Gastos Iniciales (%)",
    initialCostsFixed: "Gastos Iniciales (Fijos)",
    annualCostsPercentage: "Gastos Anuales (%)",
    annualCostsFixed: "Gastos Anuales (Fijos)",
    maintenanceCosts: "Gastos de Mantenimiento (%)",
    initialCostsPercentageTooltip: "Impuestos de compra",
    initialCostsFixedTooltip: "Notaría y otros gastos",
    annualCostsPercentageTooltip:
      "Impuestos Bienes Inmuebles (IBI) y otros gastos",
    annualCostsFixedTooltip: "Comunidad, Basura, Seguro",
    maintenanceCostsTooltip: "Pequeñas reformas, Baño/Cocina y pintura",
    totalAnnualExpenses: "Gastos Anuales Totales",
    expenseDetails: "Detalle de Gastos",
    propertyValueAtEnd: "Valor de la Propiedad al Final del Plazo",
    totalProfit: "Beneficio Total",
    profitPercentage: "Porcentaje de Beneficio",
    initialExpenses: "Gastos Iniciales",
    totalExpenses: "Gastos Totales",
    initialCosts: "Gastos Iniciales",
    totalTaxes: "Total Impuestos",
    monthlyPayments: "Pagos Mensuales",
    mortgage: "Hipoteca",
    annualExpensesMonthly: "Gastos Anuales (Mensual)",
    assets: "Activos (Precio - Gastos)",
    finalPropertyValue: "Valor Final del Inmueble",
    totalExpensesLong: "Gastos Totales",
    profitability: "Rentabilidad",
    percentageProfit: "Beneficio Porcentual",
    annualAdjustedPercentage: "Porcentaje Ajustado Anual",
    equity: "Patrimonio",
    propertyValue: "Valor del Inmueble",
    investmentResults: "Resultados de la Inversión",
    year: "Año",
    mortgageResults: "Resultados de la Hipoteca",
    initialInvestmentWarning:
      "Normalmente los bancos requieren un mínimo del 10% del precio de la propiedad",
    setMinimumInvestment: "Ajustar",
    /* FIRE */
    fireCalculatorTitle:
      "Calculadora FIRE (Financial Independence, Retire Early)",
    monthlyExpenses: "Gastos Mensuales ($)",
    yearsToRetire: "Años para Retirarse",
    currentSavings: "Ahorros Actuales ($)",
    fireResults: "Resultados FIRE",
    fireNumber: "Número FIRE",
    fireDescription: "Descubre tu número FIRE para la libertad financiera",

    projectedSavings: "Ahorros Proyectados",
    fireGoalAchieved:
      "¡Felicidades! Estás en camino de alcanzar tu objetivo FIRE.",
    fireGoalNotAchieved:
      "Es posible que necesites ajustar tu plan para alcanzar tu objetivo FIRE.",
    adjustMonthlyAddition: "Ajustar adición mensual",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
