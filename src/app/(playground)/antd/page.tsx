import { redirect } from "next/navigation";

/** Legacy path — supplements live under Components */
export default function AntdRedirectPage() {
  redirect("/components");
}
