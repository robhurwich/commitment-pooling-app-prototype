import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarafu Network",
  description: "Community vouchers and commitment pooling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
