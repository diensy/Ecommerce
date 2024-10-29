import React from "react";
// import right from "../../../public/right.jpg";
import right from "../../../public/Animation.gif";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[100vw] h-[100vw]">
        <div className="mx-auto w-1/2 h-[500px] mt-10 bg-slate-200 rounded shadow-sm shadow-black">
          <img
            src={right}
            alt="logo"
            className="h-40 w-40 mx-auto mt-10 rounded-full"
          />

          <div className="flex flex-col justify-center items-center gap-y-3">
            <h1 className="text-3xl font-bold">Payment Done!</h1>
            <p className="text-xl font-semibold">Thank you for completing your secure online payment.</p>
            <h3 className="text-2xl font-semibold ">Have a great day!</h3>
          <Button onClick={()=>navigate('/shop/home')} className="mt-5 px-10 bg-blue-600 hover:bg-blue-400">Go Back</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
