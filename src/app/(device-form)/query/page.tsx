import { Input } from "@/components/ui/input";
import { Device } from "./component/device";
import { Locationchoose } from "./component/location";
import { Button } from "@/components/ui/button"

export default function DeviceFormPage() {
  return (
    <div className="flex flex-col justify-center items-center">

      <h1 className="my-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-josefin font-bold text-[#212121]">Device Form</h1>

      <div className="flex justify-around items-center w-[90%] md:w-[700px] my-2">
        <div> <Button className="h-12 lg:h-14 sm:w-40 lg:w-44 px-6 rounded-2xl sm:text-xl hover:bg-[#C6A86B] hover:text-white active:bg-[#C6A86B]" variant="outline">Smartphone</Button></div>
        <div> <Button className="h-12 lg:h-14 sm:w-40 lg:w-44 px-6 rounded-2xl sm:text-xl hover:bg-[#C6A86B] hover:text-white active:bg-[#C6A86B]" variant="outline">Laptop</Button></div>
        <div> <Button className="h-12 lg:h-14 sm:w-40 lg:w-44 px-6 rounded-2xl sm:text-xl hover:bg-[#C6A86B] hover:text-white active:bg-[#C6A86B]" variant="outline">Printer</Button></div>
      </div>

      <div className="my-6 w-[85%] md:w-[640px] mx-auto">
        <Device />
      </div>
      <div className="w-[85%] md:w-[640px] mx-auto">
        <Locationchoose />
      </div>

      <Input placeholder="Tell us the problem you&apos;re facing with your device"
        className="w-[85%] md:w-[640px] mx-auto rounded-2xl h-[3rem] text-sm sm:text-xl my-6" />

      <Button size='xl' className="mb-10 bg-[#C6A86B] text-neutral-100 sm:text-xl" variant="outline">Submit</Button>

    </div>
  );
}