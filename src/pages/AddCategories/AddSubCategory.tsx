import { useRef, useState } from "react";
import uploadSvg from "../../assets/icons/upload-file.svg";
import addCircleSvg from "../../assets/icons/add-circle.svg";
import trashSvg from "../../assets/icons/trash.svg";
import crossBlackIcon from "../../assets/icons/cross-black.svg";
import { useForm } from "react-hook-form";
import FormErrorLine from "../../components/reusable/FormErrorLine";
import toast from "react-hot-toast";
import { ISubCategoryData } from "../../types/categories.types";
import Swal from "sweetalert2";

type Props = {
  addSubCategory: (data: ISubCategoryData) => void;
  subCategoriesData: ISubCategoryData[];
  removeSubCategory: (index: number) => void;
};

const AddSubCategory = ({
  addSubCategory,
  subCategoriesData,
  removeSubCategory,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [icon, setIcon] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    if (!icon) return toast.error("Please select an icon");
    if (subCategoriesData.find((item) => item.name === data.name)) {
      return toast.error("Sub category already exists");
    }
    addSubCategory({
      name: data.name,
      type: "non_root",
      document: icon,
      subCategory2DtoList: [],
    });
    reset();
    setIcon(null);
    (
      document.getElementById("add_sub_category_modal") as HTMLDialogElement
    )?.close();
  };

  return (
    <>
      <dialog id="add_sub_category_modal" className="modal !z-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-box min-w-[800px] p-6 rounded-[20px]"
        >
          <div className="">
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="text-xl font-semibold  text-accent-700">
                  Add sub category
                </h1>
              </div>
              <button
                type="button"
                onClick={() => {
                  (
                    document.getElementById(
                      "add_sub_category_modal"
                    ) as HTMLDialogElement
                  )?.close();
                  reset();
                  setIcon(null);
                }}
                className="text-accent-700 h-8 w-8 font-bold"
              >
                <img className="h-6 w-6" src={crossBlackIcon} alt="" />
              </button>
            </div>

            <div className="mt-[26px] flex items-center justify-center gap-8 w-full">
              <div className="flex flex-col w-full gap-[26px]">
                <div className="flex flex-col gap-[6px]">
                  <label
                    className="text-base font-medium  text-accent-500"
                    htmlFor=""
                  >
                    Sub Category Name
                  </label>
                  <input
                    className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                    type="text"
                    placeholder="eg., Fruits & Vegetables"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "The Sub Category name is required",
                      },
                    })}
                  />
                  {errors.name && (
                    <FormErrorLine message={errors.name.message as string} />
                  )}
                </div>

                <div className="flex flex-col gap-[6px]">
                  <label
                    className="text-base font-medium  text-accent-500"
                    htmlFor=""
                  >
                    Add Icon*
                  </label>
                  <button
                    onClick={() => inputRef?.current?.click()}
                    type="button"
                    className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background flex justify-between items-center text-lg border-accent-100 border outline-none"
                    id="productWeight"
                  >
                    <span>{icon ? "Icon added" : "Upload icon"}</span>
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRef}
                      onChange={(e) => {
                        if (e.target.files) {
                          setIcon(e.target.files[0]);
                        }
                      }}
                    />
                    <span>
                      <img className="h-5 w-5" src={uploadSvg} alt="" />
                    </span>
                  </button>
                  {icon && (
                    <a
                      href={URL.createObjectURL(icon)}
                      target="_blank"
                      className="text-sm underline truncate"
                    >
                      {icon.name}
                    </a>
                  )}
                </div>

                <button className="py-[18px] font-medium flex justify-center items-center gap-2 bg-primary-500 rounded-xl text-white w-full">
                  <span>Add sub category</span>
                  <img className="h-4 w-4" src={addCircleSvg} alt="" />
                </button>
              </div>

              <div className="w-full flex flex-col gap-4">
                <h6 className="text-base font-medium text-accent-500">
                  Existing Sub Categories
                </h6>
                <div className=" overflow-y-auto scrollbar-sm">
                  <div className="w-full max-h-[334px] min-h-[379px]  pe-4">
                    <div className="rounded-2xl border  ">
                      {subCategoriesData?.map((item, index) => (
                        <div
                          className={`p-[14px] ${
                            index !== 0 ? "border-t" : "rounded-xl"
                          }  bg-accent-50   border-accent-200 w-full flex justify-between items-center`}
                        >
                          <span>{item.name}</span>
                          <button
                            onClick={() => {
                              (
                                document.getElementById(
                                  "add_sub_category_modal"
                                ) as HTMLDialogElement
                              )?.close();
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  removeSubCategory(index);
                                  Swal.fire(
                                    "Deleted!",
                                    "Subcategory has been deleted.",
                                    "success"
                                  );
                                }
                              });
                            }}
                            type="button"
                          >
                            <img src={trashSvg} alt="" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default AddSubCategory;
