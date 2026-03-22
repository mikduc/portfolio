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
              I’m a math student at Waterloo (Statistics focus) who spends a lot of time building software. Classes help, but most of my learning comes from making things, breaking them, and then figuring out why they broke.
            </p>
            <p className="text-lg text-secondary dark:text-darkLight leading-relaxed">
              I enjoy the whole process, from rough idea to shipped project. One week it’s a React app, the next it’s a game jam prototype, and sometimes it’s a Python script that saves me from spreadsheet pain.
            </p>
            <p className="text-lg text-secondary dark:text-darkLight leading-relaxed">
              When I’m not coding, I’m usually exploring new tools, joining game jams, or pretending one more match counts as “research.” If you’re building something interesting, I’m always up for collaborating.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="card dark:bg-darkSecondary border border-secondary/15 dark:border-darkTertiary/25 text-center">
                <p className="text-3xl font-bold text-accent dark:text-darkAccent">48h</p>
                <p className="text-sm text-secondary dark:text-darkTertiary mt-1">Fastest project sprint that still worked</p>
              </div>
              <div className="card dark:bg-darkSecondary border border-secondary/15 dark:border-darkTertiary/25 text-center">
                <p className="text-3xl font-bold text-accent dark:text-darkAccent">3 AM</p>
                <p className="text-sm text-secondary dark:text-darkTertiary mt-1">Most suspiciously productive hour</p>
              </div>
              <div className="card dark:bg-darkSecondary border border-secondary/15 dark:border-darkTertiary/25 text-center">
                <p className="text-3xl font-bold text-accent dark:text-darkAccent">∞</p>
                <p className="text-sm text-secondary dark:text-darkTertiary mt-1">Tabs open while "doing research"</p>
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
