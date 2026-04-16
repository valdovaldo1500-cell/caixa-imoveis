import { notFound } from "next/navigation";
import { isValidState } from "@/lib/state";
import NavHeader from "@/components/NavHeader";

export default async function StateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  if (!isValidState(state)) notFound();
  return (
    <>
      <NavHeader state={state} />
      {children}
    </>
  );
}
