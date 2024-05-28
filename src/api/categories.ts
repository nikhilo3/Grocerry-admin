import axios from "axios";
import { ICategory, ISubCategoryData } from "../types/categories.types";
import API from ".";
import { TOKEN } from "../assets/mockData/auth";

export const handleGetCategories = async (): Promise<ICategory[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.category, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res.data?.statusCode === 404) resolve([]);
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch drivers!");
        }
        resolve(res.data?.responseBody ?? []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleAddCategory = async ({
  data,
  image,
  subCategoriesData,
}: {
  data: any;
  image: File;
  subCategoriesData: ISubCategoryData[];
}): Promise<string> => {
  // submit the data
  console.log(data, image, subCategoriesData);
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("document", image);
  formData.append("type", "root");
  subCategoriesData.forEach((subCategory, i) => {
    formData.append(`subCategoryDtoList[${i}].name`, subCategory?.name);
    formData.append(`subCategoryDtoList[${i}].type`, "non_root");
    formData.append(`subCategoryDtoList[${i}].document`, subCategory?.document);

    // append sub sub categories
    subCategory?.subCategory2DtoList?.forEach((subSubCategory, j) => {
      formData.append(
        `subCategoryDtoList[${i}].subCategory2DtoList[${j}].name`,
        subSubCategory?.name
      );
      formData.append(
        `subCategoryDtoList[${i}].subCategory2DtoList[${j}].type`,
        "non_root"
      );
      formData.append(
        `subCategoryDtoList[${i}].subCategory2DtoList[${j}].document`,
        subSubCategory?.document
      );
    });
  });

  return new Promise((resolve, reject) => {
    axios
      .post(API.addCategory, formData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to add category!");
        }
        resolve(res.data?.responseBody ?? "Category added successfully!");
      })
      .catch((err) => {
        reject(err.response?.data?.errorMessage ?? "Failed to add category!");
      });
  });
};

export const handleFetchCategory = async (
  name: string = ""
): Promise<
  {
    name: string;
    type: string;
  }[]
> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.fetchCategory, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        params: {
          name,
        },
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch category!");
        }
        resolve(res.data?.responseBody ?? []);
      })
      .catch((err) => {
        reject(err.response?.data?.errorMessage ?? "Failed to fetch category!");
      });
  });
};
