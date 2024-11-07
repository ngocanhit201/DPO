'use client'
import Typography from '@mui/material/Typography'
import DoughnutChart from '@components/chart/doughnutChart'
import Box from '@mui/material/Box'
import Carousel from 'react-material-ui-carousel'
import BarChart from  '@components/chart/barChart'
import { useRouter } from 'next/navigation'

export default function dashboard() {
  const sliderItems = [
    {
      title: 'Thủ tục hành chính trực tuyến mức độ 1',
      description: 'Là dịch vụ bảo đảm cung cấp đầy đủ các thông tin về thủ tục hành chính và các văn bản có liên quan quy định về thủ tục hành chính đó.'
    },
    {
      title: 'Thủ tục hành chính trực tuyến mức độ 2',
      description: 'Là dịch vụ công trực tuyến mức độ 1 và cho phép người sử dụng tải về các mẫu văn bản và khai báo để hoàn thiện hồ sơ theo yêu cầu. Hồ sơ sau khi hoàn thiện được gửi trực tiếp hoặc qua đường bưu điện đến đơn vị cung cấp dịch vụ.'
    },
    {
      title: 'Thủ tục hành chính trực tuyến mức độ 3',
      description: 'Là dịch vụ công trực tuyến mức độ 2 và cho phép người sử dụng điền và gửi trực tuyến các mẫu văn bản đến cơ quan, tổ chức cung cấp dịch vụ. Các giao dịch trong quá trình xử lý hồ sơ và cung cấp dịch vụ được thực hiện trên môi trường mạng. Việc thanh toán lệ phí (nếu có) và nhận kết quả được thực hiện trực tiếp tại đơn vị cung cấp dịch vụ.'
    },
    {
      title: 'Thủ tục hành chính trực tuyến mức độ 4',
      description: 'Là dịch vụ công trực tuyến mức độ 3 và cho phép người sử dụng thanh toán lệ phí (nếu có) được thực hiện trực tuyến. Việc trả kết quả có thể được thực hiện trực tuyến, gửi trực tiếp hoặc qua đường bưu điện đến người sử dụng.'
    }
  ]
  const router = useRouter();
  function  handlePushToLogin() {
    router.push('/login');
  }
  return (
    <div className="bg-[#f7f7f9]">
      <div className="bg-white  px-24 shadow-[0_5px_5px_-5px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center ">
          <div>
            <img height="80" src="images/dainam.png" alt="" />
          </div>
          <div>
            <Typography variant="caption" className="text-center text-xl  cursor-pointer " onClick={handlePushToLogin}>Đăng Nhập</Typography>
          </div>
        </div>
        <div>

        </div>
      </div>
      <div className="px-24 ">
        <div className="flex mt-5 justify-between gap-5">
          <div className="flex flex-col justify-center w-2/6  bg-white rounded-2xl p-4">
            <Typography variant="h5" className="text-center" fontWeight="bold"> Tình hình xử lý hồ sơ năm
              2024</Typography>
            <div className="w-80  mx-auto">
              <DoughnutChart data={[600, 60,5]}
                             labels={['Hồ sơ đã xử lý', 'Hồ sơ chưa xỷ lý', 'Hồ sơ đã bị huỷ']}></DoughnutChart>

            </div>
          </div>
          <div className="w-4/6 bg-white rounded-2xl overflow-hidden">
            <Carousel
              autoPlay={false}
              indicators={true}
              navButtonsAlwaysVisible={true}
              className="bg-white"
            >
              {sliderItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    padding: 10,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    textAlign: 'left'

                  }}
                >
                  <Typography variant="h5" color="textPrimary" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" mt={2}>
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </Carousel>
          </div>
        </div>
        {/*line 2*/}
        <div className="flex mt-5 gap-5 pb-20">
          <div className='w-3/6 bg-white rounded-2xl overflow-hidden p-6'>
            <div>
              <Typography variant="h5" className="text-center" fontWeight="bold"> Số lượng hồ sơ tiếp nhận 20204</Typography>
            </div>
              <div>
                <BarChart
                  data={[60, 45, 30, 50, 70, 55, 40, 65, 75, 85, 90, 0]}
                  labels={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
                />
              </div>
          </div>
          <div className='w-3/6 bg-white rounded-2xl overflow-hidden'>
            <div>
              <Box className="bg-white p-6 rounded-lg shadow-md">
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Quy trình xử lý thủ tục hành chính tại Đại học Đại Nam được thực hiện theo ba bước rõ ràng:
                </Typography>
                <Typography variant="body1" paragraph>
                  1. Sinh viên nộp thủ tục trực tuyến thông qua hệ thống quản lý hồ sơ. Hệ thống đảm bảo rằng sinh viên
                  có thể gửi các thông tin cần thiết một cách dễ dàng và thuận tiện mà không cần đến trực tiếp.
                </Typography>
                <Typography variant="body1" paragraph>
                  2. Sau khi nhận hồ sơ, các phòng ban liên quan sẽ tiến hành xử lý và xác minh thông tin để đảm bảo
                  tính chính xác và đầy đủ. Quá trình này được thực hiện nhanh chóng nhằm mang lại sự hài lòng cho sinh
                  viên.
                </Typography>
                <Typography variant="body1" paragraph>
                  3. Cuối cùng, sinh viên sẽ nhận kết quả xử lý hồ sơ, được thông báo qua hệ thống. Việc cung cấp kết
                  quả trực tuyến giúp tiết kiệm thời gian và tăng cường hiệu quả cho sinh viên cũng như nhà trường.
                </Typography>
              </Box>
            </div>

            <div
              className="py-5 text-xl MuiTypography-root MuiTypography-h5 css-1x42nvs-MuiTypography-root  px-10">

              <div className="lg:flex justify-center  items-center w-full space-y-4 lg:space-y-0 lg:space-x-4">
                {/*sinh vien nhan ket qua*/}
                <div className="relative ">
                  <a href="https://pagedone.io/" className="flex items-center font-medium w-full  ">
              <span
                className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-8 lg:h-8"> 1 </span>
                    <div className="block">
                      <h4 className="text-xl ">Sinh viên nộp thủ tục trực tuyến</h4>
                    </div>
                    <svg className="w-5 h-5 ml-2 stroke-gray-400 sm:ml-4 " viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                        stroke="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>
                <div className="relative  ">
                  <a className="flex items-center font-medium w-full  ">
              <span
                className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-8 lg:h-8">2</span>
                    <div className="block">
                      <h4 className="text-xl  ">Thủ tục được các phòng ban xử lý</h4>
                    </div>
                    <svg className="w-5 h-5 ml-2 stroke-gray-400 sm:ml-4 " viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                        stroke="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </a>

                </div>
                <div className="relative  ">
                  <a className="flex items-center font-medium w-full  ">
              <span
                className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-8 lg:h-8">3</span>
                    <div className="block">
                      <h4 className="text-xl  ">Nhận kết quả </h4>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )

}
