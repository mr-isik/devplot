import { getUser } from "@/actions/users/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ModeToggle } from "@/components/globals/ThemeSwitcher";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUser, Bell, Shield, Trash2, ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";

// Moved the function directly into this file
async function deleteUserAccount() {
  "use server";

  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/");
    }

    // Delete user data from the users table
    const { error: deleteUserError } = await supabase
      .from("users")
      .delete()
      .eq("auth_id", user.id);

    if (deleteUserError) {
      console.error("Error deleting user data:", deleteUserError);
      throw new Error("Failed to delete user data");
    }

    // Sign out the user
    await supabase.auth.signOut();

    // Revalidate paths
    revalidatePath("/", "layout");

    // Redirect to home
    return redirect("/");
  } catch (error) {
    console.error("Error deleting user account:", error);
    // Still redirect to home in case of error, after attempting logout
    return redirect("/");
  }
}

export default async function SettingsPage() {
  const { userData, error } = await getUser();

  if (error || !userData || userData.length === 0) {
    return redirect("/");
  }

  const user = userData[0];

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <div>
        <div className="space-y-2">
          {/* back to dashboard */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 mb-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and set preferences.
          </p>
        </div>
        <Separator className="my-6" />

        <Tabs defaultValue="appearance" className="mt-6">
          <TabsList className="grid grid-cols-2 w-full md:w-1/3 mb-8">
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <CircleUser className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="danger" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Danger Zone</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-4">
            <UserPreferences />
          </TabsContent>

          <TabsContent value="danger" className="space-y-4">
            <DangerZone />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function UserPreferences() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>
          Customize how the application looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50">
          <div className="space-y-0.5">
            <h3 className="font-medium">Theme</h3>
            <p className="text-sm text-muted-foreground">
              Switch between light, dark, and system themes
            </p>
          </div>
          <ModeToggle />
        </div>
      </CardContent>
    </Card>
  );
}

function DangerZone() {
  return (
    <Card className="border-destructive/20 shadow-none">
      <CardHeader className="text-destructive">
        <CardTitle>Danger Zone</CardTitle>
        <CardDescription>
          Actions here can't be undone and may result in permanent data loss
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4 bg-destructive/5">
          <div className="space-y-0.5">
            <h3 className="font-medium text-destructive">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Your account and all associated data will be permanently deleted
            </p>
          </div>
          <DeleteAccountDialog />
        </div>
      </CardContent>
    </Card>
  );
}

function DeleteAccountDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your account and all associated data
            will be permanently deleted from our servers. Are you sure you want
            to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <DeleteAccountButton />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteAccountButton() {
  return (
    <form action={deleteUserAccount}>
      <AlertDialogAction
        type="submit"
        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
      >
        Yes, delete my account
      </AlertDialogAction>
    </form>
  );
}
