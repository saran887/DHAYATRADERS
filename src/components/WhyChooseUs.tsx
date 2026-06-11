import { ShieldCheck, Diamond, DollarSign, Hammer, Truck, FileCheck } from 'lucide-react';
import RevealCard from './RevealCard';

export default function WhyChooseUs() {
  const cards = [
    {
      id: 1,
      title: 'Trusted Corporation & Governance',
      description: 'Under DHAYATRADERS corporate lineage, every transaction is audited with complete transparency and compliance. No loopholes, absolute fidelity.',
      icon: <ShieldCheck className="h-7 w-7 text-teal" />,
      className: 'lg:col-span-2 bg-gradient-to-br from-navy-deep to-navy text-white',
      descColor: 'text-slate-300'
    },
    {
      id: 2,
      title: 'Double-Audited Land Deeds',
      description: 'Every plot is vetted through three tiers of legal departments and government land registries to secure immediate clean transfers.',
      icon: <FileCheck className="h-7 w-7 text-steel" />,
      className: 'bg-white text-navy border border-silver',
      descColor: 'text-slate-500'
    },
    {
      id: 3,
      title: 'Certified Elite Raw Materials',
      description: 'We test our rebar steels and structural clinkers in internal laboratories, rejecting aggregate consignments which do not exceed peak regulations.',
      icon: <Diamond className="h-7 w-7 text-steel" />,
      className: 'bg-white text-navy border border-silver',
      descColor: 'text-slate-500'
    },
    {
      id: 4,
      title: 'Direct Strategic Wholesale Pricing',
      description: 'By operating dedicated logistics fleets and direct source yards, we pass volume discounts on to properties and commercial builders.',
      icon: <DollarSign className="h-7 w-7 text-steel" />,
      className: 'bg-white text-navy border border-silver',
      descColor: 'text-slate-500'
    },
    {
      id: 5,
      title: 'Professional Master Builders',
      description: 'All construction works are supervised by senior engineering heads with certifications in state seismic resistance codes and high-rise civil projects.',
      icon: <Hammer className="h-7 w-7 text-teal animate-pulse" />,
      className: 'lg:col-span-2 bg-steel text-white',
      descColor: 'text-slate-200'
    },
    {
      id: 6,
      title: 'Guaranteed On-Schedule Deploy',
      description: 'Our proprietary fleet tracking guarantees deliveries of river sand and bricks directly to your project base on absolute schedules.',
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
