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

  const [plan, planPeriod, addons] = watch(['plan', 'planPeriod', 'addons']);

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
      <div className="w-full rounded-[8px] bg-light-grey px-[16px] py-[16px] sm:px-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[7px]">
            <p className="font-body-l font-medium text-denim">{`${uppercaseAtIndex(
              selectedPlan?.name || '',
              0,
            )} (${uppercaseAtIndex(planPeriod, 0)})`}</p>
            <button className="w-fit font-body-s text-grey underline">
              change
            </button>
          </div>
          <p className="font-body-l font-bold text-denim">
            {generatePriceText(
              selectedPlan?.price || 0,
              selectedPlan?.yearlyFreeMonths || 0,
              planPeriod,
            )}
          </p>
        </div>

        {!!selectedAddons.length && (
          <>
            <div className="my-[12px] h-[1px] w-full bg-border-color sm:mt-[24px] sm:mb-[16px]" />
            <div className="flex flex-col gap-[12px] sm:gap-[16px]">
              {selectedAddons.map(addon => {
                const { name, price } = addon;
                const addonPrice = generatePriceText(
                  price,
                  selectedPlan?.yearlyFreeMonths || 0,
                  planPeriod,
                );

                return (
                  <div key={name} className="flex items-center justify-between">
                    <p className="text-grey">{uppercaseAtIndex(name, 0)}</p>
                    <p className="text-denim">{`+${addonPrice}`}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="mt-[24px] flex items-center justify-between px-[16px] sm:px-[24px]">
        <p className="text-grey">{`Total (per ${
          planPeriod === 'yearly' ? 'year' : 'month'
        })`}</p>
        <p className="font-body-l leading-[20px] font-bold text-purple sm:font-body-xl">
          +${totalPrice}/{PERIOD_LABEL_MAP[planPeriod]}
        </p>
      </div>
    </div>
  );
}

export default Step4;
