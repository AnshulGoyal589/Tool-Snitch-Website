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
    const currentStageIndex = Stages.findIndex(stage => stage.link === pathname);
    return (
        <div className="">
            <div className="max-w-xl mx-auto mt-8 md:mt-12 mb-8">
                <div className="flex justify-center items-center gap-2 md:gap-8">
                    {Stages.map((stage, index) => (
                        <Link key={`stage-${index}`} href={stage.link}>
                        <div className={cn("flex flex-col justify-center items-center gap-1", index <= currentStageIndex ? "text-[#C6A86B]" : "text-gray-400")}>
                            <span
                            className={cn(
                                "size-4 sm:size-5 md:size-6 text-xs md:text-base rounded-full flex justify-center items-center",
                                index < currentStageIndex ? "" : "bg-gray-300  text-white ",
                                index === currentStageIndex ? "bg-[#C6A86B]" : "",
                            )}
                            >{index < currentStageIndex ? <TiTick className="size-8" /> : index + 1}</span>
                            <span
                            className={cn(
                                "text-xs sm:text-sm md:text-base text-center",
                                index === currentStageIndex ? "font-semibold" : "",
                            )}
                            >{stage.title}</span>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
            {children}
        </div>
    );
}