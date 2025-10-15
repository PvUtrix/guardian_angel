import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Guardian Angel - Безопасность детей',
  description: 'Спокойствие для родителей. Свобода для детей. Безопасный мониторинг маршрутов ваших детей с мгновенными уведомлениями.',
  keywords: 'безопасность детей, мониторинг, GPS, маршруты, родители, дети',
  authors: [{ name: 'Guardian Angel Team' }],
  openGraph: {
    title: 'Guardian Angel - Безопасность детей',
    description: 'Спокойствие для родителей. Свобода для детей.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}