import { motion } from "framer-motion";
import {
  SiGithub,
  SiLinkedin,
} from "react-icons/si";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white py-13 px-1"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Left - Name & Copyright */}
        <div>
          <h4 className="text-xl font-semibold font-Signika">Ahmed Yassine Afli</h4>
          <p className="text-sm text-gray-400 mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right - Social Links */}
        <div className="flex gap-5 text-2xl justify-center sm:justify-end">
          <motion.a
            href="https://github.com/AhmedYassineAfli"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
            whileHover={{ scale: 1.2 }}
          >
            <SiGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/ahmed-yassine-afli-884343339"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            whileHover={{ scale: 1.2 }}
          >
            <SiLinkedin />
          </motion.a>
          <motion.a
            href="mailto:ahmedyassineafli94@gmail.com"
            className="hover:text-red-400 transition"
            whileHover={{ scale: 1.2 }}
          >
            <MdEmail />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
