import { BottomNav } from "@/components/BottomNav";
import { TutorialModal } from "@/components/TutorialModal";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomNav />
      <TutorialModal />
    </>
  );
}
