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
    <div className="flex flex-col gap-[8px]">
      <div className="flex justify-between">
        <label className="text-denim font-body-m">{label}</label>
        {error && <p className="text-red-errors font-bold">{error}</p>}
      </div>
      {children}
    </div>
  );
}

export default InputWrapper;
