import React from "react";
import { motion } from "framer-motion";

const Welcome = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.section
      id="top"
      className="relative min-h-screen flex items-center justify-center bg-light dark:bg-darkPrimary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-secondary dark:text-darkTertiary font-medium mb-4"
        >
          Welcome to my workspace
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold text-primary dark:text-darkLight mb-6 leading-tight"
        >
          I'm Ryan.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-secondary dark:text-darkTertiary mb-8"
        >
          Crafting elegant solutions and digital experiences.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See My Projects
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-secondary dark:text-darkTertiary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default Welcome;
