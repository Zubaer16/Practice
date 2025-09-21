import Link from 'next/link'
import Page from './page'
import ThemeProvider from './theme-provider'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
          {/* <Link href={'/blog'}>Blog</Link> */}
          {/* No prefetching */}
          {/* <a href="/contact">Contact</a> */}
          {/* <main>{children}</main> */}
          <ThemeProvider>{children}</ThemeProvider>
        </nav>
        {children}
      </body>
    </html>
  )
}
