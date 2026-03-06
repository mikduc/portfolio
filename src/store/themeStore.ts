import { create } from 'zustand';

type ThemeStore = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark',
  toggleTheme: () => set((state) => {
    const newDark = !state.isDark;
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    if (typeof document !== 'undefined') {
      if (newDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    return { isDark: newDark };
  }),
}));
