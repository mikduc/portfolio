import React from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";

function Navbar() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const navItems = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-light dark:bg-darkPrimary shadow-md transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-accent"
          >
            RF
          </motion.div>

          {/* Nav Links */}
          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="nav-link text-xs md:text-sm font-medium whitespace-nowrap"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Theme Toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-secondary dark:bg-darkTertiary text-light dark:text-darkPrimary hover:opacity-80 transition-opacity"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 14a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm8-4a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0zm-2.46-7.12a1 1 0 00-1.33-1.33l-1.83 1.83a1 1 0 001.41 1.41l1.83-1.83zM7 11a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0zm7.71-.29a1 1 0 00-1.41 0l-1.83 1.83a1 1 0 001.41 1.41l1.83-1.83a1 1 0 000-1.41zM9 5a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </motion.button>
        </div>


      </div>
    </motion.nav>
  );
}

export default Navbar;
