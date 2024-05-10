import { useForm } from "react-hook-form";
import FormErrorLine from "../../components/reusable/FormErrorLine";
import Button from "../../components/reusable/Button";
import upload from "../../assets/icons/upload-file.svg";
import addCircle from "../../assets/icons/add-circle.svg";
const AddVarietyModal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <dialog id="add_variety_modal" className="modal">
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
                htmlFor="varietyName"
              >
                Variety Name*
              </label>
              <input
                {...register("varietyName", {
                  required: {
                    value: true,
                    message: "Variety Name are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="text"
                placeholder="eg., Tomato"
              />
              {errors.varietyName && (
                <FormErrorLine message={errors.varietyName.message as String} />
              )}
            </div>
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="varietyValue"
              >
                Variety Value*
              </label>
              <input
                {...register("varietyValue", {
                  required: {
                    value: true,
                    message: "Variety Value are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="text"
                placeholder="eg., Red"
              />
              {errors.varietyValue && (
                <FormErrorLine
                  message={errors.varietyValue.message as String}
                />
              )}
            </div>
          </div>
          <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
            <label
              className="font-inter font-medium text-base text-accent-500"
              htmlFor="varietyDescription"
            >
              Variety Description*
            </label>
            <input
              {...register("varietyDescription", {
                required: {
                  value: true,
                  message: "Variety Description are required",
                },
              })}
              className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
              type="text"
              placeholder="Description goes here..."
            />
            {errors.varietyDescription && (
              <FormErrorLine
                message={errors.varietyDescription.message as String}
              />
            )}
          </div>
          <hr className="mt-5 opacity-60" />
          <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="originalPrice"
              >
                Original Price*
              </label>
              <input
                {...register("originalPrice", {
                  required: {
                    value: true,
                    message: "Original Price are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                placeholder="eg., 1000"
              />
              {errors.originalPrice && (
                <FormErrorLine
                  message={errors.originalPrice.message as String}
                />
              )}
            </div>
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="discountPrice"
              >
                Discount Price*
              </label>
              <input
                {...register("discountPrice", {
                  required: {
                    value: true,
                    message: "Discount Price are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                placeholder="eg., 200"
              />
              {errors.discountPrice && (
                <FormErrorLine
                  message={errors.discountPrice.message as String}
                />
              )}
            </div>
          </div>
          <hr className="mt-5 opacity-60" />
          <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="unit"
              >
                Unit*
              </label>
              <input
                {...register("unit", {
                  required: {
                    value: true,
                    message: "Unit is required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="text"
                placeholder="eg., KG"
              />
              {errors.unit && (
                <FormErrorLine message={errors.unit.message as String} />
              )}
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
                    message: "Quantity are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                placeholder="eg., 20"
              />
              {errors.quantity && (
                <FormErrorLine message={errors.quantity.message as String} />
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="tags"
              >
                Tags*
              </label>
              <input
                {...register("tags", {
                  required: {
                    value: true,
                    message: "Tags are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="text"
                placeholder="eg., tag1, tag2"
              />
              {errors.tags && (
                <FormErrorLine message={errors.tags.message as String} />
              )}
            </div>
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="brands"
              >
                Brands*
              </label>
              <input
                {...register("brands", {
                  required: {
                    value: true,
                    message: "Brands are required",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="text"
                placeholder="eg., brand1"
              />
              {errors.brands && (
                <FormErrorLine message={errors.brands.message as String} />
              )}
            </div>
          </div>
          <hr className="mt-5 opacity-60" />

          <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
            <label
              className="font-inter font-medium text-base text-accent-500"
              htmlFor="varietyDescription"
            >
              Variety Images*
            </label>
            <Button
              type="button"
              variant="accent/200"
              className="flex items-center justify-between bg-accent-100"
            >
              <span>Upload Proof </span>
              <img className="h-5 w-5" src={upload} alt="" />
            </Button>
          </div>
          <Button className="mt-5 flex gap-2 ml-auto">
            <span>Add Variety</span>
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
export default AddVarietyModal;
