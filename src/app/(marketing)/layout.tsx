import { getUser } from "@/actions/users/actions";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/utils/supabase/server";

export default async function Layout(props: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { userData } = await getUser();

  return (
    <>
      {/* @ts-ignore */}
      <Navbar user={userData} />
      {props.children}
      <Footer />
    </>
  );
}
