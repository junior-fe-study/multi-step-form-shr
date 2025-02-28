import { cn } from '@/utils/cn';

import CheckboxChecked from '@/assets/checkbox-checked.svg';
import CheckboxUnchecked from '@/assets/checkbox.svg';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  className?: string;
}

function Checkbox({ children, className, ...checkboxProps }: CheckboxProps) {
  const id = checkboxProps.id || 'checkbox';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <input
          type="checkbox"
          className="absolute h-0 w-0 opacity-0"
          id={id}
          {...checkboxProps}
        />
        <div
          className="inline-block cursor-pointer"
          onClick={() => {
            const input = document.getElementById(id) as HTMLInputElement;
            if (input) {
              input.click();
            }
          }}
        >
          {checkboxProps.checked ? <CheckboxChecked /> : <CheckboxUnchecked />}
        </div>
      </div>
      <label htmlFor={id} className="w-full">
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
