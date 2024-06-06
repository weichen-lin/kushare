import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function useClientUser() {
  const { user } = useUser()
  if (!user) {
    redirect('/sign-up')
  }

  return {
    imageUrl: user.imageUrl,
    name: user.fullName,
    id: user.id,
  }
}
