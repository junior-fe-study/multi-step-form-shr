import { useFormContext } from 'react-hook-form';

import { cn } from '@/utils/cn';
import Checkbox from '@/components/@Shared/Checkbox';
import { AddOnName } from '@/api/plans/plan.model';
import { StepFormSchemaType } from '../../hooks/useStepForm';
import { usePlanSuspenseQuery } from '@/api/plans/plans.query';
import { generatePriceText } from '../../utils/calculatePlan';
import { uppercaseAtIndex } from '@/utils/stringUtils';

export const ADD_ONS_DESCRIPTION_MAP: Record<AddOnName, string> = {
  'online service': 'Access to multiplayer games',
  'larger storage': 'Extra 1TB of cloud save',
  'customizable profile': 'Custom theme on your profile',
};

function Step3() {
  const { setValue, watch } = useFormContext<StepFormSchemaType>();

  const { data } = usePlanSuspenseQuery();

  const [plan, planPeriod, addons] = watch(['plan', 'planPeriod', 'addons']);

  const yearlyFreeMonths =
    data.base.find(_plan => _plan.name === plan)?.yearlyFreeMonths || 0;

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
    <div className="flex flex-col gap-[12px] sm:gap-[16px]">
      {data.addOns.map(addon => {
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
              'w-full gap-[16px] rounded-[8px] border border-border-color px-[16px] py-[12px] sm:gap-[24px] sm:px-[24px] sm:py-[18px]',
              isChecked && 'border-purple bg-light-grey',
            )}
            checked={isChecked}
            onChange={handleChange}
          >
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-1 flex-col gap-[3px] sm:gap-[7px]">
                <h3 className="font-body-m leading-[16px] text-denim sm:font-body-l">
                  {uppercaseAtIndex(name, 0)}
                </h3>
                <p className="font-body-s leading-[20px] text-grey sm:font-body-m">
                  {ADD_ONS_DESCRIPTION_MAP[name]}
                </p>
              </div>
              <span className="font-body-s leading-[20px] text-purple sm:font-body-m">
                +{priceText}
              </span>
            </div>
          </Checkbox>
        );
      })}
    </div>
  );
}

export default Step3;
