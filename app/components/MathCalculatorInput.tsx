"use client";

import React, { useEffect } from "react";
import { create, all } from "mathjs";
import { Input } from "@/components/ui/input";
import { formatNumberWithCommas } from "@/app/utils/formatNumber";

const math = create(all);

interface MathCalculatorInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value: string | number;
  onChange: (e: { target: { value: number } }) => void;
}

const MathCalculatorInput = React.forwardRef<
  HTMLInputElement,
  MathCalculatorInputProps
>(({ onChange, onBlur, value, ...props }, ref) => {
  const [displayValue, setDisplayValue] = React.useState(value);

  useEffect(() => {
    typeof value === "number" && setDisplayValue(formatNumberWithCommas(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow typing of math operations and numbers
    const rawValue = e.target.value.replace(/,/g, "");
    setDisplayValue(rawValue);

    if (!rawValue.match(/[+\-*/()]/)) {
      // If it's just a number, format it
      const numericValue = Number(rawValue.replace(/[^0-9.-]/g, ""));
      if (!isNaN(numericValue)) {
        onChange?.({ target: { value: numericValue } });
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      const calculatedResult =
        typeof displayValue === "string" &&
        math.evaluate(displayValue.replace(/,/g, ""));
      const roundedResult = Number(Number(calculatedResult).toFixed(2)) || 0;

      setDisplayValue(formatNumberWithCommas(roundedResult));
      onChange?.({ target: { value: roundedResult } });
      onBlur?.(e);
    } catch (error) {
      console.error("Calculation error:", error);
      onBlur?.(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <Input
      ref={ref}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
});

MathCalculatorInput.displayName = "MathCalculatorInput";

export { MathCalculatorInput };
