import { ISelectProps } from "./types";

export default function Select({ options, ...rest }: ISelectProps) {
  return (
    <select
      className="appearance-none border border-gray-200 h-12 p-4 w-full rounded-md focus:shadow-md focus:outline-b-300 outline-none"
      {...rest}
    >
      <option>Please select an option</option>
      {options?.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
