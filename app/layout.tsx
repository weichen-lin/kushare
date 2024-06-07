import type { Metadata } from 'next'
import { Alata } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/components/provider'

const inter = Alata({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Kushare',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
