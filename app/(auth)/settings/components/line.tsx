import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const redirect_uri = process.env.NEXT_PUBLIC_LINE_REDIRECT_URI
const client_id = process.env.NEXT_PUBLIC_LINE_CLIENT_ID

const link = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=hasjhdklajhsd&scope=profile%20openid`

export default function LineLogin() {
  return (
    <Link
      className='flex items-center gap-x-2 w-[200px] justify-center border-[1px] border-green-500 rounded-md py-2'
      href={link}
    >
      <Image src='/line.png' width={20} height={20} alt='line' />
      <span className='text-slate-500'>Line Login</span>
    </Link>
  )
}
