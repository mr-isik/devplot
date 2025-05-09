export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto max-w-full overflow-x-hidden p-1 md:p-6">
      <div className="absolute left-72 top-60 z-[-1] size-[500px] rounded-full bg-primary/10 blur-3xl hidden md:block" />
      <div className="absolute left-72 top-60 z-[-1] size-[500px] rounded-full bg-primary/10 blur-3xl hidden md:block" />
      <div className="absolute right-72 top-32 z-[-1] size-[600px] rounded-full bg-blue-600/10 blur-3xl hidden md:block" />
      {props.children}
    </main>
  );
}
