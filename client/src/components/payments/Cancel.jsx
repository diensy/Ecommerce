import React from "react";
import cross from "../../../public/crossAnimation.gif";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const Cancel = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[100vw] h-[100vw]">
        <div className="mx-auto w-1/2 h-[500px] mt-10 bg-slate-200 rounded shadow-sm shadow-black">
          <img
            src={cross}
            alt="logo"
            className="h-40 w-40 mx-auto mt-10 rounded-full"
          />

          <div className="flex flex-col justify-center items-center gap-y-3">
            <h1 className="text-3xl font-bold">Payment Cancelled!</h1>
            <p className="text-xl font-semibold">Payment Failled by any problem try after some times</p>
            <h3 className="text-2xl font-semibold ">Please try Again</h3>
          <Button onClick={()=>navigate('/shop/home')} className="mt-5 px-10 bg-blue-600 hover:bg-blue-400">Go Back</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cancel;
