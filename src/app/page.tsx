import { redirect } from "next/navigation";

export default function Home() {
  redirect("/task1");
  return null;
}
