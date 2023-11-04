import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  console.log('ACCESS TOKEN - Session Data', session)

  const accessToken = ''; //data?.accessToken ?? 'None'

  return <div>Access Token: {accessToken}</div>
}
