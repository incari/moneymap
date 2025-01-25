import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "../contexts/LanguageContext"
import { useFireCalculator } from "../hooks/useFireCalculator"
import { formatNumberWithCommas } from "../utils/formatNumber"

export const FireCalculator = () => {
  const { t } = useLanguage()
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(3000)
  const [investmentReturn, setInvestmentReturn] = useState(7)

  const results = useFireCalculator(monthlyWithdrawal, investmentReturn)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="monthlyWithdrawal">{t("monthlyWithdrawal")}</Label>
          <Input
            id="monthlyWithdrawal"
            type="text"
            value={formatNumberWithCommas(monthlyWithdrawal)}
            onChange={(e) => setMonthlyWithdrawal(Number(e.target.value.replace(/\D/g, "")))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fireInvestmentReturn">{t("expectedReturn")}</Label>
          <Input
            id="fireInvestmentReturn"
            type="number"
            step="0.1"
            value={investmentReturn}
            onChange={(e) => setInvestmentReturn(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

