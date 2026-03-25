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
          About Me
        </motion.h2>

        <motion.div
          className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-base md:text-lg text-secondary dark:text-darkLight leading-relaxed">
              I’m a Mathematics student at the University of Waterloo with a focus in Statistics, and I spend most of my time building software. Coursework gives me strong fundamentals, but I learn the most by shipping projects and improving them through iteration.
            </p>
            <p className="text-base md:text-lg text-secondary dark:text-darkLight leading-relaxed">
              I enjoy the full process from early idea to production-ready result. My projects range from React applications and game jam prototypes to Python automation and data workflows.
            </p>
            <p className="text-base md:text-lg text-secondary dark:text-darkLight leading-relaxed">
              Outside of school and coding, I spend time exploring new tools and joining game jams. If you’re building something thoughtful and practical, I’m always open to collaborating.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="card text-center">
                <p className="text-3xl font-bold text-accent dark:text-darkAccent">48h</p>
                <p className="text-xs tracking-wide uppercase text-secondary dark:text-darkTertiary mt-1">Fastest sprint that still worked</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-accent dark:text-darkAccent">3 AM</p>
                <p className="text-xs tracking-wide uppercase text-secondary dark:text-darkTertiary mt-1">Most productive hour</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-accent dark:text-darkAccent">∞</p>
                <p className="text-xs tracking-wide uppercase text-secondary dark:text-darkTertiary mt-1">Tabs open for research</p>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="card"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-lg md:text-xl font-bold text-primary dark:text-darkLight mb-5 tracking-wide uppercase">Skills & Tools</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="chip"
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
