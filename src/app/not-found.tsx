import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center">
          <div className="space-y-2">
            <h1 className="text-9xl font-bold tracking-tighter text-primary">
              404
            </h1>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Page Not Found
              </h2>
              <p className="text-muted-foreground">
                The page you are looking for does not exist or has been moved.
              </p>
            </div>
          </div>
          <Button className="mt-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
