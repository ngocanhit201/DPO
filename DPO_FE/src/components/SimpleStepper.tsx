import { useEffect, useState } from 'react'
import getCaseProgress from '@/api/getCaseProgress'

interface StepperProp {
  idCase: number;
}

export default function SimpleStepper(props: StepperProp) {
  let [caseProgress, setCaseProgress] = useState<CaseProgress[] | null>(null)
  useEffect(() => {
    async function fetchData() {
      let data = await getCaseProgress(props.idCase)
      setCaseProgress(data)
    }

    fetchData()
  }, [props.idCase])
  function classTextStatus(idStatus: number) {
    if (idStatus == 201) {
      return ' text-green-500'
    } else if (idStatus == 202) {
      return ' text-red-600 line-through'
    }
    else {
      return  ""
    }
  }
  function classStrokeStatus(idStatus: number) {
    if (idStatus == 201) {
      return ' stroke-green-500'
    } else if (idStatus == 202) {
      return ' stroke-red-600'
    }
    else{
      return ""
    }
  }

  return (
    <>
      <div className="">

        <div className="lg:flex  items-center w-full space-y-4 lg:space-y-0 lg:space-x-4">
          {/*sinh vien nhan ket qua*/}
          {caseProgress?.map((item, index) => (
            <div key={index}>
              <div className="relative  ">
                <a className="flex items-center w-full  ">

                  <div className="block ">
                    <p className={" text-gray-900 text-sm"  + (classTextStatus(item.idStatus)) }>{item.idDepartmentNavigation.name} </p>
                  </div>
                  {index != caseProgress.length-1 &&
                    <svg className={"w-5 h-5 ml-2 stroke-gray-900 sm:ml-4" + (classStrokeStatus(item.idStatus))}
                         viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                        stroke="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
