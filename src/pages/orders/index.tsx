import { orderData, orderDetails } from "../../assets/mockData/orderData"
import InfoCard from "../../components/reusable/InfoCard"
import addCircleIcon from "../../assets/icons/add-circle.svg";
import SearchBar from "../../components/reusable/SearchBar";
import Filter from "../../components/reusable/Filter";
import Upload from "../../components/reusable/Upload";
import Download from "../../components/reusable/Download";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import OrderModal from "./OrderModal";


const orders = () => {
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
                        <SearchBar/>
                        <Filter/>
                    </div>
                    <div className="flex items-center gap-2">
                        <Upload/>
                        <Download/>
                        <button
                            className="rounded-xl bg-primary-500 px-4 py-3 flex items-center justify-center gap-2"
                            onClick={() => {
                                if (document) {
                                  (document.getElementById('my_modal_3') as HTMLFormElement).showModal();
                                }
                              }}
                        >
                            <span className="text-white font-medium">Add Order</span>
                            <img
                                src={addCircleIcon}
                                alt=""
                                className="w-[16px] h-[16px]"
                            />
                        </button>
                        <OrderModal/>
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
                                    <tr className={`${(index % 2 === 0) ? 'bg-white' : "bg-gray-50"}  w-full p-4 rounded-xl gap-6`} key={index}>
                                        <td className="w-1/5">
                                            <div className="flex items-center">
                                        <button><UnCheckedBox className="w-[18px] h-[18px] flex" /></button>
                                            <label className="px-2" htmlFor="html">{order._id}</label></div>
                                        </td>
                                        <td className="w-1/5 text-start">{order.Date}</td>
                                        <td className="w-1/5 ">{order.Name}</td>
                                        <td className="w-1/5 text-center"> ₹{order.Total}</td>
                                        <td className={`w-1/5 ${order.Status === 'Shipped' ? "text-primary-500" : order.Status==="Cancelled"?"text-error-300" :order.Status==="In-Progress"?"text-warning-500":order.Status==="Delivered"?"text-secondary-500": "text-black"} px-8`}>{order.Status}</td>
                                        <td className="w-1/5 "><button><i className="fa-solid fa-ellipsis-vertical w-[58.66px]" /></button></td>
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
