import { SubmitHandler, useForm } from "react-hook-form";
import user from "../../assets/icons/user.svg";
import FormErrorLine from "../../components/reusable/FormErrorLine";
import check from "../../assets/icons/fi-br-check.svg";
import { useMutation } from "@tanstack/react-query";
import { handleSendOtp } from "../../api/auth";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

type PhoneFormData = {
  phone: number;
};

type Props = {
  setStep: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
};

const PhoneNumberForm = ({ setStep, setPhone }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData>();

  // send otp mutation
  const { mutate, isPending } = useMutation({
    mutationFn: handleSendOtp,
    onSuccess: (msg) => {
      toast.success(msg);
      setStep("otp");
    },
    onError: (err: string) => {
      toast.error(err);
      setPhone("");
    },
  });

  const onSubmit: SubmitHandler<PhoneFormData> = (data) => {
    mutate(data.phone.toString());
    setPhone(data.phone.toString());
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-4"
    >
      <div className="flex flex-col gap-[6px]">
        <p className="font-inter text-[16px] font-medium text-[#6B7280]">
          Phone Number*
        </p>

        <div className="relative flex gap-2 items-center bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-6 h-[64px] w-full">
          {/* <img src={Group} alt="" /> */}
          <img src={user} alt="" />
          <input
            className="bg-[#F3F4F6]  w-full  focus:outline-none"
            type="tel"
            {...register("phone", { required: "Enter you phone number!" })}
          />
        </div>
        {errors.phone && <FormErrorLine message={errors.phone?.message} />}
      </div>

      <button className="bg-[#F97316] text-white w-36 flex items-center gap-1 rounded-xl h-14 justify-center px-4 py-4 font-inter text-[16px] font-medium">
        {isPending ? (
          <PulseLoader color="#cdcfd1" size={6} />
        ) : (
          <>
            Send OTP
            <img src={check} alt="" className="ml-2" />
          </>
        )}
      </button>
    </form>
  );
};
export default PhoneNumberForm;
