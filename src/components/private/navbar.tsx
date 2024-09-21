"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const components: { title: string; href: string; description: string }[] = [
  //   {
  //     title: "Alert Dialog",
  //     href: "/docs/primitives/alert-dialog",
  //     description:
  //       "A modal dialog that interrupts the user with important content and expects a response.",
  //   },
  //   {
  //     title: "Hover Card",
  //     href: "/docs/primitives/hover-card",
  //     description:
  //       "For sighted users to preview content available behind a link.",
  //   },
  //   {
  //     title: "Progress",
  //     href: "/docs/primitives/progress",
  //     description:
  //       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  //   },
  //   {
  //     title: "Scroll-area",
  //     href: "/docs/primitives/scroll-area",
  //     description: "Visually or semantically separates content.",
  //   },
  //   {
  //     title: "Tabs",
  //     href: "/docs/primitives/tabs",
  //     description:
  //       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  //   },
  //   {
  //     title: "Tooltip",
  //     href: "/docs/primitives/tooltip",
  //     description:
  //       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  //   },
]

export function NavigationBar() {
  return (
    <div className="hidden md:flex justify-around items-center pt-[48px] ">

      <a href="./"><img className="object-cover" src="/toolsnitchlogo.png" /></a>

      <NavigationMenu className="">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/repair" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Find Repair shop
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/track" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Track order
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <NavigationMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-1 p-3 md:w-[400px] lg:w-[120px] divide-y divide-neutral-200">
                  <li>
                    <ListItem href="/docs" title="Account" />
                  </li>
                  <li>
                    <ListItem href="/docs/installation" title="Orders" />
                  </li>
                  <li>
                    <ListItem href="/docs/primitives/typography" title="Logout" />
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
