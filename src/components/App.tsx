import React, { useState, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionScroller from "./SectionScroller.tsx";
import Welcome from "./Welcome.tsx";

// Lazy load components to reduce initial bundle
const About = React.lazy(() => import("./About.tsx"));
const Projects = React.lazy(() => import("./Projects.tsx"));
const Journal = React.lazy(() => import("./Journal.tsx"));
const Contact = React.lazy(() => import("./Contact.tsx"));

// Loading fallback component
const LoadingPlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center opacity-0" aria-hidden="true" />
);

function App() {
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-light dark:bg-darkPrimary text-primary dark:text-darkLight transition-colors duration-500 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isJournalOpen ? (
          <motion.div
            key="journal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense fallback={<LoadingPlaceholder />}>
              <Journal onClose={() => setIsJournalOpen(false)} />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionScroller />
            <main className="relative z-10 snap-y snap-mandatory">
              <Welcome />
              <Suspense fallback={<LoadingPlaceholder />}>
                <About />
              </Suspense>
              <Suspense fallback={<LoadingPlaceholder />}>
                <Projects />
              </Suspense>
              <Suspense fallback={<LoadingPlaceholder />}>
                <Contact onOpenJournal={() => setIsJournalOpen(true)} />
              </Suspense>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
