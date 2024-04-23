import arrowDown from "../../assets/icons/statusArrowdown.svg";
import DownloadInvoice from "../../components/reusable/DownloadInvoice";


const OrderModal = () => {
    return (
        <>
            <dialog id="my_modal_3" className="modal ">
                <div className="modal-box relative p-8" style={{ maxWidth: '900px', maxHeight: '1000px' }}>
                    <form method="dialog">
                        <button className="btn btn-md btn-circle btn-ghost absolute right-4 top-4 text-[48px]">✕</button>
                    </form>
                    <div className="flex flex-col ">
                        <div className="pb-2">
                            <h2 className="text-gray-700 text-[36px] font-semibold">Order Details</h2>
                            <p className="text-gray-500 text-sm font-normal">
                                Lorem ipsum dolor sit amet consectetur. Tortor elit.
                            </p>
                        </div>
                        <div className="flex gap-6 overflow-hidden">
                            <div className="w-1/2 font-inter text-sm overflow-auto">
                                <div className="">
                                    <div className="flex flex-col py-2">
                                        <span className="text-accent-500">Order Details</span>
                                        <span className="text-accent-700">#24305921309JNFIN</span>
                                        <span className="text-accent-700">Ordered at 12/03/24 at 12:24pm</span>
                                    </div>
                                    <div className="py-2 flex flex-col">
                                        <span className="text-accent-500">Customer Details</span>
                                        <span className="text-accent-700">Imsalmaanahmed@gmail.com</span>
                                        <span className="text-accent-700">+91 912739289584</span>
                                    </div>
                                    <div className="py-2 flex flex-col">
                                        <span className="text-accent-500">Address Details</span>
                                        <p className="text-accent-700 w-[250px]">
                                            No. 46, 12th Cross Street,
                                            ABCDEFG Street,
                                            X Area, Y City,
                                            8947233 Pincode
                                        </p>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className='flex flex-col gap-4'>
                                    <span className="py-4 text-accent-700 text-[20px] font-semibold">Change Status</span>
                                    <button className="p-4  border-accent-100 bg-[#FEFCE8] rounded-xl w-[200px]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-warning-500 text-[16px]">Processing</span>
                                            <img src={arrowDown} alt="Arrow Down" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className='h-[180px] overflow-scroll hide-scrollbar flex flex-col gap-2'>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2'>
                                            <img className='w-[48px] h-[48px]' src="https://s3-alpha-sig.figma.com/img/8db2/69ff/d3adb8c3b24911becb9d4dd3bc94210c?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UAm2q8oi8oWlXTIdK1gCKMpP4bhCUJohw3sq2Wkoh3qyVIlw2TZzFluBw7dgMP5ngQ4RTK9tyAh42WnV3J8v4OahbQVTIeLenIQ29Y5T3Vq3oXctQd3i3RRTgoO28pbFMnFNUkQu7kgh0ImqMJf2q5OHfY18TBV082fUM3MteC~1ysQlezaIQZJQ0qN-RJEZXWSDo95aQmyel7q8HKHoekqIheOIF1W-UqrfvTOXzUdoRWYkXhZ538uArvlNp2N3uxaDmwxX9EiSf7-8I5Am7s~rJKUbV5iEk3kcgIesshOeOhCQPfVcllaqpaaEBFaNCK2Ulz7yEhHxaQjYh3V4Mg__" alt="" />
                                            <div className='flex flex-col w-[160px]'>
                                                <span className='text-[12px]'>Cadbury Bournville Rich Cocoa 70% Dark</span>
                                                <span className='text-[12px]'>200 g</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-primary-500'>₹42</span>
                                            <span className=' line-through text-[10px]'>₹58</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2'>
                                            <img className='w-[48px] h-[48px]' src="https://s3-alpha-sig.figma.com/img/8db2/69ff/d3adb8c3b24911becb9d4dd3bc94210c?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UAm2q8oi8oWlXTIdK1gCKMpP4bhCUJohw3sq2Wkoh3qyVIlw2TZzFluBw7dgMP5ngQ4RTK9tyAh42WnV3J8v4OahbQVTIeLenIQ29Y5T3Vq3oXctQd3i3RRTgoO28pbFMnFNUkQu7kgh0ImqMJf2q5OHfY18TBV082fUM3MteC~1ysQlezaIQZJQ0qN-RJEZXWSDo95aQmyel7q8HKHoekqIheOIF1W-UqrfvTOXzUdoRWYkXhZ538uArvlNp2N3uxaDmwxX9EiSf7-8I5Am7s~rJKUbV5iEk3kcgIesshOeOhCQPfVcllaqpaaEBFaNCK2Ulz7yEhHxaQjYh3V4Mg__" alt="" />
                                            <div className='flex flex-col w-[160px]'>
                                                <span className='text-[12px]'>Cadbury Bournville Rich Cocoa 70% Dark</span>
                                                <span className='text-[12px]'>200 g</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-primary-500'>₹42</span>
                                            <span className=' line-through text-[10px]'>₹58</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2'>
                                            <img className='w-[48px] h-[48px]' src="https://s3-alpha-sig.figma.com/img/8db2/69ff/d3adb8c3b24911becb9d4dd3bc94210c?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UAm2q8oi8oWlXTIdK1gCKMpP4bhCUJohw3sq2Wkoh3qyVIlw2TZzFluBw7dgMP5ngQ4RTK9tyAh42WnV3J8v4OahbQVTIeLenIQ29Y5T3Vq3oXctQd3i3RRTgoO28pbFMnFNUkQu7kgh0ImqMJf2q5OHfY18TBV082fUM3MteC~1ysQlezaIQZJQ0qN-RJEZXWSDo95aQmyel7q8HKHoekqIheOIF1W-UqrfvTOXzUdoRWYkXhZ538uArvlNp2N3uxaDmwxX9EiSf7-8I5Am7s~rJKUbV5iEk3kcgIesshOeOhCQPfVcllaqpaaEBFaNCK2Ulz7yEhHxaQjYh3V4Mg__" alt="" />
                                            <div className='flex flex-col w-[160px]'>
                                                <span className='text-[12px]'>Cadbury Bournville Rich Cocoa 70% Dark</span>
                                                <span className='text-[12px]'>200 g</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-primary-500'>₹42</span>
                                            <span className=' line-through text-[10px]'>₹58</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2'>
                                            <img className='w-[48px] h-[48px]' src="https://s3-alpha-sig.figma.com/img/8db2/69ff/d3adb8c3b24911becb9d4dd3bc94210c?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UAm2q8oi8oWlXTIdK1gCKMpP4bhCUJohw3sq2Wkoh3qyVIlw2TZzFluBw7dgMP5ngQ4RTK9tyAh42WnV3J8v4OahbQVTIeLenIQ29Y5T3Vq3oXctQd3i3RRTgoO28pbFMnFNUkQu7kgh0ImqMJf2q5OHfY18TBV082fUM3MteC~1ysQlezaIQZJQ0qN-RJEZXWSDo95aQmyel7q8HKHoekqIheOIF1W-UqrfvTOXzUdoRWYkXhZ538uArvlNp2N3uxaDmwxX9EiSf7-8I5Am7s~rJKUbV5iEk3kcgIesshOeOhCQPfVcllaqpaaEBFaNCK2Ulz7yEhHxaQjYh3V4Mg__" alt="" />
                                            <div className='flex flex-col w-[160px]'>
                                                <span className='text-[12px] text-accent-700'>Cadbury Bournville Rich Cocoa 70% Dark</span>
                                                <span className='text-[12px]'>200 g</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-primary-500'>₹42</span>
                                            <span className=' line-through text-[10px]'>₹58</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2'>
                                            <img className='w-[48px] h-[48px]' src="https://s3-alpha-sig.figma.com/img/8db2/69ff/d3adb8c3b24911becb9d4dd3bc94210c?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UAm2q8oi8oWlXTIdK1gCKMpP4bhCUJohw3sq2Wkoh3qyVIlw2TZzFluBw7dgMP5ngQ4RTK9tyAh42WnV3J8v4OahbQVTIeLenIQ29Y5T3Vq3oXctQd3i3RRTgoO28pbFMnFNUkQu7kgh0ImqMJf2q5OHfY18TBV082fUM3MteC~1ysQlezaIQZJQ0qN-RJEZXWSDo95aQmyel7q8HKHoekqIheOIF1W-UqrfvTOXzUdoRWYkXhZ538uArvlNp2N3uxaDmwxX9EiSf7-8I5Am7s~rJKUbV5iEk3kcgIesshOeOhCQPfVcllaqpaaEBFaNCK2Ulz7yEhHxaQjYh3V4Mg__" alt="" />
                                            <div className='flex flex-col w-[160px]'>
                                                <span className='text-[12px]'>Cadbury Bournville Rich Cocoa 70% Dark</span>
                                                <span className='text-[12px]'>200 g</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-primary-500'>₹42</span>
                                            <span className=' line-through text-[10px]'>₹58</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="p-4 bg-accent-50 border-accent-300">
                                    <span className="text-accent-900 text-[20px] font-inter py-4 font-semibold">Bill Summary</span>
                                    <div className='flex justify-between py-2'>
                                        <span className='text-[14px] text-accent-500'>Item Total</span>
                                        <span className=''>₹33</span>
                                    </div>
                                    <div className='flex justify-between py-2'>
                                        <span className='text-[14px] text-accent-500'>Deliver Charges</span>
                                        <span>₹33</span>
                                    </div>
                                    <div className='flex justify-between py-6'>
                                        <div className='flex flex-col'>
                                            <span className='font-semibold'>Total Bill</span>
                                            <span>Incl. all taxes and charges</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex items-center'>
                                                <span className='line-through text-[12px]'>₹100.0</span>
                                                <span className='text-[16px] font-900'>₹87.49</span>
                                            </div>
                                            <span className='bg-[#4ADE80] text-white px-2 py-2 text-[12px] text-center rounded-xl'>SAVING ₹9.51</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end pt-10'>
                    <DownloadInvoice />
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default OrderModal;
