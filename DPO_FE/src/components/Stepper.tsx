interface StepperProp {
    procedure: Procedure;
}
export default function page(props: StepperProp) {
    return (
        <>
            <div className='py-10'>

                <div className="lg:flex justify-center  items-center w-full space-y-4 lg:space-y-0 lg:space-x-4">

                    <div className="relative ">
                        <a href="https://pagedone.io/" className="flex items-center font-medium w-full  ">
                            <span className="w-6 h-6 bg-orange-500 border border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-8 lg:h-8"> 1 </span>
                            <div className="block">
                                <h4 className="text-base  text-orange-500">Nộp thủ tục trực tuyến</h4>
                            </div>
                            <svg className="w-5 h-5 ml-2 stroke-orange-600 sm:ml-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round" />
                            </svg>
                        </a>
                    </div>
                    {props.procedure.orderProcedures.map((item, index) => (
                        <>
                            <div className="relative  ">
                                <a className="flex items-center font-medium w-full  ">
                                    <span className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-8 lg:h-8">{index + 2}</span>
                                    <div className="block">
                                        <h4 className="text-base  text-gray-900">{item.idDepartmentNavigation.name}</h4>
                                    </div>
                                    <svg className="w-5 h-5 ml-2 stroke-gray-900 sm:ml-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round" />
                                    </svg>
                                </a>
                            </div>
                        </>
                    ))}
                    <div className="relative  ">
                        <a className="flex items-center font-medium w-full  ">
                            <span className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-8 lg:h-8">{props.procedure.orderProcedures.length + 2}</span>
                            <div className="block">
                                <h4 className="text-base  text-gray-900">Nhận kết quả   </h4>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
