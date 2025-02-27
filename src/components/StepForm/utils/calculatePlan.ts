import { PERIOD_LABEL_MAP } from '../constants/steps';
import { PlanPeriod } from '../hooks/useStepForm';

export const calculateYearlyPrice = (
  monthlyPrice: number,
  yearlyFreeMonths: number,
) => {
  if (yearlyFreeMonths < 0 || yearlyFreeMonths > 12) {
    throw new Error('Invalid yearly free months');
  }

  return monthlyPrice * (12 - yearlyFreeMonths);
};

export const generatePriceText = (
  price: number,
  yearlyFreeMonths: number,
  planPeriod: PlanPeriod,
) => {
  const periodLabel = PERIOD_LABEL_MAP[planPeriod];

  return planPeriod === 'yearly'
    ? `$${calculateYearlyPrice(price, yearlyFreeMonths)}/${periodLabel}`
    : `$${price}/${periodLabel}`;
};

export const calculateTotalPrice = (
  basePlanPrice: number,
  addOnsPrices: number[],
) => {
  return addOnsPrices.reduce(
    (acc: number, addonPrice: number) => acc + addonPrice,
    basePlanPrice,
  );
};
