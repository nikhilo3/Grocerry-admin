import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorLine from "../../components/reusable/FormErrorLine";
import Button from "../../components/reusable/Button";
import upload from "../../assets/icons/upload-file.svg";
import addCircle from "../../assets/icons/add-circle.svg";
import { Variety } from ".";
import { useEffect, useRef, useState } from "react";
import { TYPES, UNIT } from "./AddVarietyModal";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
    watch,
    setValue,
  } = useForm<Variety>();
  const imagesRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const onSubmit: SubmitHandler<Variety> = (data) => {
    if (selectedVariety !== null) {
      const updatedVarieties = [...varieties];
      updatedVarieties[selectedVariety] = {
        ...data,
        documentUrls: images,
      };
      setVarieties(updatedVarieties);
    }
    (
      document.getElementById("update_variety_modal") as HTMLDialogElement
    )?.close();
    reset();
  };

  register("type", { required: "Variety Type is required" });
  register("unit", { required: "Unit is required" });

  useEffect(() => {
    if (selectedVariety !== null) {
      reset(varieties[selectedVariety]);
      setImages(varieties[selectedVariety].documentUrls);
    }
  }, [selectedVariety]);

  useEffect(() => {
    if (selectedVariety !== null) {
      const urls = varieties[selectedVariety].documentUrls ?? [];
      setImages(urls);
    }
  }, [varieties, selectedVariety]);

  const convertToUrl = (file: File | string) => {
    if (typeof file === "string") return file;
    return URL.createObjectURL(file);
  };

  return (
    <dialog id="update_variety_modal" className="modal">
      <div className="modal-box min-w-[632px] p-8 bg-white border border-accent-200 rounded-3xl hide-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-[20px] font-medium font-inter text-accent-700">
            Update Variety
          </h3>
          <p className="font-inter font-normal text-sm mt-[2px] text-accent-500">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>

          <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="type"
              >
                Variety Type*
              </label>
              <div className="dropdown w-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="font-normal btn m-1 w-full text-accent-500 text-left bg-background flex items-center justify-start"
                >
                  {watch("type") ?? "Select Variety Type"}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full px-4"
                >
                  {TYPES.map((type) => (
                    <li
                      key={type}
                      onClick={() => setValue("type", type)}
                      className="menu-item mt-2 cursor-pointer"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
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
                onScroll={(e) => e.preventDefault()}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="eg. 6"
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
                  min: {
                    value: 0,
                    message: "Price should be greater than 0",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="eg., 1000"
              />
              {errors.price && <FormErrorLine message={errors.price.message} />}
            </div>
            <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
              <label
                className="font-inter font-medium text-base text-accent-500"
                htmlFor="discountPercent"
              >
                Discounted Percent*
              </label>
              <input
                {...register("discountPercent", {
                  required: {
                    value: true,
                    message: "Discount Price are required",
                  },
                  min: {
                    value: 0,
                    message:
                      "Discount Price should be greater than or equal to 0",
                  },
                  max: {
                    value: 100,
                    message: "Discount Price should be less than 100",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="eg., 5"
              />
              {errors.discountPercent && (
                <FormErrorLine message={errors.discountPercent.message} />
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
              <div className="dropdown w-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="font-normal btn m-1 w-full text-accent-500 text-left bg-background flex items-center justify-start"
                >
                  {watch("unit") ?? "Select A Unit"}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full px-4 max-h-40 overflow-y-auto scrollbar-sm"
                >
                  {UNIT.map((type) => (
                    <li
                      key={type}
                      onClick={() => setValue("unit", type)}
                      className="menu-item mt-2 cursor-pointer"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
              {errors.unit && <FormErrorLine message={errors.unit.message} />}
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
                  min: {
                    value: 0,
                    message: "Quantity should be greater than 0",
                  },
                })}
                className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
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
              Variety Images
            </label>
            <input
              ref={imagesRef as any}
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files);
                  if (files.length > 4) {
                    toast.error("You can only upload maximum 4 images.");
                    const newFiles = files.slice(0, 4);
                    setImages(newFiles);
                  } else {
                    setImages(files);
                  }
                }
              }}
            />
            <Button
              type="button"
              onClick={() => (imagesRef.current as any).click()}
              variant="accent/200"
              className="flex items-center justify-between bg-accent-100"
            >
              <span>Upload Images </span>
              <img className="h-5 w-5" src={upload} alt="" />
            </Button>
            <div className="flex flex-col gap-1 ml-2">
              {images?.map((image, index) => (
                <div key={index} className="w-full truncate">
                  <Link
                    to={convertToUrl(image)}
                    target="_blank"
                    className="text-accent-500 underline truncate"
                  >
                    {image.name ?? String(image)}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Button className="mt-5 flex gap-2 ml-auto">
            Update Variety
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
