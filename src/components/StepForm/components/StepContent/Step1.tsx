import { useFormContext } from 'react-hook-form';

import Input from '@/components/@Shared/Input';
import InputWrapper from '@/components/@Shared/InputWrapper';
import { StepFormSchemaType } from '../../hooks/useStepForm';

const STEP_1_FIELDS: Record<
  keyof Pick<StepFormSchemaType, 'name' | 'email' | 'phone'>,
  {
    label: string;
    placeholder: string;
  }
> = {
  name: {
    label: 'Name',
    placeholder: 'e.g. Stephen King',
  },
  email: {
    label: 'Email Address',
    placeholder: 'e.g. stephenking@lorem.com',
  },
  phone: {
    label: 'Phone Number',
    placeholder: 'e.g. +1 234 567 890',
  },
};

function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {Object.entries(STEP_1_FIELDS).map(([key, field]) => (
        <InputWrapper
          key={key}
          label={field.label}
          error={errors[key]?.message as string}
        >
          <Input placeholder={field.placeholder} {...register(key)} />
        </InputWrapper>
      ))}
    </>
  );
}

export default Step1;
