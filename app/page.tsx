import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getServerSession();

  console.log(session);

  if (!session) {
    redirect("/SignIn");
  } else {
    redirect("/Home");
  }

  return <div className="mt-16"></div>;
}
