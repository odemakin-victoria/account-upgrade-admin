import { Input } from "@/shared/components";
import { useEffect } from "react";
import useOtpHook from "./hooks/otp.hook";

export default function OtpInput({
  onCodeFilled,
}: {
  onCodeFilled: (args: string[]) => void;
}) {
  const {
    setRefIdx,
    focusOnNextInput,
    onkeydown,
    inputRef,
    handleChange,
    getOtpValues,
  } = useOtpHook();

  useEffect(() => {
    if (inputRef.current[5].value) {
      onCodeFilled(getOtpValues());
    }
  });

  return (
    <div className="flex gap-4 mb-10">
      <Input
        ref={(e: HTMLInputElement) => (inputRef.current[0] = e)}
        maxLength={1}
        tabIndex={-1}
        onKeyDown={onkeydown}
        name="otp1"
        aria-label="otp input 1"
        onChange={handleChange}
        onInput={focusOnNextInput}
        onFocus={() => setRefIdx(0)}
        className=" border-b-secondary text-primary h-20 text-2xl text-center focus:bg-blue-50"
      />
      <Input
        ref={(e: HTMLInputElement) => (inputRef.current[1] = e)}
        maxLength={1}
        onKeyDown={onkeydown}
        name="otp2"
        aria-label="otp input 2"
        onChange={handleChange}
        onInput={focusOnNextInput}
        onFocus={() => setRefIdx(1)}
        className=" border-b-secondary text-primary h-20 text-2xl text-center focus:bg-blue-50"
      />
      <Input
        ref={(e: HTMLInputElement) => (inputRef.current[2] = e)}
        maxLength={1}
        onKeyDown={onkeydown}
        name="otp3"
        aria-label="otp input 3"
        onChange={handleChange}
        onInput={focusOnNextInput}
        onFocus={() => setRefIdx(2)}
        className=" border-b-secondary text-primary h-20 text-2xl text-center focus:bg-blue-50"
      />
      <Input
        ref={(e: HTMLInputElement) => (inputRef.current[3] = e)}
        maxLength={1}
        onKeyDown={onkeydown}
        name="otp4"
        aria-label="otp input 4"
        onChange={handleChange}
        onFocus={() => setRefIdx(3)}
        className=" border-b-secondary text-primary h-20 text-2xl text-center focus:bg-blue-50"
      />    <Input
      ref={(e: HTMLInputElement) => (inputRef.current[4] = e)}
      maxLength={1}
      onKeyDown={onkeydown}
      name="otp5"
      aria-label="otp input 5"
      onChange={handleChange}
      onFocus={() => setRefIdx(5)}
      className=" border-b-secondary text-primary h-auto text-2xl text-center focus:bg-blue-50"
    />
     <Input
      ref={(e: HTMLInputElement) => (inputRef.current[5] = e)}
      maxLength={1}
      onKeyDown={onkeydown}
      name="otp6"
      aria-label="otp input 6"
      onChange={handleChange}
      onFocus={() => setRefIdx(5)}
      className=" border-b-secondary text-primary h-auto text-2xl text-center focus:bg-blue-50"
    />
    </div>
  );
}
