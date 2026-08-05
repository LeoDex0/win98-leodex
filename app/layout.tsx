import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeoDex — Web Developer',
  description:
    "A nostalgic Windows 98 desktop, built by LeoDex just for fun — with a few real links tucked inside.",
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
