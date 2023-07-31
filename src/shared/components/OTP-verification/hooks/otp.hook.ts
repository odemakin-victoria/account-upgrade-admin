import React, { useEffect, useRef, useState } from 'react'

export default function useOtpHook() {

    const [refIdx, setRefIdx] = useState(0);
    const [inputValue, setValue] = useState<{[x:string]:string}>({})
    const inputRef = useRef<HTMLInputElement[]>([]);

    // chnages the input values
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const name = e.target.name;
        const value = e.target.value

        setValue({...inputValue, [name]:value})

    }
    
    // we need this to handle the movement between inputs
    const onkeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && refIdx >= 0) {
        e.preventDefault();
        inputRef.current[refIdx].value = "";
        focusPrevInput();
        return;
      }
  
      if (checkIfInputHasData(refIdx)) {
        focusOnNextInput();
      }
    };
  
    const checkIfInputHasData = (idx: number) => {
      if (inputRef.current[idx].value.trim() === "") {
        return false;
      }
      return true;
    };
    const focusOnNextInput = () => {
      if (refIdx === inputRef.current.length - 1) {
        return;
      }
      inputRef.current[refIdx + 1].focus();
      setRefIdx(refIdx + 1);
    };
  
    const focusPrevInput = () => {
      if (refIdx > 0) {
        inputRef.current[refIdx - 1].focus();
        setRefIdx(refIdx - 1);
      }
    };
  
    useEffect(() => {
      inputRef.current[0].focus();
    }, []);

    const getOtpValues = ():string[] => {

       return Object.values(inputValue)
    }

    return {
        onkeydown,
        focusOnNextInput,
        focusPrevInput,
        setRefIdx,
        inputRef,
        handleChange,
        getOtpValues,
        inputValue
    }
}
