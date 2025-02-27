export type BasePlanName = 'arcade' | 'advanced' | 'pro';
export type AddOnName =
  | 'online service'
  | 'larger storage'
  | 'customizable profile';

export interface BasePlan {
  id: number;
  name: BasePlanName;
  price: number;
  yearlyFreeMonths: number;
}

export interface AddOn {
  id: number;
  name: AddOnName;
  price: number;
}

export interface Plan {
  base: BasePlan[];
  addOns: AddOn[];
}
