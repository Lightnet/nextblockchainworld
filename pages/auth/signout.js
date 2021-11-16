/*
# License: MIT
# Created By: Lightnet
*/

import Link from 'next/link';
//import { useState, useEffect } from "react";
//import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function SignOut() {
  const { status } = useSession();

  if (status === "loading") {
    return(<>
      <div>Loading...</div>
    </>)
  }

  if (status === "authenticated") {
    return(<>
    <center>
      <label>Are you sure to sign out?</label>
      <br />
      <Link href="/">Home</Link> <button onClick={() => signOut()}>Sign out</button>
    </center>
    </>)
  }

  return (<>
    <center>
    <Link href="/">Home</Link> <label> [ Sign out ] </label>
    </center>
  </>)
}