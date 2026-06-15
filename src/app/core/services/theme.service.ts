import { effect, Service, signal } from '@angular/core';

/**
 * Toggles and manages the dark mode theme setting.
 */
@Service()
export class ThemeService {
  isDarkMode = signal<boolean>(localStorage.getItem('theme') !== 'light');

  constructor() {
    effect(() => {
      const darkState = this.isDarkMode();
      const element = document.documentElement;

      if (darkState) {
        element.classList.add('dark', 'p-dark');
        localStorage.setItem('theme', 'dark');
      } else {
        element.classList.remove('dark', 'p-dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update((prev) => !prev);
  }
}
