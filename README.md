# yo-iwamoto/swr-vs-sc-approuter

SWR vs Server Components for server state management on App Router.

> [!IMPORTANT]  
> For clarity, the use of Server Actions in this repository omits authentication processes. However, in practice, Server Actions require authentication each time they are used. Please be cautious if you're referencing this code.

https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#authentication-and-authorization

## Status

- [x] SWR (src: https://github.com/yo-iwamoto/swr-vs-sc-approuter/tree/main/src/app/pattern-1)
- [x] Server Components (src: https://github.com/yo-iwamoto/swr-vs-sc-approuter/tree/main/src/app/pattern-2)

## Feature

- Sign up
- Create Post
- Like Post
- Follow User
- View Timelie

![CleanShot 2024-03-20 at 12 04 54](https://github.com/yo-iwamoto/swr-vs-sc-approuter/assets/56625097/71c04ab1-f3da-4983-96f2-4cfa35142f2d)


## Getting Started

```shell
pnpm i

pnpm db:push

pnpm db:seed

pnpm dev
```

Now you can open [http://localhost:3000](http://localhost:3000) in your browser.

## Unit test

```shell
pnpm run test
```
