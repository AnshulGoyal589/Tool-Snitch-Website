"use client"

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function NavigationBar() {
  const [nav, setNav] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const pathname = usePathname();
  const [loggedIn , setIsLoggedIn] = useState< string | null >(null);
  const router = useRouter();

  useEffect(() => {
      if (typeof window === "undefined") return;
      setIsLoggedIn(localStorage.getItem('JwtToken'));
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        if (nav) {
          setNav(false);
        }
        setAnimationClass('');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nav]);

  const handleNavToggle = () => {
    if (window.innerWidth < 768) {
      setAnimationClass(nav ? 'nav-menu-exit' : 'nav-menu');
    } else {
      setAnimationClass('');
    }
    setNav(!nav);
  };

  const handleLogout = () => {
    document.cookie = 'jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.clear();
    setIsLoggedIn(null);
    router.push('/login');
  };

  

  return (
    <>
      <div className="hidden md:flex justify-around items-center pt-[24px]">
        <a href="./">
          <img className="object-cover z-50" src="/toolsnitchlogo.png" />
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/query" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Find Repair Shop
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Track Order
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              { loggedIn==null ? (
                <NavigationMenuItem className="flex gap-2">
                  <Link href="/register" legacyBehavior passHref>
                    <NavigationMenuLink className="border-2 flex justify-center items-center rounded-full h-10 px-5 bg-[#C6A86B] border-[#C6A86B] text-white">
                      Sign up
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/login" legacyBehavior passHref>
                    <NavigationMenuLink className="border-2 flex justify-center items-center rounded-full h-10 px-5 text-[#C6A86B] border-[#C6A86B]">
                      Login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ) : (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-1 p-3 md:w-[400px] lg:w-[120px] divide-y divide-neutral-200">
                          <li>
                            <ListItem href="/profile" title="Account" />
                          </li>
                          <li>
                            <ListItem href="/" title="Orders" />
                          </li>
                          <li>
                            <ListItem onClick={handleLogout} title="Logout" />
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex justify-between md:hidden z-50 pt-3 px-3">
        <div
          onClick={handleNavToggle}
          className="cursor-pointer text-gray-500 z-50"
        >
          {nav ? (
            <FaTimes size={30} color="black" />
          ) : (
            <FaBars size={30} color="black" />
          )}
        </div>
        <a href="./" className="z-50">
          <img className="object-cover" src="/toolsnitchlogo.png" />
        </a>
      </div>
      {(nav || animationClass === 'nav-menu-exit') && (
        <div
          className={`${animationClass} flex flex-col ps-6 pe-8 pt-16 py-4 gap-3 text-2xl w-full font-medium text-gray-900 z-10 absolute top-0 text-right right-0 
          bg-gradient-to-br from-white to-gray-50 transform`}
          onAnimationEnd={() => {
            if (animationClass === 'nav-menu-exit') {
              setAnimationClass('hidden');
            }
          }}
        >
          <a href="/" className="">Home</a>
          <a href="/" className="">About</a>
          <a href="/query" className="">Find Repair Shop</a>
          <a href="/" className="">Track Order</a>
          <a href="/" className="">Contact Us</a>
          { loggedIn == null && <a href="/login" className="">Login</a> }
          { loggedIn == null && <a href="/register" className="">Register</a>}
          { loggedIn !== null && <a href="/register"  onClick={handleLogout} className="">Logout</a> }
        </div>
      )}
    </>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { onClick?: () => void }>(
  ({ className, title, children, onClick, ...props }, ref) => {
    if (onClick) {
      return (
        <li>
          <button
            onClick={onClick}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left",
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </button>
        </li>
      );
    }
    
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
  }
);
ListItem.displayName = "ListItem";