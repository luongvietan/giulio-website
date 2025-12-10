export default function ThreeServicesCards() {
  const cards = [
    {
      type: 'kit',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/svgs/68cec44142859c129d0e8e52_logo_20kit_20w_20atquo_20-8.svg',
      title: 'Launch instantly with fixed-price Kits.',
      // Using Carro Bite as background, Macbook gif as foreground to match visual stack
      backImage: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/images/68d79c93c2950a70757d663c_Get_20Carro_20Bite_20atQu-2.jpg',
      frontImage: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/images/6851c5d18c87c9f7f7073bed_Case_20-_20Apple_20Macboo-3.gif',
      benefit: 'Skip the negotiation on standardized workflows.',
      href: '/kit/situs',
      frontImageStyles: 'w-[55%] -bottom-2 -right-2'
    },
    {
      type: 'relia',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/svgs/68cec441fafa92df42236c66_Relia_20logo_20w_20atquo_-10.svg',
      title: 'Grow your team on demand via Relia.',
      // Using SwipeSimple layout
      backImage: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/images/68b03edd778ca23cbfd1d481_SwipeSimple_20Bite_20atQu-4.png',
      frontImage: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/images/68d79c93c2950a70757d663c_Get_20Carro_20Bite_20atQu-2.jpg',
      benefit: 'Bypass the hiring and admin time.',
      href: '/relia',
      frontImageStyles: 'w-[75%] -bottom-4 left-1/2 -translate-x-1/2'
    },
    {
      type: 'agency',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/svgs/68cec3c5dbbc8b7306862e2f_logo_20agency_20atquo_20w-11.svg',
      title: 'Lead high-stakes projects with Agency.',
      // Reusing animations/images for demonstration of layout
      backImage: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/images/6851c5d18c87c9f7f7073bed_Case_20-_20Apple_20Macboo-3.gif',
      frontImage: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/images/68d7ae65c2950a70757fc1be_GIF_20GetCarro_20-_20Case-5.gif',
      benefit: 'Once you got to know us low-risk, use Agency.',
      href: '/agency',
      frontImageStyles: 'w-[70%] -bottom-2 right-2'
    }
  ];

  const checkIcon = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c470a6e-64be-439d-87ef-63069af1eb04-atquo-com/assets/svgs/68d9f5ed18dbb489081bd6b3_check-9.svg';

  return (
    <section className="bg-white py-20 px-5 md:px-10 lg:px-16" aria-label="Service Offerings">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.href}
            className="group flex flex-col bg-white rounded-lg border border-[#E0E0E0] p-8 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-1 relative overflow-hidden"
          >
            {/* 1. Header: Logo */}
            <div className="h-[60px] mb-6 flex items-start">
              <img
                src={card.logo}
                alt={`${card.type} logo`}
                className="h-[32px] w-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* 2. Headline */}
            <h2 className="text-[28px] font-semibold leading-[1.3] tracking-[-0.01em] text-black mb-4">
              {card.title}
            </h2>

            {/* 3. Showcase Images Area */}
            <div className="relative w-full h-[240px] mt-2 mb-8 select-none">
              {/* Back Image (Background layer) */}
              <div className="absolute top-0 left-0 w-[85%] h-[85%] z-0 rounded-md overflow-hidden border border-gray-100 shadow-sm bg-gray-50 transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={card.backImage}
                  alt=""
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              
              {/* Front Image (Floating/Overlay layer) */}
              <div 
                className={`absolute z-10 rounded-md overflow-hidden border border-gray-100 shadow-lg bg-white ${card.frontImageStyles} transition-transform duration-500 group-hover:shadow-xl group-hover:-translate-y-1`}
              >
                <img
                  src={card.frontImage}
                  alt=""
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>

            {/* 4. Bottom Benefit */}
            <div className="flex items-start gap-3 mt-auto">
              <div className="flex-shrink-0 w-5 h-5 mt-1 relative">
                <img
                  src={checkIcon}
                  alt="Checkmark"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[16px] font-normal leading-[1.6] text-black">
                {card.benefit}
              </p>
            </div>
            
            {/* Implicit Full Card Link Overlay Effect via Anchor tag wrapping content */}
          </a>
        ))}
      </div>
    </section>
  );
}