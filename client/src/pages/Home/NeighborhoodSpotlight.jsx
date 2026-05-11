import { MapPin } from "lucide-react";

const NeighborhoodSpotlight = () => {
  const cities = [
    {
      id: 1,
      name: "Dhaka",
      avgPrice: "$ 45,000/mo",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Chittagong",
      avgPrice: "$ 38,000/mo",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Sylhet",
      avgPrice: "$ 28,000/mo",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0f172a] transition-colors">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-neutral dark:text-white mb-3">
          Neighborhood Spotlight
        </h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          Explore some of the most desirable neighborhoods to live, invest, or
          rent in Bangladesh.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <div
              key={city.id}
              className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                <MapPin className="w-8 h-8 mb-2 text-secondary" />
                <h3 className="text-3xl font-black mb-1 uppercase tracking-wider">{city.name}</h3>
                <p className="text-white font-bold opacity-80 uppercase tracking-widest text-xs">
                  Avg. {city.avgPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodSpotlight;
