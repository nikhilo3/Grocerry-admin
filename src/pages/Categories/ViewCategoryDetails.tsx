import { ICategory } from "../../types/categories.types";

const ViewCategoryDetails = ({
  category,
}: {
  category: ICategory | undefined;
}) => {
  //@ts-ignore
  return (
    <dialog id="view_category_details" className="modal">
      <div className="modal-box overflow-y-auto scrollbar-md flex flex-col gap-4">
        <h3 className="font-bold text-lg">{category?.name}</h3>
        <div className="flex flex-col gap-4">
          <div className="join join-vertical w-full">
            {category?.subCategoryDtoList?.map((subCategory, index) => {
              return (
                <div
                  key={index}
                  className="collapse collapse-arrow join-item border border-base-300"
                >
                  <input type="radio" name="my-accordion-4" defaultChecked />
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
            })}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default ViewCategoryDetails;
