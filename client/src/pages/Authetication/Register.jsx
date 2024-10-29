import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/redux/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialstate = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialstate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
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
            Create new account
          </h1>
          <p className="mt-2">
            Alerady have an Account ?{" "}
            <Link
              className="font-medium hover:underline cursor-pointer ml-2 text-primary hover:text-sky-500"
              to="/auth/login"
            >
              Sign In
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default Register;
