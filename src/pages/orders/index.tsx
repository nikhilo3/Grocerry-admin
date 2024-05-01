import { useState, useEffect, useRef } from "react"; // Fix unused import warning
import arrowDown from "../../assets/icons/statusArrowdown.svg";
import { orderData, orderDetails } from "../../assets/mockData/orderData";
import ThreeDots from "../../assets/icons/three-dots";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import OrderModal from "./OrderModal";
import InfoCard from "../../components/reusable/InfoCard";
import SearchInput from "../../components/reusable/SearchInput";
import Dropdown from "../../components/reusable/StatusDropdown";
import profile from "../../assets/icons/Group.svg";
import vector from "../../assets/icons/Vector.svg";
import arrowblue from "../../assets/icons/fi-br-angle-small-down.svg";
import arrowOran from "../../assets/icons/fi-br-angle-small-down.svg";
import arrowGreen from "../../assets/fi-br-angle-small-down.svg";
import DownloadCSVButton from "../../components/reusable/DownloadCSVButton";

const statusArrowImages: Record<string, string> = {
  Processing: arrowDown,
  "Out-for-Delivery": arrowOran,
  Delivered: arrowGreen,
  Packing: arrowblue,
};

const drivers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Robert Johnson" },
  { id: 4, name: "Alice Brown" },
  { id: 5, name: "Michael Davis" },
];
// Define order status options
const ORDER_STATUS_OPTIONS = [
  "Processing",
  "Packing",
  "Out-for-Delivery",
  "Delivered",
];

const statusStyles: Record<string, string> = {
  Processing: "text-warning-500 bg-[#FEFCE8]",
  Packing: "text-blue-600 bg-blue-100",
  "Out-for-Delivery": "text-orange-600 bg-orange-100",
  Delivered: "text-green-600 bg-green-100",
};

// Search function with proper parameter types
const search = (data: any[], query: string, keys: string[]): any[] => {
  if (!query) return data;
  return data.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
  );
};

