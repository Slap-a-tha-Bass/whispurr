import { type NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import Timeline from "../components/timeline";
import Navigation from "../components/navigation";
import SidePanel from "../components/sidePanel";
import LoginBanner from "../components/loginBanner";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <h1>Home</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Whispurr | Secrets Make Friends</title>
        <meta
          name="description"
          content="Whispurr is a social platform for connecting and communicating your deepest secrets...or just regular thoughts."
        />
        <link rel="icon" href="/whiskers.svg" />
      </Head>
      <div className="grid grid-cols-4 px-4 sm:px-28">
        <Navigation classNames="hidden pt-6 col-span-0 sm:col-span-1 sm:flex" />
        <Timeline classNames="pt-4 col-span-4 sm:col-span-2" />
        <SidePanel classNames="pt-6 hidden col-span-0 sm:col-span-1 sm:flex" />
      </div>
      {!session && <LoginBanner />}
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
