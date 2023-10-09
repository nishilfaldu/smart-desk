"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { useContext, useState } from "react"
import { DisplayContext } from "./ThemeProvider"

const examples = [
  {
    name: "Dashboard",
    id: "dashboard",
    href: "/dashboard",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/dashboard",
  },
  {
    name: "Tasks",
    id: "tasks",
    href: "/tasks",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/tasks",
  },
  {
    name: "Workspace",
    id: "workspace",
    href: "/playground",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/playground",
  },
  {
    name: "Settings",
    id: "settings",
    href: "/settings",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/settings",
  },
  {
    name: "Authentication",
    id: "authentication",
    href: "/authentication",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/authentication",
  },
]

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const {displayContext, setCurrentDisplay} = useContext(DisplayContext);
  const pathname = usePathname()
  // const [nav, setNav] = useState(examples.filter((ex) => displayContext[ex.id]));

  const filteredNav = examples.filter((ex) => displayContext[ex.id]);

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {filteredNav.map((example) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex items-center px-4",
                pathname?.startsWith(example.href)
                  ? "font-bold text-primary"
                  : "font-medium text-muted-foreground"
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      {/* <ExampleCodeLink
        pathname={pathname === "/" ? "/examples/dashboard" : pathname}
      /> */}
    </div>
  )
}

// interface ExampleCodeLinkProps {
//   pathname: string | null
// }

// export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
//   const example = examples.find((example) => pathname?.startsWith(example.href))

//   if (!example?.code) {
//     return null
//   }

//   return (
//     <Link
//       href={example?.code}
//       target="_blank"
//       rel="nofollow"
//       className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
//     >
//       View code
//       <ArrowRightIcon className="ml-1 h-4 w-4" />
//     </Link>
//   )
// }