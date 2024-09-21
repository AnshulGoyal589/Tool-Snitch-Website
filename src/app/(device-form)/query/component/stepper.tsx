import React from 'react'

export const Stepper = () => {
  return (
    <div className='pt-[3rem] flex justify-center'>
      <ul className="relative flex flex-row pl-[18rem]">
        <li className="shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center shrink-0 bg-[#ca8a04] font-medium text-gray-100 rounded-full">
              1
            </span>
            <div className="px-20 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
          </div>
          <div className="mt-3">
            <span className="block text-sm font-medium text-[#ca8a04]">
              Device Form
            </span>
          </div>
        </li>

        <li className="shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center shrink-0 bg-neutral-400 font-medium text-gray-100 rounded-full">
              2
            </span>
            <div className="px-20 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
          </div>
          <div className="mt-3">
            <span className="block text-sm font-medium text-gray-400">
              Choose store
            </span>
          </div>
        </li>

        <li className="shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center shrink-0 bg-neutral-400 font-medium text-gray-100 rounded-full">
              3
            </span>
            <div className="px-20 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
          </div>
          <div className="mt-3">
            <span className="block text-sm font-medium text-gray-400">
              Get appointment
            </span>
          </div>
        </li>

        <li className="shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center shrink-0 bg-neutral-400 font-medium text-gray-100 rounded-full">
              4
            </span>
            <div className="px-10 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
          </div>
          <div className="mt-3">
            <span className="block text-sm font-medium text-gray-400">
              Get it fixed
            </span>
          </div>
        </li>
      </ul>
    </div>
  )
}
