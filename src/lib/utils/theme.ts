import { browser } from '$app/environment';

export function setTheme() {
  if (browser) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }
}
