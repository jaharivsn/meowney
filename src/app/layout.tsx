import type { Metadata, Viewport } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Meowney | Finanças Felinas & Controle de Gastos",
  description: "Controle os gastos do seu pet e os seus de forma 100% privada e local no navegador. Crie cofrinhos, organize metas e economize hoje.",
  openGraph: {
    title: "Meowney | Finanças Felinas & Controle de Gastos",
    description: "Controle os gastos do seu pet e os seus de forma 100% privada e local no navegador. Crie cofrinhos, organize metas e economize hoje.",
    url: "https://meowney.vercel.app",
    siteName: "Meowney",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meowney | Finanças Felinas & Controle de Gastos",
    description: "Controle os gastos do seu pet e os seus de forma 100% privada e local no navegador. Crie cofrinhos, organize metas e economize hoje.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-body-md text-on-background antialiased">
        {children}
      </body>
    </html>
  );
}

