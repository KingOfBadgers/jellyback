import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JellyBack",
  description: "Jellyfin back cover generator"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-slate-950 text-white">
          {children}
        </main>
      </body>
    </html>
  );
}