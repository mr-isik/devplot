import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, ChevronLeft, Mail } from "lucide-react";
import Link from "next/link";
import ResendButton from "./ResendButton";

type Props = {
  searchParams: Promise<{ email: string }>;
};

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to continue your journey.",
};

export default async function VerifyPage({ searchParams }: Props) {
  const { email } = await searchParams;

  if (!email) {
    return (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">Error Occurred</h1>
        <p>Error Missing Parameters</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md px-4">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="size-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verify Email</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Please check your email for a verification link.
                </p>
              </div>
            </div>
            <p className="pl-11 text-xs text-muted-foreground">
              Check Spam Folder if you don't see it in your inbox.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <ResendButton email={email} />
        </CardFooter>
      </Card>
      <Link
        className="flex items-center gap-2 text-sm text-muted-foreground mt-4 justify-center"
        href="/sign-in"
      >
        <ChevronLeft size={14} className="mt-0.5" />
        Back to Sign In
      </Link>
    </div>
  );
}
