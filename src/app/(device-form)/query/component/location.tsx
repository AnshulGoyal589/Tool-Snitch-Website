"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "dwarka",
    label: "dwarka",
  },
  {
    value: "east delhi",
    label: "east delhi",
  },
  {
    value: "south delhi",
    label: "south delhi",
  },
  {
    value: "noida",
    label: "noida",
  },

]

export function Locationchoose() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-14 rounded-2xl pl-10 justify-between sm:text-xl"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Choose your location"}
          <ChevronsUpDown className="h-4 w-12 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" 
        avoidCollisions={false} className="md:w-[580px] h-[210px] rounded-2xl">
        <Command>
          <CommandInput placeholder="Search area..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "h-5",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
