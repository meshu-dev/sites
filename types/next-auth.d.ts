import NextAuth, { Account, DefaultSession, User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
      accessToken?: Account.accessToken,
      user: {
        id: string,
        name: string | null | undefined,
        email: string | null | undefined
      }
    }
}


declare module "next-auth/jwt" {
    interface JWT {
      accessToken?: Account.accessToken
    }
}

/*import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string,
      name: string,
      email: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string
  }
} */
