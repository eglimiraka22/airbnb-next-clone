import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import RentModal from "./components/modals/RentModal";
import Search from "./components/navbar/Search";
import SearchModal from "./components/modals/SearchModal";

const fontNunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body className={fontNunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28 z-10'>{children}</div>
      </body>
    </html>
  );
}

//Min  1H 25Mins
