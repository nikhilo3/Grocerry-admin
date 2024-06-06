import Button from "../../components/reusable/Button";
import addCircleSvg from "../../assets/icons/add-circle.svg";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import { useState } from "react";
import ViewCategoryDetails from "./ViewCategoryDetails";
import { useQuery } from "@tanstack/react-query";
import { handleGetCategories } from "../../api/categories";
import ErrorOccurred from "../../components/reusable/ErrorOccurred";
import AppLoading from "../../components/loaders/AppLoading";
import { ICategory } from "../../types/categories.types";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  // get category query
  const { data, isLoading, isError } = useQuery({
    queryFn: handleGetCategories,
    queryKey: ["categories"],
  });

  if (isError) return <ErrorOccurred error="Failed to fetch categories" />;
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
                    <Link to="/categories/add">
                      <Button
                        variant="primary"
                        className="flex justify-center items-center gap-2"
                      >
                        <span className="text-base font-medium">
                          Add Categories
                        </span>
                        <img src={addCircleSvg} alt="" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="flex justify-center  flex-col gap-4 min-h-36">
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
                {isLoading ? (
                  <AppLoading />
                ) : data?.length === 0 ? (
                  <div className="text-accent-400 text-center h-full flex items-center justify-center">
                    <span className="text-2xl">No Categories Found</span>
                  </div>
                ) : (
                  data?.map((category, index) => {
                    // @ts-ignore
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
                          {category.name}
                        </span>

                        <span className="truncate">
                          {category.subCategoryDtoList?.reduce(
                            (acc, subCategory) => {
                              if (!acc) return subCategory.name;
                              return `${acc}, ${subCategory.name} `;
                            },
                            ""
                          )}
                        </span>
                        <Button
                          variant="primary-outline"
                          onClick={() => {
                            setSelectedCategory(category);
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
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewCategoryDetails category={selectedCategory} />
    </>
  );
};

export default CategoryPage;
