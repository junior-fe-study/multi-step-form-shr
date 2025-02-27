import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

function Input({ isInvalid = false, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-[16px] flex items-center rounded-[8px] h-[48px] border-1 border-border-color placeholder:text-grey text-denim font-medium font-body-l focus:border-purple',
        isInvalid ? 'border-red-errors' : 'border-border-color',
      )}
      {...props}
    />
  );
}

export default Input;
