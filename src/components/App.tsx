import React, { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";
import Welcome from "./Welcome.tsx";
import About from "./About.tsx";
import Projects from "./Projects.tsx";
import Contact from "./Contact.tsx";

function App() {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-light dark:bg-darkPrimary text-primary dark:text-darkLight transition-colors duration-300">
      <Welcome />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
