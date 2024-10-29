import CommonForm from "@/components/common/CommonForm";
import { loginFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialstate = {
  email: "",
  password: "",
};

const Login = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialstate);
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  console.log(formData);

  return (
    <>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center ">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to India-Mart <FaCartArrowDown className="inline" />
          </h1>
          <p className="mt-2">
            Don't have an Account ?
            <Link
              className="font-medium hover:underline cursor-pointer ml-2 text-primary hover:text-sky-500"
              to="/auth/register"
            >
              Sign Up
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default Login;
