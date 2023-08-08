import { Button, FormControl, Label } from "@/shared/components";
import { FormProvider, useForm } from "react-hook-form";
import { loginValidationSchema } from "./validation.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import UsePageTitle from "@/utils/page-title.hook";
import { ACCOUNT_UPDATE_REQUEST, DASHBOARD_ROUTE_UPDATE } from "../routes-config";
import { useLoginRequest } from "./hooks/queries.hooks";
import { useAuthContext } from "@/utils/auth.context";
import { useState } from "react";
import { motion } from "framer-motion";
import BG from "./assets/images/login_bg.jpg"

export default function Login() {
  UsePageTitle("Login");
  const methods = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  const [isLoading, setIsLoading] = useState(false)
  let location = useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || DASHBOARD_ROUTE_UPDATE;
  const auth = useAuthContext();

  const handleSubmit = async (data: { username: string; password: string }) => {

    setIsLoading(true)
    try {
      auth.login({
        username: data.username,
        password: data.password,
        callback: () =>{
          navigate(from)
          setIsLoading(false)
        },
      });
      
    } catch (error) {
      setIsLoading(false)
    }
   
  };

  return (
    <div className="h-screen bg-blue-100 px-20 py-9" data-testid="page-layout" style={{
      backgroundImage: `url(${BG})`,
      backgroundSize:"cover"
    }}>
      <img
        src="https://optimusbank.com/assets/images/header/Optimus_Logo.svg"
        alt="logo"
      />

      <motion.div animate={{
        y:[-24,0],
        opacity:1
        
      }} className="flex justify-center items-center w-full flex-grow mt-28">
        <div className="w-[514px] bg-white p-11 shadow-lg">
          <h1 className="text-2xl font-medium mb-10 text-text-gray">
            Customer Update Portal
          </h1>

          <FormProvider {...methods}>
            <div className="mb-6 ">
              <Label labelName="login">Username</Label>
              <FormControl
                fieldName="username"
                variant="input"
                id="login"
                type="text"
                placeholder="Enter your AD Username"
                className="focus:ring-2 ring-blue-500/50"
              />
            </div>

            <div className="mb-10">
              <Label labelName="password">Password</Label>
              <FormControl
                fieldName="password"
                variant="input"
                id="password"
                type="password"
                placeholder="Enter your Password"
              />
            </div>

            <Button
              type="button"
              variant="primary"
              className="font-normal"
              onClick={methods.handleSubmit(handleSubmit)}
              isLoading={isLoading}
            >
              Login
            </Button>
          </FormProvider>
        </div>
      </motion.div>
    </div>
  );
}
