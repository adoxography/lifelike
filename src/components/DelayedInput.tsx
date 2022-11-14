import { ChangeEvent, FocusEvent, KeyboardEvent, InputHTMLAttributes } from 'react';
import { useState, useEffect } from 'react';

type DelayedInputProps = InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  value: string | number;
  onChange: (newValue: string | number) => void;
};

const DelayedInput = ({ onChange, type, value, ...props }: DelayedInputProps) => {
  const [internalValue, setInternalValue] = useState<string | number>('');

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleInternalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChange(e);
    }
  };

  const handleChange = (e: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    if (type === 'number') {
      onChange(parseInt(value || '0'));
    } else {
      onChange(value);
    }
  };

  return (
    <input
      type={type}
      onBlur={handleChange}
      onKeyDown={handleKeyDown}
      value={internalValue}
      onChange={handleInternalChange}
      {...props}
    />
  );
};

export default DelayedInput;
