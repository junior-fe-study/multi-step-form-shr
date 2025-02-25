interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  option?: string;
}

function Input({ ...props }: InputProps) {
  return (
    <input
      className="w-full px-[16px] flex items-center rounded-[8px] h-[48px] border-1 border-border-color placeholder:text-grey text-denim font-medium font-body-l focus:outline-purple invalid:outline-red-errors"
      {...props}
    />
  );
}

export default Input;
