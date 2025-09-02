import { ThemeProvider } from "@/components/theme-provider"
import '@/app/globals.css'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="dark:bg-background bg-slate-50">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}