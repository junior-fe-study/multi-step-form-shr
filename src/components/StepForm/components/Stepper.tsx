import { cn } from '@/utils/cn';
import { STEPS } from '../constants/steps';

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="rounded-[10px] bg-[#483EFF] w-[274px] h-full pt-[40px] pl-[32px]">
      <div className="flex flex-col gap-[32px]">
        {STEPS.map((step, idx) => {
          const stepNumber = idx + 1;
          const isActive = currentStep === idx + 1;
          return (
            <div key={step.label} className="flex items-center gap-[16px]">
              <div
                className={cn(
                  'rounded-full flex items-center justify-center size-[33px]',
                  isActive
                    ? 'bg-sky-blue text-denim'
                    : 'bg-transparent text-white border-1 border-white',
                )}
              >
                {stepNumber}
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className="text-light-blue font-body-s">{`STEP ${stepNumber}`}</p>
                <p className="text-white font-bold">{step.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;
