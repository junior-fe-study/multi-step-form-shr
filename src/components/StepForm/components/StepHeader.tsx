import { STEPS } from '../constants/steps';

function StepHeader({ step }: { step: number }) {
  const { title, description } = STEPS[step - 1];

  return (
    <div className="flex flex-col gap-[9px] sm:gap-[11px]">
      <h1 className="font-heading-s font-bold text-denim sm:font-heading">
        {title}
      </h1>
      <p className="font-body-l leading-[25px] text-grey">{description}</p>
    </div>
  );
}

export default StepHeader;
