import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import { Navigation } from 'swiper/modules'

import { AiOutlineGift } from "react-icons/ai"
import { FaChartSimple } from "react-icons/fa6"
import { AiOutlinePieChart } from "react-icons/ai"
import { PiBank } from "react-icons/pi"
import { RiProductHuntLine } from "react-icons/ri"


const DashboardBoxes = () => {
  return (
    <>
    <Swiper
      spaceBetween={10}
      slidesPerView={4}
      navigation={true}
      modules={[Navigation]}
      className='dashboardBoxesSwiper'
    >
        <SwiperSlide>
            <div className="dashboardBox p-4 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex
                items-center gap-4">
                <AiOutlineGift className='text-[50px] text-blue-500'/>
                <div className='info w-[70%]'>
                    <h3>New Orders</h3>
                    <b>1,390</b>
                </div>
                <FaChartSimple  className='text-[60px] text-blue-500'/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="dashboardBox p-4 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex
                items-center gap-4">
                <AiOutlinePieChart className='text-[50px] text-green-500'/>
                <div className='info w-[70%]'>
                    <h3>Sales</h3>
                    <b>$57,890</b>
                </div>
                <FaChartSimple  className='text-[60px] text-green-500'/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="dashboardBox p-4 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex
                items-center gap-4">
                <PiBank className='text-[50px] text-purple-500'/>
                <div className='info w-[70%]'>
                    <h3>Revenue</h3>
                    <b>$12,390</b>
                </div>
                <FaChartSimple  className='text-[60px] text-purple-500'/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="dashboardBox p-4 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex
                items-center gap-4">
                <RiProductHuntLine className='text-[50px] text-cyan-500'/>
                <div className='info w-[70%]'>
                    <h3>Total Products</h3>
                    <b>1,390</b>
                </div>
                <FaChartSimple  className='text-[60px] text-cyan-500'/>
            </div>
        </SwiperSlide>
    </Swiper>
    </>
  )
}

export default DashboardBoxes