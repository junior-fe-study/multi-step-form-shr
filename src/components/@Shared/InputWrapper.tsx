import React from 'react';

function InputWrapper({
  children,
  label,
  error,
}: {
  children: React.ReactNode;
  label: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-[3px] sm:gap-[8px]">
      <div className="flex justify-between font-body-s sm:font-body-m">
        <label className="text-denim">{label}</label>
        {error && <p className="font-bold text-red-errors">{error}</p>}
      </div>
      {children}
    </div>
  );
}

export default InputWrapper;
