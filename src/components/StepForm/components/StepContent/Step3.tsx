import { useFormContext } from 'react-hook-form';

import { cn } from '@/utils/cn';
import Checkbox from '@/components/@Shared/Checkbox';
import { AddOnName } from '@/api/plans/plan.model';
import { StepFormSchemaType } from '../../hooks/useStepForm';
import { usePlanSuspenseQuery } from '@/api/plans/plans.query';
import { generatePriceText } from '../../utils/calculatePlan';

export const ADD_ONS_DESCRIPTION_MAP: Record<AddOnName, string> = {
  'online service': 'Access to multiplayer games',
  'larger storage': 'Extra 1TB of cloud save',
  'customizable profile': 'Custom theme on your profile',
};

function Step3() {
  const { setValue, watch } = useFormContext<StepFormSchemaType>();

  const {
    data: { addOns, base: basePlans },
  } = usePlanSuspenseQuery();

  const addons = watch('addons');
  const planPeriod = watch('planPeriod');
  const currentPlan = watch('plan');

  const yearlyFreeMonths =
    basePlans.find(plan => plan.name === currentPlan)?.yearlyFreeMonths || 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;

    return checked
      ? setValue('addons', [...addons, id as AddOnName])
      : setValue(
          'addons',
          (addons || []).filter(name => name !== id),
        );
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {addOns.map(addon => {
        const { name, price } = addon;
        const isChecked = addons?.includes(name);
        const priceText = generatePriceText(
          price,
          yearlyFreeMonths,
          planPeriod,
        );

        return (
          <Checkbox
            key={addon.name}
            id={addon.name}
            className={cn(
              'gap-[24px] border-border-color border px-[24px] py-[18px] rounded-[8px] p-[18px] w-full',
              isChecked && 'border-purple bg-light-grey',
            )}
            checked={isChecked}
            onChange={handleChange}
          >
            <div className="flex items-center justify-between flex-1">
              <div className="flex flex-col gap-[7px] flex-1">
                <h3 className="font-body-l text-denim">{name}</h3>
                <p className="text-grey">{ADD_ONS_DESCRIPTION_MAP[name]}</p>
              </div>
              <span className="text-purple">+{priceText}</span>
            </div>
          </Checkbox>
        );
      })}
    </div>
  );
}

export default Step3;
