interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customStyle?: string;
}

export function Input({ customStyle, ...rest }: InputProps) {
  return (
    <div className='flex gap-2 border-2 border-blue-900 rounded-xl p-2 w-full'>
      <input
        {...rest}
        className={`outline-0 bg-transparent ${customStyle} w-full`}
      />
    </div>
  );
}
