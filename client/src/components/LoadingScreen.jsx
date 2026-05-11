import { motion } from "framer-motion";
import logo from "../assets/logo_new.png";
const LoadingScreen = () => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-white overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col items-center z-10"
      >
        <div className="relative mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-24 h-24 border-4 border-gray-100 border-t-[#E91E63] border-b-[#E91E63] rounded-full"
          ></motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              className="w-12 h-12 object-contain"
              alt="logo"
            />
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-black tracking-tighter text-[#0f172a]"
        >
          Home<span className="text-[#E91E63]">Nest</span>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-1 bg-gradient-to-r from-[#E91E63] to-[#FF2D55] mt-4 rounded-full"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-4"
        >
          Personalizing your experience
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
