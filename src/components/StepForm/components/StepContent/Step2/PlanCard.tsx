import { cn } from '@/utils/cn';
import { useFormContext } from 'react-hook-form';

interface PlanCardProps {
  data: {
    name: string;
    price: {
      yearly: number;
      monthly: number;
    };
    icon: React.ReactNode;
    yearlyFreeMonths?: number;
  };
  isSelected?: boolean;
  handleClick?: () => void;
}

function PlanCard({ data, isSelected = false, handleClick }: PlanCardProps) {
  const { watch } = useFormContext();

  const planPeriod = watch('planPeriod');

  const { name, price, icon, yearlyFreeMonths } = data;
  const typeText = planPeriod === 'yearly' ? 'yr' : 'mo';

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
        <p className="text-grey">
          ${price[planPeriod as keyof typeof price]}/{typeText}
        </p>
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
