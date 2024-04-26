import { useState, useRef, useEffect, SetStateAction } from 'react';
import arrowDown from '../../assets/icons/statusArrowdown.svg';
import { orderData, orderDetails } from '../../assets/mockData/orderData';
import ThreeDots from '../../assets/icons/three-dots';
import UnCheckedBox from '../../assets/icons/unchecked-box';
import OrderModal from './OrderModal';
import InfoCard from '../../components/reusable/InfoCard';
import SearchInput from '../../components/reusable/SearchInput';
import Dropdown from '../../components/reusable/StatusDropdown';
import DownloadInvoice from '../../components/reusable/DownloadInvoice';

// Status options for the order
const ORDER_STATUS_OPTIONS = ['Processing', 'Packing', 'Out-for-Delivery', 'Delivered'];

// Search function to look through specified keys
const search = (data: any[], query: string, keys: any[]) => {
    if (!query) return data;
    return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    );
};

const Orders = () => {
    const [activeMenuRow, setActiveMenuRow] = useState<number | null>(null);
    const [activeDropdownRow, setActiveDropdownRow] = useState<number | null>(null);
    const [isOutForDeliveryModalOpen, setIsOutForDeliveryModalOpen] = useState(false);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const [queryString, setQueryString] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [filteredData, setFilteredData] = useState(orderData);

    useEffect(() => {
        let data = orderData;

        // Apply status filter if a status is selected
        if (selectedStatus) {
            data = data.filter((order) => order.Status === selectedStatus);
        }

        // Define search keys for filtering
        const searchKeys = ['Name', 'Status'];

        // Apply the search filter
        data = search(data, queryString, searchKeys);

        setFilteredData(data);
    }, [queryString, selectedStatus]); // Re-run when queryString or selectedStatus changes

    const handleDropdownToggle = (index: SetStateAction<number | null>) => {
        setActiveDropdownRow(activeDropdownRow === index ? null : index);
    };

    const handleStatusChange = (status: string, index: number) => {
        if (status === 'Out-for-Delivery') {
            setIsOutForDeliveryModalOpen(true);
        }
        orderData[index].Status = status;
        setActiveDropdownRow(null);
    };

    const closeModal = () => {
        setIsOutForDeliveryModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-11 overflow-hidden">
            {/* Info Cards */}
            <div className="flex gap-5">
                {orderDetails.map((product, index) => (
                    <InfoCard key={index} {...product} />
                ))}
            </div>

            {/* Product Table */}
            <div className="overflow-x-scroll hide-scrollbar min-h-[40vh]">
                <div className="border border-accent-200 rounded-[20px] bg-white p-6 flex flex-col gap-6 min-w-[1100px]">
                    {/* Top Actions */}
                    <div className="gap-6 items-center flex">
                        <div className="flex gap-6">
                            <SearchInput
                                placeholder="Search by name"
                                onChange={(e) => setQueryString(e.target.value)}
                            />
                            <Dropdown
                                dropdownItems={ORDER_STATUS_OPTIONS}
                                selectedItems={[selectedStatus]}
                                setDropdownItems={(items: string | any[]) => {
                                    setSelectedStatus(items.length > 0 ? items[0] : '');
                                }}
                            />
                            <div className="pl-[450px] flex justify-end">
                                <DownloadInvoice />
                            </div>
                        </div>
                    </div>

                    {/* Table Headers */}
                    <div className="grid grid-cols-6 gap-6 p-4 bg-gray-500 text-accent-50 rounded-xl">
                        <div className="flex items-center">
                            <UnCheckedBox className="w-[18px] h-[18px]" />
                            <span className="px-2">Order ID</span>
                        </div>
                        <div>Date</div>
                        <div>Customer Name</div>
                        <div className="text-center">Total</div>
                        <div>Status</div>
                        <div className="flex justify-center">Actions</div>
                    </div>

                    {/* Table Rows */}
                    <div className="mt-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((order, index) => (
                                <div
                                    key={index}
                                    className={`grid grid-cols-6 gap-6 p-4 ${
                                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } rounded-xl relative`}
                                >
                                    <div className="flex items-center">
                                        <UnCheckedBox className="w-[18px] h-[18px]" />
                                        <span className="px-2 text-[18px]">{order._id}</span>
                                    </div>
                                    <div className="text-start text-[18px]">{order.Date}</div>
                                    <div className="text-start text-[18px]">{order.Name}</div>
                                    <div className="text-center text-[18px]">₹{order.Total}</div>

                                    {/* Status Dropdown */}
                                    <div className="relative">
                                        <div
                                            className={`p-2 w-[200px] bg-[#FEFCE8] flex justify-between rounded-xl items-center ${
                                                activeDropdownRow === index
                                                    ? 'rounded-t-xl rounded-b-none'
                                                    : 'rounded-xl'
                                            }`}
                                            onClick={() => handleDropdownToggle(index)}
                                        >
                                            <span className="text-warning-500 text-[16px]">{order.Status}</span>
                                            <img
                                                className={`w-[16px] h-[16px] transition-transform duration-300 ${
                                                    activeDropdownRow === index ? 'rotate-180' : ''
                                                }`}
                                                src={arrowDown}
                                                alt="Dropdown Arrow"
                                            />
                                        </div>
                                        {activeDropdownRow === index && (
                                            <div
                                                className="absolute z-10 bg-white border-l-none rounded-xl rounded-t-none"
                                                style={{ top: '100%', left: 0, width: '200px' }}
                                            >
                                                {ORDER_STATUS_OPTIONS.filter(
                                                    (status) => status !== order.Status
                                                ).map((status) => (
                                                    <button
                                                        key={status}
                                                        className="block text-start p-2 text-warning-500 hover:bg-warning-100"
                                                        onClick={() => handleStatusChange(status, index)}
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions Dropdown */}
                                    <div
                                        className="relative flex justify-center"
                                        onMouseEnter={() => setActiveMenuRow(index)}
                                        onMouseLeave={() => setActiveMenuRow(null)}
                                    >
                                        <button>
                                            <ThreeDots className="w-[18px] h-[18px]" />
                                        </button>
                                        {activeMenuRow === index && (
                                            <div
                                                className="absolute flex flex-col w-[164px] bg-white border rounded-xl shadow-lg top-[10px] right-0 z-10"
                                            >
                                                <button
                                                    className="text-[14px] font-semibold p-2 hover:bg-gray-100"
                                                    onClick={() => modalRef.current?.showModal()}
                                                >
                                                    View Order
                                                </button>
                                                <button
                                                    className="text-[14px] font-semibold p-2 hover:bg-gray-100"
                                                >
                                                    Download Invoice
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-24 text-gray-500">
                                No data found
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Out-for-Delivery Modal */}
            {isOutForDeliveryModalOpen && (
                <dialog open className="bg-white rounded-xl p-6 shadow-xl">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-[28px] font-bold">Assign a Driver</h2>
                            <p className="text-[14px] leading-1">The order has been marked as Out-for-Delivery.</p>
                            <input
                                type="text"
                                placeholder="Search for a driver"
                                className="border rounded-xl px-3 py-2 w-[520px] h-[60px] mt-2 border-accent-200 bg-accent-200"
                            />
                        </div>
                        <button onClick={closeModal} className="text-[28px] font-semibold">X</button>
                    </div>
                    <button className="mt-4 px-4 py-4 w-[225px] bg-gray-200 rounded-md">
                        Assign Driver ✔
                    </button>
                </dialog>
            )}

            {/* Order Modal */}
            <OrderModal ref={modalRef} />
        </div>
    );
};

export default Orders;
