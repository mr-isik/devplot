import type { EmailOtpType } from "@supabase/supabase-js";
import type { Metadata } from "next";
import VerifyEmail from "./VerifyEmail";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Verify Email",
    description: "Verify Email",
  };
}

export default function AuthConfirmPage({ searchParams }: PageProps) {
  const { token_hash, type, error_code, error_message, next } = searchParams;

  let content;
  if (!token_hash) {
    content = (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">Error Occurred</h1>
        <p>Error Missing Parameters</p>
      </div>
    );
  } else if (error_code === "otp_expired") {
    content = (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">Error Occurred</h1>
        <p>{error_message as string}</p>
      </div>
    );
  } else {
    content = (
      <VerifyEmail
        token_hash={token_hash as string}
        type={type as EmailOtpType}
        next={next as string}
        translations={{
          error_occurred: "Error Occurred",
          unexpected_error: "Unexpected Error",
          verification_success: "Verification Success",
          verifying: "Verifying",
        }}
      />
    );
  }

  return <div className="w-full max-w-md mx-auto">{content}</div>;
}
