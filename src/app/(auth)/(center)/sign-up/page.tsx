import Logo from "@/components/globals/logo";
import SignUpForm from "@/features/auth/forms/SignUpForm";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: "DevPlot - Sign Up",
    description: "Sign up for DevPlot",
  };
}

export default async function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 w-full">
      <div className="relative z-20 flex items-center text-lg font-medium">
        <Logo size={64} />
      </div>
      <SignUpForm />
    </div>
  );
}
