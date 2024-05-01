import { useEffect, useState } from "react";
import profile from "../../assets/icons/Group.svg";
import vector from "../../assets/icons/Vector.svg";
import search from "../../utils/search";

const drivers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Robert Johnson" },
  { id: 4, name: "Alice Brown" },
  { id: 5, name: "Michael Davis" },
];

const AssignDriverModal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDriver, setSelectedDriver] =
    useState<(typeof drivers)[number]>();
  const [filteredDrivers, setFilteredDrivers] = useState(drivers);

  useEffect(() => {
    if (drivers) {
      setFilteredDrivers(search(drivers, searchTerm, ["name"]));
    }
  }, [searchTerm, drivers]);

  return (
    <dialog id="assign_driver_modal" className="modal">
      <div className="modal-box w-fit h-fit min-w-fit min-h-fit">
        <div className="flex justify-between">
          <div>
            <h2 className="text-[28px] font-bold">Assign a Driver</h2>
            <p className="text-[14px] leading-0 text-accent-600 ">
              The order has been marked as Out-for-Delivery.
            </p>
            <div className="border rounded-xl px-3 py-2 w-[520px] h-[52px] my-4 border-accent-200 bg-accent-200 flex gap-4">
              <img src={profile} alt="" className="w-[14px]" />
              <input
                type="text"
                placeholder="Search for a driver"
                className=" border-none hover:border-none bg-accent-200 w-[420px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={vector} alt="" className="w-[18px]" />
            </div>
            {searchTerm && (
              <div className="bg-white border rounded-lg p-2 shadow-md my-2 border-warning-500">
                {filteredDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="p-2 cursor-pointer"
                    onClick={() => setSelectedDriver(driver)}
                  >
                    {driver.name}
                  </div>
                ))}
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
              //@ts-ignore
              document.getElementById("assign_driver_modal")?.close();
            }}
            className={`${
              selectedDriver ? "bg-primary-500" : "bg-gray-300"
            } text-white px-4 py-2 rounded`} // Conditional class based on selectedDriver
            disabled={!selectedDriver} // Disable button if no driver is selected
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
