import type { Metadata } from "next";

import { Header } from "./components/Header";
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "FocalPoint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
