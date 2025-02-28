import { cn } from '@/utils/cn';
import { useFormContext } from 'react-hook-form';
import { BasePlan } from '@/api/plans/plan.model';
import { calculateYearlyPrice } from '@/components/StepForm/utils/calculatePlan';
import { PERIOD_LABEL_MAP } from '@/components/StepForm/constants/steps';
import { StepFormSchemaType } from '@/components/StepForm/hooks/useStepForm';
import { uppercaseAtIndex } from '@/utils/stringUtils';

interface PlanCardData extends BasePlan {
  icon: React.ReactNode;
}

interface PlanCardProps {
  data: PlanCardData;
}

function PlanCard({ data }: PlanCardProps) {
  const { watch, setValue } = useFormContext<StepFormSchemaType>();

  const [plan, planPeriod] = watch(['plan', 'planPeriod']);

  const { name, price, icon, yearlyFreeMonths } = data;
  const isSelected = plan === data.name;

  const periodLabel = PERIOD_LABEL_MAP[planPeriod];
  const priceText =
    planPeriod === 'yearly'
      ? `$${calculateYearlyPrice(price, yearlyFreeMonths)}/${periodLabel}`
      : `$${price}/${periodLabel}`;

  const handleClick = () => {
    setValue('plan', data.name, { shouldTouch: true });
  };

  return (
    <div
      className={cn(
        'flex w-full cursor-pointer gap-[14px] rounded-[8px] border-1 px-[16px] pt-[14px] pb-[18px] sm:min-w-[150px] sm:flex-col sm:gap-[40px] sm:py-[20px]',
        isSelected
          ? 'border-purple bg-light-grey'
          : 'border-border-color bg-white',
      )}
      onClick={handleClick}
    >
      {icon}
      <div className="flex flex-col gap-[7px]">
        <p className="font-body-l font-medium text-denim">
          {uppercaseAtIndex(name, 0)}
        </p>
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
