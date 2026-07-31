import type { Metadata } from "next";
import { ScreenGenerator } from "./ScreenGenerator";

export const metadata: Metadata = {
  title: "AI Screen Generator",
  description: "Describe the screen you want to create.",
};

export default function GeneratorHomePage() {
  return <ScreenGenerator />;
}
