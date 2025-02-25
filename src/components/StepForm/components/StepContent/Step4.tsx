import { useFormContext } from 'react-hook-form';
import { PLANS } from './Step2/Step2';
import { ADD_ONS } from './Step3';

function Step4() {
  const { watch } = useFormContext();

  const plan = watch('plan');
  const planPeriod = watch('planPeriod');
  const addons = watch('addons');

  const periodUnit = planPeriod === 'yearly' ? 'yr' : 'mo';
  const { price: planPrice, name: planName } =
    PLANS[plan as keyof typeof PLANS];

  const totalPrice = addons.reduce(
    (acc: number, addon: string) =>
      acc +
      ADD_ONS[addon as keyof typeof ADD_ONS].price[
        planPeriod as keyof (typeof ADD_ONS)[string]['price']
      ],
    planPrice[planPeriod as keyof typeof planPrice],
  );

  return (
    <div>
      <div className="w-full rounded-[8px] bg-light-grey py-[16px] px-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[7px]">
            <p className="text-denim font-body-l font-medium">{`${planName} (${
              planPeriod === 'yearly' ? 'Yearly' : 'Monthly'
            })`}</p>
            <button className="text-grey font-body-s underline w-fit">
              change
            </button>
          </div>
          <p className="text-denim font-body-l font-bold">
            ${planPrice[planPeriod as keyof typeof planPrice]}/{periodUnit}
          </p>
        </div>

        <div className="w-full h-[1px] bg-border-color mt-[24px] mb-[16px]" />

        <div className="flex flex-col gap-[16px]">
          {addons.map((addon: string) => {
            const _addon = ADD_ONS[addon as keyof typeof ADD_ONS];
            return (
              <div key={addon} className="flex items-center justify-between">
                <p className="text-grey">{_addon.name}</p>
                <p className="text-denim">{`+$${
                  _addon.price[planPeriod as keyof typeof _addon.price]
                }/${periodUnit}`}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-[24px] mt-[24px] flex items-center justify-between">
        <p className="text-grey">{`Total (per ${planPeriod})`}</p>
        <p className="text-purple font-body-xl font-bold">
          +${totalPrice}/{periodUnit}
        </p>
      </div>
    </div>
  );
}

export default Step4;
