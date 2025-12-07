import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-3xl bg-[#1a1a1a] rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-purple-600/80 rounded-full transition-all duration-300"
                    >
                        <FaTimes size={20} />
                    </button>

                    <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent md:bg-gradient-to-r" />
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                                {project.title}
                            </h2>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies?.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-900/30 border border-purple-500/20 rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-4 mb-8 text-gray-300 leading-relaxed">
                                <p>{project.description}</p>
                                {/* We can add more detailed description here if available in the future */}
                                <p className="text-sm text-gray-400 italic">
                                    Click the links below to view the source code or live demo.
                                </p>
                            </div>

                            <div className="mt-auto flex gap-4">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-500"
                                >
                                    <FaGithub size={20} />
                                    <span>GitHub</span>
                                </a>
                                {/* Only show live link if it's not a hash or placeholder */}
                                {project.live && project.live !== "#" && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-900/30 transition-all duration-300"
                                    >
                                        <FaExternalLinkAlt size={18} />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
