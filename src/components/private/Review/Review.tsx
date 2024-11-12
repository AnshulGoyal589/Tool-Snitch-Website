import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
export function ReviewSection() {
  return (
    <section className="mt-4 mx-4 md:mx-8 lg:mx-16 xl:mx-20">
      <h3 className="text-3xl font-semibold">Reviews</h3>
      <div className="my-4 mb-8 mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        
      </div>
    </section>
  );
}

export default function ReviewCard() {
  return (
    <>
      <div className="p-2 sm:break-inside-avoid">
      <div className=" max-w-md p-4 border border-gray-200 rounded-lg">
        <p>
          “I loved how quick the repair was. I was really worried I’d have to
          change my phone. Special thanks to Sushil for fixing my phone.”
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 mt-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Abhinav</span>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" size={18} />
            <FaStar className="text-yellow-500" size={18} />
            <FaStar className="text-yellow-500" size={18} />
            <FaStar className="text-yellow-500" size={18} />
            <FaStar className="text-yellow-500" size={18} />
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
