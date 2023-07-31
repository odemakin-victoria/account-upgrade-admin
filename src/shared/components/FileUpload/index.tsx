import { Label } from "@/shared/components";
import React from "react";

/**
 * Used in uploading documents or images within the project
 * @param {Boolean, string, string}
 * @returns Jsx.Element
 */
export default function ImageUpload({
  multiple,
  accept,
  name = "image-upload",
  handleChange,
  onBlur
}: {
  multiple?: boolean;
  accept?: string;
  name?: string;
  handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?:()=>void
}) {
  return (
    <div className="w-full border border-dashed border-gray-800">
      <Label
        labelName={name}
        className="bg-gray-100 p-4 border border-dashed w-full cursor-pointer inline-block text-center"
      >
        Choose File{multiple && "(s)"}
      </Label>
      <input
        type="file"
        id={name}
        className="hidden"
        multiple={multiple}
        accept={accept}
        name={name}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </div>
  );
}
