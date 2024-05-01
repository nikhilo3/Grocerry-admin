import { forwardRef, Ref, useEffect, useState } from "react";
import arrowDown from "../../assets/icons/statusArrowdown.svg";
import hard from "../../assets/images/Rectangle 77.png";
import Download from "../../components/reusable/DownloadInvoice";

const ORDER_STATUS_OPTIONS = [
  "Processing",
  "Packing",
  "Out-for-Delivery",
  "Delivered",
];

const OrderModal = () => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Processing"); // Default status

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  const changeStatus = (status: string) => {
    setSelectedStatus(status);
    setActiveDropdown(false); // Close the dropdown after status change
  };

  useEffect(() => {
    if (selectedStatus === "Out-for-Delivery") {
      // @ts-ignore
      document.getElementById("assign_driver_modal").showModal();
    }
  }, [selectedStatus]);

  return (
    <dialog id="order_modal" className="modal">
      <div
        className="modal-box relative p-8"
        style={{ maxWidth: "900px", maxHeight: "1400px" }}
      >
        <form method="dialog">
          <button className="btn btn-md btn-circle btn-ghost absolute right-4 top-4 text-[48px]">
            ✕
          </button>
        </form>
        <div className="flex flex-col">
          <div className="pb-2">
            <h2 className="text-gray-700 text-[30px] font-semibold">
              Order Details
            </h2>
            <p className="text-gray-500 text-sm font-normal">
              Details about the order.
            </p>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {/* Order details content */}
            <div className="w-1/2 font-inter text-sm overflow-auto ">
              {/* Order Details */}
              <div className="flex flex-col pt-2">
                <span className="text-accent-500">Order Details</span>
                <span className="text-accent-700 text-[12px]">
                  #24305921309JNFIN
                </span>
                <span className="text-accent-700 text-[12px]">
                  Ordered at 12/03/24 at 12:24 pm
                </span>
              </div>
              <div className="py-1 flex flex-col">
                <span className="text-accent-500 text-[12px]">
                  Customer Details
                </span>
                <span className="text-accent-700 text-[12px]">
                  customer@example.com
                </span>
                <span className="text-accent-700 text-[12px]">
                  +91 912739289584
                </span>
              </div>
              <div className="py-1 flex flex-col">
                <span className="text-accent-500">Address Details</span>
                <p className="text-accent-700 w-[250px] text-[12px]">
                  No. 46, 12th Cross Street, ABCDEFG Street, X Area, Y City,
                  8947233 Pincode
                </p>
              </div>

              {/* Status Change */}
              <hr className="mt-2" />
              <div className="flex flex-col gap-4 relative">
                <span className="py-2 text-accent-700 text-[20px] font-semibold">
                  Change Status
                </span>
                <div
                  className={`p-4 w-[200px] bg-[#FEFCE8] flex justify-between rounded-xl items-center 
                                    ${
                                      activeDropdown
                                        ? "rounded-t-xl rounded-b-none"
                                        : "rounded-xl"
                                    }`}
                  onClick={toggleDropdown}
                >
                  <span className="text-warning-500 text-[16px]">
                    {selectedStatus}
                  </span>
                  <img
                    className={`w-[16px] h-[16px]  transition-transform duration-300 ${
                      activeDropdown ? "rotate-180" : ""
                    }`}
                    src={arrowDown}
                    alt="Arrow Down"
                  />
                </div>
                {activeDropdown && (
                  <div
                    className="absolute z-10 bg-white border border-accent-200 rounded-b-xl"
                    style={{ width: "200px", top: "100%", left: 0 }}
                  >
                    {ORDER_STATUS_OPTIONS.filter(
                      (status) => status !== selectedStatus
                    ).map((status) => (
                      <button
                        key={status}
                        className="block text-start p-2 text-warning-500 hover:bg-warning-100"
                        onClick={() => changeStatus(status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side of the Modal */}
            <div className="w-1/2">
              {/* Product details and bill summary */}
              <div className="h-[180px] overflow-scroll hide-scrollbar flex flex-col gap-2">
                {/* Product list and pricing */}
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <img
                      className="w-[48px] h-[48px]"
                      src={hard}
                      alt="product"
                    />
                    <div className="flex flex-col w-[160px]">
                      <span className="text-[12px]">Product Name</span>
                      <span className="text-[12px]">200 g</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary-500">₹42</span>
                    <span className="line-through text-[10px]">₹58</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <img
                      className="w-[48px] h-[48px]"
                      src={hard}
                      alt="product"
                    />
                    <div className="flex flex-col w-[160px]">
                      <span className="text-[12px]">Product Name</span>
                      <span className="text-[12px]">200 g</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary-500">₹42</span>
                    <span className="line-through text-[10px]">₹58</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <img
                      className="w-[48px] h-[48px]"
                      src={hard}
                      alt="product"
                    />
                    <div className="flex flex-col w-[160px]">
                      <span className="text-[12px]">Product Name</span>
                      <span className="text-[12px]">200 g</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary-500">₹42</span>
                    <span className="line-through text-[10px]">₹58</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <img
                      className="w-[48px] h-[48px]"
                      src={hard}
                      alt="product"
                    />
                    <div className="flex flex-col w-[160px]">
                      <span className="text-[12px]">Product Name</span>
                      <span className="text-[12px]">200 g</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary-500">₹42</span>
                    <span className="line-through text-[10px]">₹58</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <img
                      className="w-[48px] h-[48px]"
                      src={hard}
                      alt="product"
                    />
                    <div className="flex flex-col w-[160px]">
                      <span className="text-[12px]">Product Name</span>
                      <span className="text-[12px]">200 g</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary-500">₹42</span>
                    <span className="line-through text-[10px]">₹58</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <img
                      className="w-[48px] h-[48px]"
                      src={hard}
                      alt="product"
                    />
                    <div className="flex flex-col w-[160px]">
                      <span className="text-[12px]">Product Name</span>
                      <span className="text-[12px]">200 g</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary-500">₹42</span>
                    <span className="line-through text-[10px]">₹58</span>
                  </div>
                </div>
                {/* Add more product entries as needed */}
              </div>

              {/* Bill Summary */}
              <div className="p-4 bg-accent-50 border-accent-300">
                <span className="text-accent-900 text-[20px] font-inter py-4 font-semibold">
                  Bill Summary
                </span>
                <div className="flex justify-between py-2">
                  <span className="text-[14px] text-accent-500">
                    Item Total
                  </span>
                  <span>₹33</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[14px] text-accent-500">
                    Delivery Charges
                  </span>
                  <span>₹33</span>
                </div>
                <div className="flex justify-between py-6">
                  <div className="flex flex-col">
                    <span className="font-semibold">Total Bill</span>
                    <span>Incl. all taxes and charges</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="line-through text-[12px]">₹100.0</span>
                      <span className="text-[16px] font-900">₹87.49</span>
                    </div>
                    <span className="bg-[#4ADE80] text-white px-2 py-2 text-[12px] text-center rounded-xl">
                      SAVING ₹9.51
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download invoice */}
          <div className="flex justify-end pt-6 ">
            <Download />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default OrderModal;
