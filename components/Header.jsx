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
import { LogIn, LogOut, User2 } from "lucide-react";
const Header = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 w-full border-b backdrop-blur-md bg-white/80 dark:bg-black/80 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
            Split 
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <SignedOut>
              <div className="flex gap-1 sm:gap-2">
                <SignInButton mode="modal">
                  <Button size="sm" className="text-xs cursor-pointer sm:text-sm px-2 sm:px-4">
                    <User2/>
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="text-xs cursor-pointer sm:text-sm px-2 sm:px-4">
                    <LogIn/>
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
              <SignOutButton redirectUrl="/">
                <Button size="sm" variant={'outline'} className="text-xs cursor-pointer sm:text-sm px-2 sm:px-4">
                <LogOut/>
                Sign Out
              </Button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
