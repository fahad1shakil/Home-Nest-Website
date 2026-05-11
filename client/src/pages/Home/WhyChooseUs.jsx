import { BadgeCheck, Building2, Users } from "lucide-react";

const WhyChooseUs = () => {
  const items = [
    {
      id: 1,
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Expert Agents",
      desc: "Our certified agents are here to guide you through every step of the process.",
    },
    {
      id: 2,
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: "Vast Selection",
      desc: "Browse thousands of curated listings updated daily to find your perfect match.",
    },
    {
      id: 3,
      icon: <BadgeCheck className="w-8 h-8 text-primary" />,
      title: "Simple Process",
      desc: "We simplify the paperwork and negotiations so you can move in faster.",
    },
  ];

  return (
    <section className="pt-12 pb-24 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">Core Values</h2>
        <h1 className="text-4xl md:text-6xl font-black text-neutral dark:text-white mb-16">
          Why <span className="text-secondary italic">HomeNest?</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-50 dark:border-slate-800 group"
            >
              <div className="bg-primary/10 p-6 rounded-2xl mb-6 transform group-hover:rotate-12 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-neutral dark:text-white mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
