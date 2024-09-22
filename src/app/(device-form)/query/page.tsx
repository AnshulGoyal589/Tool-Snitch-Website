import { Input } from "@/components/ui/input";
import { Device } from "./component/device";
import { Locationchoose } from "./component/location";
import { Stepper } from "./component/stepper";
import { Button } from "@/components/ui/button"



export default function DeviceFormPage() {
    return (
        <div className="flex flex-col lg:justify-center lg:item-center pl-[4rem] md:justify-center ">
            
             <Stepper/>
            <div className="flex lg:justify-center py-4 lg:px-4 md:justify-left md:justify-center  sm:justify-center">
            <div><h1 className="mb-4 text-4xl font-josefin font-bold leading-none tracking-tight md:pl-10 text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Device Form</h1></div>
            
            </div>

            <div className="flex lg:justify-center md:justify-center sm:justify-center">
            <div className=" grid grid-cols-3 gap-10">
           <div> <Button size='xl' className="hover:bg-[#C6A86B] hover:text-white active:bg-[#C6A86B]" variant="outline">Smartphone</Button></div>
           <div> <Button size='xl' className="hover:bg-[#C6A86B] hover:text-white" variant="outline">Laptop</Button></div>
           <div> <Button size='xl' className="hover:bg-[#C6A86B] hover:text-white" variant="outline">Printer</Button></div></div>
            </div>

            <div className="flex lg:justify-center py-4 lg:p-4  md:justify-center sm:justify-start sm:justify-center">
            <Device/>
            </div>
            <div className="flex lg:justify-center py-4 lg:p-4  md:justify-center sm:justify-start sm:justify-center">
            <Locationchoose/>
            </div>

            <div className="flex lg:justify-center py-4 lg:p-4  md:justify-center sm:justify-start sm:justify-center   ">
            <Input placeholder="Tell us the problem you’re facing with your device" className="w-[35.2rem] rounded-2xl h-[3rem]" />

            </div>

            <div className="flex lg:justify-center py-4 lg:p-4  md:justify-center sm:justify-center">
            <Button size='xl' className="bg-[#C6A86B] text-neutral-100" variant="outline">Submit</Button>


            </div>
        </div>
    );
}