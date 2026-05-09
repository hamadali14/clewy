import { BuilderExperience } from "@/components/builder/BuilderExperience";

export default function BuilderPage({ searchParams }: { searchParams?: { prompt?: string } }) {
  return <BuilderExperience initialPrompt={searchParams?.prompt ? decodeURIComponent(searchParams.prompt) : ""} />;
}
