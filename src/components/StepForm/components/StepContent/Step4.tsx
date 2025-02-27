import { useFormContext } from 'react-hook-form';
import { StepFormSchemaType } from '../../hooks/useStepForm';
import { usePlanSuspenseQuery } from '@/api/plans/plans.query';
import {
  calculateTotalPrice,
  calculateYearlyPrice,
  generatePriceText,
} from '../../utils/calculatePlan';
import { uppercaseAtIndex } from '@/utils/stringUtils';
import { PERIOD_LABEL_MAP } from '../../constants/steps';

function Step4() {
  const { watch } = useFormContext<StepFormSchemaType>();

  const { data } = usePlanSuspenseQuery();

  const plan = watch('plan');
  const planPeriod = watch('planPeriod');
  const addons = watch('addons');

  const selectedPlan = data.base.find(base => base.name === plan);
  const selectedAddons = data.addOns.filter(addon =>
    addons.includes(addon.name),
  );

  const selectedPlanPrice =
    planPeriod === 'yearly'
      ? calculateYearlyPrice(
          selectedPlan?.price || 0,
          selectedPlan?.yearlyFreeMonths || 0,
        )
      : selectedPlan?.price || 0;

  const totalPrice = calculateTotalPrice(
    selectedPlanPrice,
    selectedAddons.map(addon =>
      planPeriod === 'yearly'
        ? calculateYearlyPrice(addon.price, selectedPlan?.yearlyFreeMonths || 0)
        : addon.price,
    ),
  );

  return (
    <div>
      <div className="w-full rounded-[8px] bg-light-grey py-[16px] px-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[7px]">
            <p className="text-denim font-body-l font-medium">{`${
              selectedPlan?.name
            } (${uppercaseAtIndex(planPeriod, 0)})`}</p>
            <button className="text-grey font-body-s underline w-fit">
              change
            </button>
          </div>
          <p className="text-denim font-body-l font-bold">
            {generatePriceText(
              selectedPlan?.price || 0,
              selectedPlan?.yearlyFreeMonths || 0,
              planPeriod,
            )}
          </p>
        </div>

        <div className="w-full h-[1px] bg-border-color mt-[24px] mb-[16px]" />

        <div className="flex flex-col gap-[16px]">
          {selectedAddons.map(addon => {
            const { name, price } = addon;
            const addonPrice = generatePriceText(
              price,
              selectedPlan?.yearlyFreeMonths || 0,
              planPeriod,
            );

            return (
              <div key={name} className="flex items-center justify-between">
                <p className="text-grey">{name}</p>
                <p className="text-denim">{`+${addonPrice}`}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-[24px] mt-[24px] flex items-center justify-between">
        <p className="text-grey">{`Total (per ${
          planPeriod === 'yearly' ? 'year' : 'month'
        })`}</p>
        <p className="text-purple font-body-xl font-bold">
          +${totalPrice}/{PERIOD_LABEL_MAP[planPeriod]}
        </p>
      </div>
    </div>
  );
}

export default Step4;
