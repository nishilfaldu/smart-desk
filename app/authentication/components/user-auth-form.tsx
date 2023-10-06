"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    // setIsLoading(true)

    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      
      const apiUrl = `http://localhost:3000/api/get-existing-user-or-create?email=${email}&password=${password}`;

      fetch(apiUrl)
        .then((response) => {
          // Check if the response status is OK (200)
          if (response.status === 500) {
            throw new Error(`HTTP error! Status: ${response.status}.`);
          }
          console.log(response);
          // Parse the response body as JSON
          return response.json();
        })
        .then((data) => {
          // Handle the JSON data returned from the server
          console.log('Data received:', data);
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
          })
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
        });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 gap-y-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              ref={emailRef}
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              ref={passwordRef}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email and Password
          </Button>
        </div>
      </form>
      <div className="relative">
        {/* <div className="absolute inset-0 flex items-center"> */}
          {/* <span className="w-full border-t" /> */}
        {/* </div> */}
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 ">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  )
}
