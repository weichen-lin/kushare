import { usePathname } from 'next/navigation'
import { DashboardIcon } from '@radix-ui/react-icons'
import { redirect } from 'next/navigation'

const Bars = [{ name: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' }]

export default function useNavbar() {
  const pathname = usePathname()
  const current = Bars.find(bar => pathname.includes(bar.path))

  if (!current) redirect('/')

  return { current }
}
