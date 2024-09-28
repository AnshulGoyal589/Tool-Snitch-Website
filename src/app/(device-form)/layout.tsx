"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TiTick } from "react-icons/ti";

const Stages = [{
    link : "/query",
    title : "Device Form"
},
{
    link : "/shops",
    title : "Choose Shop"
},
{
    link : "/get-appointment",
    title : "Get Appointment"
},
{
    link : "/get-it-fixed",
    title : "Get It Fixed"
}];

export default function DeviceFormLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentStageIndex = Stages.findIndex((stage) => pathname.startsWith(stage.link));

  const canProceedToNextStep = (index: number) => {
    return index <= currentStageIndex; 
  };

  return (
    <div className="">
      <div className="max-w-xl mx-auto my-8">
        <div className="flex justify-center items-center gap-2 md:gap-8">
          {Stages.map((stage, index) => (
            <div key={`stage-${index}`}>
              {canProceedToNextStep(index) ? (
                <Link href={stage.link}>
                  <div className={cn("flex flex-col justify-center items-center gap-1", index <= currentStageIndex ? "text-[#C6A86B]" : "text-gray-400")}>
                    <span
                      className={cn(
                        "size-4 sm:size-5 md:size-6 text-xs md:text-base rounded-full flex justify-center items-center",
                        index < currentStageIndex ? "" : "bg-gray-300 text-white",
                        index === currentStageIndex ? "bg-[#C6A86B]" : ""
                      )}
                    >
                      {index < currentStageIndex ? <TiTick className="size-8" /> : index + 1}
                    </span>
                    <span
                      className={cn(
                        "text-xs sm:text-sm md:text-base text-center",
                        index === currentStageIndex ? "font-semibold" : ""
                      )}
                    >
                      {stage.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className={cn("flex flex-col justify-center items-center gap-1 text-gray-400 cursor-not-allowed")}>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <span
                      className={cn(
                        "size-4 sm:size-5 md:size-6 text-xs md:text-base rounded-full flex justify-center items-center",
                        "bg-gray-300 text-white"
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base text-center">{stage.title}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
