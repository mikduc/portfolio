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
      className="relative min-h-screen snap-start flex items-center bg-light dark:bg-darkPrimary pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.p
              variants={itemVariants}
              className="inline-flex items-center rounded-full bg-secondary/10 dark:bg-darkTertiary/20 px-4 py-2 text-sm md:text-base text-secondary dark:text-darkTertiary font-semibold mb-5"
            >
              Mathematics @ University of Waterloo
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary dark:text-darkLight leading-[1.05]"
            >
              Ryan Fang
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-2xl text-secondary dark:text-darkTertiary max-w-2xl"
            >
              Building thoughtful products through clean engineering, creative design, and strong problem solving.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex gap-4 flex-wrap">
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="card dark:bg-darkSecondary rounded-2xl p-7 border border-secondary/20 dark:border-darkTertiary/30"
          >
            <p className="text-sm font-semibold tracking-wide uppercase text-secondary dark:text-darkTertiary mb-4">
              Quick Snapshot
            </p>
            <div className="space-y-5">
              <div>
                <p className="text-sm text-secondary dark:text-darkTertiary">Focus</p>
                <p className="text-lg font-semibold text-primary dark:text-darkLight">Frontend Engineering & Data-Oriented Development</p>
              </div>
              <div>
                <p className="text-sm text-secondary dark:text-darkTertiary">Stack</p>
                <p className="text-lg font-semibold text-primary dark:text-darkLight">React, TypeScript, Python, C++</p>
              </div>
              <div>
                <p className="text-sm text-secondary dark:text-darkTertiary">Strength</p>
                <p className="text-lg font-semibold text-primary dark:text-darkLight">From concept to polished implementation</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
