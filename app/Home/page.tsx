import { getServerSession } from "next-auth";
import Main from "./Main";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  console.log(session);

  if (!session) {
    redirect("/SignIn");
  }

  return <Main email={session.user?.email!} />;
}
