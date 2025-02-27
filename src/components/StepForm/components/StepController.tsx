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
  const { watch } = useFormContext<StepFormSchemaType>();

  const handleConfirm = () => {
    console.log('confirm');
  };

  const checkStepValidation = () => {
    const { email, name, phone, plan, planPeriod, addons } = watch();

    switch (step) {
      case 1:
        return !email || !name || !phone;
      case 2:
        return !plan || !planPeriod;
      case 3:
        return !addons;
      case 4:
        return false;
    }
  };

  return (
    <div className="flex justify-between">
      {step !== START_STEP ? (
        <button
          onClick={() => changeStep(step - 1)}
          className="text-grey font-body-l"
        >
          Go Back
        </button>
      ) : (
        <div></div>
      )}

      {step === MAX_STEP ? (
        <button
          onClick={handleConfirm}
          className="rounded-[8px] bg-purple px-[25px] h-[48px] flex items-center justify-center text-white"
        >
          Confirm
        </button>
      ) : (
        <button
          onClick={() => changeStep(step + 1)}
          disabled={checkStepValidation()}
          className="rounded-[8px] bg-denim px-[25px] h-[48px] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      )}
    </div>
  );
}

export default StepController;
