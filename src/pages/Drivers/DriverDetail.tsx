import crossSvg from "../../assets/icons/cross-black.svg";
import blockIcon from "../../assets/icons/block-icon.svg";
import checkIcon from "../../assets/icons/checked.svg";
import Button from "../../components/reusable/Button";
import { DriverResponseType, handleDeleteDriver } from "../../api/driver";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const DriverDetail = ({
  driver,
  setEditDriverData,
}: {
  driver: DriverResponseType | null;
  setEditDriverData: React.Dispatch<
    React.SetStateAction<DriverResponseType | null>
  >;
}) => {
  const queryClient = useQueryClient();
  // delete driver mutation
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteDriver,
    onSuccess: (msg) => {
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });
      (document.getElementById("driverDetails") as HTMLDialogElement)?.close();
      toast.success(msg);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  return (
    <div>
      <dialog id="driverDetails" className="modal">
        <div className="max-w-[752px] h-auto p-8 scrollbar-md  modal-box">
          <div>
            <div className="flex flex-col gap-6 justify-center">
              <div className="flex justify-between items-center">
                <div className="">
                  <h1 className="font-medium text-[28px] text-accent-700">
                    Driver Details
                  </h1>
                  <p className="text-sm font-normal text-accent-500 ">
                    Lorem ipsum dolor sit amet consectetur. Tortor elit{" "}
                  </p>
                </div>
                <button
                  onClick={
                    // @ts-ignore
                    () => document.getElementById("driverDetails").close()
                  }
                >
                  <img className="h-8 w-8" src={crossSvg} alt="" />
                </button>
              </div>

              <div className="flex  items-center justify-between gap-[26px]">
                <div className="flex flex-col justify-center w-[688px] gap-[6px]">
                  <span className="text-base font-medium text-accent-500 ">
                    Full Name
                  </span>
                  <h1 className="text-xl font-semibold  text-accent-700">
                    {driver?.name}
                  </h1>
                </div>
                <div className="flex flex-col justify-center w-[688px] gap-[6px]">
                  <span className="text-base font-medium text-accent-500 ">
                    Mobile No.
                  </span>
                  <h1 className="text-xl font-semibold  text-accent-700">
                    {driver?.contactNo}
                  </h1>
                </div>
              </div>
              <hr className="h-[1px] bg-accent-200" />
              <div className="flex flex-col justify-center w-full gap-[6px]">
                <span className="text-base font-medium text-accent-500 ">
                  Vehicle Model
                </span>
                <h1 className="text-[20px] font-semibold  text-accent-700">
                  {driver?.vehicleNo}
                </h1>
              </div>
              {/* submit btn */}
              <div className="flex items-center justify-between ">
                <Button
                  disabled={isPending}
                  variant="error-outline"
                  onClick={() => mutate(driver?.id!)}
                  className="gap-2 flex justify-center  items-center bg-white"
                >
                  {isPending ? (
                    <PulseLoader color="#cdcfd1" size={6} />
                  ) : (
                    <>
                      <span className="text-base text-error-300">
                        Remove Driver
                      </span>
                      <img className="h-4 w-4" src={blockIcon} alt="" />
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setEditDriverData(driver);
                    (
                      document.getElementById(
                        "updateDriverModal"
                      ) as HTMLDialogElement
                    )?.showModal();
                    (
                      document.getElementById(
                        "driverDetails"
                      ) as HTMLDialogElement
                    )?.close();
                  }}
                  variant="primary"
                  className="px-12 py-4 gap-2 flex justify-center  items-center"
                >
                  <span className="text-base">Edit Driver</span>
                  <img className="h-4 w-4" src={checkIcon} alt="" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DriverDetail;
