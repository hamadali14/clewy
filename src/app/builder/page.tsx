import { BuilderExperience } from "@/components/builder/BuilderExperience";

export default function BuilderPage({ searchParams }: { searchParams?: { prompt?: string; blueprint?: string } }) {
  return (
    <BuilderExperience
      initialPrompt={searchParams?.prompt ? decodeURIComponent(searchParams.prompt) : ""}
      initialBlueprintKey={searchParams?.blueprint ? decodeURIComponent(searchParams.blueprint) : ""}
    />
  );
}
