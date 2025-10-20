import { useDarkMode } from '@/hooks/useDarkMode';
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle() {
  const { isDark, toggle, mounted } = useDarkMode();

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="rounded-lg p-2 hover:bg-muted transition-colors"
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
    </button>
  );
}
