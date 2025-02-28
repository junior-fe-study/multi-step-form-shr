import { useFormContext } from 'react-hook-form';
import { StepFormSchemaType } from '../hooks/useStepForm';
import { MAX_STEP, START_STEP } from '../constants/steps';

function StepController({
  step,
  changeStep,
}: {
  step: number;
  changeStep: (step: number) => void;
}) {
  const {
    formState: { errors },
    watch,
  } = useFormContext<StepFormSchemaType>();

  const handleConfirm = () => {
    console.log('confirm');
  };

  const checkStepValidation = () => {
    const { email, name, phone, plan, planPeriod, addons } = watch();

    switch (step) {
      case 1:
        return (
          !email ||
          !name ||
          !phone ||
          !!errors.email ||
          !!errors.name ||
          !!errors.phone
        );
      case 2:
        return !plan || !planPeriod || !!errors.plan;
      case 3:
        return !addons || !!errors.addons;
      case 4:
        return false;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white p-[16px] sm:relative sm:bg-transparent sm:p-0">
      {step !== START_STEP ? (
        <button
          onClick={() => changeStep(step - 1)}
          className="font-body-l text-grey"
        >
          Go Back
        </button>
      ) : (
        <div></div>
      )}

      {step === MAX_STEP ? (
        <button
          onClick={handleConfirm}
          className="flex h-[40px] items-center justify-center rounded-[4px] bg-purple px-[16px] text-white sm:h-[48px] sm:rounded-[8px] sm:px-[25px]"
        >
          Confirm
        </button>
      ) : (
        <button
          onClick={() => changeStep(step + 1)}
          disabled={checkStepValidation()}
          className="flex h-[40px] items-center justify-center rounded-[4px] bg-denim px-[16px] text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-[48px] sm:rounded-[8px] sm:px-[25px]"
        >
          Next Step
        </button>
      )}
    </div>
  );
}

export default StepController;
