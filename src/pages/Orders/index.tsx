import { useState, useEffect } from "react"; // Fix unused import warning
import { orderData, orderDetails } from "../../assets/mockData/orderData";
import ThreeDots from "../../assets/icons/three-dots";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import OrderModal from "./OrderModal";
import InfoCard from "../../components/reusable/InfoCard";
import SearchInput from "../../components/reusable/SearchInput";
import Dropdown from "../../components/reusable/StatusDropdown";
import DownloadCSVButton from "../../components/reusable/DownloadCSVButton";
import ActionModal from "../../components/reusable/ActionModal";
import AssignDriverModal from "./AssignDriverModal";

// Define order status options
const ORDER_STATUS_OPTIONS = [
  "Processing",
  "Packing",
  "Out-for-Delivery",
  "Delivered",
];

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
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    index: null as number | null,
  });
  const [activeDropdownRow, setActiveDropdownRow] = useState<number | null>(
    null
  );
  const [queryString, setQueryString] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [filteredData, setFilteredData] = useState(orderData);

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
                      </div>
                    </div>

                    <div className="flex relative w-fit ml-auto mr-3">
                      <button
                        onClick={() => {
                          setActionModal({ isOpen: true, index });
                        }}
                        className="px-2.5"
                      >
                        <ThreeDots className="w-[18px] h-[18px]" />
                      </button>
                      {actionModal.index === index && actionModal.isOpen && (
                        <ActionModal
                          close={() =>
                            setActionModal({ isOpen: false, index: null })
                          }
                          className="flex flex-col py-3 gap-2 w-[165px]"
                        >
                          <button
                            className="text-[14px] pl-6 text-left font-medium"
                            onClick={() => {
                              document
                                .getElementById("order_modal")
                                //@ts-ignore
                                ?.showModal();
                            }}
                          >
                            View Order
                          </button>
                          <hr />
                          <button className="text-[14px] pl-6 text-left font-medium min-w-fit">
                            Download Invoice
                          </button>
                        </ActionModal>
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
      <AssignDriverModal />
      <OrderModal />
    </div>
  );
};

export default Orders;
