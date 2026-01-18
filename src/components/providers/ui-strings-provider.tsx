'use client';

import React, { createContext, useContext } from 'react';
import type { UIStrings } from '@/types/sanity';

const UIStringsContext = createContext<UIStrings | null>(null);

export function useUIStrings() {
    const context = useContext(UIStringsContext);
    // We don't throw an error if missing, just return null, 
    // so components can handle graceful degradation or we can check coverage in one place.
    return context;
}

interface UIStringsProviderProps {
    uiStrings: UIStrings | null;
    children: React.ReactNode;
}

export function UIStringsProvider({ uiStrings, children }: UIStringsProviderProps) {
    return (
        <UIStringsContext.Provider value={uiStrings}>
            {children}
        </UIStringsContext.Provider>
    );
}
