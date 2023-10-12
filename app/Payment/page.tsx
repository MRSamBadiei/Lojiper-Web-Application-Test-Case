import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import Main from "./Main";

export default async function Page() {
  const session = await getServerSession();

  console.log(session);

  if (!session) {
    redirect("/SignIn");
  }

  return <Main />;
}
