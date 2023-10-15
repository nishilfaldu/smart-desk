import { Nunito } from "next/font/google";


import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/PageHeader";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ExamplesNav } from "@/components/ExamplesNav";
import { buttonVariants } from "@/registry/default/ui/button";
import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster"
import Editor from "@/components/Editor";



const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Desk Web Application",
  description: "Welcome to Smart Desk Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className}`}>
      <h1>Welcome to your Creative Editor</h1>
      {children}
      </body>
    </html>
  );
}
