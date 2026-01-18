'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import { useEffect, useState } from 'react';
import type { UIStrings } from '@/types/sanity';

// Default content (used while loading or if CMS is empty)
const defaultContent = {
    badge: 'Error 404',
    title: 'Lost in Data.',
    description: 'The page you are looking for has been moved, removed, or never existed in our strategy framework.',
    homeButton: 'Return Home',
    contactButton: 'Contact Support',
    quickLinksTitle: 'Popular Insights',
    quickLinks: [
        { label: 'Strategy', href: '/solutions' },
        { label: 'Memberships', href: '/memberships' },
        { label: 'Consulting', href: '/consulting' },
        { label: 'Options', href: '/solutions' },
    ],
};

export default function NotFound() {
    // Use default content - can be extended to fetch from CMS
    // For 404 pages, we use client-side defaults since this is an error page
    const content = {
        badge: defaultContent.badge,
        title: defaultContent.title,
        description: defaultContent.description,
        homeButton: defaultContent.homeButton,
        contactButton: defaultContent.contactButton,
        quickLinksTitle: defaultContent.quickLinksTitle,
        quickLinks: defaultContent.quickLinks,
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
            <NavigationHeader />

            <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2563EB]/3 rounded-full blur-3xl -z-10" />

                <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Subtle 404 Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-[11px] font-bold uppercase tracking-wider">
                        {content.badge}
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-display font-semibold tracking-tighter text-[#111827] italic">
                            Lost in <span className="text-[#2563EB]">Data.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#6B7280] max-w-lg mx-auto leading-relaxed font-medium">
                            {content.description}
                        </p>
                    </div>

                    {/* Action Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-md mx-auto">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 bg-[#0A1A2F] text-white py-4 px-6 rounded-xl font-semibold text-[14px] hover:bg-[#1E3A8A] transition-all active:scale-[0.98] shadow-lg shadow-black/5"
                        >
                            <Home className="w-4 h-4" />
                            {content.homeButton}
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 bg-white text-[#111827] py-4 px-6 rounded-xl font-semibold text-[14px] border border-[#E5E7EB] hover:border-[#2563EB]/50 hover:bg-[#2563EB]/5 transition-all active:scale-[0.98]"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {content.contactButton}
                        </Link>
                    </div>

                    {/* Quick Search Suggestion */}
                    <div className="pt-12 border-t border-gray-100 mt-12">
                        <p className="text-[12px] text-[#9CA3AF] font-medium uppercase tracking-widest mb-6 font-display">
                            {content.quickLinksTitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {content.quickLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-[13px] text-[#6B7280] font-medium hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
