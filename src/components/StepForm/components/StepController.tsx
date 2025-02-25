import { MAX_STEP, START_STEP } from '../constants/steps';

function StepController({
  step,
  changeStep,
}: {
  step: number;
  changeStep: (step: number) => void;
}) {
  const handleConfirm = () => {
    console.log('confirm');
  };

  return (
    <div className="flex justify-between">
      <button
        onClick={() => changeStep(step - 1)}
        className="text-grey font-body-l"
      >
        {step === START_STEP ? '' : 'Go Back'}
      </button>
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
          className="rounded-[8px] bg-denim px-[25px] h-[48px] flex items-center justify-center text-white"
        >
          Next Step
        </button>
      )}
    </div>
  );
}

export default StepController;
