'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const pageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  image: z.string(),
});

export async function GetUser() {
  const session = await auth();
  console.log({ session });
  if (!session) {
    redirect('/');
  }

  try {
    const user = pageSchema.parse(session.user);
    return user;
  } catch {
    console.log('error at parsing user data');
    redirect('/');
  }
}
