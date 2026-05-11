import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/logo_new.png";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-2xl shadow-xl shadow-white/5">
              <img src={logo} className="w-10 h-10 object-contain" alt="logo" />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tighter">
              HomeNest
            </span>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed font-medium">
            Elevating your real estate experience with modern technology and personalized service.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary">Discover</h3>
          <ul className="space-y-4 text-gray-400 font-bold">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/all-properties" className="hover:text-white transition-colors">All Properties</Link></li>
            <li><Link to="/buy" className="hover:text-white transition-colors">Buy Property</Link></li>
            <li><Link to="/rent" className="hover:text-white transition-colors">Rent Property</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary">Company</h3>
          <ul className="space-y-4 text-gray-400 font-bold">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary">Get in Touch</h3>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Email Us</p>
                <a href="mailto:fahad1shakil@gmail.com" className="text-sm font-bold hover:text-primary transition-colors">
                  fahad1shakil@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Call Us</p>
                <a href="tel:+8801700000000" className="text-sm font-bold hover:text-secondary transition-colors">
                  +880 1700 000 000
                </a>
              </div>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: <Facebook className="w-4 h-4" />, url: "https://www.facebook.com/fahad2shakil" },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, url: "https://x.com/fahad11shakil" },
                { icon: <Github className="w-4 h-4" />, url: "https://github.com/fahad1shakil" },
                { icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/fahad1shakil/" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-white/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center pt-8 border-t border-white/5">
        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} <span className="text-white">HomeNest</span> — Developed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x px-2 py-1 bg-[length:200%_auto] font-black italic text-lg">Fahad Shakil</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
