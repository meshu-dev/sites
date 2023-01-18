# DevAdmin app

An app used to manage dev websites.

This is a Next.js project which uses Redux Toolkit and Material UI. 

## Setup

This project requires the devadmin-api app to work.

### Dev Setup

- Install packages

```
npm install
```
-  Copy env file

```
cp .env.example .env.local
```

-  Fill in value for DevAdmin API

```
NEXT_PUBLIC_API_URL
```

-  Run on local

```
npm run dev
```

### Static Site Hosting

- Run the following command to generate static site

```
npm run build
```
