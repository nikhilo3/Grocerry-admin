import { useRef, useState } from "react";
import uploadSvg from "../../assets/icons/upload-file.svg";
import addCircleSvg from "../../assets/icons/add-circle.svg";
import trashSvg from "../../assets/icons/trash.svg";
import crossBlackIcon from "../../assets/icons/cross-black.svg";
import caretDownSvg from "../../assets/icons/caret-down.svg";
import caretUpSvg from "../../assets/icons/caret-up.svg";
const AddSubCategory = () => {
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const category = [
    "Fruit & Vegetables",
    "Electronics",
    "Frozen Food",
    "Chips & Namkin ",
    "Juice & Beverages",
    "Fresh Fruits",
    "Fresh Vegetables",
    "Coriander & Others",
    "Seasonal",
    "Certified Organics",
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <dialog id="addSubCategoryModal" className="modal">
        <form
          method="dialog"
          className="modal-box min-w-[800px] p-6 rounded-[20px]"
        >
          <div className="">
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="text-xl font-semibold  text-accent-700">
                  Add subCategory
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
                      className={`h-[55px]
                              bg-accent-50 py-[18px] px-4  border border-accent-100
                               rounded-xl ${
                                 categoryDropdown && "rounded-b-none"
                               }  w-full flex justify-between `}
                    >
                      <span className="font-medium text-base text-accent-600">
                        Select Category
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
                        {category.map((item) => (
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
                            />
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-[6px]">
                  <label
                    className="text-base font-medium  text-accent-500"
                    htmlFor=""
                  >
                    Enter subCategory Name
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
                  <span>Add category</span>
                  <img className="h-4 w-4" src={addCircleSvg} alt="" />
                </button>
              </div>

              <div className="w-full flex flex-col gap-4">
                <h6 className="text-base font-medium text-accent-500">
                  Existing Categories
                </h6>
                <div className=" overflow-y-auto scrollbar-sm">
                  <div className="w-full max-h-[334px] min-h-[379px]  pe-4">
                    <div className="rounded-2xl border  ">
                      {category.map((item, index) => (
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
