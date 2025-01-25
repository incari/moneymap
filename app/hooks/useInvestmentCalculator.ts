import { useState, useEffect } from "react"

export const useInvestmentCalculator = (
  initialAmount: number,
  monthlyAddition: number,
  investmentReturn: number,
  investmentYears: number,
) => {
  const [results, setResults] = useState<{
    totalValue: number
    totalInterest: number
    yearlyData: Array<{ year: number; value: number }>
  } | null>(null)

  useEffect(() => {
    const monthlyRate = investmentReturn / 100 / 12
    const months = investmentYears * 12

    let totalValue = initialAmount
    let totalContributions = initialAmount
    const yearlyData = []

    for (let month = 1; month <= months; month++) {
      totalValue = totalValue * (1 + monthlyRate) + monthlyAddition
      totalContributions += monthlyAddition

      if (month % 12 === 0) {
        yearlyData.push({
          year: month / 12,
          value: totalValue,
        })
      }
    }

    setResults({
      totalValue: totalValue || 0,
      totalInterest: totalValue - totalContributions || 0,
      yearlyData,
    })
  }, [initialAmount, monthlyAddition, investmentReturn, investmentYears])

  return results
}

