import { forwardRef } from "react";
import { InputProps } from "./types";

const Input = forwardRef(({ ...props }: InputProps, ref?: any) => {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      {...rest}
      className={`border border-gray-200 h-12 p-4 w-full rounded-md focus:shadow-md focus:outline-b-300 outline-none ${className} placeholder:text-gray-400 `}
    />
  );
});

export default Input;
