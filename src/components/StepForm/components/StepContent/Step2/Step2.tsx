import { useFormContext } from 'react-hook-form';

import ArcadeIcon from '@/assets/arcade.svg';
import AdvancedIcon from '@/assets/advanced.svg';
import ProIcon from '@/assets/pro.svg';
import { cn } from '@/utils/cn';
import PlanCard from './PlanCard';

export type PlanPeriod = 'yearly' | 'monthly';

export const PLAN_PERIOD: PlanPeriod[] = ['yearly', 'monthly'];

interface Plan {
  name: string;
  price: {
    [key in PlanPeriod]: number;
  };
  yearlyFreeMonths: number;
  icon: React.ReactNode;
}

export const PLANS: Record<string, Plan> = {
  arcade: {
    name: 'Arcade',
    price: {
      yearly: 90,
      monthly: 9,
    },
    yearlyFreeMonths: 2,
    icon: <ArcadeIcon />,
  },
  advanced: {
    name: 'Advanced',
    price: {
      yearly: 120,
      monthly: 12,
    },
    yearlyFreeMonths: 2,
    icon: <AdvancedIcon />,
  },
  pro: {
    name: 'Pro',
    price: {
      yearly: 150,
      monthly: 15,
    },
    yearlyFreeMonths: 2,
    icon: <ProIcon />,
  },
};

function Step2() {
  const { setValue, watch } = useFormContext();

  const planPeriod = watch('planPeriod');
  const currentPlan = watch('plan');

  console.log(planPeriod);

  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex gap-[18px]">
        {Object.entries(PLANS).map(([key, plan]) => {
          return (
            <PlanCard
              key={plan.name}
              data={{ ...plan }}
              isSelected={key === currentPlan}
              handleClick={() => {
                setValue('plan', key);
              }}
            />
          );
        })}
      </div>
      <div className="flex gap-[24px] h-[48px] rounded-[8px] bg-very-light-grey items-center justify-center">
        {PLAN_PERIOD.map(type => {
          const isSelected = planPeriod === type;

          return (
            <button
              key={type}
              className={cn(
                'text-medium',
                isSelected ? 'text-denim' : 'text-grey',
              )}
              onClick={() => setValue('planPeriod', type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Step2;
