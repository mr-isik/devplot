import UpdatePasswordForm from "@/features/auth/forms/UpdatePasswordForm";

export async function generateMetadata() {
  return {
    title: "Change Password",
    description: "Change Password",
  };
}

const ChangePasswordPage = () => {
  return <UpdatePasswordForm />;
};

export default ChangePasswordPage;
