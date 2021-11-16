/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/configuration/pages

import { getCsrfToken } from "next-auth/react";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default function SignUp({ csrfToken }) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    //console.log(csrfToken);
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  },[csrfToken, router]);

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <center>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <input name="isNewUser" type="hidden" defaultValue="true" />
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
                <Link href="/">Back</Link><span> | </span> <button type="submit">Register</button>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
  )
}