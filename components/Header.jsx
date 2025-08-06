"use client";
import React from "react";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { BookDashed, LayoutDashboard, LogIn, LogOut, User2 } from "lucide-react";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";
const Header = () => {
  const {isLoading}=useStoreUser();
  const path=usePathname()
  return (
    <div>
      <header className="fixed top-0 left-0 w-full border-b backdrop-blur-md bg-white/80 dark:bg-black/80 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
            Split 
          </h1>
         {
          path=="/" &&<div className="md:gap-4 flex flex-row">
            <Link href="#features" className="text-sm scroll-smooth font-medium hover:text-green-600 transition-all">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm scroll-smooth font-medium hover:text-green-600 transition-all">
              How it works
            </Link>
          </div>
         }
          <div className="flex items-center gap-2 sm:gap-4">
            <Unauthenticated>
              <div className="flex gap-1 sm:gap-2">
                <SignInButton mode="modal">
                  <Button size="sm" variant={"outline"} className="text-xs cursor-pointer sm:text-sm px-2 sm:px-4">
                    <User2/>
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm"  variant={"outline"} className="text-xs cursor-pointer sm:text-sm px-2 sm:px-4">
                    <LogIn/>
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </Unauthenticated>
            <Authenticated>
              <Link href={"/dashboard"}><Button className={'cursor-pointer'} variant={'outine'}>
              <LayoutDashboard/>
                Dashboard
              </Button></Link>
              <UserButton />
              
            </Authenticated>
          </div>
        </div>
        {
          isLoading && <BarLoader className="mt-2" width={'100%'} color="#36d7b7"/>
        }

      </header>
    </div>
  );
};

export default Header;
