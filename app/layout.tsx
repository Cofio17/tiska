import type { Metadata } from "next";
import "../styles/globals.scss"; // Tailwind

export const metadata: Metadata = {
  title: "Tiska Fabrics Tool",
  description: "Fabric pattern generator tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
