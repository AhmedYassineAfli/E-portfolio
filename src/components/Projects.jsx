import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import ProjectModal from "./ProjectModal";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Gestion-Ordonnance",
    description: "Application mobile cross-plateforme de gestion d'ordonnances médicales.",
    image: "/images/project1.jpg",
    github: "https://github.com/AhmedYassineAfli/Gestion-Ordonnance",
    live: "#",
    technologies: ["React Native"],
  },
  {
    id: 2,
    title: "E-commerce System",
    description: "A modern, full-stack e-commerce solution built with Spring Boot and Angular.",
    image: "/images/zenflow.png",
    github: "https://github.com/AhmedYassineAfli/E-commerce",
    live: "#",
    technologies: ["Spring Boot", "Angular", "MySQL"],
  },
  {
    id: 3,
    title: "MecanoTun",
    description: "Automobile repair shop management system for customers and mechanics.",
    image: "/images/Petcare.png",
    github: "https://github.com/AhmedYassineAfli/MecanoTun",
    live: "#",
    technologies: ["Vue.js", "Spring Boot", "MySQL"],
  },
  {
    id: 4,
    title: "Gestion de Réservation Terrain",
    description: "Platform for managing field reservations developed with PHP.",
    image: "/images/Eportfolio.png",
    github: "https://github.com/AhmedYassineAfli/Foot",
    live: "#",
    technologies: ["PHP", "JavaScript", "MySQL"],
  },
  {
    id: 5,
    title: "SmartBeeHouse",
    description: "Smart Bee House Management System developed with Java.",
    image: "/images/Heritscope.jpg",
    github: "https://github.com/AhmedYassineAfli/SmartBeeHouse",
    live: "#",
    technologies: ["Java", "IoT", "MySQL"],
  },
  {
    id: 6,
    title: "E-Commerce Bibliothèque",
    description: "Online library store built with Twig and PHP.",
    image: "/images/Bookshop.jpg",
    github: "https://github.com/AhmedYassineAfli/E-Commerce-Biblioth-que",
    live: "#",
    technologies: ["PHP", "Twig", "MySQL"],
  },
];

function Projects() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Card width + gap in px (adjust if styling changes)
  const cardWidth = 280 + 16;

  // Scroll container reference
  const container = scrollRef.current;

  // Update arrow button visibility & current slide index
  const updateScrollState = () => {
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);

    // Calculate current index based on scrollLeft
    const index = Math.round(container.scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  // Scroll left or right by one card
  const scroll = (direction) => {
    if (!container) return;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Handle manual scroll events
  const onScroll = () => {
    updateScrollState();
  };

  // Pause autoplay on hover or drag start
  const onMouseEnter = () => setIsAutoplayPaused(true);
  const onMouseLeave = () => {
    if (!isDragging) setIsAutoplayPaused(false);
  };

  // Handle drag start / end
  const onDragStart = () => {
    setIsDragging(true);
    setIsAutoplayPaused(true);
  };
  const onDragEnd = (event, info) => {
    setIsDragging(false);

    // Swipe velocity threshold for snapping
    const velocityX = info.velocity.x;
    if (!container) return;

    if (velocityX > 300) {
      // swipe right -> scroll left
      scroll("left");
    } else if (velocityX < -300) {
      // swipe left -> scroll right
      scroll("right");
    } else {
      // snap to nearest card
      const scrollLeft = container.scrollLeft;
      const nearestIndex = Math.round(scrollLeft / cardWidth);
      container.scrollTo({ left: nearestIndex * cardWidth, behavior: "smooth" });
      setCurrentIndex(nearestIndex);
    }

    setIsAutoplayPaused(false);
  };

  // Autoplay scrolling every 4 seconds if not paused
  useEffect(() => {
    if (!container) return;

    if (isAutoplayPaused) return;

    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        setCurrentIndex(0);
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [container, isAutoplayPaused, cardWidth]);

  return (
    <section
      className="bg-[#0f0f0f] text-white py-16 px-4 sm:px-6 md:px-8 lg:px-12"
      id="projects"
    >
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center font-Nunito">
          My Projects
        </h2>

        {/* Mobile carousel */}
        <div
          className="block sm:hidden relative"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-700 bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 z-20"
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Scroll container with drag */}
          <motion.div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-snap-x scroll-pl-4 scroll-pt-2"
            onScroll={onScroll}
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            dragMomentum={false}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="min-w-[280px] max-w-[280px] bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 scroll-snap-align-start flex flex-col"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-pink-400">{project.title}</h3>
                  <p className="text-sm text-gray-300 mt-2 flex-grow">{project.description}</p>
                  <div className="flex gap-4 text-xl mt-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-400"
                      aria-label={`${project.title} GitHub`}
                    >
                      <FaGithub />
                    </a>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="hover:text-green-400 focus:outline-none"
                      aria-label={`View details for ${project.title}`}
                    >
                      <FaExternalLinkAlt />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-700 bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 z-20"
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          )}

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!container) return;
                  container.scrollTo({ left: i * cardWidth, behavior: "smooth" });
                  setCurrentIndex(i);
                }}
                className={`w-3 h-3 rounded-full ${currentIndex === i ? "bg-purple-600" : "bg-gray-600"
                  }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid layout */}
        <div className="hidden sm:grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-700 transition-shadow duration-300 flex flex-col"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-pink-400">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4 flex-grow">{project.description}</p>
                <div className="flex gap-5 text-xl mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-400"
                    aria-label={`${project.title} GitHub`}
                  >
                    <FaGithub />
                  </a>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="hover:text-green-400 focus:outline-none transition-colors"
                    aria-label={`View details for ${project.title}`}
                  >
                    <FaExternalLinkAlt />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section >
  );
}

export default Projects;
