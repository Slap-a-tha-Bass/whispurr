import { signIn } from "next-auth/react";

export default function LoginBanner() {
  return (
    <div className="fixed bottom-0 w-full h-16 grid grid-cols-3 items-center bg-primary text-black px-8">
      <p>{"Don't miss out on the secrets!"}</p>
      <p className="font-bold text-xl font-logo text-center">Whispurr</p>
      <button className="font-bold hover:underline text-right" onClick={() => signIn()}>Login</button>
    </div>
  );
}
