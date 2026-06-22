import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { SiTiktok, SiSnapchat } from "react-icons/si";
import { useInView } from "react-intersection-observer";

function Contact() {
  const { ref, inView } = useInView({ threshold: 0.4 });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          relative z-10 
          w-full max-w-lg  /* max width for bigger phones/tablets */
          bg-black/60 backdrop-blur-md 
          p-6 sm:p-8 rounded-3xl 
          shadow-lg border border-purple-500 neon-border
          text-white
          flex flex-col
          "
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Contact Me
        </h2>

        {/* Name */}
        <p className="text-center text-lg sm:text-xl text-purple-300 mb-6">
          Ahmed Yassine Afli
        </p>

        <div className="space-y-5 text-base sm:text-lg">
          <div className="flex items-start sm:items-center gap-4">
            <FaMapMarkerAlt className="text-pink-400 text-2xl flex-shrink-0 mt-[3px]" />
            <div className="leading-snug">
              <p>Ben Arous, Tunis</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-green-400 text-2xl flex-shrink-0" />
            <a
              href="tel:+21693615609"
              className="hover:text-green-300 transition break-all"
            >
              +216 93 615 609
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-yellow-400 text-2xl flex-shrink-0" />
            <a
              href="mailto:ahmedyassineafli94@gmail.com"
              className="hover:text-yellow-300 transition break-all"
            >
              ahmedyassineafli94@gmail.com
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-6 text-3xl">
            <a
              href="https://github.com/AhmedYassineAfli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/ahmed-yassine-afli-884343339"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/yaaaasssiiiinneee/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Neon border animation */}
      <style jsx>{`
        .neon-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          padding: 2px;
          background: linear-gradient(
            45deg,
            #ff00cc,
            #3333ff,
            #00ffcc,
            #ffcc00,
            #ff00cc
          );
          background-size: 300% 300%;
          animation: neon-border-animation 6s ease infinite;
          z-index: -1;
          mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: destination-out;
        }

        @keyframes neon-border-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;
