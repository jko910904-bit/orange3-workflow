import { PlaygroundShell } from "@/playground/PlaygroundShell";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PlaygroundShell>{children}</PlaygroundShell>;
}
