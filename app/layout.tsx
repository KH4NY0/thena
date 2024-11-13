import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Thena",
  description: "Generate invoices, track payments, and send reminders for overdue invoices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

      >
        {children}
      </body>
    </html>
  );
}
