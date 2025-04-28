import ResetPasswordForm from "@/features/auth/forms/ResetPasswordForm";

export async function generateMetadata() {
  return {
    title: "Reset Password",
    description: "Reset Password",
  };
}

export default function ResetPasswordPage() {
  return (
    <div className="container mx-auto max-w-md">
      <ResetPasswordForm />
    </div>
  );
}
