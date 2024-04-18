import Image from "next/image";
import { getServerAuthSession } from "@/server/auth";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";

export default async function App() {
  const session = await getServerAuthSession();

  return (
    <>
      {session ? (
        <>
          {session.user.image && (
            <Image
              className="rounded-[40px]"
              width={120}
              height={120}
              src={session.user.image}
              alt="user"
            />
          )}
          <p>Signed in as {session.user.name}</p>
          <SignOut />
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <SignIn />
        </>
      )}
    </>
  );
}
