import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorLine from "../../components/reusable/FormErrorLine";
import Button from "../../components/reusable/Button";
import upload from "../../assets/icons/upload-file.svg";
import addCircle from "../../assets/icons/add-circle.svg";
import { Variety } from ".";
import { useEffect } from "react";

interface Props {
  setVarieties: React.Dispatch<React.SetStateAction<Variety[]>>;
  varieties: Variety[];
  selectedVariety: number | null;
}

const UpdateVarietyModal = ({
  setVarieties,
  selectedVariety,
  varieties,
}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Variety>();

  const onSubmit: SubmitHandler<Variety> = (data) => {
    if (selectedVariety !== null) {
      const updatedVarieties = [...varieties];
      updatedVarieties[selectedVariety] = data;
      setVarieties(updatedVarieties);
    }
    (
      document.getElementById("update_variety_modal") as HTMLDialogElement
    )?.close();
    reset();
  };

  useEffect(() => {
    if (selectedVariety !== null) {
      reset(varieties[selectedVariety]);
    }
  }, [selectedVariety]);

  return (
    <dialog id="update_variety_modal" className="modal">
      <div className="modal-box min-w-[632px] p-8 bg-white border border-accent-200 rounded-3xl hide-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-[20px] font-medium font-inter text-accent-700">
            Add New Variety
          </h3>
          <p className="font-inter font-normal text-sm mt-[2px] text-accent-500">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>

          <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="name"
              >
                Variety Name*
              </label>
              <input
                {...register("type", {
                  required: {
                    value: true,
                    message: "Variety Name is required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="text"
                placeholder="eg., Tomato"
              />
              {errors.type && <FormErrorLine message={errors.type.message} />}
            </div>
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="value"
              >
                Variety Value*
              </label>
              <input
                {...register("value", {
                  required: {
                    value: true,
                    message: "Variety Value are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="text"
                placeholder="eg., Red"
              />
              {errors.value && <FormErrorLine message={errors.value.message} />}
            </div>
          </div>
          <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
            <label
              className="font-inter font-medium text-base text-accent-500"
              htmlFor="description"
            >
              Variety Description*
            </label>
            <input
              {...register("description", {
                required: {
                  value: true,
                  message: "Variety Description are required",
                },
              })}
              className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
              type="text"
              placeholder="Description goes here..."
            />
            {errors.description && (
              <FormErrorLine message={errors.description.message} />
            )}
          </div>
          <hr className="mt-5 opacity-60" />
          <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="price"
              >
                Original Price*
              </label>
              <input
                {...register("price", {
                  required: {
                    value: true,
                    message: "Price are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                placeholder="eg., 1000"
              />
              {errors.price && <FormErrorLine message={errors.price.message} />}
            </div>
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="discounted_percent"
              >
                Discounted Percent*
              </label>
              <input
                {...register("discounted_percent", {
                  required: {
                    value: true,
                    message: "Discount Price are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                placeholder="eg., 5"
              />
              {errors.discounted_percent && (
                <FormErrorLine message={errors.discounted_percent.message} />
              )}
            </div>
          </div>
          <hr className="mt-5 opacity-60" />
          <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="units"
              >
                Units*
              </label>
              <input
                {...register("units", {
                  required: {
                    value: true,
                    message: "Units is required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="text"
                placeholder="eg., KG"
              />
              {errors.units && <FormErrorLine message={errors.units.message} />}
            </div>
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="quantity"
              >
                Quantity*
              </label>
              <input
                {...register("quantity", {
                  required: {
                    value: true,
                    message: "Quantity is required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                placeholder="eg., 20"
              />
              {errors.quantity && (
                <FormErrorLine message={errors.quantity.message} />
              )}
            </div>
          </div>

          <hr className="mt-5 opacity-60" />

          <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
            <label
              className="font-inter font-medium text-base text-accent-500"
              htmlFor="description"
            >
              Variety Images*
            </label>
            <Button
              type="button"
              variant="accent/200"
              className="flex items-center justify-between bg-accent-100"
            >
              <span>Upload Images </span>
              <img className="h-5 w-5" src={upload} alt="" />
            </Button>
          </div>
          <Button className="mt-5 flex gap-2 ml-auto">
            <span>Update Variety</span>
            <img className="h-5 w-5" src={addCircle} alt="" />
          </Button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop opacity-0">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default UpdateVarietyModal;
