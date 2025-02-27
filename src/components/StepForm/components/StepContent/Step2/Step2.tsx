import { useFormContext } from 'react-hook-form';

import ArcadeIcon from '@/assets/arcade.svg';
import AdvancedIcon from '@/assets/advanced.svg';
import ProIcon from '@/assets/pro.svg';
import { cn } from '@/utils/cn';
import PlanCard from './PlanCard';
import { usePlanSuspenseQuery } from '@/api/plans/plans.query';
import { BasePlanName } from '@/api/plans/plan.model';
import { uppercaseAtIndex } from '@/utils/stringUtils';
import { PLAN_PERIOD } from '@/components/StepForm/hooks/useStepForm';

export const PLANS_ICON_MAP: Record<BasePlanName, React.ReactNode> = {
  arcade: <ArcadeIcon />,
  advanced: <AdvancedIcon />,
  pro: <ProIcon />,
};

function Step2() {
  const { setValue, watch } = useFormContext();
  const { data: plans } = usePlanSuspenseQuery();

  const planPeriod = watch('planPeriod');

  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex gap-[18px]">
        {plans.base.map(plan => {
          return (
            <PlanCard
              key={plan.name}
              data={{ ...plan, icon: PLANS_ICON_MAP[plan.name] }}
            />
          );
        })}
      </div>
      <div className="flex gap-[24px] h-[48px] rounded-[8px] bg-very-light-grey items-center justify-center">
        {PLAN_PERIOD.map(type => {
          const isSelected = planPeriod === type;
          const periodLabel = uppercaseAtIndex(type, 0);

          return (
            <button
              key={type}
              className={cn(
                'text-medium',
                isSelected ? 'text-denim' : 'text-grey',
              )}
              onClick={() => setValue('planPeriod', type)}
            >
              {periodLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Step2;
