import { ILabelProps } from "./types";

export default function Label({ ...props }: ILabelProps) {
  const { children, labelName,required, ...rest } = props;
  return (
    <label htmlFor={labelName} className="text-base flex items-center  mb-2  text-text-gray font-semibold" {...rest} >
      {children}

      {required && <>&nbsp;<span className="text-red-500" aria-hidden="true">*</span> <span className="visible-hidden">required</span></>}
    </label>
  );
}
