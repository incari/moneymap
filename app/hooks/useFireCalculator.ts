import { useState, useEffect } from "react"

export const useFireCalculator = (monthlyWithdrawal: number, investmentReturn: number) => {
  const [results, setResults] = useState<{
    totalRequired: number
  } | null>(null)

  useEffect(() => {
    const annualWithdrawal = monthlyWithdrawal * 12
    const withdrawalRate = 0.04 // 4% rule
    const totalRequired = annualWithdrawal / withdrawalRate

    setResults({
      totalRequired: totalRequired || 0,
    })
  }, [monthlyWithdrawal])

  return results
}

