type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;

  return {
    title: "DevPlot - Developer Portfolio Builder",
    description: "Create a professional portfolio in minutes with DevPlot",
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        DevPlot - Portfolio Builder
      </h1>
    </div>
  );
}
