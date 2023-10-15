import Editor from "@/components/Editor"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
}

export default function PlaygroundPage() {
  return (
    <>
        <Editor/>
    </>
  )
}
