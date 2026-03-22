import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import SectionScroller from "./SectionScroller.tsx";
import Welcome from "./Welcome.tsx";
import About from "./About.tsx";
import Projects from "./Projects.tsx";
import Journal from "./Journal.tsx";
import Contact from "./Contact.tsx";

function App() {
  const isDark = useThemeStore((state) => state.isDark);
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="relative min-h-screen bg-light dark:bg-darkPrimary text-primary dark:text-darkLight transition-colors duration-300 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isJournalOpen ? (
          <motion.div
            key="journal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Journal onClose={() => setIsJournalOpen(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-secondary/20 dark:bg-darkTertiary/20 blur-3xl" />
            <div className="pointer-events-none absolute top-[40%] -right-32 h-96 w-96 rounded-full bg-tertiary/60 dark:bg-darkSecondary/30 blur-3xl" />

            <SectionScroller />

            <main className="relative z-10 snap-y snap-mandatory">
              <Welcome />
              <About />
              <Projects />
              <Contact onOpenJournal={() => setIsJournalOpen(true)} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
