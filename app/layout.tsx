import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "CareerPilot AI | Your Personal AI Career Coach",
  description: "AI-powered resume analysis, interview coaching, career planning, and job readiness tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}