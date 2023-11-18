import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

const fontNunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentUser = await getCurrentUser()
  return (
    <html lang='en'>
      <body className={fontNunito.className}>
          <ClientOnly >
            <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />

          </ClientOnly>
          
        {children}</body>
    </html>
  );
}


//Min  1H 25Mins
