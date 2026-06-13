import { ShieldCheck, Diamond, DollarSign, Hammer, Truck, FileCheck } from 'lucide-react';
import RevealCard from './RevealCard';

export default function WhyChooseUs() {
  const cards = [
    {
      id: 1,
      title: 'Trusted Local Partner & Transparency',
      description: 'Under DHAYA TRADERS, every transaction is handled with complete transparency and local compliance. No hidden charges, absolute trust.',
      icon: <ShieldCheck className="h-7 w-7 text-teal" />,
      className: 'lg:col-span-2 bg-gradient-to-br from-navy-deep to-navy text-white',
      descColor: 'text-slate-300'
    },
    {
      id: 2,
      title: 'Government Approved Plot Deeds',
      description: 'Every plot is legally vetted, DTCP or RERA approved, ensuring immediate, clean registration and hassle-free transfer.',
      icon: <FileCheck className="h-7 w-7 text-steel" />,
      className: 'bg-white text-navy border border-silver',
      descColor: 'text-slate-500'
    },
    {
      id: 3,
      title: 'Top Grade Construction Materials',
      description: 'We supply direct tested Fe-550 TMT steels, graded river sand/M-sand, and high-compressive red bricks matching highest standard requirements.',
      icon: <Diamond className="h-7 w-7 text-steel" />,
      className: 'bg-white text-navy border border-silver',
      descColor: 'text-slate-500'
    },
    {
      id: 4,
      title: 'Direct Wholesale Price (No Broker)',
      description: 'By supplying directly from our own sand yards and manufacturing brick kilns, we eliminate middleman commissions and save major costs for you.',
      icon: <DollarSign className="h-7 w-7 text-steel" />,
      className: 'bg-white text-navy border border-silver',
      descColor: 'text-slate-500'
    },
    {
      id: 5,
      title: 'Professional Site Builders',
      description: 'All constructions are managed by experienced site engineers, following best architectural designs and structural standards.',
      icon: <Hammer className="h-7 w-7 text-teal animate-pulse" />,
      className: 'lg:col-span-2 bg-steel text-white',
      descColor: 'text-slate-200'
    },
    {
      id: 6,
      title: 'On-Time Material Delivery',
      description: 'Our dedicated supply trucks guarantee river sand, M-sand, and brick deliveries directly to your site on time to avoid labor delay.',
      icon: <Truck className="h-7 w-7 text-steel" />,
      className: 'bg-white text-navy border border-silver',
      descColor: 'text-slate-500'
    }
  ];

  return (
    <section id="why-us" className="py-14 bg-gray-light relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">

        {/* Title Group */}
        <div className="text-center md:max-w-3xl md:mx-auto space-y-4 mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">THE DHAYA STANDARD</span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            Architectural Integrity &amp; Trust
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            While basic building structures fail or delay under sloppy supply chains and legal loopholes, we deploy dual-verified solutions guaranteeing lifelong commercial integrity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <RevealCard key={card.id} delay={index * 100}>
              <div
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-premium hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1 h-full ${card.className}`}
              >
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-white/10 border border-white/10 shadow shadow-inner">
                    {card.icon}
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold leading-snug">
                    {card.title}
                  </h3>
                </div>
                <p className={`font-sans text-xs sm:text-sm ${card.descColor} leading-relaxed`}>
                  {card.description}
                </p>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
