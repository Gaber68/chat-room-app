export const metadata = {
  title: 'Chat Room',
  description: 'A simple chat room with Discord integration',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
