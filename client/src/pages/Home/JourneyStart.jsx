import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const JourneyStart = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-neutral">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

      <div className="relative z-10 mx-auto text-center px-4">
        <h2 className="text-4xl md:text-7xl font-black mb-6 text-white tracking-tight">
          Your Journey Starts <span className="text-white italic underline decoration-white/30">Here</span>
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-12 text-xl font-medium">
          Whether you’re buying, renting, or selling, HomeNest provides a premium experience to guide you every step of the way.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/register"
            className="px-12 py-5 bg-white text-primary hover:bg-secondary hover:text-white font-black rounded-2xl text-lg shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started Now
          </Link>
          <Link
            to="/all-properties"
            className="px-12 py-5 bg-transparent border-2 border-white text-white hover:bg-white/10 font-black rounded-2xl text-lg transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            Explore Listings <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JourneyStart;
