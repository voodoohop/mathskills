import { useDarkMode } from '@/hooks/useDarkMode';
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle() {
  const { isDark, toggle, mounted } = useDarkMode();

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="rounded-lg p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5 text-slate-600" />
      )}
    </button>
  );
}
