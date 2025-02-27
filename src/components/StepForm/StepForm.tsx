'use client';

import React, { useState } from 'react';
import useStepForm from './hooks/useStepForm';
import { FormProvider } from 'react-hook-form';
import Stepper from './components/Stepper';
import StepHeader from './components/StepHeader';
import { START_STEP } from './constants/steps';
import { Step1, Step2, Step3, Step4 } from './components/StepContent';
import StepController from './components/StepController';

function StepForm() {
  const [step, setStep] = useState(START_STEP);

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
      <div className="mx-[16px] flex h-[fit-content] w-[fit-content] sm:relative sm:h-[600px] sm:w-full sm:max-w-[940px] sm:rounded-[15px] sm:bg-white sm:p-[16px] sm:pr-0 sm:shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.1)]">
        <Stepper currentStep={step} />

        <div className="absolute top-[99px] left-0 mx-[16px] w-[calc(100%-32px)] rounded-[10px] bg-white px-[24px] py-[32px] sm:relative sm:top-0 sm:mx-auto sm:flex sm:h-full sm:w-full sm:max-w-[450px] sm:flex-1 sm:flex-col sm:justify-between sm:rounded-none sm:bg-transparent sm:px-[16px] sm:pt-[40px] sm:pb-[16px] sm:shadow-none">
          <div className="flex flex-col gap-[22px] sm:gap-[35px]">
            <StepHeader step={step} />
            {renderStep()}
          </div>

          <StepController step={step} changeStep={changeStep} />
        </div>
      </div>
    </FormProvider>
  );
}

export default StepForm;
