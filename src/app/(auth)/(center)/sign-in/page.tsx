import Logo from "@/components/globals/logo";
import SignInForm from "@/features/auth/forms/SignInForm";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: "DevPlot | Sign In",
    description: "Sign in to your DevPlot account",
  };
}

export default async function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 w-full">
      <div className="relative z-20 flex items-center text-lg font-medium">
        <Logo size={64} />
      </div>
      <SignInForm />
    </div>
  );
}
