import React from "react";
import { motion } from "framer-motion";

function About() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55 },
    },
  };

  const skills = [
    "React",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "SQL",
    "Data Analysis",
    "Machine Learning",
  ];

  return (
    <motion.section
      id="about"
      className="min-h-screen snap-start flex items-center bg-light dark:bg-darkPrimary py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.h2
          className="section-title"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-secondary dark:text-darkLight leading-relaxed">
              I'm a mathematician and developer passionate about solving complex problems through code. Currently studying Mathematics with a Statistics focus at the University of Waterloo, but my real education comes from building projects and experimenting with new technologies.
            </p>
            <p className="text-lg text-secondary dark:text-darkLight leading-relaxed">
              I love the entire creative process—from conceptualizing ideas to shipping polished products. Whether it's building interactive web applications with React, prototyping games in game jams, or analyzing data with Python, I'm drawn to work that's both technically sound and thoughtfully designed.
            </p>
            <p className="text-lg text-secondary dark:text-darkLight leading-relaxed">
              When I'm not coding, you'll find me exploring new frameworks, participating in game jams, or gaming. I'm always up for collaborating on interesting projects—reach out if you'd like to build something together.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="card dark:bg-darkSecondary border border-secondary/15 dark:border-darkTertiary/25 text-center">
                <p className="text-3xl font-bold text-accent dark:text-darkAccent">4+</p>
                <p className="text-sm text-secondary dark:text-darkTertiary mt-1">Core Languages</p>
              </div>
              <div className="card dark:bg-darkSecondary border border-secondary/15 dark:border-darkTertiary/25 text-center">
                <p className="text-3xl font-bold text-accent dark:text-darkAccent">3</p>
                <p className="text-sm text-secondary dark:text-darkTertiary mt-1">Disciplines</p>
              </div>
              <div className="card dark:bg-darkSecondary border border-secondary/15 dark:border-darkTertiary/25 text-center">
                <p className="text-3xl font-bold text-accent dark:text-darkAccent">∞</p>
                <p className="text-sm text-secondary dark:text-darkTertiary mt-1">Curiosity</p>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="card dark:bg-darkSecondary border border-secondary/20 dark:border-darkTertiary/30 rounded-2xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-primary dark:text-darkLight mb-5">Skills & Tools</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="px-4 py-2 rounded-full bg-secondary/15 dark:bg-darkTertiary/25 text-primary dark:text-darkLight font-semibold"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;
