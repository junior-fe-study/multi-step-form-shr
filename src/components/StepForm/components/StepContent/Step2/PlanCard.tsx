import { cn } from '@/utils/cn';
import { useFormContext } from 'react-hook-form';
import { BasePlan } from '@/api/plans/plan.model';
import { calculateYearlyPrice } from '@/components/StepForm/utils/calculatePlan';
import { PERIOD_LABEL_MAP } from '@/components/StepForm/constants/steps';
import { StepFormSchemaType } from '@/components/StepForm/hooks/useStepForm';

interface PlanCardData extends BasePlan {
  icon: React.ReactNode;
}

interface PlanCardProps {
  data: PlanCardData;
}

function PlanCard({ data }: PlanCardProps) {
  const { watch, setValue } = useFormContext<StepFormSchemaType>();

  const planPeriod = watch('planPeriod');
  const currentPlan = watch('plan');

  const { name, price, icon, yearlyFreeMonths } = data;
  const isSelected = currentPlan === data.name;

  const periodLabel = PERIOD_LABEL_MAP[planPeriod];
  const priceText =
    planPeriod === 'yearly'
      ? `${calculateYearlyPrice(price, yearlyFreeMonths)}/${periodLabel}`
      : `${price}/${periodLabel}`;

  const handleClick = () => {
    setValue('plan', data.name);
  };

  return (
    <div
      className={cn(
        'rounded-[8px] flex flex-col border-1 py-[20px] px-[16px] w-[138px] gap-[40px] cursor-pointer tablet:min-w-[150px]',
        isSelected
          ? 'border-purple bg-light-grey'
          : 'border-border-color bg-white ',
      )}
      onClick={handleClick}
    >
      {icon}
      <div className="flex flex-col gap-[7px]">
        <p className="font-medium font-body-l text-denim">{name}</p>
        <p className="text-grey">{priceText}</p>
        {planPeriod === 'yearly' && (
          <p className="font-body-s text-denim">
            {yearlyFreeMonths} months free
          </p>
        )}
      </div>
    </div>
  );
}

export default PlanCard;
