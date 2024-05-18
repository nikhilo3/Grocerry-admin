import backArrowIcon from "../../assets/icons/back-arrow.svg";
import checkIcon from "../../assets/icons/check.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorLine from "../../components/reusable/FormErrorLine";
import { useEffect, useState } from "react";
import Button from "../../components/reusable/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import add from "../../assets/icons/add-circle-orange.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import eye from "../../assets/icons/eye.svg";
import AddVarietyModal from "./AddVarietyModal";
import editIcon from "../../assets/icons/fi-br-edit.svg";
import caretDownSvg from "../../assets/icons/caret-down.svg";
import caretUpSvg from "../../assets/icons/caret-up.svg";
import toast from "react-hot-toast";
import UpdateVarietyModal from "./UpdateVarietyModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  handleAddProduct,
  handleGetProductsByQueries,
  handleUpdateProduct,
} from "../../api/product";
import UploadImage, { error } from "./UploadImage";
import { PulseLoader } from "react-spinners";
import {
  PRODUCT_CATEGORIES,
  SUB_SUB_CATEGORIES,
} from "../../assets/data/constants";
import Swal from "sweetalert2";
import AppLoading from "../../components/loaders/AppLoading";
import ErrorOccurred from "../../components/reusable/ErrorOccurred";

export type Variety = {
  type: string;
  value: string;
  unit: string;
  description: string;
  price: number;
  quantity: number;
  discountPercent: number;
  documentUrls: File[];
};

export interface ProductFormData {
  name: string;
  code: string;
  category: string;
  subCategory: string;
  // subCategory2?: string;
  description: string;
  brand?: string;
  tags?: string;
}

