"use client";

import { signin } from "@/actions/auth/actions";
import DynamicFormField, {
  FormFieldType,
} from "@/components/globals/DynamicFormField";
import Loader from "@/components/globals/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getSignInSchema, type SignInFormValues } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(getSignInSchema()),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setIsLoading(true);
    try {
      const response = await signin(values);

      if (response.error) {
        toast.error(response.error.message, {
          description: "Please try again",
          duration: 5000,
        });
        return;
      }

      if (response.data) {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later",
      });
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                >
                  <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
                </svg>
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                >
                  <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg>
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <div className="h-px w-full bg-border" />
              <span className="mx-4 text-sm text-muted-foreground">OR</span>
              <div className="h-px w-full bg-border" />
            </div>

            <DynamicFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email"
              fieldType={FormFieldType.INPUT}
              icon={<Mail className="size-4 text-muted-foreground" />}
            />

            <DynamicFormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Password"
              fieldType={FormFieldType.PASSWORD}
              icon={<LockKeyhole className="size-4 text-muted-foreground" />}
            />

            <div className="flex items-center justify-end">
              <Link href="/reset-password">
                <Button
                  variant="link"
                  className="px-0 text-sm font-normal text-primary"
                >
                  Forgot password?
                </Button>
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <Loader state={isLoading}>
              {isLoading ? "Signing in" : "Sign in"}
            </Loader>
          </Button>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center">
              <span className="mr-1 text-sm text-muted-foreground">
                Don't have an account?
              </span>
              <Link href="/sign-up">
                <Button
                  variant="link"
                  className="px-0 text-sm font-normal text-primary"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
