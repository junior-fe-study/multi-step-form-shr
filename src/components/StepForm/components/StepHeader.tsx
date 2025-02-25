import React from 'react';

function StepHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-[11px]">
      <h1 className="text-denim font-bold font-heading">{title}</h1>
      <p className="text-grey font-body-l">{description}</p>
    </div>
  );
}

export default StepHeader;
