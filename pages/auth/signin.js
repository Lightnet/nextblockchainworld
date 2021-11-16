/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/configuration/pages
// https://simplernerd.com/next-auth-custom/

import { useState, useEffect } from "react";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import Link from 'next/link';

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default function SignIn({ csrfToken }) {

  //console.log("csrfToken: ",csrfToken);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) =>{ 
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  }, [loading,router]);

  if(loading){
    <div>Loading...</div>
  }

  return (
    <center>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <table>
          <tbody>
            <tr>
              <td>
                <label>Alias</label>
              </td>
              <td>
                <input name="alias" type="text" />
              </td>
            </tr>
            <tr>
              <td>
                <label>Passphrase</label>
              </td>
              <td>
                <input name="passphrase" type="password" />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <center>
                <Link href="/">Back</Link><span> | </span> <button type="submit">Sign in</button>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
  )
}