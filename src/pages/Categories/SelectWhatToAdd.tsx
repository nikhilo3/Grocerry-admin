import Button from "../../components/reusable/Button";

const SelectWhatToAdd = () => {
  return (
    <dialog id="select_what_to_add" className="modal">
      <div className="modal-box flex flex-col gap-4 p-12">
        <h3 className="font-bold text-lg text-center">
          What do you want to add?
        </h3>
        <div className="flex flex-col gap-4 items-center justify-center">
          {[
            { id: "add_category_modal", label: "Add Category" },
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
              variant="accent/200"
              className="flex justify-center items-center gap-2 w-52"
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
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default SelectWhatToAdd;
