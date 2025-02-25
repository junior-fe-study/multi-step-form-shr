'use client';

import React, { useState } from 'react';
import useStepForm from './hooks/useStepForm';
import { FormProvider } from 'react-hook-form';
import Stepper from './components/Stepper';
import StepHeader from './components/StepHeader';
import { STEPS } from './constants/steps';
import { Step1, Step2, Step3, Step4 } from './components/StepContent';
import StepController from './components/StepController';

function StepForm() {
  const [step, setStep] = useState(1);
  const methods = useStepForm();

  const changeStep = (step: number) => {
    setStep(step);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex gap-[100px] p-[16px] rounded-[15px] bg-white shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.1)] h-[600px] w-[940px]">
        <Stepper currentStep={step} />

        <div className="flex flex-col w-[450px] justify-between pt-[40px] pb-[16px]">
          <div className="flex flex-col gap-[35px] ">
            <StepHeader
              title={STEPS[step - 1].title}
              description={STEPS[step - 1].description}
            />
            {renderStep()}
          </div>

          <StepController step={step} changeStep={changeStep} />
        </div>
      </div>
    </FormProvider>
  );
}

export default StepForm;
