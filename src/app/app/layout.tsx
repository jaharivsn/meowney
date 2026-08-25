import { Suspense } from "react";
import { BottomNav } from "@/components/BottomNav";
import { TutorialModal } from "@/components/TutorialModal";
import { RecurrenceRunner } from "@/components/RecurrenceRunner";
import { PersonalityFromQuery } from "@/components/PersonalityFromQuery";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <PersonalityFromQuery />
      </Suspense>
      {children}
      <RecurrenceRunner />
      <BottomNav />
      <TutorialModal />
    </>
  );
}
