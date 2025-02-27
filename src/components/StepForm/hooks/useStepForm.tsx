import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AddOnName } from '@/api/plans/plan.model';
import { BasePlanName } from '@/api/plans/plan.model';

export type PlanPeriod = 'yearly' | 'monthly';

export const PLAN_PERIOD: PlanPeriod[] = ['yearly', 'monthly'];
export const BASE_PLANS: BasePlanName[] = ['arcade', 'advanced', 'pro'];
export const ADD_ONS: AddOnName[] = [
  'online service',
  'larger storage',
  'customizable profile',
];

const StepFormSchema = yup.object({
  name: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
  phone: yup.string().required('This field is required'),
  plan: yup.string().oneOf(BASE_PLANS).required('This field is required'),
  planPeriod: yup
    .string()
    .oneOf(PLAN_PERIOD)
    .required('This field is required'),
  addons: yup
    .array()
    .of(yup.string().oneOf(ADD_ONS))
    .required('This field is required'),
});

export type StepFormSchemaType = yup.InferType<typeof StepFormSchema>;

const useStepForm = () => {
  return useForm<StepFormSchemaType>({
    resolver: yupResolver(StepFormSchema),
    defaultValues: {
      planPeriod: 'monthly',
      addons: [],
    },
  });
};

export default useStepForm;
