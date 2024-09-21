import { Input } from "@/components/ui/input";
import { ComboboxDemo } from "./component/device";
import { Locationchoose } from "./component/location";
import { Stepper } from "./component/stepper";
import { Button } from "@/components/ui/button"



export default function DeviceFormPage() {
    return (
        <div className="container">
            
             <Stepper/>
            <div className="flex justify-center py-4 px-4 ml-[20rem]">
            <div><h1 className="mb-4 text-4xl font-josefin font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Device Form</h1></div>
            
            </div>

            <div className="flex justify-center">
            <div className=" grid grid-cols-3 gap-10 pl-[20rem]">
           <div> <Button size='xl' variant="outline">Smartphone</Button></div>
           <div> <Button size='xl' variant="outline">Laptop</Button></div>
           <div> <Button size='xl' variant="outline">Printer</Button></div></div>
            </div>

            <div className="flex justify-center p-4 pl-[23.5rem]">
            <ComboboxDemo/>
            </div>
            <div className="flex justify-center p-4 pl-[23.5rem]">
            <Locationchoose/>
            </div>

            <div className="flex justify-center p-4 pl-[23.5rem]">
            <Input placeholder="Tell us the problem you’re facing with your device" className="w-[37.5rem] rounded-2xl h-[3rem]" />

            </div>

            <div className="flex justify-center p-4 pl-[23.5rem]">
            <Button size='xl' variant="outline">Submit</Button>


            </div>
        </div>
    );
}