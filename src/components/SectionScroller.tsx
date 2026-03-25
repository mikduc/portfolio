import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";

function SectionScroller() {
  const [activeSection, setActiveSection] = useState("top");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const sections = [
    { id: "top", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
    >
      <div className="mx-auto max-w-7xl rounded-md border border-secondary/30 dark:border-darkTertiary/35 bg-light/85 dark:bg-darkPrimary/85 backdrop-blur-lg px-4 md:px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between">
        <button
          onClick={() => scrollToSection("top")}
          className="text-sm md:text-base font-extrabold tracking-[0.08em] uppercase text-primary dark:text-darkLight"
        >
          Ryan Fang
        </button>

        <nav className="hidden md:flex items-center gap-2">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-shadow ${
                  isActive
                    ? "bg-primary text-light dark:bg-darkLight dark:text-darkPrimary"
                    : "text-primary dark:text-darkLight border border-transparent hover:border-secondary/35 dark:hover:border-darkTertiary/40 hover:bg-secondary/10 dark:hover:bg-darkTertiary/20"
                }`}
              >
                {section.label}
              </motion.button>
            );
          })}
        </nav>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-md border border-secondary/30 dark:border-darkTertiary/35 bg-secondary/10 dark:bg-darkTertiary/15 hover:bg-secondary/20 dark:hover:bg-darkTertiary/25 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5 text-accent dark:text-darkAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.06, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-md border border-secondary/30 dark:border-darkTertiary/35 bg-secondary/10 dark:bg-darkTertiary/15 hover:bg-secondary/20 dark:hover:bg-darkTertiary/25 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-accent dark:text-darkAccent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-accent dark:text-darkAccent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 md:hidden grid grid-cols-2 gap-2"
          >
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-all ${
                    isActive
                      ? "bg-primary text-light dark:bg-darkLight dark:text-darkPrimary"
                      : "text-primary dark:text-darkLight bg-secondary/10 dark:bg-darkTertiary/15 border border-secondary/20 dark:border-darkTertiary/30"
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}

export default React.memo(SectionScroller);
