import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAddDriver } from "../../api/driver";
import toast from "react-hot-toast";
import AddUpdateDriverModal from "./AddUpdateDriverModal";

const AddDriver = () => {
  const queryClient = useQueryClient();

  // add driver mutation
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: handleAddDriver,
    onSuccess: (msg) => {
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });
      toast.success(msg);
      (document.getElementById("addDriverModal") as HTMLDialogElement)?.close();
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  return (
    <AddUpdateDriverModal
      id="addDriverModal"
      isEditDriverModal={false}
      isPending={isPending}
      handleFormSubmit={(data) => mutate(data)}
      isSubmitSuccess={isSuccess}
    />
  );
};

export default AddDriver;
