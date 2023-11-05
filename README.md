# Site Admin

An app used to keep track of manage personal projects

This is a Next.js project which uses NextAuth / Github account authentication, API routes, Prisma and  a serverless Postgresql DB. 

## Setup

- Install packages
```
npm install
```
-  Copy env file
```
cp .env.example .env.local
```
-  Fill in env values
```
DATABASE_URL

GITHUB_ID
GITHUB_SECRET

NEXTAUTH_URL
NEXTAUTH_SECRET
NEXTAUTH_WHITELIST

NEXT_PUBLIC_APP_URL
```
-  To apply the current prisma schema state to Postgresql run db push **(Development environment)**
```
npx prisma db push
```
-  Run migrations to create Postgresql db tables **(Production / Staging environment)**
```
npx prisma migrate deploy
```
-  Run seeder to add icon DB data
```
npx prisma db seed
```
-  Run app locally
```
npm run dev
```
