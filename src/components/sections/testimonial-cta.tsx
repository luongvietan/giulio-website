import Link from 'next/link';

export default function TestimonialCTA() {
  return (
    <section className="w-full bg-[#111113] py-24 px-6 md:px-12 border-t border-[#1a1a1d]">
      <div className="max-w-[900px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1d] border border-[#27272a] rounded-full mb-8">
          <span className="text-[12px] font-medium text-[#71717a] tracking-wide">Trusted by institutional investors</span>
        </div>
        <h2 className="text-[32px] md:text-[44px] font-medium tracking-[-0.02em] leading-[1.15] mb-6 text-white">
          Ready to Gain an Edge<br />
          <span className="text-[#71717a]">in Today's Markets?</span>
        </h2>
        <p className="text-[17px] text-[#52525b] font-normal leading-relaxed max-w-xl mx-auto mb-10">
          Join our community of sophisticated investors gaining access to institutional-grade insights and personalized guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/memberships" 
            className="bg-white text-[#0a0a0b] px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#e4e4e7] transition-colors"
          >
            Explore Memberships
          </Link>
          <Link 
            href="/contact" 
            className="bg-transparent text-white px-7 py-3.5 rounded-md text-[14px] font-medium border border-[#27272a] hover:border-[#52525b] hover:bg-[#1a1a1d] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
