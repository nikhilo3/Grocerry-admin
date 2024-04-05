
const OrderModal = () => {
  return (
    <>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box xl:min-w-[752px] min-w-[700px] min-h-[400px] m-8 overflow-y-auto ">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-8 text-4xl">✕</button>
            </form>
            <div className="flex flex-col">
                <p className="w-full text-gray-700 text-[28px] font-medium ">Add Order</p>
                <p className="w-full  text-gray-500 text-sm font-normal leading-[16.80px]">Lorem ipsum dolor sit amet consectetur. Tortor elit </p>
                <p className="mt-6 w-full text-gray-500 text-base font-medium">Customer name</p>
                <input className="w-full h-[58px] px-4 py-[18px] bg-gray-50 rounded-xl border border-gray-100  gap-2.5 placeholder:text-gray-400 text-lg font-medium" placeholder="eg., John Doe"/>
                <div className="mt-6 w-full flex">
                    <div className="w-full">
                        <p className="w-full text-gray-500 text-base font-medium">Customer Email*</p>
                        <input className="w-full h-[58px] px-4 py-[18px] bg-gray-50 rounded-xl border border-gray-100 gap-2.5 placeholder:text-gray-400 text-lg font-medium" placeholder="eg., johndoe@gmail.com"/>
                    </div>
                    <div className="ml-[26px] w-full">
                        <p className="w-full text-gray-500 text-base font-medium">Customer Mobile*</p>
                        <input className="w-full h-[58px] px-4 py-[18px] bg-gray-50 rounded-xl border border-gray-100 gap-2.5 placeholder:text-gray-400 text-lg font-medium" placeholder="eg., +91 92847 29802"/>
                    </div>
                </div>
                <div className="mt-6 w-full">
                    <p className="w-full text-gray-500 text-base font-medium ">Select Products*</p>          
                    <details className="dropdown w-full">
                        <summary className="m-1 btn w-full inline-flex justify-between h-[55px] px-4 py-[18px] bg-gray-300 rounded-lg">
                            <span className="">Select Products Here</span>
                            <span className=""><i className="fa-solid fa-angle-down"></i></span>
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-gray-100 rounded-box w-4/5">
                            <li><a>Products 1</a></li>
                            <li><a>Products 2</a></li>
                            <li><a>Products 1</a></li>
                            <li><a>Products 2</a></li>
                            <li><a>Products 1</a></li>
                            <li><a>Products 2</a></li>
                            <li><a>Products 1</a></li>
                            <li><a>Products 2</a></li>
                            
                        </ul>
                    </details>
                </div>
                <button className="mt-6 w-full inline-flex justify-end">
                    <div className="h-[51px] px-6 py-4 bg-orange-500 rounded-xl inline-flex items-center justify-center gap-2">
                        <span className="text-white text-base font-medium">Submit</span>
                        <span><i className="fa-solid fa-check text-white "/></span>
                    </div>
                </button>
            </div> 
        </div>
        </dialog>
    </>
  )
}

export default OrderModal
