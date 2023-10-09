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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <>
            <div className="container relative">
              <PageHeader className="page-header pb-8">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
                >
                  🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
                  <span className="sm:hidden">Style, a new CLI and more.</span>
                  <span className="hidden sm:inline">
                    Introducing IntelliDesk, a new UI for a Smart Desk.
                  </span>
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
                <PageHeaderHeading className="hidden md:block">
                  Check out it's User Interface
                </PageHeaderHeading>
                <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
                <PageHeaderDescription>
                  Dashboard, settings, authentication, and much more.
                </PageHeaderDescription>
                <section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
                  {/* <Link
                    href="/docs"
                    className={cn(buttonVariants(), "rounded-[6px]")}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/components"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-[6px]"
                    )}
                  >
                    Components
                  </Link> */}
                </section>
              </PageHeader>
              <section>
                <ExamplesNav />
                <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
                  {children}
                </div>
              </section>
            </div>
          </>
        </ThemeProvider>
        <DefaultToaster/>
        {/* {/* <Editor/> */}
      </body>
    </html>
  );
}
