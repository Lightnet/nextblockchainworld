import { useSession } from "next-auth/react";
import Sign from "../components/system/sign";
//import Link from 'next/link';
import AuthAccess from "../components/system/authaccess";
import AccountSection from "../components/account/accountsection";

export default function Page() {
  const { data: session } = useSession()

  //check var change status.
  //useEffect(async () => {
    //console.log("status:",status);
  //},[status]);

  // index page
  return (<>
    <AuthAccess>
      <Sign></Sign>
      <label> Signed in as {session?.user.name} </label>
      <div>
      <AccountSection></AccountSection>
      </div>
    </AuthAccess>
  </>)
}
/*

*/