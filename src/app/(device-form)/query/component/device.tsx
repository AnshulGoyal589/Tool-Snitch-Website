import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DeviceOption {
  value: string;
  label: string;
}

interface DeviceProps {
  options: DeviceOption[];
  onBrandSelect: (brand: string) => void; // New prop for brand selection
}

export function Device({ options, onBrandSelect }: DeviceProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-14 rounded-2xl pl-10 justify-between sm:text-xl"
        >
          {value ? options.find((option) => option.value === value)?.label : "Choose Device"}
          <ChevronsUpDown className="h-4 w-12 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" avoidCollisions={false} className="md:w-[580px] h-[210px] rounded-2xl">
        <Command>
          <CommandInput placeholder="Search brand..." />
          <CommandList>
            <CommandEmpty>Please select a device first.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onBrandSelect(currentValue); // Call onBrandSelect when a brand is selected
                    setOpen(false);
                  }}
                >
                  <Check className={cn("h-5", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
