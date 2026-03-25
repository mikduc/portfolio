import React from "react";
import { motion } from "framer-motion";
import Project from "./Project.tsx";

function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.08,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  };

  const projects = [
    {
      url: "https://gitfront.io/r/mikduc/8EqMpXHRpqQk/cpp-chess/",
      name: "Chess Engine",
      description:
        "A full-featured chess game in C++ with AI opponent powered by minimax algorithm and real-time graphics using X11.",
      tags: ["C++", "X11", "OOP", "AI"],
    },
    {
      url: "https://itch.io/jam/gmtk-2025/rate/3779046",
      name: "Kuiper",
      description:
        "An asteroid roundup game crafted for GMTK Game Jam 2025. Use a rope loop to collect asteroids in this creative free-for-all game.",
      tags: ["Game Dev", "Game Jam", "Web"],
    },
    {
      url: "https://github.com/mikduc/Aseptic",
      name: "Data Analysis Pipeline",
      description:
        "Modern Streamlit workspace for profiling and cleaning data with Polars + LLM guidance.",
      tags: ["Python", "Pandas", "Data Science"],
    },
    {
      url: "https://github.com/mikduc/portfolio",
      name: "Portfolio Website",
      description:
        "This site. Built with React, TypeScript, and Tailwind, with dark mode, smooth animations, and just enough personality.",
      tags: ["React", "TypeScript", "Tailwind"],
    },
  ];

  return (
    <motion.section
      id="projects"
      className="min-h-screen snap-start flex items-center bg-light dark:bg-darkPrimary py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.h2
          className="section-title"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          Featured Projects
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-secondary dark:text-darkTertiary max-w-2xl mb-10 leading-relaxed"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          A few things I’ve built across software, games, and data. Some serious, some chaotic, all fun to make.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Project {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Projects;
