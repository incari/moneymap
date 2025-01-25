import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "../contexts/LanguageContext";
import { useMortgageCalculator } from "../hooks/useMortgageCalculator";
import { formatNumberWithCommas } from "../utils/formatNumber";

type MortgageCalculatorProps = {
  propertyPrice: number;
  setPropertyPrice: (value: number) => void;
  initialInvestment: number;
  setInitialInvestment: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  mortgageTerm: number;
  setMortgageTerm: (value: number) => void;
  propertyRevaluation: number;
  setPropertyRevaluation: (value: number) => void;
  initialCostsPercentage: number;
  setInitialCostsPercentage: (value: number) => void;
  initialCostsFixed: number;
  setInitialCostsFixed: (value: number) => void;
  annualCostsPercentage: number;
  setAnnualCostsPercentage: (value: number) => void;
  annualCostsFixed: number;
  setAnnualCostsFixed: (value: number) => void;
  maintenanceCosts: number;
  setMaintenanceCosts: (value: number) => void;
};

export const MortgageCalculator = ({
  propertyPrice,
  setPropertyPrice,
  initialInvestment,
  setInitialInvestment,
  interestRate,
  setInterestRate,
  mortgageTerm,
  setMortgageTerm,
  propertyRevaluation,
  setPropertyRevaluation,
  initialCostsPercentage,
  setInitialCostsPercentage,
  initialCostsFixed,
  setInitialCostsFixed,
  annualCostsPercentage,
  setAnnualCostsPercentage,
  annualCostsFixed,
  setAnnualCostsFixed,
  maintenanceCosts,
  setMaintenanceCosts,
}: MortgageCalculatorProps) => {
  const { t } = useLanguage();

  const results = useMortgageCalculator(
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

  const handlePropertyPriceChange = (change: number) => {
    const newValue = Math.max(0, propertyPrice + change);
    setPropertyPrice(newValue);
  };

  const handleInitialInvestmentChange = (change: number) => {
    const newValue = Math.max(0, initialInvestment + change);
    setInitialInvestment(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="propertyPrice">{t("propertyPrice")}</Label>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handlePropertyPriceChange(-5000)}
              size="sm"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="propertyPrice"
              type="text"
              value={formatNumberWithCommas(propertyPrice)}
              onChange={(e) =>
                setPropertyPrice(Number(e.target.value.replace(/\D/g, "")))
              }
              className="flex-grow"
            />
            <Button
              onClick={() => handlePropertyPriceChange(5000)}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="initialInvestment">{t("initialInvestment")}</Label>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleInitialInvestmentChange(-1000)}
              size="sm"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="initialInvestment"
              type="text"
              value={formatNumberWithCommas(initialInvestment)}
              onChange={(e) =>
                setInitialInvestment(Number(e.target.value.replace(/\D/g, "")))
              }
              className="flex-grow"
            />
            <Button
              onClick={() => handleInitialInvestmentChange(1000)}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="interestRate">{t("interestRate")}</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mortgageTerm">{t("mortgageTerm")}</Label>
          <Input
            id="mortgageTerm"
            type="number"
            step="1"
            value={mortgageTerm}
            onChange={(e) => setMortgageTerm(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="propertyRevaluation">
            {t("propertyRevaluation")}
          </Label>
          <Input
            id="propertyRevaluation"
            type="number"
            step="0.1"
            value={propertyRevaluation}
            onChange={(e) => setPropertyRevaluation(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold">{t("additionalCosts")}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-2">
                  <Label htmlFor="initialCostsPercentage">
                    {t("initialCostsPercentage")}
                  </Label>
                  <Input
                    id="initialCostsPercentage"
                    type="number"
                    step="0.1"
                    value={initialCostsPercentage}
                    onChange={(e) =>
                      setInitialCostsPercentage(Number(e.target.value))
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("initialCostsPercentageTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-2">
                  <Label htmlFor="initialCostsFixed">
                    {t("initialCostsFixed")}
                  </Label>
                  <Input
                    id="initialCostsFixed"
                    type="text"
                    value={formatNumberWithCommas(initialCostsFixed)}
                    onChange={(e) =>
                      setInitialCostsFixed(
                        Number(e.target.value.replace(/\D/g, ""))
                      )
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("initialCostsFixedTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-2">
                  <Label htmlFor="annualCostsPercentage">
                    {t("annualCostsPercentage")}
                  </Label>
                  <Input
                    id="annualCostsPercentage"
                    type="number"
                    step="0.1"
                    value={annualCostsPercentage}
                    onChange={(e) =>
                      setAnnualCostsPercentage(Number(e.target.value))
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("annualCostsPercentageTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-2">
                  <Label htmlFor="annualCostsFixed">
                    {t("annualCostsFixed")}
                  </Label>
                  <Input
                    id="annualCostsFixed"
                    type="text"
                    value={formatNumberWithCommas(annualCostsFixed)}
                    onChange={(e) =>
                      setAnnualCostsFixed(
                        Number(e.target.value.replace(/\D/g, ""))
                      )
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("annualCostsFixedTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceCosts">
                    {t("maintenanceCosts")}
                  </Label>
                  <Input
                    id="maintenanceCosts"
                    type="number"
                    step="0.1"
                    value={maintenanceCosts}
                    onChange={(e) =>
                      setMaintenanceCosts(Number(e.target.value))
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("maintenanceCostsTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
