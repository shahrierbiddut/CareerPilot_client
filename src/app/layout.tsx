import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "CareerPilot AI",
  description: "Next.js + TS + Tailwind full stack app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
