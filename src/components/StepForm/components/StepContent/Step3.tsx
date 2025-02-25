import { useFormContext } from 'react-hook-form';

import { cn } from '@/utils/cn';
import Checkbox from '@/components/@Shared/Checkbox';
import type { PlanPeriod } from './Step2/Step2';

interface Addon {
  name: string;
  description: string;
  price: {
    [key in PlanPeriod]: number;
  };
}
export const ADD_ONS: Record<string, Addon> = {
  onlineService: {
    name: 'Online service',
    description: 'Access to multiplayer games',
    price: {
      monthly: 1,
      yearly: 10,
    },
  },
  largerStorage: {
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
  customizableProfile: {
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
};

function Step3() {
  const { setValue, watch } = useFormContext();

  const addons = watch('addons');
  const planPeriod = watch('planPeriod');

  const periodUnit = planPeriod === 'yearly' ? 'yr' : 'mo';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    if (checked) {
      setValue('addons', [...addons, id]);
    } else {
      setValue(
        'addons',
        addons?.filter((name: string) => name !== id),
      );
    }
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {Object.entries(ADD_ONS).map(([key, option]) => {
        const isChecked = addons?.includes(key);

        return (
          <Checkbox
            key={key}
            id={key}
            className={cn(
              'gap-[24px] border-border-color border px-[24px] py-[18px] rounded-[8px] p-[18px] w-full',
              isChecked && 'border-purple bg-light-grey',
            )}
            checked={isChecked}
            onChange={handleChange}
          >
            <div className="flex items-center justify-between flex-1">
              <div className="flex flex-col gap-[7px] flex-1">
                <h3 className="font-body-l text-denim">{option.name}</h3>
                <p className="text-grey">{option.description}</p>
              </div>
              <span className="text-purple">
                +${option.price[planPeriod as PlanPeriod]}/{periodUnit}
              </span>
            </div>
          </Checkbox>
        );
      })}
    </div>
  );
}

export default Step3;
