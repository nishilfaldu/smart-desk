"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { createContext } from 'react';

const displayContext = {
    dashboard: true,
    tasks: true,
    workspace: true,
    settings: true,
    authentication: true,
  }

// Define the context shape with the correct types
interface DisplayContextType {
  displayContext: any; // Replace 'any' with the actual type
  setCurrentDisplay: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the actual type
}

// Create the DisplayContext with the correct initial values
export const DisplayContext = createContext<DisplayContextType>({
  displayContext: null, // Replace 'null' with the initial value of displayContext
  setCurrentDisplay: () => {}, // Provide a default function if needed
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [currentDisplay, setCurrentDisplay] = React.useState(displayContext);

  return <NextThemesProvider {...props}>
    <DisplayContext.Provider value={{displayContext: currentDisplay, setCurrentDisplay}}>{children}</DisplayContext.Provider>
    </NextThemesProvider>
}
