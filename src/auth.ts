// auth.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    //@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
    GitHub,
  ],
});
