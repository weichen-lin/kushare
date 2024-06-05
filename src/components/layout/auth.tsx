'use server';

import Image from 'next/image';
import Link from 'next/link';
import { UserProvider } from '@/components/provider';
import { GetUser } from '@/action/auth/user';

export default async function AuthLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const user = await GetUser();

  return (
    <UserProvider user={user}>
      <div className="flex h-screen w-screen flex-col overflow-x-hidden lg:flex-row">
        <div className="hidden w-[260px] flex-col items-center pl-4 lg:flex">
          <Link href="/" className="py-8">
            <Image
              src="/icon.jpeg"
              alt="Logo"
              width={50}
              height={50}
              className="cursor-pointer rounded-full hover:opacity-75"
            />
          </Link>
          <div className="mb-8 h-[1px] w-full border-b-[1px] border-slate-700/10"></div>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto pt-[60px] dark:bg-slate-900 lg:pt-0">
          {children}
        </div>
      </div>
    </UserProvider>
  );
}
