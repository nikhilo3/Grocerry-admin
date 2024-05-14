import { useState, useEffect, useCallback } from "react"; // Fix unused import warning
import { orderDetails } from "../../assets/mockData/orderData";
import ThreeDots from "../../assets/icons/three-dots";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import OrderModal from "./OrderModal";
import InfoCard from "../../components/reusable/InfoCard";
import SearchInput from "../../components/reusable/SearchInput";
import DownloadCSVButton from "../../components/reusable/DownloadCSVButton";
import ActionModal from "../../components/reusable/ActionModal";
import { useQuery } from "@tanstack/react-query";
import { handleGetAllOrders } from "../../api/order";
import { IOrder } from "../../types/order.types";
import Dropdown from "../../components/reusable/Dropdown";
import ErrorOccurred from "../../components/reusable/ErrorOccurred";
import AppLoading from "../../components/loaders/AppLoading";
import debounce from "../../utils/debounce";
import objToQuery from "../../utils/objToQuery";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";

// Define order status options
// ! do not change the order of the options
export const ORDER_STATUS_OPTIONS = [
  "CANCELED",
  "PROCESSING",
  "PACKAGING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

// Function to get Tailwind classes based on order status
const getStatusClasses = (status: string): string => {
  switch (status) {
    case "PACKAGING":
      return "text-blue-600 bg-blue-100";
    case "OUT_FOR_DELIVERY":
      return "text-orange-600 bg-orange-100";
    case "DELIVERED":
      return "text-green-600 bg-green-100";
    case "PROCESSING":
      return "text-warning-500 bg-[#FEFCE8]";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const DEFAULT_QUERY_PARAMS = {
  pageNo: 1,
  perPage: 10,
  name: null as string | null,
  orderStatus: null as string | null,
};

const Orders = () => {
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    index: null as number | null,
  });
  const [activeDropdownRow, setActiveDropdownRow] = useState<number | null>(
    null
  );

  const [filteredData, setFilteredData] = useState<IOrder[]>([]);
  const [selectedViewOrder, setSelectedViewOrder] = useState<IOrder | null>(
    null
  );

  const [queryParams, setQueryParams] = useState(DEFAULT_QUERY_PARAMS);
  const [debouncedQueryParams, setDebouncedQueryParams] =
    useState(DEFAULT_QUERY_PARAMS);

  // get order query
  const { isLoading, data, isError } = useQuery({
    queryFn: () => handleGetAllOrders(objToQuery(debouncedQueryParams)),
    staleTime: Infinity,
    queryKey: ["orders", debouncedQueryParams],
  });

  const debouncedRefetch = useCallback(
    debounce((queryParams) => {
      setDebouncedQueryParams(queryParams);
    }),
    [] // dependencies
  ); //callback to ensure that setSearchParams is not called on every render

  useEffect(() => {
    debouncedRefetch(queryParams);
  }, [queryParams]);

  useEffect(() => {
    if (!data || isLoading) return;
    setFilteredData(data);
  }, [isLoading, data]);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdownRow(activeDropdownRow === index ? null : index);
  };

  if (isError) return <ErrorOccurred error="Failed to fetch orders" />;

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
              placeholder="Search by name..."
              onChange={(e) => {
                setQueryParams({ ...queryParams, name: e.target.value });
              }}
            />
            <Dropdown
              dropdownItems={ORDER_STATUS_OPTIONS}
              selectedItem={queryParams.orderStatus}
              setDropdownItem={(value) => {
                setQueryParams({
                  ...queryParams,
                  orderStatus: value,
                });
              }}
            />
            <div className="pl-[450px] flex justify-end">
              <DownloadCSVButton data={data!} fileName={"orders"} />
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
            {isLoading ? (
              <AppLoading />
            ) : filteredData.length > 0 ? (
              filteredData.map((order, index) => {
                const statusClasses = getStatusClasses(order.orderStatus);
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-6 gap-6 p-4 font-inter ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } rounded-xl relative`}
                  >
                    <div className="flex items-center gap-6">
                      <UnCheckedBox className="min-w-[18px] min-h-[18px] opacity-70" />
                      <span className="px-2 text-[16px] text-accent-500 truncate">
                        {order.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-center text-[16px]  text-accent-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center justify-center text-[16px]  text-accent-500">
                      {order.userDetailsDto.name}
                    </div>
                    <div className="flex items-center justify-center text-[16px]  text-accent-500">
                      ₹{order.totalItemCost}
                    </div>

                    <div className="relative">
                      <div
                        className={`p-4 w-[220px] flex rounded-xl justify-center items-center ${statusClasses} ${
                          activeDropdownRow === index ? "rounded-b-none" : ""
                        }`}
                        onClick={() => handleDropdownToggle(index)}
                      >
                        <span className="text-[16px]">{order.orderStatus}</span>
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
                              setSelectedViewOrder(order);
                              document
                                .getElementById("order_modal")
                                //@ts-ignore
                                ?.showModal();
                            }}
                          >
                            View Order
                          </button>
                          <hr />
                          <PDFDownloadLink
                            document={<Invoice order={order} />}
                            fileName="invoice.pdf"
                          >
                            {(res) =>
                              res.loading ? (
                                "Loading document..."
                              ) : (
                                <button className="text-[14px] pl-6 text-left font-medium min-w-fit">
                                  Download Invoice
                                </button>
                              )
                            }
                          </PDFDownloadLink>
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
      <OrderModal
        selectedOrder={selectedViewOrder}
        setSelectedOrder={setSelectedViewOrder}
      />
    </div>
  );
};

export default Orders;
