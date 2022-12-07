import Head from "next/head";
import Image from "next/image";
import CatLottie from "./catLottie";
import LoginBanner from "./loginBanner";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Whispurr | Sign In</title>
        <meta
          name="description"
          content="Whispurr is a social platform for connecting and communicating your deepest secrets...or just regular thoughts."
        />
        <link rel="icon" href="/whiskers.svg" />
      </Head>
      <div className="flex h-screen w-screen flex-col pt-8 text-center font-logo text-primary">
        <div className="flex justify-center">
          <p className="mr-2 text-4xl sm:text-5xl">Whispurr</p>
          <Image
            src="/whiskers.svg"
            height={120}
            width={120}
            alt="Whispurr Logo"
          />
        </div>
        <p className="text-xl sm:text-2xl">Secrets Make Friends</p>
        <CatLottie />
      </div>
      <LoginBanner />
    </>
  );
}
