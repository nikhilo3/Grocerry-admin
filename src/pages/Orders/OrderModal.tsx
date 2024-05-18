import React, { useState } from "react";
import arrowDown from "../../assets/icons/statusArrowdown.svg";
import Download from "../../components/reusable/DownloadInvoice";
import { ORDER_STATUS_OPTIONS } from ".";
import { IOrder } from "../../types/order.types";
import imagePlaceholder from "../../assets/icons/image-svgrepo-com.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleChangeOrderStatus } from "../../api/order";
import toast from "react-hot-toast";
import AssignDriverModal from "./AssignDriverModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePdf from "./Invoice";

const OrderModal = ({
  selectedOrder,
  setSelectedOrder,
}: {
  selectedOrder: IOrder | null;
  setSelectedOrder: React.Dispatch<React.SetStateAction<IOrder | null>>;
}) => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const queryClient = useQueryClient();

  const toggleDropdown = () => {
    if (selectedOrder?.orderStatus === "DELIVERED") return;
    if (selectedOrder?.orderStatus === "CANCELED") return;
    setActiveDropdown((prev) => !prev);
  };

  // change order status mutation
  const { isPending, mutate } = useMutation({
    mutationFn: handleChangeOrderStatus,
    onSuccess: (msg) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      // @ts-ignore
      document.getElementById("order_modal").close();
      toast.success(msg);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  return (
    <>
      <dialog id="order_modal" className="modal">
        <div
          className="modal-box relative p-8"
          style={{ maxWidth: "900px", maxHeight: "1400px" }}
        >
          <button
            onClick={() => {
              setSelectedOrder(null);
              // @ts-ignore
              document.getElementById("order_modal").close();
            }}
            className="btn btn-md btn-circle btn-ghost absolute right-4 top-4 text-[48px]"
          >
            ✕
          </button>
          <div className="flex flex-col">
            <div className="pb-2">
              <h2 className="text-gray-700 text-[30px] font-semibold">
                Order Details
              </h2>
              <p className="text-gray-500 text-sm font-normal">
                Details about the order.
              </p>
            </div>
            <div className="flex gap-6 ">
              {/* Order details content */}
              <div className="w-1/2 font-inter text-sm ">
                {/* Order Details */}
                <div className="flex flex-col pt-2">
                  <span className="text-accent-500">Order Details</span>
                  <span className="text-accent-700 text-[12px]">
                    #{selectedOrder?.id}
                  </span>
                  <span className="text-accent-700 text-[12px]">
                    Ordered at{" "}
                    {new Date(selectedOrder?.createdAt ?? "").toLocaleString()}
                  </span>
                </div>
                <div className="py-1 flex flex-col">
                  <span className="text-accent-500 text-[12px]">
                    Customer Details
                  </span>
                  <span className="text-accent-700 text-[12px]">
                    {selectedOrder?.userDetailsDto.email}
                  </span>
                  <span className="text-accent-700 text-[12px]">
                    {selectedOrder?.userDetailsDto.primaryPhoneNo}
                  </span>
                </div>
                <div className="py-1 flex flex-col">
                  <span className="text-accent-500">Address Details</span>
                  <p className="text-accent-700 w-[250px] text-[12px]">
                    {Object.keys(selectedOrder?.shippingInfo ?? {})
                      .map((key) => {
                        if (key === "id" || key === "primaryAddress")
                          return null;
                        // @ts-ignore
                        return selectedOrder?.shippingInfo[key];
                      })
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>

                {/* Status Change */}
                <hr className="mt-2" />
                <div className="flex flex-col gap-4 relative">
                  <span className="py-2 text-accent-700 text-[20px] font-semibold">
                    Change Status
                  </span>
                  <button
                    disabled={
                      isPending ||
                      selectedOrder?.orderStatus === "DELIVERED" ||
                      selectedOrder?.orderStatus === "CANCELED"
                    }
                    className={`p-4 w-[200px] bg-[#FEFCE8] flex justify-between rounded-xl items-center  ${
                      activeDropdown
                        ? "rounded-t-xl rounded-b-none"
                        : "rounded-xl"
                    }`}
                    onClick={toggleDropdown}
                  >
                    <span className="text-warning-500 text-[16px]">
                      {isPending ? "Updating" : selectedOrder?.orderStatus}
                    </span>
                    <img
                      className={`w-[16px] h-[16px]  transition-transform duration-300 ${
                        activeDropdown ? "rotate-180" : ""
                      }`}
                      src={arrowDown}
                      alt="Arrow Down"
                    />
                  </button>
                  {activeDropdown && (
                    <div
                      className="absolute z-10 bg-white border border-accent-200 rounded-b-xl"
                      style={{ width: "200px", top: "100%", left: 0 }}
                    >
                      {(() => {
                        const index = ORDER_STATUS_OPTIONS.indexOf(
                          selectedOrder?.orderStatus ?? ""
                        );
                        const status = ORDER_STATUS_OPTIONS[index + 1];
                        return (
                          <button
                            key={status}
                            className="block text-start p-2 text-warning-500 hover:bg-warning-100"
                            onClick={() => {
                              if (status === "OUT_FOR_DELIVERY") {
                                (
                                  document.getElementById(
                                    "assign_driver_modal"
                                  ) as HTMLDialogElement
                                ).showModal();
                                setActiveDropdown(false);
                                return;
                              }
                              mutate({
                                id: selectedOrder?.id ?? "",
                                orderStatus: status,
                              });
                              setActiveDropdown(false);
                            }}
                          >
                            {status}
                          </button>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side of the Modal */}
              <div className="w-1/2">
                {/* Product details and bill summary */}
                <div className="h-[180px] overflow-scroll hide-scrollbar flex flex-col gap-2">
                  {/* Product list and pricing */}
                  {selectedOrder?.boughtProductDetailsList.map(
                    (product, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="flex gap-2">
                          <img
                            className="w-[48px] h-[40px] object-center object-cover"
                            src={product.documents?.[0] ?? imagePlaceholder}
                            alt="product"
                            onError={(e) =>
                              (e.currentTarget.src = imagePlaceholder)
                            }
                          />
                          <div className="flex flex-col w-[160px]">
                            <span className="text-[12px]">{product.name}</span>
                            <span className="text-[12px]">
                              Quantity: {product.boughtQuantity}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-primary-500">
                            ₹{product.discountedPrice}
                          </span>
                          <span className="line-through text-[10px]">
                            ₹{product.price}
                          </span>
                        </div>
                      </div>
                    )
                  )}
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
                    <span>₹{selectedOrder?.totalItemCost}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[14px] text-accent-500">
                      Delivery Charges
                    </span>
                    <span>₹{selectedOrder?.deliveryCharges}</span>
                  </div>
                  <div className="flex justify-between py-6">
                    <div className="flex flex-col">
                      <span className="font-semibold">Total Bill</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-900">
                          ₹{selectedOrder?.totalCost}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download invoice */}
            <div className="flex justify-end pt-6 ">
              <PDFDownloadLink
                document={<InvoicePdf order={selectedOrder!} />}
                fileName="invoice.pdf"
              >
                {(res) => (res.loading ? "Loading document..." : <Download />)}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </dialog>
      <AssignDriverModal orderId={selectedOrder?.id ?? ""} />
    </>
  );
};

export default OrderModal;
