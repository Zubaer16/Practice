export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
