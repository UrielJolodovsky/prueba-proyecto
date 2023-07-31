"use client"
import { SessionProvider } from "next-auth/react";
import ToasterContext from "@/context/ToasterContext";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Session } from "next-auth";
import { metadata } from "../metadata";
import { StateProvider } from "@/context/StateContext";

const inter = Poppins({
  subsets: ["latin-ext"],
  weight: "400",
});

type Props = {
  children?: React.ReactNode;
};

export default function NextAuthProvider({ children }: Props) {
  console.log('NextAuthProvider se está ejecutando'); //Confirmo que ande

  return (
    <SessionProvider>
      <StateProvider>
        <html lang="en">
          <head>
            {<title>{metadata.title}</title>}
            {<meta name="description" content={metadata.description} />}
          </head>
          <body className={inter.className}>
            <ToasterContext />
            {children}
          </body>
        </html>
      </StateProvider>
    </SessionProvider>
  );;
};
