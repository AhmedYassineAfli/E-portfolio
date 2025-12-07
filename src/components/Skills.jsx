import { motion } from "framer-motion";

const skillsData = [
  {
    id: 1,
    title: "The Nebula Inter-University Esports ShowDown 2024",
    description:
      "Participated in Inter-University-level Esport Championship and placed in top 4 Fragging Valorant.",
    image: "/images/nebula.jpg",
  },
  {
    id: 2,
    title: "Android and IOS App Development Workshop Organized by Pick Me",
    description:
      "Participated in a workshop focused on mobile app development trends and modern design architectures hosted by Pick Me.",
    image: "/images/workshop1.jpg",
  },
  {
    id: 3,
    title: "Vortex InterFaculty Esports Tournament 2025",
    description:
      "Organized by Rotract Club of CINEC with CINEC Esports Club and IEEE Student Branch.",
    image: "/images/game2.jpg",
  },
  {
    id: 4,
    title: "Google KeyNote 2024",
    description:
      "Attended Google KeyNote 2024 remotely to explore latest tech innovations and releases.",
    image: "/images/keynote24.jpg",
  },
  {
    id: 5,
    title: "Apple WWDC23",
    description: "Remotely attended Apple's annual Worldwide Developers Conference in 2023.",
    image: "/images/WWDC23.jpg",
  },
  {
    id: 6,
    title: "Apple WWDC24",
    description: "Joined Apple WWDC24 remotely to stay updated on Apple’s latest technologies.",
    image: "/images/WWDC24.jpg",
  },
  {
    id: 7,
    title: "Google KeyNote 2025",
    description:
      "Participated in Google KeyNote 2025 remotely for tech news and product updates.",
    image: "/images/keynote25.jpg",
  },
];

function Skills() {
  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-12" id="education">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center font-Nunito">
          Education
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-center">
          {[
            {
              id: 1,
              title: "Institut supérieur des études technologiques de Radès",
              description: "Licence en Developpement des systemes d'informations\n2023-2026",
              image: "/images/iset_rades.png",
            }
          ].map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#111] rounded-2xl p-4 shadow-md hover:shadow-pink-500/50 border border-transparent hover:border-pink-500 transition-all duration-300 flex flex-col"
            >
              <img
                src={skill.image}
                alt={skill.title}
                className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-pink-400">
                {skill.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 whitespace-pre-line">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
