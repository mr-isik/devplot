import Link from "next/link";
import Logo from "../globals/logo";
import { UserButton } from "../globals/UserButton";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function AppNavigation() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    redirect("/sign-in");
  }

  const user = data.user;

  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border p-2">
      <Link href="/dashboard" className="inline-flex items-center gap-2">
        <Logo size={36} />
        <h1 className="font-bold">DevPlot</h1>
      </Link>

      <div className="flex items-center">
        {user ? (
          <UserButton user={user} />
        ) : (
          <Button variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
