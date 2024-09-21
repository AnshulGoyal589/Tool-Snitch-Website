import React from 'react'

export const Stepper = () => {
  return (
    <div>
<ul className="relative flex flex-row gap-x-2">
  <li className="shrink basis-0 flex-1 group">
    <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
      <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
        1
      </span>
      <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
    </div>
    <div className="mt-3">
      <span className="block text-sm font-medium text-gray-800">
        Step
      </span>
    </div>
  </li>

  <li className="shrink basis-0 flex-1 group">
    <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
      <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
        2
      </span>
      <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
    </div>
    <div className="mt-3">
      <span className="block text-sm font-medium text-gray-800">
        Step
      </span>
    </div>
  </li>

  <li className="shrink basis-0 flex-1 group">
    <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
      <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
        3
      </span>
      <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
    </div>
    <div className="mt-3">
      <span className="block text-sm font-medium text-gray-800">
        Step
      </span>
    </div>
  </li>
</ul>
    </div>
  )
}
