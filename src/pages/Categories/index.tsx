import Button from "../../components/reusable/Button";
import addCircleSvg from "../../assets/icons/add-circle.svg";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import { useState } from "react";
import { PRODUCT_CATEGORIES } from "../../assets/data/constants";
import ViewCategoryDetails from "./ViewCategoryDetails";
import AddCategory from "./AddCategory";
import SelectWhatToAdd from "./SelectWhatToAdd";
import AddSubCategory from "./AddSubCategory";
import AddSubSubCategory from "./AddSubSubCategory";

const CategoryPage = () => {
  const [filteredData, setFilteredData] = useState(PRODUCT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <div>
        <div className="flex flex-col gap-7 justify-center">
          <div className="overflow-x-scroll hide-scrollbar min-h-[40vh]">
            <div className="border border-accent-200 rounded-[20px] bg-white p-6 flex flex-col gap-6 min-w-[1100px]">
              {/* top buttons and searchBar */}
              <div className="">
                <div className="flex justify-between items-center">
                  <div></div>
                  {/* add Drivers and Download CSV */}
                  <div className="flex justify-center gap-3 items-center">
                    <Button
                      variant="primary"
                      className="flex justify-center items-center gap-2"
                      onClick={() => {
                        document
                          .getElementById("select_what_to_add")
                          // @ts-ignore
                          ?.showModal();
                      }}
                    >
                      <span className="text-base font-medium">
                        Add Categories
                      </span>
                      <img src={addCircleSvg} alt="" />
                    </Button>
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="flex justify-center  flex-col gap-4">
                <div
                  className="grid justify-center bg-accent-500 gap-4 rounded-xl p-4 text-accent-50 font-normal"
                  style={{
                    gridTemplateColumns: "0.1fr 2fr 8fr 1fr",
                  }}
                >
                  <button>
                    <UnCheckedBox className="w-[18px] h-[18px]" />
                  </button>
                  <span className="text-nowrap">Category</span>
                  <span className="text-nowrap">Sub Categories</span>
                  <span className="text-nowrap  ">Actions</span>
                </div>
                {Object.keys(filteredData).map((key, index) => {
                  // @ts-ignore
                  const category: string[] = filteredData[key];
                  return (
                    <div
                      key={index}
                      className="grid justify-center items-center w-full gap-4   even:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal"
                      style={{
                        gridTemplateColumns: "0.1fr 2fr 8fr 1fr",
                      }}
                    >
                      <button>
                        <UnCheckedBox className="w-[18px] h-[18px]" />
                      </button>
                      <span className="truncate" key={index}>
                        {key}
                      </span>

                      <span className="truncate">{category.join(", ")}</span>
                      <Button
                        variant="primary-outline"
                        onClick={() => {
                          setSelectedCategory(key);
                          document
                            .getElementById("view_category_details")
                            // @ts-ignore
                            ?.showModal();
                        }}
                        className="px-8 m-0 my-0 mx-0"
                      >
                        <span className="font-medium text-base">View</span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewCategoryDetails category={selectedCategory} />
      <AddCategory />
      <SelectWhatToAdd />
      <AddSubCategory />
      <AddSubSubCategory />
    </>
  );
};

export default CategoryPage;
