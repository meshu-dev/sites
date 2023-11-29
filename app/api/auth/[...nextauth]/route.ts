import NextAuth, { NextAuthOptions, Account, DefaultSession, User, Session  } from 'next-auth'
//import { JWT } from 'next-auth/jwt'
//import NextAuth, { NextAuthOptions, Session, JWT, AdapterUser } from '../../../types/next-auth'
import GithubProvider from 'next-auth/providers/github'
import { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { JWT } from "next-auth/jwt"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials}: any) {
      let hasSiteAccess = false
      const currentUser: string = profile['login']
      const whitelistUsers: Array<String> = String(process.env.NEXTAUTH_WHITELIST).split(',')

      for (const whitelistUser of whitelistUsers) {
        if (whitelistUser === currentUser) {
          hasSiteAccess = true
          break
        }
      }

      return hasSiteAccess
    },
    async jwt({ token, account }: any) {

      //console.log('JWT Callback Token', token);
      //console.log('JWT Callback Account', account);

      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }: {session: Session, token: JWT, user: User}): Promise<Session> {
      // Send properties to the client, like an access_token from a provider.
      //session.accessToken = token.accessToken

      //console.log('Session', session)
      //console.log('Session Token', token)
      //console.log('Session User', user)
      
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        expires: session.expires
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }