"use client";

import { signout } from "@/actions/auth/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@supabase/supabase-js";
import {
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

type UserButtonProps = {
  user: User;
};

export function UserButton({ user }: UserButtonProps) {
  const router = useRouter();
  const handleSignout = async () => {
    await signout();
    router.push("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2 rounded-full">
          <UserCircle size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end" sideOffset={8}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2 p-1">
            <div className="flex flex-col space-y-1">
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
          <div className="border-t border" />
          <div className="flex flex-col space-y-1">
            <Button variant="ghost" size="sm" className="justify-start">
              <CreditCard className="mr-2 size-4" />
              <span>Manage Subscription</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => router.push("/dashboard/settings")}
            >
              <Settings className="mr-2 size-4" />
              <span>Settings</span>
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <LifeBuoy className="mr-2 size-4" />
              <span>Feedback</span>
            </Button>
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
