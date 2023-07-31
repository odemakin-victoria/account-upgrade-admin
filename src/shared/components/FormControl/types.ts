import { InputProps } from "@/shared/components/Input/types";


export type IFormInputProps = {
    variant: 'input' | 'textarea' | 'select'|'image'|'DatePicker';
    fieldName: string,
    removeImage?:(args:string)=>void

    options?: {
      label: string;
      value: string;
    }[];
  } & React.HTMLProps<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  