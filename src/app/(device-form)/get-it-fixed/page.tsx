import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <h1 className="mt-3 mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-josefin font-bold text-[#212121]">
        Appointment Booked!
      </h1>
      <img src="/done.jpg" alt="" className='h-40 w-40 md:h-52 md:w-52'/>
      <a href="/" className='my-5 text-lg underline underline-offset-3 text-[#cead6d]'>Go back to Home page</a>
    </div>
  )
}

export default page
