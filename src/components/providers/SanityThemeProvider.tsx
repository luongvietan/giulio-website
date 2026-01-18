'use client'

import { ThemeProvider, studioTheme } from '@sanity/ui'
import { ReactNode } from 'react'

export function SanityThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={studioTheme}>
            {children}
        </ThemeProvider>
    )
}
