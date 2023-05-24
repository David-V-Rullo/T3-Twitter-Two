import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function SideNav() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <div className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user != null && (
          <li>
            <Link href={`/profiles/${user.id}`}>Profiles</Link>
          </li>
        )}
        {user == null ? (
          <li>
            <button onClick={void signIn}>Sign In</button>
          </li>
        ) : (
          <li>
            <button onClick={void signOut}>Sign Out</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SideNav;
