import {
  PRODUCT_CATEGORIES,
  SUB_SUB_CATEGORIES,
} from "../../assets/data/constants";

const ViewCategoryDetails = ({ category }: { category: string }) => {
  //@ts-ignore
  const data = PRODUCT_CATEGORIES[category];
  return (
    <dialog id="view_category_details" className="modal">
      <div className="modal-box overflow-y-auto scrollbar-md flex flex-col gap-4">
        <h3 className="font-bold text-lg">{category}</h3>
        <div className="flex flex-col gap-4">
          <div className="join join-vertical w-full">
            {data?.map((subCategory: string, index: number) => {
              //@ts-ignore
              const subCategories: string[] = SUB_SUB_CATEGORIES[subCategory];
              return (
                <div
                  key={index}
                  className="collapse collapse-arrow join-item border border-base-300"
                >
                  <input type="radio" name="my-accordion-4" defaultChecked />
                  <div className="collapse-title text-lg font-medium">
                    {subCategory}
                  </div>
                  <div className="collapse-content flex flex-col gap-1 text-sm">
                    {subCategories?.length > 0 ? (
                      subCategories?.map(
                        (subSubCategory: string, index: number) => (
                          <div key={index}>
                            {index + 1}. {subSubCategory}
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
