import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/reusable/Button";
import backArrowIcon from "../../assets/icons/back-arrow.svg";
import checkIcon from "../../assets/icons/check.svg";
import FormErrorLine from "../../components/reusable/FormErrorLine";
import { useEffect, useRef, useState } from "react";
import { ISubCategoryData } from "../../types/categories.types";
import toast from "react-hot-toast";
import AddSubCategory from "./AddSubCategory";
import AddSubSubCategory from "./AddSubSubCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAddCategory } from "../../api/categories";
import { PulseLoader } from "react-spinners";

const AddCategories = () => {
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [subCategoriesData, setSubCategoriesData] = useState<
    ISubCategoryData[]
  >([]);
  const imageRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // submit the data
  const { mutate, isPending } = useMutation({
    mutationFn: handleAddCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Category added successfully");
      navigate("/categories");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const onSubmit = (data: any) => {
    if (!image) return toast.error("Please select an image");

    // check if there are sub categories
    if (subCategoriesData.length === 0) {
      return toast.error("Please add sub categories");
    }

    // check if there are sub sub categories
    if (
      subCategoriesData.some((item) => item.subCategory2DtoList.length === 0)
    ) {
      return toast.error("Please add sub sub categories");
    }

    mutate({ data, image, subCategoriesData });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex justify-between items-center mb-8">
          <Link to="/categories" className="w-[116px]">
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
            <Button className="flex justify-center items-center gap-2 w-[196px] min-h-[48px]">
              {isPending ? (
                <>
                  <PulseLoader color="#cdcfd1" size={6} />
                </>
              ) : (
                <>
                  Create Category
                  <img className="h-4" src={checkIcon} alt="" />
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="flex gap-9 items-center justify-center max-w-[1500px] w-full ">
          <div className="flex flex-col gap-6 min-w-[800px]">
            {/* basic information */}
            <div className="w-full col-span-3 flex flex-col gap-6">
              <div className="flex gap-6 bg-white p-6">
                <div className=" w-full xl:w-full rounded-[20px] border border-accent-50">
                  <h3 className="font-inter font-semibold text-xl ">
                    Basic Information
                  </h3>

                  {/* Category Name */}
                  <div className="mt-5 flex flex-col justify-center gap-[6px] ">
                    <label
                      className="font-inter font-medium text-accent-500 text-base"
                      htmlFor="name"
                    >
                      Category Name*
                    </label>
                    <input
                      {...register("name", {
                        required: {
                          value: true,
                          message: "The Category name is required",
                        },
                      })}
                      className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                      type="text"
                      placeholder="eg. Snacks & Drinks"
                    />
                    {errors.name && (
                      <FormErrorLine message={errors.name.message as string} />
                    )}
                  </div>
                </div>
                <div
                  style={{
                    backgroundImage: `url(${
                      image ? URL.createObjectURL(image) : ""
                    })`,
                  }}
                  onClick={() => imageRef.current?.click()}
                  className="flex p-4 text-center cursor-pointer w-[180px] items-center justify-center flex-col aspect-square rounded-md border border-dashed h-full bg-center bg-contain"
                >
                  <span className="text-sm">
                    {image ? "Change Image" : "Select Image"}
                  </span>
                  <input
                    ref={imageRef}
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setImage(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="scrollbar-md flex flex-col gap-4 bg-white px-6 rounded-md">
              <span>Information Preview:</span>
              <h3 className="font-semibold text-lg">
                Category Name: {watch("name") ? watch("name") : "Not Set"}
              </h3>
              <div className="flex flex-col gap-4">
                <div className="join join-vertical w-full">
                  {subCategoriesData?.length === 0 ? (
                    <div className="text-red-500">No sub categories</div>
                  ) : (
                    subCategoriesData?.map((subCategory, index) => {
                      return (
                        <div
                          key={index}
                          className="collapse collapse-arrow join-item border border-base-300"
                        >
                          <input
                            type="radio"
                            name="my-accordion-4"
                            defaultChecked
                          />
                          <div className="collapse-title text-lg font-medium">
                            {subCategory.name}
                          </div>
                          <div className="collapse-content flex flex-col gap-1 text-sm">
                            {subCategory.subCategory2DtoList?.length > 0 ? (
                              subCategory.subCategory2DtoList?.map(
                                (subSubCategory, index) => (
                                  <div key={index}>
                                    {index + 1}. {subSubCategory.name}
                                  </div>
                                )
                              )
                            ) : (
                              <div>No sub sub categories</div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center self-start">
            {[
              {
                id: "add_sub_category_modal",
                label: "Add Sub Category",
              },
              {
                id: "add_sub_category2_modal",
                label: "Add Sub Category 2",
              },
            ].map((item, index) => (
              <Button
                key={index}
                type="button"
                disabled={
                  item.id === "add_sub_category2_modal" &&
                  subCategoriesData.length === 0
                }
                variant="accent/200"
                className="flex justify-center items-center gap-2 w-52 disabled:opacity-70"
                onClick={() => {
                  document
                    .getElementById(item.id)
                    // @ts-ignore
                    ?.showModal();
                  document
                    .getElementById("select_what_to_add")
                    // @ts-ignore
                    ?.close();
                }}
              >
                <span className="text-base font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </form>
      <AddSubCategory
        addSubCategory={(data) => {
          setSubCategoriesData([...subCategoriesData, data]);
        }}
        subCategoriesData={subCategoriesData}
        removeSubCategory={(index: number) => {
          setSubCategoriesData(subCategoriesData.filter((_, i) => i !== index));
        }}
      />
      <AddSubSubCategory
        subCategoriesData={subCategoriesData}
        addSubSubCategory={(
          name: string,
          data: ISubCategoryData["subCategory2DtoList"][number]
        ) => {
          const subCategoryToChange = subCategoriesData.find(
            (item) => item.name === name
          );
          if (!subCategoryToChange) return;
          subCategoryToChange.subCategory2DtoList.push(data);

          const newSubCategoriesData = subCategoriesData.map((item) =>
            item.name === name ? subCategoryToChange : item
          );
          setSubCategoriesData(newSubCategoriesData);
        }}
        removeSubSubCategory={(name: string, index: number) => {
          const subCategoryToChange = subCategoriesData.find(
            (item) => item.name === name
          );
          if (!subCategoryToChange) return;
          subCategoryToChange.subCategory2DtoList =
            subCategoryToChange.subCategory2DtoList.filter(
              (_, i) => i !== index
            );

          const newSubCategoriesData = subCategoriesData.map((item) =>
            item.name === name ? subCategoryToChange : item
          );
          setSubCategoriesData(newSubCategoriesData);
        }}
      />
    </>
  );
};

export default AddCategories;
