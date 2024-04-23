import { orderData, orderDetails } from "../../assets/mockData/orderData"
import InfoCard from "../../components/reusable/InfoCard"
import Download from "../../components/reusable/Download";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import { useEffect, useState } from "react";
import { products } from "../../assets/mockData/products";
import search from "../../utils/search";
import SearchInput from "../../components/reusable/SearchInput";
import StatusDropdown from "../../components/reusable/StatusDropdown";
import { PRODUCT_STATUS } from "../../assets/data/status";
import arrowDown from "../../assets/icons/statusArrowdown.svg";
import ThreeDots from "../../assets/icons/three-dots";
import OrderModal from "./OrderModal";



const orders = () => {
    const [, setFilteredData] = useState(products);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [queryString, setQueryString] = useState<string>("");
    const [isMenuVisible, setIsMenuVisible] = useState(false);


    const handleButtonClick = () => {
        // Toggle the visibility of the menu
        setIsMenuVisible(!isMenuVisible);
    };

    useEffect(() => {
        let data = products;
        if (selectedCategories.length > 0) {
            data = data.filter((product) =>
                selectedCategories.includes(product.category)
            );
        }
        const searchKeys = ["name", "category", "subCategory"];
        data = search(data, queryString, searchKeys);
        setFilteredData(data);
    }, [selectedCategories, queryString]);


    return (<div className="flex flex-col gap-11 overflow-hidden">
        {/* card div */}
        <div className="flex flex-wrap gap-5">
            {orderDetails.map((order, index) => (
                <InfoCard key={index} {...order} />
            ))}
        </div>
        {/* card div end */}
        <div className="overflow-x-scroll hide-scrollbar">
            <div className="border border-accent-200 rounded-[20px] bg-white p-6 flex flex-col gap-6 min-w-[1100px]">
                {/* Order features */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <SearchInput
                            placeholder="Search products..."
                            onChange={(e) => setQueryString(e.target.value)}
                        />
                        <StatusDropdown
                            dropdownItems={PRODUCT_STATUS}
                            setDropdownItems={setSelectedCategories}
                            selectedItems={selectedCategories}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Download />
                    </div>
                </div>
                {/* Order features end */}
                <div className="w-full">
                    <table className="w-full">
                        <thead className="grid grid-col-6 ">
                            <tr className="w-full p-4 bg-gray-500 rounded-xl text-accent-50 gap-6">
                                <td className="w-1/5">
                                    <div className="flex items-center">
                                        <button className=""><UnCheckedBox className="w-[18px] h-[18px]" /></button>
                                        <label className="px-2" htmlFor="html">Order ID</label></div>
                                </td>
                                <td className="w-1/5">
                                    Date
                                </td>
                                <td className="w-1/5">
                                    Customer Name
                                </td>
                                <td className="w-1/5 text-center">
                                    Total
                                </td>
                                <td className="w-1/5 px-8">
                                    Status
                                </td>
                                <td className="w-1/5">
                                    Actions
                                </td>
                            </tr>
                        </thead>
                        <tbody className="grid grid-col-6">
                            {orderData.map((order, index) => {
                                return (
                                    <tr className={`${(index % 2 === 0) ? 'bg-gray-50' : "bg-white"}  w-full py-4 px-2 my-4 h-[83px] rounded-xl gap-6`} key={index}>
                                        <td className="w-1/5">
                                            <div className="flex items-center">
                                                <button><UnCheckedBox className="w-[18px] h-[18px] flex" /></button>
                                                <label className="px-2 text-[18px]" htmlFor="html">{order._id}</label>
                                            </div>
                                        </td>
                                        <td className="w-1/5 text-start text-[18px]">{order.Date}</td>
                                        <td className="w-1/5 text-[18px]  text-start  ">{order.Name}</td>
                                        <td className="w-1/5 text-center text-[18px] "> ₹{order.Total}</td>
                                        <td className={`w-1/5 `}>
                                            <div className="relative ">
                                                <button className="p-4 w-[200px] border-accent-100 bg-[#FEFCE8] rounded-xl">
                                                    <div className="flex justify-between">
                                                        <span className="text-warning-500 text-[16px]">Processing</span>
                                                        <img className="-warning-500" src={arrowDown} alt="" />
                                                    </div>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="w-1/5 "><div className="relative"> {/* Allows absolute positioning for the menu */}
                                            <button onClick={handleButtonClick}>
                                                <ThreeDots className="w-[18px] h-[18px]" />
                                            </button>
                                            {/* Display the menu if it's visible */}
                                            {isMenuVisible && (
                                                <div className="absolute flex flex-col w-[164px] h-[123px] top-[-10px] right-2 p-2 bg-white border rounded-xl shadow-lg ">
                                                    <button className=" text-[14px] font-semibold p-2"
                                                         onClick={() =>document.getElementById("my_modal_3").showModal()}
                                                    >
                                                        View Order
                                                    </button>
                                                    <OrderModal/>   
                                                    <button className=" text-[14px] font-semibold" >
                                                        Download invoice
                                                    </button>
                                                    <button className=" text-[14px] font-semibold p-2 text-error-300" >
                                                        Delete Order
                                                    </button>
                                                </div>
                                            )}
                                        </div></td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>)
}

export default orders
