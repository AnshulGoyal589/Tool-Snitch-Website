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
    value: "redmi note 9",
    label: "redmi",
  },
  {
    value: "iphone 15",
    label: "iphone 15",
  },
  {
    value: "samsung s24",
    label: "samsung s24",
  },
  {
    value: "oppo f1",
    label: "oppo f1",
  },
  {
    value: "blackberry",
    label: "blackberry",
  },
  {
    value: "vivo v23",
    label: "vivo v23",
  },
  {
    value: "poco X3",
    label: "poco X3",
  },
  {
    value: "nothing",
    label: "nothing",
  },
]

export function Device() {
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
            : "Choose Device"}
          <ChevronsUpDown className="h-4 w-12 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" 
        avoidCollisions={false} className=" md:w-[580px] h-[210px] rounded-2xl">
        <Command>
          <CommandInput placeholder="Search phone model..." />
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
