"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "../globals/logo";
import { User } from "@supabase/supabase-js";
import { UserButton } from "../globals/UserButton";

type NavbarProps = {
  user: User | null;
};

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <Logo size={64} />
            <span className="text-xl font-bold tracking-tight">DevPlot</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/themes" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Themes
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button
                  className="bg-primary hover:bg-primary/90 shadow-sm"
                  size="sm"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton user={user} />
            </div>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90 shadow-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-6 py-6">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Logo size={64} />
                  <span className="text-xl font-bold tracking-tight">
                    DevPlot
                  </span>
                </Link>
              </div>
              <div className="grid gap-4">
                <Link
                  href="/features"
                  className="group flex items-center justify-between rounded-lg border border-transparent px-2 py-1.5 text-foreground hover:bg-primary/10"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/themes"
                  className="group flex items-center justify-between rounded-lg border border-transparent px-2 py-1.5 text-foreground hover:bg-primary/10"
                  onClick={() => setIsOpen(false)}
                >
                  Themes
                </Link>
                <Link
                  href="/pricing"
                  className="group flex items-center justify-between rounded-lg border border-transparent px-2 py-1.5 text-foreground hover:bg-primary/10"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  className="group flex items-center justify-between rounded-lg border border-transparent px-2 py-1.5 text-foreground hover:bg-primary/10"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </div>
              <div className="grid gap-2 mt-6">
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
