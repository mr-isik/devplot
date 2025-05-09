export default async function CenteredLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="absolute left-1/3 top-60 z-[-1] size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl hidden md:block" />
      <div className="absolute left-1/2 top-32 z-[-1] size-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl hidden md:block" />

      {props.children}
    </div>
  );
}
