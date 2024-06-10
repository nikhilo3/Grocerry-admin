import { useState } from "react";
import Group from "../../assets/icons/Group.svg";
import user from "../../assets/icons/user.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import eye from "../../assets/icons/eye-alt-svgrepo-com.svg";
import eyeClosed from "../../assets/icons/eye-slash-svgrepo-com.svg";
import check from "../../assets/icons/fi-br-check.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleLoginService } from "../../api/auth";
import toast from "react-hot-toast";

interface FormData {
  userName: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: handleLoginService,
    onSuccess: (data) => {
      navigate("/");
      toast.success(data);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const handleLogin = (data: FormData): void => {
    mutate(data);
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
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-[6px]">
            <p className="font-inter text-[16px] font-medium text-[#6B7280]">
              Username*
            </p>

            <div className="relative flex gap-2 items-center bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-6 h-[64px] w-full">
              {/* <img src={Group} alt="" /> */}
              <img src={user} alt="" />
              <input
                className="bg-[#F3F4F6]  w-full  focus:outline-none"
                placeholder="John Doe"
                type="text"
                {...register("userName", { required: "Enter your email" })}
              />
            </div>
            {errors.userName && (
              <span className="text-rose-600 font-inter">
                {errors.userName?.message}
              </span>
            )}
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
                {...register("password", { required: "Enter your password" })}
              />

              <div
                onClick={handlePasswordToggle}
                className="absolute right-0 px-6 cursor-pointer"
              >
                {showPassword ? (
                  <img src={eyeClosed} alt="" className="w-[24px] h-[24px]" />
                ) : (
                  <img src={eye} alt="" className="w-[24px] h-[24px]" />
                )}
              </div>
            </div>
            {errors.password && (
              <span className="text-rose-600 font-inter">
                {errors.password?.message}
              </span>
            )}
          </div>

          <button className="bg-[#F97316] text-white flex items-center gap-1 rounded-xl w-full sm:w-40 px-12 py-4 font-inter text-[16px] font-medium">
            {isPending ? (
              "Loading..."
            ) : (
              <>
                Login
                <img src={check} alt="" className="ml-2" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
