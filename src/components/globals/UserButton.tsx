"use client";

import { signout } from "@/actions/auth/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserButton({ user }: any) {
  const router = useRouter();
  const handleSignout = async () => {
    await signout();
    router.push("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon" className="mr-2 rounded-full">
          <User size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-2" align="end" sideOffset={8}>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 p-2">
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <div className="border-t border" />
          <div className="flex flex-col space-y-1">
            <Link href="#" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start w-full"
              >
                <CreditCard className="mr-2 size-4" />
                <span>Manage Subscription</span>
              </Button>
            </Link>
            <Link href="/dashboard/settings" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start w-full"
              >
                <Settings className="mr-2 size-4" />
                <span>Settings</span>
              </Button>
            </Link>
            <Link href="mailto:support@get-ai-assistant.com" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start w-full"
              >
                <LifeBuoy className="mr-2 size-4" />
                <span>Feedback</span>
              </Button>
            </Link>
          </div>
          <div className="border-t border" />
          <Button
            onClick={handleSignout}
            variant="ghost"
            size="sm"
            className="justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="mr-2 size-4" />
            <span>Logout</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
