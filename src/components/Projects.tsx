import React from "react";
import { motion } from "framer-motion";
import Project from "./Project.tsx";

function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const projects = [
    {
      url: "https://gitfront.io/r/treblabin/KNgFrk3qtsHe/cpp-chess/",
      img: "../images/chess.png",
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
      url: "https://github.com/mikduc",
      name: "Data Analysis Pipeline",
      description:
        "A Python-based pipeline for processing large datasets with Pandas and generating insights through Matplotlib visualizations.",
      tags: ["Python", "Pandas", "Data Science"],
    },
    {
      url: "https://github.com/mikduc",
      name: "Portfolio Website",
      description:
        "This site—built with React, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and fully responsive design.",
      tags: ["React", "TypeScript", "Tailwind"],
    },
  ];

  return (
    <motion.section
      id="projects"
      className="section bg-light dark:bg-darkPrimary"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
