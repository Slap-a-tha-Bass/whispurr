import { signIn } from "next-auth/react";

export default function LoginBanner() {
  return (
    <div className="fixed bottom-0 h-16 w-full bg-primary px-4 text-black">
      <div className="flex h-full items-center justify-between sm:justify-around">
        <p className="text-sm sm:text-lg font-logo">{"Don't miss out on the secrets!"}</p>
        <button
          className="text-right font-bold hover:underline"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
