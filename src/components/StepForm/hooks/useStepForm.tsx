import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { PLAN_PERIOD, PLANS } from '../components/StepContent/Step2/Step2';
import { ADD_ONS } from '../components/StepContent/Step3';

const StepFormSchema = yup.object({
  name: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
  phone: yup.string().required('This field is required'),
  plan: yup
    .string()
    .oneOf(Object.keys(PLANS))
    .required('This field is required'),
  planPeriod: yup
    .string()
    .oneOf(PLAN_PERIOD)
    .required('This field is required'),
  addons: yup
    .array()
    .of(yup.string().oneOf(Object.keys(ADD_ONS)))
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
