import { useLanguage } from "../contexts/LanguageContext";
import { formatNumberWithCommas } from "../utils/formatNumber";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ResultsDisplayProps = {
  results: any;
  type: "mortgage" | "investment" | "fire";
};

export default function ResultsDisplay({ results, type }: ResultsDisplayProps) {
  const { t } = useLanguage();

  const formatCurrency = (num: number) => {
    return `$${formatNumberWithCommas(Math.round(num))}`;
  };

  const formatPercentage = (num: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100);
  };

  if (type === "mortgage") {
    return (
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">{t("mortgageResults")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p>
              {t("propertyPrice")}: {formatCurrency(results.propertyPrice)}
            </p>
            <h4 className="font-semibold">
              {t("initialExpenses") + " "}{" "}
              {formatCurrency(
                results.initialCostsPaid + results.initialInvestment
              )}
            </h4>

            <ul className="list-disc list-inside">
              <li>
                {t("initialInvestment")}:{" "}
                {formatCurrency(results.initialInvestment)}
              </li>
              <li>
                {t("initialCosts")}: {formatCurrency(results.initialCostsPaid)}
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">
              {t("monthlyPayments") + " "} (
              {formatCurrency(
                (results.annualCostsPaid + results.maintenancePaid) /
                  (results.yearlyData.length * 12) +
                  results.monthlyPayment
              )}
              )
            </h4>
            <p>
              {t("mortgage")}: {formatCurrency(results.monthlyPayment)}
            </p>
            <p>
              {t("annualExpensesMonthly")}:{" "}
              {formatCurrency(
                (results.annualCostsPaid + results.maintenancePaid) /
                  (results.yearlyData.length * 12)
              )}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">{t("assets")}</h4>
            <p>
              {t("finalPropertyValue")}:{" "}
              {formatCurrency(results.finalPropertyValue)}
            </p>
            <p>
              {t("totalExpensesLong")}: {formatCurrency(results.totalCost)}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">{t("profitability")}</h4>
            <p>
              {t("totalProfit")}: {formatCurrency(results.totalProfit)}
            </p>
            <p>
              {t("percentageProfit")}:{" "}
              {formatPercentage(results.profitPercentage)}
            </p>
            <p>
              {t("annualAdjustedPercentage")}:{" "}
              {formatPercentage(results.annualAdjustedPercentage)}
            </p>
          </div>
        </div>
        <div className="mt-6 h-64">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={results.yearlyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) =>
                  `$${formatNumberWithCommas(Math.round(value / 1000))}k`
                }
              />
              <RechartsTooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `${t("year")} ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name={t("equity")}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="propertyValue"
                name={t("propertyValue")}
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (type === "investment") {
    return (
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">{t("investmentResults")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p>
              {t("totalValue")}: {formatCurrency(results.totalValue)}
            </p>
            <p>
              {t("totalInterest")}: {formatCurrency(results.totalInterest)}
            </p>
          </div>
        </div>
        <div className="mt-6 h-64">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={results.yearlyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) =>
                  `$${formatNumberWithCommas(Math.round(value / 1000))}k`
                }
              />
              <RechartsTooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `${t("year")} ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name={t("totalValue")}
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return null;
}