// Function to get Tailwind classes based on order status
const getStatusClasses = (status: string): string => {
  switch (status) {
    case "Packing":
      return "text-blue-600 bg-blue-100";
    case "Out-for-Delivery":
      return "text-orange-600 bg-orange-100";
    case "Delivered":
      return "text-green-600 bg-green-100";
    case "Processing":
      return "text-warning-500 bg-[#FEFCE8]";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const Orders = () => {
  const [activeMenuRow, setActiveMenuRow] = useState<number | null>(null);
  const [activeDropdownRow, setActiveDropdownRow] = useState<number | null>(
    null
  );
  const [isOutForDeliveryModalOpen, setIsOutForDeliveryModalOpen] =
    useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [queryString, setQueryString] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [filteredData, setFilteredData] = useState(orderData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Fallback to default if not found

  // Filter the list of drivers based on the search term
  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    let data = orderData;
    if (selectedStatus) {
      data = data.filter((order) => order.Status === selectedStatus);
    }

    const searchKeys = ["Name", "orderID"];
    data = search(data, queryString, searchKeys);

    setFilteredData(data);
  }, [queryString, selectedStatus]);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdownRow(activeDropdownRow === index ? null : index);
  };

  const handleStatusChange = (status: string, index: number) => {
    if (status === "Out-for-Delivery") {
      setIsOutForDeliveryModalOpen(true);
    }
    orderData[index].Status = status;
    setActiveDropdownRow(null);
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal(); // Ensure showModal exists on the ref
    }
  };

  const closeModal = () => {
    setIsOutForDeliveryModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-11 overflow-hidden font-inter">
      <div className="flex gap-5">
        {orderDetails.map((product, index) => (
          <InfoCard key={index} {...product} />
        ))}
      </div>

      <div className="overflow-x-scroll hide-scrollbar min-h-[40vh]">
        <div className="border border-accent-200 rounded-[20px] bg-white p-6 flex flex-col gap-6 min-w-[1100px]">
          <div className="gap-6 items-center flex">
            <SearchInput
              placeholder="Search order"
              onChange={(e) => setQueryString(e.target.value)}
            />
            <Dropdown
              dropdownItems={ORDER_STATUS_OPTIONS}
              selectedItems={[selectedStatus]}
              setDropdownItems={(items: any[]) =>
                setSelectedStatus(items[0] || "")
              }
            />
            <div className="pl-[450px] flex justify-end">
              <DownloadCSVButton data={[]} fileName={""} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-[0px] p-4 bg-gray-500 text-accent-50 rounded-xl font-inter">
            <div className="flex items-center gap-6">
              <UnCheckedBox className="w-[18px] h-[18px]" />
              <span className="px-2">Order ID</span>
            </div>
            <div className="flex items-center justify-center">Date</div>
            <div className="flex items-center justify-center">
              Customer Name
            </div>
            <div className="flex items-center justify-center">Total</div>
            <div className="flex items-center justify-center">Status</div>
            <div className="flex justify-end items-center">Actions</div>
          </div>

          <div className="mt-4">
            {filteredData.length > 0 ? (
              filteredData.map((order, index) => {
                const statusClasses = getStatusClasses(order.Status);
                const currentOrderStatus = orderData[0].Status; // Example reference
                const arrowDownimage =
                  statusArrowImages[currentOrderStatus] ||
                  statusArrowImages["Processing"];
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-6 gap-6 p-4 font-inter ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } rounded-xl relative`}
                  >
                    <div className="flex items-center gap-6">
                      <UnCheckedBox className="w-[18px] h-[18px]" />
                      <span className="px-2 text-[16px] text-accent-500">
                        {order._id}
                      </span>
                    </div>
                    <div className="flex items-center justify-center text-[16px]  text-accent-500">
                      {order.Date}
                    </div>
                    <div className="flex items-center justify-center text-[16px]  text-accent-500">
                      {order.Name}
                    </div>
                    <div className="flex items-center justify-center text-[16px]  text-accent-500">
                      ₹{order.Total}
                    </div>

                    <div className="relative">
                      <div
                        className={`p-4 w-[220px] flex justify-between rounded-xl  items-center ${statusClasses} ${
                          activeDropdownRow === index ? "rounded-b-none" : ""
                        }`}
                        onClick={() => handleDropdownToggle(index)}
                      >
                        <span className="text-[16px]">{order.Status}</span>
                        <img
                          className={`w-[16px] h-[16px] transition-transform duration-300 ${
                            activeDropdownRow === index ? "rotate-180" : ""
                          }`}
                          src={arrowDownimage}
                          alt="Dropdown Arrow"
                        />
                      </div>
                      {activeDropdownRow === index && (
                        <div
                          className="absolute z-10 bg-white border rounded-xl rounded-t-none"
                          style={{ top: "100%", left: 0, width: "220px" }}
                        >
                          {ORDER_STATUS_OPTIONS.filter(
                            (s) => s !== order.Status
                          ).map((s) => (
                            <button
                              key={s}
                              className={`block text-start p-4 w-[220px] hover:bg-warning-100 ${statusStyles[s]}`}
                              onClick={() => handleStatusChange(s, index)}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div
                      className="relative flex justify-end"
                      onClick={() => setActiveMenuRow(index)}
                      onMouseLeave={() => setActiveMenuRow(null)}
                    >
                      <button>
                        <ThreeDots className="w-[18px] h-[18px]" />
                      </button>
                      {activeMenuRow === index && (
                        <div
                          className="absolute flex flex-col w-[164px] bg-white border rounded-xl shadow-lg"
                          onMouseLeave={() => setActiveMenuRow(null)}
                        >
                          <button
                            className="text-[14px] font-semibold p-2 hover:bg-gray-100"
                            onClick={openModal}
                          >
                            View Order
                          </button>
                          <button className="text-[14px] font-semibold p-2 hover-bg-gray-100">
                            Download Invoice
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-24 text-gray-500">
                No data found
              </div>
            )}
          </div>
        </div>
      </div>

      {isOutForDeliveryModalOpen && (
        <dialog
          open
          className="bg-white rounded-xl p-6 shadow-xl inset-0 fixed"
        >
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
                if (selectedDriver) {
                  closeModal();
                }
              }}
              className={`${
                selectedDriver ? "bg-primary-500" : "bg-gray-300"
              } text-white px-4 py-2 rounded`} // Conditional class based on selectedDriver
              disabled={!selectedDriver} // Disable button if no driver is selected
            >
              Assign Driver
            </button>
            {/* <img src={tick} alt="Tick" /> */}
          </div>
        </dialog>
      )}
      <OrderModal ref={modalRef} />
    </div>
  );
};

export default Orders;
