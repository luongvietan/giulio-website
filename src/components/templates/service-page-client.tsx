'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { Briefcase, Users, Calendar, Check, Network, Building2, BarChart3, TrendingUp, Shield, type LucideIcon } from 'lucide-react';
import type { ServiceLandingPage, SiteSettings } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
    Briefcase,
    Users,
    Calendar,
    Check,
    Network,
    Building2,
    BarChart3,
    TrendingUp,
    Shield,
};

interface ServicePageClientProps {
    pageData?: ServiceLandingPage | null;
    siteSettings?: SiteSettings | null;
    defaultBadge?: string;
    defaultTitle?: string;
}

export default function ServicePageClient({ pageData, siteSettings, defaultBadge = 'Service', defaultTitle = 'Service' }: ServicePageClientProps) {
    const heroBadge = pageData?.heroBadge ?? defaultBadge;
    const heroTitle = pageData?.heroTitle ?? defaultTitle;
    const heroSubtitle = pageData?.heroSubtitle ?? '';
    const heroDescription = pageData?.heroDescription ?? '';
    const heroCtaText = pageData?.heroCtaText ?? 'Request Access';
    const heroCtaLink = pageData?.heroCtaLink ?? '/contact';

    const services = pageData?.services || [];

    const ctaTitle = pageData?.ctaTitle ?? 'Ready to Get Started?';
    const ctaDescription = pageData?.ctaDescription ?? 'Contact us to learn more about our services.';
    const primaryCtaText = pageData?.primaryCtaText ?? 'Contact Us';
    const primaryCtaLink = pageData?.primaryCtaLink ?? '/contact';
    const secondaryCtaText = pageData?.secondaryCtaText ?? 'View Solutions';
    const secondaryCtaLink = pageData?.secondaryCtaLink ?? '/solutions';

    const heroRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const ctaButtonRef = useRef<HTMLAnchorElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
            badgeRef.current,
            { opacity: 0, y: -20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7 }
        )
            .fromTo(
                titleRef.current,
                { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
                { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
                "-=0.4"
            )
            .fromTo(
                paragraphRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.5"
            )
            .fromTo(
                ctaButtonRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6 },
                "-=0.4"
            );

        if (cardsRef.current) {
            gsap.fromTo(
                cardsRef.current.children,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        gsap.fromTo(
            ctaRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F9FB]">
            <NavigationHeader siteSettings={siteSettings} />
            <main>
                <section ref={heroRef} className="w-full bg-[#F8F9FB] py-12 md:py-24 px-6 md:px-12">
                    <div className="max-w-[1200px] mx-auto text-center">
                        <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full mb-8">
                            <Network className="w-4 h-4 text-[#2563EB]" />
                            <span className="text-[12px] font-medium text-[#2563EB] tracking-wide uppercase">{heroBadge}</span>
                        </div>
                        <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#111827]">
                            {heroTitle.replace(heroSubtitle, '')}
                            {heroSubtitle && <><br /><span className="text-[#6B7280]">{heroSubtitle}</span></>}
                        </h1>
                        <p ref={paragraphRef} className="text-[17px] text-[#6B7280] font-normal leading-relaxed max-w-xl mx-auto mb-10">
                            {heroDescription}
                        </p>
                        <Link
                            ref={ctaButtonRef}
                            href={heroCtaLink}
                            className="inline-block bg-[#0A1A2F] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#1E3A8A] transition-colors"
                        >
                            {heroCtaText}
                        </Link>
                    </div>
                </section>

                <section className="w-full bg-[#F8F9FB] py-8 md:py-12 px-6 md:px-12">
                    <div className="max-w-[1200px] mx-auto">
                        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {services.map((service, index) => {
                                const IconComponent = iconMap[service.icon || ''] || Briefcase;
                                return (
                                    <div key={index} className="border border-[#E5E7EB] rounded-xl p-7 bg-white">
                                        <div className="w-10 h-10 bg-[#F8F9FB] border border-[#E5E7EB] rounded-lg flex items-center justify-center mb-5">
                                            <IconComponent className="w-5 h-5 text-[#2563EB]" />
                                        </div>
                                        <h3 className="text-[18px] font-semibold text-[#111827] mb-3">{service.title}</h3>
                                        <p className="text-[14px] text-[#6B7280] leading-relaxed mb-5">{service.description}</p>
                                        <ul className="flex flex-col gap-2.5">
                                            {(service.features || []).map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <Check className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0" />
                                                    <span className="text-[13px] text-[#374151]">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section ref={ctaRef} className="w-full bg-[#F3F4F6] py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
                    <div className="max-w-[700px] mx-auto text-center">
                        <h2 className="text-[28px] md:text-[36px] font-medium text-[#111827] mb-5">{ctaTitle}</h2>
                        <p className="text-[16px] text-[#6B7280] mb-8">
                            {ctaDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href={primaryCtaLink}
                                className="bg-[#0A1A2F] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#1E3A8A] transition-colors"
                            >
                                {primaryCtaText}
                            </Link>
                            <Link
                                href={secondaryCtaLink}
                                className="bg-transparent text-[#111827] px-7 py-3.5 rounded-md text-[14px] font-medium border border-[#E5E7EB] hover:border-[#6B7280] hover:bg-white transition-colors"
                            >
                                {secondaryCtaText}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer siteSettings={siteSettings} />
        </div>
    );
}
