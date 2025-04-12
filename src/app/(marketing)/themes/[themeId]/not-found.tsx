import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ThemeNotFound() {
  return (
    <div className="container mx-auto flex h-[70vh] items-center justify-center py-10">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Theme Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The theme you're looking for doesn't exist or may have been removed.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/themes">
            <Button variant="default">
              <ArrowLeft className="mr-2 size-4" />
              Back to All Themes
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