const AddUpdateProduct = () => {
  const { productCode } = useParams<{ productCode: string | undefined }>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [selectedVariety, setSelectedVariety] = useState<number | null>(null);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [subcategoryDropdown, setSubcategoryDropdown] = useState(false);
  // const [subcategory2Dropdown, setSubcategory2Dropdown] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //get Product Data for editing if productCode is present
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["product", productCode],
    queryFn: () => handleGetProductsByQueries(`codes=${productCode}`),
    enabled: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<ProductFormData>();

  // fetch if productCode is present or change
  useEffect(() => {
    if (productCode) {
      refetch();
    }
  }, [productCode]);

  // set form data if product is fetched
  useEffect(() => {
    if (!productCode) return;
    if (!data || data.length === 0) return;
    const product = data[0];
    reset({
      ...(product as any),
      brand: product.brand === "non-branded" ? "" : product.brand,
    });
    // @ts-ignore
    setSelectedImages(product.documentUrls ?? []);

    // @ts-ignore
    setVarieties(product.varietyList);
  }, [data, productCode]);

  // add product mutation
  const { mutate: mutateAddProduct, isPending: isAddProductPending } =
    useMutation({
      mutationFn: handleAddProduct,
      onSuccess: (msg) => {
        toast.success(msg);
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        navigate("/products");
        reset();
      },
      onError: (err: string) => {
        toast.error(err);
      },
    });

  // update product mutation
  const { mutate: mutateUpdateProduct, isPending: isUpdateProductPending } =
    useMutation({
      mutationFn: handleUpdateProduct,
      onSuccess: (msg) => {
        toast.success(msg);
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        navigate("/products");
        setIsEditing(false);
        reset();
      },
      onError: (err: string) => {
        toast.error(err);
      },
    });

  // reset subcategory when category changes
  useEffect(() => {
    // only if current category does not have the selected subcategory
    if (
      watch("subCategory") &&
      // @ts-ignore
      !PRODUCT_CATEGORIES[watch("category")]?.includes(watch("subCategory"))
    ) {
      setValue("subCategory", "");
    }
  }, [watch("category")]);

  // reset subcategory2 when subcategory changes
  // useEffect(() => {
  //   setValue("subCategory2", "");
  // }, [watch("subCategory")]);

  const onSubmit: SubmitHandler<ProductFormData> = (formData) => {
    if (varieties.length === 0) {
      toast.error("Varieties are required");
      return;
    }

    if (formData.category === "Select Category" || !formData.category) {
      toast.error("Category is required");
      return;
    }
    if (!formData["subCategory"]) {
      toast.error("Sub Category is required");
      return;
    }

    if (selectedImages.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const dataToSend = {
      ...formData,
      varietyList: varieties,
      documents: selectedImages,
    };

    if (productCode) {
      mutateUpdateProduct({
        ...dataToSend,
        // @ts-ignore
        id: data[0].id,
      });
    } else {
      mutateAddProduct(dataToSend);
    }
  };

  if (productCode) {
    if (isLoading) return <AppLoading />;
    if (isError) return <ErrorOccurred />;
    if (!data || data.length === 0)
      return <ErrorOccurred error="Product not Found!!" />;
  }

  const handleDeleteVariety = (index: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this variety?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedVariety(null);
        setVarieties((prev) => prev.filter((_, i) => i !== index));
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex justify-between items-center mb-8">
          <Link to="/products" className="w-[116px]">
            <Button
              type="button"
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
            {!productCode ? (
              <Button
                type={productCode ? "button" : "submit"}
                disabled={isAddProductPending}
                className="flex justify-center items-center gap-2 w-[196px] min-h-[48px]"
              >
                {isAddProductPending ? (
                  <>
                    <PulseLoader color="#cdcfd1" size={6} />
                  </>
                ) : (
                  <>
                    Create Product
                    <img className="h-4" src={checkIcon} alt="" />
                  </>
                )}
              </Button>
            ) : (
              <>
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      variant="primary-outline"
                      className="flex justify-center items-center gap-2 w-[127px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      type={productCode ? "submit" : "button"}
                      className="flex justify-center items-center gap-2 w-[127px] min-h-[48px]"
                    >
                      {isUpdateProductPending ? (
                        <>
                          <PulseLoader color="#cdcfd1" size={6} />
                        </>
                      ) : (
                        <>
                          Done
                          <img className="h-4" src={editIcon} alt="" />
                        </>
                      )}
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

        <div
          style={{
            pointerEvents: !isEditing && productCode ? "none" : "all",
          }}
          className="max-w-[1500px] w-full  lg:flex-row  gap-5 grid  mb-44 grid-cols-5"
        >
          {/* basic information */}
          <div className="w-full col-span-3 flex flex-col gap-6">
            <div className="bg-white w-full xl:w-full rounded-[20px] border border-accent-50  p-6">
              <h3 className="font-inter font-semibold text-xl ">
                Basic Information
              </h3>

              {/* product Name */}
              <div className="mt-5 flex flex-col justify-center gap-[6px] ">
                <label
                  className="font-inter font-medium text-accent-500 text-base"
                  htmlFor="name"
                >
                  Product Name*
                </label>
                <input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "The Product name is required",
                    },
                  })}
                  className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                  type="text"
                  placeholder="eg., Tomato"
                />
                {errors.name && <FormErrorLine message={errors.name.message} />}
              </div>

              {/* Product Code */}
              <div className="mt-5 flex flex-col justify-center gap-[6px] ">
                <label
                  className="font-inter font-medium text-accent-500 text-base"
                  htmlFor="code"
                >
                  Product Code*
                </label>
                <input
                  {...register("code", {
                    required: {
                      value: true,
                      message: "The Product code is required",
                    },
                  })}
                  className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                  type="text"
                  placeholder="eg., 123456"
                />
                {errors.code && <FormErrorLine message={errors.code.message} />}
              </div>

              {/* Product desc */}
              <div className="mt-5 flex flex-col justify-center gap-[6px] ">
                <label
                  className="font-inter text-accent-500 font-medium text-base"
                  htmlFor="description"
                >
                  Product Description*
                </label>
                <textarea
                  {...register("description", {
                    required: {
                      value: true,
                      message: "The description is required",
                    },
                  })}
                  className="h-[112px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none resize-none"
                  placeholder="Description goes here...."
                />
                {errors.description && (
                  <FormErrorLine message={errors.description.message} />
                )}
              </div>
            </div>

            {/* Upload Product Images */}
            <div className="w-full col-span-2">
              <UploadImage
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

              <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
                <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
                  <div className="font-inter font-medium text-base text-accent-500">
                    Variety*
                  </div>
                  {varieties.length === 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      No Varieties Added
                    </div>
                  ) : (
                    varieties.map((variety, index) => (
                      <div key={index} className="relative w-full">
                        <input
                          className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                          type="text"
                          disabled
                          key={index}
                          value={variety.description}
                          placeholder="eg., variety1"
                        />
                        <div className="flex items-center justify-center gap-2 absolute top-1/2 -translate-y-1/2 right-3">
                          <button
                            onClick={() => {
                              setSelectedVariety(index);
                              document
                                .getElementById("update_variety_modal")
                                // @ts-ignore
                                ?.showModal();
                            }}
                            type="button"
                          >
                            <img src={eye} alt="" className="text-red-500" />
                          </button>
                          <button
                            onClick={() => handleDeleteVariety(index)}
                            type="button"
                          >
                            <img
                              src={deleteIcon}
                              alt=""
                              className="text-red-500"
                            />
                          </button>
                        </div>
                      </div>
                    ))
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

            <div className="bg-white mt-4 min-h-[311px]  rounded-[20px] border border-accent-100  p-6">
              <h3 className="font-inter font-semibold text-xl ">Category</h3>

              {/* category */}
              <div className="z-50 mt-5 flex flex-col justify-center gap-[6px] ">
                <label
                  className="font-inter font-medium text-base text-accent-500"
                  htmlFor="category"
                >
                  Select Category*
                </label>
                <div className="min-w-[259px]  max-w-full relative">
                  <div
                    onClick={() => setCategoryDropdown((prev) => !prev)}
                    role="button"
                    className={`h-[55px] bg-accent-50 py-[18px] px-4  border border-accent-100 rounded-xl ${
                      categoryDropdown && "rounded-b-none"
                    }  w-full flex justify-between `}
                  >
                    <span className="font-medium text-base text-accent-600">
                      {watch("category") ?? "Select Category"}
                    </span>
                    <span>
                      <img
                        src={categoryDropdown ? caretUpSvg : caretDownSvg}
                        alt=""
                      />
                    </span>
                  </div>
                  {categoryDropdown && (
                    <div
                      role="button"
                      className="w-full z-50 bg-accent-100 shadow-md  rounded-xl  rounded-t-none absolute"
                    >
                      <div className="overflow-y-auto max-h-[242px] scrollbar-md">
                        {Object.keys(PRODUCT_CATEGORIES).map((item) => (
                          <label
                            htmlFor={item}
                            onClick={() => {
                              setValue("category", item);
                              setCategoryDropdown(false);
                            }}
                            role="button"
                            className="flex justify-between items-center  w-full p-4  border-t border-accent-200"
                          >
                            <div className="text-sm cursor-pointer flex-1 font-medium text-accent-600 font-inter">
                              {item}
                            </div>
                            <input
                              value={item}
                              className="radio radio-xs radio-error"
                              type="radio"
                              name={"category"}
                              id={item}
                              checked={watch("category") === item}
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {errors.category && (
                  <FormErrorLine message={errors.category.message} />
                )}
              </div>

              {/* sub category */}
              <div className="mt-5 flex flex-col justify-center gap-[6px] ">
                <label
                  className="font-inter font-medium text-base text-accent-500"
                  htmlFor="category"
                >
                  Select Sub Category*
                </label>
                <div className="min-w-[259px]  max-w-full relative">
                  <div
                    onClick={() => {
                      if (
                        watch("category") === "Select Category" ||
                        !watch("category")
                      ) {
                        toast.error("Please select category first");
                        return;
                      }
                      setSubcategoryDropdown((prev) => !prev);
                    }}
                    role="button"
                    className={`bg-accent-50 py-[18px] px-4  border border-accent-100 z-0 rounded-xl ${
                      subcategoryDropdown ? "rounded-b-none" : ""
                    }  w-full flex justify-between `}
                  >
                    <div className="font-medium text-base text-accent-600 truncate min-h-fit">
                      {watch("subCategory")
                        ? watch("subCategory")
                        : "Select Subcategory"}
                    </div>
                    <span>
                      <img
                        src={subcategoryDropdown ? caretUpSvg : caretDownSvg}
                        alt=""
                        className="min-h-[19px] min-w-[18px]"
                      />
                    </span>
                  </div>
                  {subcategoryDropdown && (
                    <div
                      role="button"
                      className="w-full bg-accent-100 shadow-md overflow-y-auto rounded-xl rounded-t-none absolute z-40"
                    >
                      <div className="overflow-y-auto max-h-[242px] scrollbar-md">
                        {
                          // @ts-ignore
                          PRODUCT_CATEGORIES[
                            watch("category") ?? ("" as any)
                          ]?.map((item: string) => (
                            <label
                              htmlFor={item}
                              onClick={() => {
                                if (watch("subCategory") === item) {
                                  setValue("subCategory", "");
                                } else {
                                  setValue("subCategory", item);
                                }
                                setSubcategoryDropdown(false);
                              }}
                              role="button"
                              className="flex justify-between items-center w-full p-4  border-t border-accent-200"
                            >
                              <div className="text-sm cursor-pointer flex-1 font-medium text-accent-600 font-inter">
                                {item}
                              </div>
                              <input
                                value={item}
                                className="checkbox checkbox-xs  checkbox-warning rounded-md"
                                type="checkbox"
                                checked={
                                  watch("subCategory") === item ? true : false
                                }
                              />
                            </label>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
                {errors.category && (
                  <FormErrorLine message={errors.category.message} />
                )}
              </div>

              {/* sub category 2 */}

              {/* {
                // @ts-ignore
                SUB_SUB_CATEGORIES[watch("subCategory")] &&
                  // @ts-ignore
                  SUB_SUB_CATEGORIES[watch("subCategory")]?.length > 0 && (
                    <div className="mt-5 flex flex-col justify-center gap-[6px] ">
                      <label
                        className="font-inter font-medium text-base text-accent-500"
                        htmlFor="category"
                      >
                        Select Sub Category2
                      </label>
                      <div className="min-w-[259px]  max-w-full relative">
                        <div
                          onClick={() => {
                            if (!watch("subCategory")) {
                              toast.error("Please select sub category first");
                              return;
                            }
                            setSubcategory2Dropdown((prev) => !prev);
                          }}
                          role="button"
                          className={`bg-accent-50 py-[18px] px-4  border border-accent-100 z-0 rounded-xl ${
                            subcategory2Dropdown ? "rounded-b-none" : ""
                          }  w-full flex justify-between `}
                        >
                          <div className="font-medium text-base text-accent-600 truncate min-h-fit">
                            {watch("subCategory2")
                              ? watch("subCategory2")
                              : "Select Subcategory"}
                          </div>
                          <span>
                            <img
                              src={
                                subcategory2Dropdown ? caretUpSvg : caretDownSvg
                              }
                              alt=""
                              className="min-h-[19px] min-w-[18px]"
                            />
                          </span>
                        </div>
                        {subcategory2Dropdown && (
                          <div
                            role="button"
                            className="w-full bg-accent-100 shadow-md overflow-y-auto rounded-xl rounded-t-none absolute"
                          >
                            <div className="overflow-y-auto max-h-[242px] scrollbar-md">
                              {
                                // @ts-ignore
                                SUB_SUB_CATEGORIES[watch("subCategory")]?.map(
                                  (item: string) => (
                                    <label
                                      htmlFor={item}
                                      onClick={() => {
                                        if (watch("subCategory2") === item) {
                                          setValue("subCategory2", "");
                                        } else {
                                          setValue("subCategory2", item);
                                        }
                                        setSubcategory2Dropdown(false);
                                      }}
                                      role="button"
                                      className="flex justify-between items-center w-full p-4  border-t border-accent-200"
                                    >
                                      <div className="text-sm cursor-pointer flex-1 font-medium text-accent-600 font-inter">
                                        {item}
                                      </div>
                                      <input
                                        value={item}
                                        className="checkbox checkbox-xs  checkbox-warning rounded-md"
                                        type="checkbox"
                                        checked={
                                          watch("subCategory2") === item
                                            ? true
                                            : false
                                        }
                                      />
                                    </label>
                                  )
                                )
                              }
                            </div>
                          </div>
                        )}
                      </div>
                      {errors.category && (
                        <FormErrorLine message={errors.category.message} />
                      )}
                    </div>
                  )
              } */}
            </div>

            {/* More Details */}
            <div className="bg-white rounded-[20px] border border-accent-100  p-6">
              <h3 className="text-[20px] font-semibold font-inter text-accent-700">
                More Details
              </h3>

              <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-7">
                <div className=" w-full flex flex-col justify-center gap-[6px] ">
                  <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
                    <label
                      className="font-inter font-medium text-base text-accent-500"
                      htmlFor="tags"
                    >
                      Tags
                    </label>
                    <input
                      {...register("tags", {
                        required: false,
                      })}
                      className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                      type="text"
                      placeholder="eg., tag1, tag2"
                    />
                  </div>
                  <div className="mt-5 w-full flex flex-col justify-center gap-[6px] ">
                    <label
                      className="font-inter font-medium text-base text-accent-500"
                      htmlFor="tags"
                    >
                      Brand
                    </label>
                    <input
                      {...register("brand", {
                        required: false,
                      })}
                      className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                      type="text"
                      placeholder="eg., brand1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <AddVarietyModal setVarieties={setVarieties} />
      <UpdateVarietyModal
        setVarieties={setVarieties}
        selectedVariety={selectedVariety}
        varieties={varieties}
      />
    </>
  );
};

export default AddUpdateProduct;
