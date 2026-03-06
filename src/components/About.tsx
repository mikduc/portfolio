import React from "react";
import { motion } from "framer-motion";

function About() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
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
      className="section bg-light dark:bg-darkPrimary"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="section-title text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
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
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="card text-center py-6 dark:bg-darkTertiary"
              >
                <span className="font-semibold text-accent dark:text-darkLight text-lg">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;
