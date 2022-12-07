import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import HomeIcon from "../icons/home";
import UserIcon from "../icons/user";
import LogoutIcon from "../icons/logout";

export default function Navigation({ classNames }: { classNames?: string }) {
  const { data: session } = useSession();

  return (
    <main className={`flex flex-col text-primary ${classNames}`}>
      {session && (
        <section className="fixed overflow-hidden">
          <div className="flex">
            <p className="mr-2 font-logo text-2xl">Whispurr</p>
            <Image
              src="/whiskers.svg"
              height={60}
              width={60}
              alt="Whispurr Logo"
            />
          </div>
          <div className="mt-2 mb-8 text-sm">
            <p>{session.user?.name || null}</p>
          </div>
          <Link
            className="mt-2 flex max-w-max items-center rounded-full py-2 px-4 text-xl hover:bg-gray-700"
            href="/"
          >
            <HomeIcon /> Home
          </Link>
          <Link
            className="mt-2 flex max-w-max items-center rounded-full py-2 px-4 text-xl hover:bg-gray-700"
            href={`/${session.user?.name || null}`}
          >
            <UserIcon /> Profile
          </Link>
          <button
            className="mt-2 flex max-w-max items-center rounded-full py-2 px-4 text-xl hover:bg-gray-700"
            onClick={() => {
              if (confirm("Are you sure you want to sign out?")) {
                signOut();
              }
            }}
          >
            <LogoutIcon /> Sign Out
          </button>
        </section>
      )}
    </main>
  );
}
