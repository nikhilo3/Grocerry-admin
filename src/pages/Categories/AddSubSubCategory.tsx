import { useEffect, useRef, useState } from "react";
import uploadSvg from "../../assets/icons/upload-file.svg";
import addCircleSvg from "../../assets/icons/add-circle.svg";
import trashSvg from "../../assets/icons/trash.svg";
import crossBlackIcon from "../../assets/icons/cross-black.svg";
import caretDownSvg from "../../assets/icons/caret-down.svg";
import caretUpSvg from "../../assets/icons/caret-up.svg";
import {
  PRODUCT_CATEGORIES,
  SUB_SUB_CATEGORIES,
} from "../../assets/data/constants";
import toast from "react-hot-toast";
const AddSubSubCategory = () => {
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [subCategoryDropdown, setSubCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // reset selected sub category when category changes
  useEffect(() => {
    setSelectedSubCategory("");
  }, [selectedCategory]);

  return (
    <>
      <dialog id="add_sub_category2_modal" className="modal">
        <form
          method="dialog"
          className="modal-box min-w-[800px] p-6 rounded-[20px]"
        >
          <div className="">
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="text-xl font-semibold  text-accent-700">
                  Add sub category2
                </h1>
                <p className="mt-1 text-sm font-normal text-accent-500">
                  Lorem ipsum dolor sit amet consectetur. Tortor elit
                </p>
              </div>
              <button className="text-accent-700 h-8 w-8 font-bold">
                <img className="h-6 w-6" src={crossBlackIcon} alt="" />
              </button>
            </div>

            <div className="mt-[26px] flex items-center justify-center gap-8 w-full">
              <div className="flex flex-col w-full gap-[26px]">
                <div className="flex flex-col gap-2">
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
                      className={`h-[55px]  bg-accent-50 py-[18px] px-4  border border-accent-100 rounded-xl ${
                        categoryDropdown && "rounded-b-none"
                      }  w-full flex justify-between `}
                    >
                      <span className="font-medium text-base text-accent-600">
                        {selectedCategory || "Select Category"}
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
                        className="w-full z-50 bg-accent-100 shadow-md  rounded-xl rounded-t-none absolute overflow-y-auto scrollbar-sm h-[200px]"
                      >
                        {Object.keys(PRODUCT_CATEGORIES).map((item) => (
                          <label
                            htmlFor={item}
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
                              onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCategoryDropdown(false);
                              }}
                            />
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* sub category */}
                <div className="flex flex-col gap-2">
                  <label
                    className="font-inter font-medium text-base text-accent-500"
                    htmlFor="category"
                  >
                    Select Sub Category*
                  </label>
                  <div className="min-w-[259px]  max-w-full relative">
                    <div
                      onClick={() => {
                        if (!selectedCategory) {
                          return toast.error("Please select a category first");
                        } else {
                          setSubCategoryDropdown((prev) => !prev);
                        }
                      }}
                      role="button"
                      className={`h-[55px]  bg-accent-50 py-[18px] px-4  border border-accent-100 rounded-xl ${
                        subCategoryDropdown && "rounded-b-none"
                      }  w-full flex justify-between `}
                    >
                      <span className="font-medium text-base text-accent-600">
                        {selectedSubCategory || "Select Sub Category"}
                      </span>
                      <span>
                        <img
                          src={subCategoryDropdown ? caretUpSvg : caretDownSvg}
                          alt=""
                        />
                      </span>
                    </div>
                    {subCategoryDropdown && (
                      <div
                        role="button"
                        className="w-full z-50 bg-accent-100 shadow-md  rounded-xl rounded-t-none absolute overflow-y-auto scrollbar-sm h-[200px]"
                      >
                        {
                          //@ts-ignore
                          PRODUCT_CATEGORIES[selectedCategory]?.map((item) => (
                            <label
                              htmlFor={item}
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
                                onChange={(e) => {
                                  setSelectedSubCategory(e.target.value);
                                  setSubCategoryDropdown(false);
                                }}
                              />
                            </label>
                          ))
                        }
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-[6px]">
                  <label
                    className="text-base font-medium  text-accent-500"
                    htmlFor=""
                  >
                    New Sub Category2 Name
                  </label>
                  <input
                    className="h-[58px] w-full rounded-xl py-[18px] px-4 bg-background text-lg border-accent-100 border outline-none"
                    type="text"
                    placeholder="eg., Fruits & Vegetables"
                    id="productWeight"
                  />
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
                    <span>Upload Icon</span>
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRef}
                      name=""
                      id=""
                    />
                    <span>
                      <img className="h-5 w-5" src={uploadSvg} alt="" />
                    </span>
                  </button>
                </div>

                <button className="py-[18px] font-medium flex justify-center items-center gap-2 bg-primary-500 rounded-xl text-white w-full">
                  <span>Add sub category2</span>
                  <img className="h-4 w-4" src={addCircleSvg} alt="" />
                </button>
              </div>

              <div className="w-full flex flex-col gap-4">
                <h6 className="text-base font-medium text-accent-500">
                  Existing Sub Sub Categories
                </h6>
                <div className=" overflow-y-auto scrollbar-sm">
                  <div className="w-full max-h-[334px] min-h-[379px]  pe-4">
                    <div className="rounded-2xl border  ">
                      {
                        //@ts-ignore
                        SUB_SUB_CATEGORIES[selectedSubCategory]?.map(
                          (item: string, index: number) => (
                            <div
                              className={`p-[14px] ${
                                index !== 0 ? "border-t" : "rounded-xl"
                              }  bg-accent-50   border-accent-200 w-full flex justify-between items-center`}
                            >
                              <span>{item}</span>
                              <button type="button">
                                <img src={trashSvg} alt="" />
                              </button>
                            </div>
                          )
                        )
                      }
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

export default AddSubSubCategory;
