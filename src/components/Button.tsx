interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className='bg-blue-900 hover:bg-blue-800 rounded-xl p-2 cursor-pointer w-full transition-colors'
    >
      {children}
    </button>
  );
}
