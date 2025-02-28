import { cn } from '@/utils/cn';
import { STEPS } from '../constants/steps';
import DesignIcon from '@/assets/design.svg';
function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="fixed top-0 left-0 h-[172px] w-full overflow-hidden bg-[#483EFF] pt-[32px] sm:relative sm:h-full sm:w-[274px] sm:rounded-[10px] sm:pt-[40px] sm:pl-[32px]">
      <div className="relative z-10 flex justify-center gap-[16px] sm:flex sm:flex-col sm:justify-start sm:gap-[32px]">
        {STEPS.map((step, idx) => {
          const stepNumber = idx + 1;
          const isActive = currentStep === idx + 1;
          return (
            <div key={step.label} className="flex items-center gap-[16px]">
              <div
                className={cn(
                  'flex size-[33px] items-center justify-center rounded-full',
                  isActive
                    ? 'bg-sky-blue text-denim'
                    : 'border-1 border-white bg-transparent text-white',
                )}
              >
                {stepNumber}
              </div>
              <div className="hidden flex-col gap-[4px] sm:flex">
                <p className="font-body-s text-light-blue">{`STEP ${stepNumber}`}</p>
                <p className="font-bold text-white">{step.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute top-[-136px] left-[-162px] h-fit w-fit sm:top-auto sm:bottom-[-125px] sm:left-[-90px]">
        <DesignIcon className="h-[576px] w-[623px] sm:h-[393px] sm:w-[425px]" />
      </div>
    </div>
  );
}

export default Stepper;
