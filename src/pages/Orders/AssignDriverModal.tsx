import { useCallback, useEffect, useState } from "react";
import profile from "../../assets/icons/Group.svg";
import vector from "../../assets/icons/Vector.svg";
import { DriverResponseType, handleGetDriversByName } from "../../api/driver";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import debounce from "../../utils/debounce";
import { handleChangeOrderStatusToOutForDelivery } from "../../api/order";
import toast from "react-hot-toast";

const AssignDriverModal = ({ orderId }: { orderId: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<DriverResponseType>();

  // get driver by name query
  const {
    data: drivers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => handleGetDriversByName(searchTerm),
    queryKey: ["drivers", searchTerm],
    enabled: false,
  });

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }),
    [] // dependencies
  ); //callback to ensure that setSearchParams is not called on every render

  useEffect(() => {
    if (searchTerm) {
      debouncedRefetch();
    }
  }, [searchTerm]);
  const queryClient = useQueryClient();
  // update driver mutation
  const { mutate: updateDriver, isPending: isUpdating } = useMutation({
    mutationFn: handleChangeOrderStatusToOutForDelivery,
    onSuccess: (msg) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      //@ts-ignore
      document.getElementById("assign_driver_modal")?.close();
      //@ts-ignore
      document.getElementById("order_modal")?.close();
      toast.success(msg);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  return (
    <dialog id="assign_driver_modal" className="modal">
      <div className="modal-box w-fit h-fit min-w-fit min-h-fit">
        <div className="flex justify-between">
          <div>
            <h2 className="text-[28px] font-bold">Assign a Driver</h2>
            <p className="text-[14px] leading-0 text-accent-600 ">
              The order will be marked as OUT_FOR_DELIVERY after assigning a
              driver.
            </p>
            <div className="border rounded-xl px-3 py-2 w-[520px] h-[52px] my-4 border-accent-200 bg-accent-200 flex gap-4">
              <img src={profile} alt="" className="w-[14px]" />
              <input
                type="text"
                placeholder="Search for a driver"
                className=" border-none hover:border-none bg-accent-200 w-[420px] outline-none focus:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={vector} alt="" className="w-[18px]" />
            </div>
            {searchTerm ? (
              isLoading ? (
                <div className="flex flex-col items-center justify-center w-full h-12 ">
                  <p className="text-gray-400">Loading...</p>
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center w-full h-12 ">
                  <p className="text-gray-400">Error fetching drivers!!</p>
                </div>
              ) : drivers && drivers.length > 0 ? (
                <div className="bg-white border rounded-lg p-2 shadow-md my-2 border-warning-500 min-h-12 max-h-56 overflow-x-hidden overflow-y-auto scrollbar-md">
                  {selectedDriver ? (
                    <div className="bg-yellow-50 flex justify-between px-4">
                      <button
                        key={selectedDriver.id}
                        className="p-2 cursor-pointer text-left rounded-md"
                        onClick={() => setSelectedDriver(undefined)}
                      >
                        {selectedDriver.name}
                      </button>
                      <button
                        onClick={() => setSelectedDriver(undefined)}
                        className="text-primary-500"
                      >
                        Clear
                      </button>
                    </div>
                  ) : (
                    drivers.map((driver) => (
                      <button
                        key={driver.id}
                        className="p-2 cursor-pointer hover:bg-yellow-50 block w-full text-left rounded-md"
                        onClick={() => setSelectedDriver(driver)}
                      >
                        {driver.name}
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-12 ">
                  <p className="text-gray-400">No driver found!!</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-12 ">
                <p className="text-gray-400">Search for a driver!!</p>
              </div>
            )}
          </div>
        </div>
        <div
          className={`flex justify-center gap-2 py-2 my-1 w-[225px] bg-gray-200 rounded-xl ${
            selectedDriver ? "bg-primary-500" : "bg-gray-300"
          }`}
        >
          <button
            onClick={() => {
              if (selectedDriver) {
                updateDriver({
                  orderId,
                  driverId: selectedDriver.id,
                });
              }
            }}
            className="bg-primary-500 disabled:bg-gray-300 text-white px-4 py-2 rounded" // Conditional class based on selectedDriver
            disabled={!selectedDriver || isUpdating} // Disable button if no driver is selected
          >
            Assign Driver
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default AssignDriverModal;
