import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

function Input({ isInvalid = false, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'flex h-[40px] w-full items-center rounded-[4px] border-1 border-border-color px-[16px] font-body-l font-medium text-denim placeholder:text-grey focus:border-purple sm:h-[48px] sm:rounded-[8px]',
        isInvalid ? 'border-red-errors' : 'border-border-color',
      )}
      {...props}
    />
  );
}

export default Input;
