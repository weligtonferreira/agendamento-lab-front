'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customStyle?: string;
}

export function PasswordInput({ customStyle, ...rest }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function showPassword() {
    setIsPasswordVisible(true);
  }

  function hidePassword() {
    setIsPasswordVisible(false);
  }

  return (
    <div className='flex justify-center items-center gap-2 border-2 border-blue-900 rounded-xl p-2 w-full'>
      <input
        {...rest}
        type={isPasswordVisible ? 'text' : 'password'}
        className={`outline-0 bg-transparent ${customStyle} w-full`}
      />

      {isPasswordVisible ? (
        <FaEye onClick={hidePassword} size={16} className='cursor-pointer' />
      ) : (
        <FaEyeSlash
          onClick={showPassword}
          size={16}
          className='cursor-pointer'
        />
      )}
    </div>
  );
}
