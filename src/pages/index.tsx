import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Timeline from "../components/timeline";
import Navigation from "../components/navigation";
import SidePanel from "../components/sidePanel";
import SignIn from "../components/signIn";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return <SignIn />;
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
    </>
  );
};

export default Home;