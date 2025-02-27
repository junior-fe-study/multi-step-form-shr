import { PlanPeriod } from '../hooks/useStepForm';

export const STEPS = [
  {
    label: 'YOUR INFO',
    title: 'Personal info',
    description: 'Please provide your name, email address, and phone number.',
  },
  {
    label: 'SELECT PLAN',
    title: 'Select your plan',
    description: 'You have the option of monthly or yearly billing.',
  },
  {
    label: 'ADD-ONS',
    title: 'Add-ons',
    description: 'Add-ons help enhance your gaming experience.',
  },
  {
    label: 'SUMMARY',
    title: 'Finishing up',
    description: 'Double-check everything looks OK before confirming.',
  },
];

export const PERIOD_LABEL_MAP: Record<PlanPeriod, string> = {
  monthly: 'mo',
  yearly: 'yr',
};

export const MAX_STEP = STEPS.length;
export const START_STEP = 1;
