import { useState } from "react";
import Group from "../../assets/Group.svg";
import { MdRemoveRedEye } from "react-icons/md";
import { RiEyeOffFill } from "react-icons/ri";
import { MdDone } from "react-icons/md";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
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
        </div>

        {/* Input fields and submit btn */}
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-[6px]">
            <p className="font-inter text-[16px] font-medium text-[#6B7280]">
              Username / Email*
            </p>

            <div className="relative flex gap-2 items-center bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-6 h-[64px] w-full">
              <img src={Group} alt="" />
              <input
                className="bg-[#F3F4F6]  w-full  focus:outline-none"
                placeholder="John Doe"
                type="email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <p className="font-inter text-[16px] font-medium text-[#6B7280]">
              Password*
            </p>

            <div className="relative flex gap-2 items-center bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-6 h-[64px] w-full">
              <img src={Group} alt="" />
              <input
                className="bg-[#F3F4F6]  w-full  focus:outline-none"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
              <div
                onClick={handlePasswordToggle}
                className="absolute right-0 px-6 cursor-pointer"
              >
                {showPassword ? (
                  <RiEyeOffFill className="text-[#374151] text-[24px]" />
                ) : (
                  <MdRemoveRedEye className="text-[#374151] text-[24px]" />
                )}
              </div>
            </div>
          </div>

          <button className="bg-[#F97316] text-white flex items-center gap-1 rounded-xl w-full sm:w-40 px-12 py-4 font-inter text-[16px] font-medium">
            Login
            <MdDone />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
