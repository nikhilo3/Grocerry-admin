import orderData from "../../assets/orderData"
import Card from "../../components/reusable/Card"
import Filter from "../../components/reusable/Filter"
import SearchBar from "../../components/reusable/SearchBar"

const orders = () => {
  return (<>
  {/* card div */}
    <div className="xl:flex flex-cols-4 justify-between md:flex flex-wrap ">
        <div className=" md:pt-8">
        <Card/>
        </div>
        <div className=" md:pt-8">
        <Card/>
        </div>
        <div className=" md:pt-8">
        <Card/>
        </div>
        <div className=" md:pt-8">
        <Card/>
        </div>
    </div>
    {/* card div end */}
    <div className="w-full p-6 mt-11 bg-white rounded-[20px] border border-gray-200 flex-col justify-start items-start gap-6 inline-flex">
        <div className="flex items-center">
            <SearchBar/>
            <Filter/>
            <div>
                <button>upload csv</button>
                <button>download csv</button>
                <button>add Order</button>
            </div>
        </div>
        <div className="w-full">
            <table className="w-full">
                <thead className="grid grid-col-6">
                    <tr className="w-full p-4 bg-gray-500 rounded-xl text-accent-50 items-center gap-6">
                        <td  className="w-1/5">
                            <input type="radio"/>
                            <label className="p-2" htmlFor="html">Order ID</label>
                        </td> 
                        <td className="w-1/5">
                            Date
                        </td>
                        <td className="w-1/5">
                            Customer Name
                        </td>
                        <td className="w-1/5">
                            Total
                        </td>
                        <td className="w-1/5">
                            Status
                        </td>
                        <td className="w-1/5">
                        Actions
                        </td>
                    </tr>
                </thead>
                <tbody className="grid grid-col-6">
                    {orderData.map((order,index)=>{
                        console.log(order.Status,typeof(order.Status))
                        return(<>
                            <tr className={`bg-${(index%2===0)?'white':"gray-200"}  w-full p-4 rounded-xl items-center gap-6`}>
                                <td className="w-1/5">
                                    <input type="radio" className="w-[18px] h-[18px] rounded border-2 border-gray-50"/>
                                    <label className="p-2" htmlFor="html">{order._id}</label>
                                </td>
                                <td className="w-1/5">{order.Date}</td>
                                <td className="w-1/5">{order.Name}</td>
                                <td className="w-1/5"> ₹{order.Total}</td>
                                <td className={`w-1/5 text-${order.Status==='Shipped'?"primary-55":"black"}`}>{order.Status}</td>
                                <td className="w-1/5 "><button><i className="fa-solid fa-ellipsis-vertical"/></button></td>
                            </tr>
                        
                        </>)
                    })}
                    
                </tbody>
            </table>
        </div>
        

    </div>

    </>)
}

export default orders
