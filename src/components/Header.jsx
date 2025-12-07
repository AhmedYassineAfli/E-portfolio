import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Header({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Home", "Projects", "Skills", "Contact"];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black to-black shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="relative">
          <motion.h1
            className="text-lg sm:text-2xl text-white font-Pacifico tracking-wide neon-text"
            whileHover={{ scale: 1.05 }}
          >
            Welcome to My Portfolio
          </motion.h1>

          {/* Animated SVG Sparkle */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 10"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.circle
              r="0.5"
              fill="cyan"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            >
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath xlinkHref="#snakePath" />
              </animateMotion>
            </motion.circle>
            <path
              id="snakePath"
              d="M 5 5 Q 10 0, 20 5 Q 30 10, 40 5 Q 50 0, 60 5 Q 70 10, 80 5 Q 90 0, 95 5"
              fill="transparent"
              stroke="transparent"
            />
          </svg>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => {
            const lower = item.toLowerCase();
            return (
              <motion.a
                key={item}
                href={`#${lower}`}
                className={`text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeSection === lower
                    ? "text-yellow-300 scale-110 underline underline-offset-4"
                    : "text-purple-400 hover:text-yellow-100"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            );
          })}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-br from-black via-blue-800 to-purple-600 px-4 pb-4 pt-2"
          >
            <ul className="space-y-3">
              {navItems.map((item) => {
                const lower = item.toLowerCase();
                return (
                  <li key={item}>
                    <a
                      href={`#${lower}`}
                      onClick={() => setIsOpen(false)}
                      className={`block text-base sm:text-lg font-medium transition ${
                        activeSection === lower
                          ? "text-yellow-200"
                          : "text-white hover:text-yellow-100"
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
