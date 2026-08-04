import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeoDex — Web Developer',
  description:
    "LeoDex's freelance portfolio, styled as a Windows 98 desktop. Business websites built to feel expensive, wrapped in a nostalgic OS.",
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
