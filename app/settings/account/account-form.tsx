"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { message } from "antd"


const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Updated name and username successfully',
    });
  };

  const error_ = () => {
    messageApi.open({
      type: 'error',
      content: 'There was an error while updating account information',
    });
  };

  function onSubmit(data: AccountFormValues) {
    console.log(data);

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })

    updateUser('nishilfald@outlook.com', data.username, data.name);

  }

  const updateUser = async (email: string, username: string, name: string) => {
    try {
      // Create an object with the data to update
      // const data = {
      //   email: email,
      //   username: username,
      //   name: name,
      // };
      
      let apiUrl = `http://localhost:3000/api/update-existing-user?email=${email}&username=${username}&name=${name}`;
      if(process.env.NEXT_PUBLIC_PRODUCTION) {
        apiUrl = `http://${process.env.NEXT_PUBLIC_DEPLOYMENT_LINK}/api/update-existing-user?email=${email}&username=${username}&name=${name}`
      }
      // Make the PUT request
      const response = await fetch(apiUrl);
  
      if (response.ok) {
        const result = await response.json();
        console.log('User updated successfully:', result.message);
        success();
        // Handle success, e.g., show a success message to the user
      } else {
        const errorData = await response.json();
        console.error('Error updating user:', errorData.error);
        error_()
        // Handle error, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error updating user:', error);
      error_();
      // Handle unexpected errors, e.g., network issues
    }
  };
  
  

  return (
    <Form {...form}>
      {contextHolder}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  )
}
