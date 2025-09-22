import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "YKS Yol Arkadaşı",
  description: "Deneme sonuçlarını analiz et, konularını takip et",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
