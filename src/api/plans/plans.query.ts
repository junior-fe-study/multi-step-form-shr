import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getPlans } from './plans';
import { Plan } from './plan.model';

export const usePlansQuery = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: () => getPlans(),
  });
};

export const usePlanSuspenseQuery = () => {
  return useSuspenseQuery<Plan>({
    queryKey: ['plans'],
    queryFn: () => getPlans(),
  });
};
