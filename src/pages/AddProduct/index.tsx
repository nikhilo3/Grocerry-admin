import backArrowIcon from "../../assets/icons/back-arrow.svg";
import checkIcon from "../../assets/icons/check.svg";
import { useForm } from "react-hook-form";
import FormErrorLine from "../../components/reusable/FormErrorLine";
import UploadProduct, { error } from "./UploadImage";
import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../../components/reusable/Button";
import { Link, useParams } from "react-router-dom";
import add from "../../assets/icons/add-circle-orange.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import eye from "../../assets/icons/eye.svg";
import AddVarietyModal from "./AddVarietyModal";
import editIcon from "../../assets/icons/fi-br-edit.svg";

const AddProduct = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleFormSubmit = () => {
    if (selectedImages.length === 0) {
      Swal.fire({
        title: "Please select image",
        text: "You have not selected an image",
        icon: "error",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className=" flex justify-between items-center mb-8">
          <Link to="/products" className="w-[116px]">
            <Button
              variant="accent/200"
              className="flex justify-center items-center gap-2 w-full"
            >
              <img src={backArrowIcon} alt="" />
              <span className="text-base font-medium text-accent-600">
                Back
              </span>
            </Button>
          </Link>
          <div className="flex justify-end items-center gap-4">
            {!id ? (
              <Button className="flex justify-center items-center gap-2 w-[196px]">
                Create Product
                <img className="h-4" src={checkIcon} alt="" />
              </Button>
            ) : (
              <>
                {isEditing ? (
                  <>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="primary-outline"
                      className="flex justify-center items-center gap-2 w-[127px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      className="flex justify-center items-center gap-2 w-[127px]"
                    >
                      Done
                      <img className="h-4" src={editIcon} alt="" />
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex justify-center items-center gap-2 w-[176px]"
                  >
                    Edit Product
                    <img className="h-4" src={editIcon} alt="" />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="max-w-[1500px] w-full  lg:flex-row  gap-5 grid  mb-44 grid-cols-5">
          {/* basic information */}
          <div className="w-full col-span-3 flex flex-col gap-6">
            <div className="bg-white w-full xl:w-full rounded-[20px] border border-accent-50  p-6">
              <h3 className="font-inter font-semibold text-xl ">
                Basic Information
              </h3>
              <p className="font-inter text-sm text-accent-500 mt-1">
                Lorem ipsum dolor sit abet consectetur. Tortor elit
              </p>

              {/* product Name */}
              <div className="mt-5 flex flex-col justify-center gap-[6px] ">
                <label
                  className="font-inter font-medium text-accent-500 text-base"
                  htmlFor="pname"
                >
                  Product Name*
                </label>
                <input
                  {...register("productName", {
                    required: {
                      value: true,
                      message: "The Product name is required",
                    },
                  })}
                  className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                  type="text"
                  placeholder="eg., Tomato"
                  id="pname"
                />
                {errors.productName && (
                  <FormErrorLine
                    message={errors.productName.message as String}
                  />
                )}
              </div>

              {/* Product desc */}
              <div className="mt-5 flex flex-col justify-center gap-[6px] ">
                <label
                  className="font-inter text-accent-500 font-medium text-base"
                  htmlFor="productDesc"
                >
                  Product Description*
                </label>
                <textarea
                  {...register("productDesc", {
                    required: {
                      value: true,
                      message: "The Product desc is required",
                    },
                  })}
                  className="h-[112px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none resize-none"
                  placeholder="Description goes here...."
                  id="productDesc"
                />
                {errors.productDesc && (
                  <FormErrorLine
                    message={errors.productDesc.message as String}
                  />
                )}
              </div>
            </div>

            {/* Upload Product Images */}
            <div className="w-full col-span-2">
              <UploadProduct
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                errors={errors as error}
                register={register}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 col-span-2 w-full">
            {/* Product Varieties */}
            <div className="bg-white rounded-[20px] border border-accent-100  p-6">
              <h3 className="text-[20px] font-semibold font-inter text-accent-700">
                Product Varieties
              </h3>
              <p className="font-inter font-normal text-sm mt-[2px] text-accent-500">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>

              <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
                <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
                  <div className="font-inter font-medium text-base text-accent-500">
                    Variety*
                  </div>
                  <div className="relative w-full">
                    <input
                      {...register("Varieties", {
                        required: {
                          value: true,
                          message: "Tags are required",
                        },
                      })}
                      className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                      type="text"
                      placeholder="eg., variety1"
                    />
                    <div className="flex items-center justify-center gap-2 absolute top-1/2 -translate-y-1/2 right-3">
                      <button
                        onClick={() => {
                          document
                            .getElementById("add_variety_modal")
                            // @ts-ignore
                            ?.showModal();
                        }}
                        type="button"
                      >
                        <img src={eye} alt="" className="text-red-500" />
                      </button>
                      <button type="button">
                        <img src={deleteIcon} alt="" className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  {errors.varieties && (
                    <FormErrorLine
                      message={errors.varieties.message as String}
                    />
                  )}
                </div>
              </div>
              <Button
                onClick={() => {
                  // @ts-ignore
                  document.getElementById("add_variety_modal")?.showModal();
                }}
                type="button"
                variant="primary-outline"
                className="w-full mt-5 border-primary-300 text-primary-500 bg-primary-50 flex items-center justify-center border-dashed gap-4"
              >
                <span>Add More Varieties</span>
                <img src={add} alt="" className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Seo details */}
            <div className="bg-white rounded-[20px] border border-accent-100  p-6">
              <h3 className="text-[20px] font-semibold font-inter text-accent-700">
                Product SEO Details
              </h3>
              <p className="font-inter font-normal text-sm mt-[2px] text-accent-500">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>

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
                    placeholder="eg., tag1,tag2"
                    id="skuCode"
                  />
                  {errors.tags && (
                    <FormErrorLine message={errors.tags.message as String} />
                  )}
                </div>

                <div className="w-full  mt-5 flex flex-col justify-center gap-[6px] ">
                  <label
                    className="font-inter font-medium text-base text-accent-500"
                    htmlFor="brand"
                  >
                    Brand*
                  </label>
                  <input
                    {...register("brand", {
                      required: {
                        value: true,
                        message: "The brand is required",
                      },
                    })}
                    className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                    type="text"
                    placeholder="eg., Garnier"
                  />
                  {errors.brand && (
                    <FormErrorLine message={errors.brand.message as String} />
                  )}
                </div>
              </div>
            </div>

            {/* Inventory Management */}
            <div className="bg-white rounded-[20px] border border-accent-100  p-6">
              <h3 className="text-[20px] font-semibold font-inter text-accent-700">
                Inventory Management
              </h3>
              <p className="font-inter font-normal text-sm mt-[2px] text-accent-500">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>

              <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
                <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
                  <label
                    className="font-inter font-medium text-base text-accent-500"
                    htmlFor="skuCode"
                  >
                    SKU Code*
                  </label>
                  <input
                    {...register("skuCode", {
                      required: {
                        value: true,
                        message: "The Sku code is required",
                      },
                    })}
                    className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                    type="text"
                    placeholder="eg., KG-293-001"
                    id="skuCode"
                  />
                  {errors.skuCode && (
                    <FormErrorLine message={errors.skuCode.message as String} />
                  )}
                </div>

                <div className="w-full  mt-5 flex flex-col justify-center gap-[6px] ">
                  <label
                    className="font-inter font-medium text-base text-accent-500"
                    htmlFor="stock"
                  >
                    Stock*
                  </label>
                  <input
                    {...register("stock", {
                      required: {
                        value: true,
                        message: "The stock is required",
                      },
                      min: { value: 0, message: "Stock cannot be lass than 0" },
                    })}
                    className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                    type="number"
                    placeholder="eg., 256"
                    id="stock"
                  />
                  {errors.stock && (
                    <FormErrorLine message={errors.stock.message as String} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <AddVarietyModal />
    </>
  );
};

export default AddProduct;
