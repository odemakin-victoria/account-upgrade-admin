import React from "react";
import { IButtonProps } from "./types";
import { CgSpinner } from "react-icons/cg"



export default function Button({ children, ...props }: IButtonProps) {
  const { variant, className, isLoading, ...rest } = props;
  return (
    <button className={`text-center min-h-12 btn-${variant} ${className} `} {...rest} >
      <LoadingIcon isLoading={isLoading} />
      {!isLoading && children}
    </button>
  );
}

function LoadingIcon({ isLoading }: { isLoading?: boolean }) {


  if (isLoading) {
    return <div className="w-full flex justify-center">
      <CgSpinner className="animate-spin text-2xl" />
    </div>
  }

  return null;
}