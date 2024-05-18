import AddUpdateDriverModal from "./AddUpdateDriverModal";
import { DriverResponseType, handleUpdateDriver } from "../../api/driver";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UpdateDriver = ({ driver }: { driver: DriverResponseType | null }) => {
  const queryClient = useQueryClient();

  // update driver mutation
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: handleUpdateDriver,
    onSuccess: (msg) => {
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });
      toast.success(msg);
      (
        document.getElementById("updateDriverModal") as HTMLDialogElement
      )?.close();
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  return (
    <AddUpdateDriverModal
      id="updateDriverModal"
      isEditDriverModal={true}
      isPending={isPending}
      handleFormSubmit={(data) =>
        mutate({
          ...data,
          id: driver?.id ?? "",
          available: driver?.available ?? true,
        })
      }
      defaultValues={driver!}
      isSubmitSuccess={isSuccess}
    />
  );
};

export default UpdateDriver;
