import { usePathname } from 'next/navigation'
import { DashboardIcon, GearIcon } from '@radix-ui/react-icons'
import { redirect } from 'next/navigation'

const Bars = [
  { name: 'Disk', icon: <DashboardIcon />, path: 'd' },
  {
    name: 'Settings',
    icon: <GearIcon />,
    path: 'settings',
  },
]

export default function useNavbar() {
  const pathname = usePathname()
  const current = Bars.find(bar => pathname.includes(bar.path))

  if (!current) redirect('/')

  return { current }
}
