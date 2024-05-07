import { useState } from "react";
import PhoneNumberForm from "./PhoneNumberForm";

const Login = () => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#E5E7EB] px-10 md:px-0">
      <div className="w-full md:w-[632px] flex flex-col gap-6 p-8 rounded-3xl bg-white border border-[#E5E7EB]">
        {/* Heading */}
        <div>
          <h1 className="font-inter text-[28px] font-medium text-[#374151]">
            Login to your Account
          </h1>
          <p className="font-inter text-[14px] font-normal text-[#6B7280]">
            Lorem ipsum dolor sit amet consectetur. Tortor elit{" "}
          </p>
          {step === "phone" && (
            <PhoneNumberForm setStep={setStep} setPhone={setPhone} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
