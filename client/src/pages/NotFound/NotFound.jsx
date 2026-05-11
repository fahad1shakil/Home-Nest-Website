import { Home, SearchX } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] translate-y-1/2 translate-x-1/4"></div>

      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-primary/10 rounded-[40px] mb-12 transform rotate-12 transition-transform hover:rotate-0 duration-500">
          <SearchX className="w-16 h-16 text-primary" />
        </div>

        <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-neutral/5 mb-[-40px] select-none">
          404
        </h1>
        
        <h2 className="text-4xl md:text-5xl font-black text-neutral mb-6 tracking-tight">
          Page <span className="text-primary italic">Lost</span> in Space
        </h2>
        
        <p className="text-gray-400 font-bold max-w-md mx-auto mb-12 uppercase tracking-widest text-xs leading-loose">
          The property or page you are looking for has either moved to another dimension or never existed in ours.
        </p>

        <Link
          to="/"
          className="btn-premium px-12 py-5 rounded-full flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-primary/30"
        >
          <Home className="w-5 h-5" /> Return to Sanctuary
        </Link>

        <p className="mt-16 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} HomeNest • Premium Real Estate
        </p>
      </div>
    </div>
  );
};

export default NotFound;
