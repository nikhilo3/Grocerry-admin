export type CategoryType = "root" | "non_root";

export interface SubCategory2Dto {
  name: string;
  type: CategoryType;
}

export interface SubCategoryDto {
  name: string;
  type: CategoryType;
  subCategory2DtoList: SubCategory2Dto[];
}

export interface ICategory {
  name: string;
  type: CategoryType;
  subCategoryDtoList: SubCategoryDto[];
}

export type ICategoryData = {
  name: string;
  type: CategoryType;
  document: File;
  subCategoryDtoList: ISubCategoryData[];
};

export type ISubCategoryData = {
  name: string;
  type: CategoryType;
  document: File;
  subCategory2DtoList: ISubSubCategoryData[];
};

export type ISubSubCategoryData = {
  name: string;
  type: CategoryType;
  document: File;
};
