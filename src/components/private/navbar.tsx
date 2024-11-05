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
  const [isShopkeeper , setIsShopkeeper] = useState< string | null >(null);
  const [isAdmin , setIsAdmin] = useState< string | null >(null);
  const router = useRouter();
  const [profile, setProfile] = useState<null | {
    name: string;
    profilePic : string;
  }>(null);
  
  useEffect(() => {
      if (typeof window === "undefined") return;
      setIsLoggedIn(localStorage.getItem('JwtToken'));
      setIsShopkeeper(localStorage.getItem('isShopkeeper'));
      setIsAdmin(localStorage.getItem('isAdmin'));
      setProfile(JSON.parse(localStorage.getItem('profile') || '{}'));
  },[])

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
    window.location.href = '/login';
  };

  

  return (
    <>
      <div className="hidden items-center justify-around pt-[24px] md:flex">
        <Link href="./">
          <Image
            src="/toolsnitchlogo.png"
            alt="ToolSnitch Logo"
            width={150}
            height={50}
            className="z-50 object-cover"
          />
        </Link>
        {isAdmin !== "true" && (
          <NavigationMenu>
            <NavigationMenuList>
              {isShopkeeper == "true" ? (
                <>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
              {isShopkeeper == "true" ? (
                <>
                  <NavigationMenuItem>
                    <Link href="/order-history" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Order History
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/inventory" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Inventory
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/query" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Find Repair Shop
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/orders" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Track Order
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              {loggedIn == null ? (
                <NavigationMenuItem className="flex gap-2">
                  <Link href="/register" legacyBehavior passHref>
                    <NavigationMenuLink className="flex h-10 items-center justify-center rounded-full border-2 border-[#C6A86B] bg-[#C6A86B] px-5 text-white">
                      Sign up
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/login" legacyBehavior passHref>
                    <NavigationMenuLink className="flex h-10 items-center justify-center rounded-full border-2 border-[#C6A86B] px-5 text-[#C6A86B]">
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
                          <AvatarImage
                            src={profile?.profilePic}
                            alt={profile?.name}
                          />
                          <AvatarFallback>
                            {profile?.name
                              ?.split(" ")
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-1 divide-y divide-neutral-200 p-3 md:w-[400px] lg:w-[120px]">
                          
                          {isAdmin === "true" ? (
                            <li>
                              <ListItem href="/admin" title="Admin Panel" />
                            </li>
                          ) : (
                            <>
                            <li>
                            <ListItem href="/profile" title="Account" />
                          </li>
                            <li>
                              <ListItem href="/" title="Orders" />
                            </li>
                            </>
                          )}

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
      <div className="z-50 flex justify-between px-3 pt-3 md:hidden">
        <div
          onClick={handleNavToggle}
          className="z-50 cursor-pointer text-gray-500"
        >
          {nav ? (
            <FaTimes size={30} color="black" />
          ) : (
            <FaBars size={30} color="black" />
          )}
        </div>
        <Link href="./" className="z-50">
          <Image
            src="/toolsnitchlogo.png"
            alt="ToolSnitch Logo"
            width={100}
            height={30}
            className="object-cover"
          />
        </Link>
      </div>
      {(nav || animationClass === "nav-menu-exit") && (
        <div
          className={`${animationClass} absolute right-0 top-0 z-10 flex w-full transform flex-col gap-3 bg-gradient-to-br from-white to-gray-50 py-4 pe-8 ps-6 pt-16 text-right text-2xl font-medium text-gray-900`}
          onAnimationEnd={() => {
            if (animationClass === "nav-menu-exit") {
              setAnimationClass("hidden");
            }
          }}
        >
          <a href="/" className="">
            Home
          </a>
          <a href="/" className="">
            About
          </a>
          {isAdmin !== "true" && (
            <>
              <a href="/query" className="">
                Find Repair Shop
              </a>
              <a href="/orders" className="">
                Track Order
              </a>
              <a href="/" className="">
                Contact Us
              </a>
            </>
          )}
          {loggedIn == null && (
            <a href="/login" className="">
              Login
            </a>
          )}
          {loggedIn == null && (
            <a href="/register" className="">
              Register
            </a>
          )}
          {loggedIn !== null && (
            <a href="/register" onClick={handleLogout} className="">
              Logout
            </a>
          )}
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