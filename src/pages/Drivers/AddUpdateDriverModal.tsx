import FormErrorLine from "../../components/reusable/FormErrorLine";
import { PulseLoader } from "react-spinners";
import crossSvg from "../../assets/icons/cross-black.svg";
import Button from "../../components/reusable/Button";
import checkIcon from "../../assets/icons/checked.svg";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
  id: string;
  isEditDriverModal: boolean;
  handleFormSubmit: (data: DriverFormData) => void;
  isPending: boolean;
  defaultValues?: DriverFormData;
  isSubmitSuccess: boolean;
};

export type DriverFormData = {
  name: string;
  contactNo: string;
  vehicleNo: string;
};

const AddUpdateDriverModal = ({
  id,
  isSubmitSuccess,
  isEditDriverModal,
  handleFormSubmit,
  isPending,
  defaultValues,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriverFormData>();

  const onSubmit = (data: DriverFormData) => {
    handleFormSubmit(data);
  };

  useEffect(() => {
    if (isEditDriverModal && defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, isEditDriverModal]);

  // reset form on successful submission
  useEffect(() => {
    if (isSubmitSuccess) {
      reset();
    }
  }, [isSubmitSuccess]);

  return (
    <div>
      <dialog id={id} className="modal">
        <div className="modal-box p-8 min-w-[752px] scrollbar-md">
          <div className="flex flex-col gap-6 justify-center w-full">
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="font-medium text-[28px] text-accent-700">
                  {isEditDriverModal ? "Edit Driver" : "Add Driver"}
                </h1>
              </div>
              <button
                onClick={() => {
                  reset();
                  (document.getElementById(id) as HTMLDialogElement)?.close();
                }}
              >
                <img className="h-8 w-8" src={crossSvg} alt="" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 justify-center w-full"
            >
              <div className="flex  items-center  gap-[26px]">
                <div className="flex flex-col justify-center gap-[6px]">
                  <label
                    className="text-accent-500 text-base font-medium"
                    htmlFor="name"
                  >
                    Full Name*
                  </label>
                  <div className="py-[18px] px-4 bg-accent-50 border-accent-100 border rounded-xl w-[331px]">
                    <input
                      {...register("name", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      type="text"
                      className="outline-none text-[18px] font-medium  w-full bg-accent-50"
                      placeholder="eg., John Doe"
                    />
                  </div>
                  {errors.name && (
                    <FormErrorLine message={errors.name.message} />
                  )}
                </div>
                <div className="flex flex-col justify-center gap-[6px]">
                  <label
                    className="text-accent-500 text-base font-medium"
                    htmlFor="mobile"
                  >
                    Mobile No*
                  </label>
                  <div className="py-[18px] px-4 bg-accent-50 border-accent-100 border rounded-xl w-[331px]">
                    <input
                      {...register("contactNo", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      type="text"
                      className="outline-none text-[18px]  font-medium  w-full bg-accent-50"
                      placeholder="eg., +91 9284729802"
                    />
                  </div>
                  {errors.contactNo && (
                    <FormErrorLine message={errors.contactNo.message} />
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-[6px]">
                <label
                  className="text-accent-500 text-base font-medium"
                  htmlFor="vehicleNo"
                >
                  Vehicle Number*
                </label>
                <div className="py-[18px] px-4 bg-accent-50 border-accent-100 border rounded-xl w-full">
                  <input
                    {...register("vehicleNo", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    type="text"
                    className="outline-none text-[18px]  font-medium  w-full bg-accent-50"
                    placeholder="eg., MH 12 AB 1234"
                  />
                </div>
                {errors.vehicleNo && (
                  <FormErrorLine message={errors.vehicleNo.message} />
                )}
              </div>

              <div className="flex justify-end">
                <Button className="flex justify-center items-center gap-2 px-6 py-4">
                  {isPending ? (
                    <PulseLoader color="#cdcfd1" size={6} />
                  ) : (
                    <>
                      <span>{isEditDriverModal ? "Update" : "Add"}</span>
                      <img src={checkIcon} alt="" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddUpdateDriverModal;
