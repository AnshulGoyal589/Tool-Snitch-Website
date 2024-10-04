import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <h1 className="mt-3 mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-josefin font-bold text-[#212121]">
        Appointment Booked!
      </h1>
      <Image 
        src="/done.jpg" 
        alt="Appointment Confirmation" 
        width={208}
        height={208}
        className='h-40 w-40 md:h-52 md:w-52'
      />
      <Link href="/" className='my-5 text-lg underline underline-offset-3 text-[#cead6d]'>
        Go back to Home page
      </Link>
    </div>
  )
}

export default Page