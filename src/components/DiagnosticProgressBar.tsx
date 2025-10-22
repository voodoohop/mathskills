import type { FC } from "react";
import * as m from "motion/react-m";

export interface DiagnosticProgress {
  current: number;
  total: number;
  correct: number;
  incorrect: number;
}

interface DiagnosticProgressBarProps {
  progress: DiagnosticProgress | null;
  position?: "top" | "bottom";
}

export const DiagnosticProgressBar: FC<DiagnosticProgressBarProps> = ({
  progress,
  position = "top",
}) => {
  const positionClasses =
    position === "top"
      ? "top-0 border-b"
      : "bottom-0 border-t";

  if (!progress) return null;

  const percentage = Math.round((progress.current / progress.total) * 100);
  const filledBlocks = Math.round((progress.current / progress.total) * 20);
  const emptyBlocks = 20 - filledBlocks;

  return (
    <m.div
      initial={{ opacity: 0, y: position === "top" ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 right-0 ${positionClasses} z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-purple-200 dark:border-purple-800/50`}
    >
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 text-sm">
            {/* Question indicator */}
            <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-cyan-400">
              <span className="text-lg">📊</span>
              <span>
                Question {progress.current} of {progress.total}
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-purple-400"
                />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 min-w-[3rem] text-right">
                {percentage}%
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="text-green-600 dark:text-green-400">
                ✓ {progress.correct} correct
              </span>
              <span className="text-gray-400 dark:text-gray-600">|</span>
              <span className="text-red-600 dark:text-red-400">
                ✗ {progress.incorrect} incorrect
              </span>
            </div>
          </div>

          {/* Block-style progress bar (optional, for visual appeal) */}
          <div className="mt-2 flex gap-0.5 justify-center">
            {Array.from({ length: filledBlocks }).map((_, i) => (
              <div
                key={`filled-${i}`}
                className="w-2 h-1 bg-blue-500 dark:bg-cyan-500 rounded-sm"
              />
            ))}
            {Array.from({ length: emptyBlocks }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-2 h-1 bg-gray-300 dark:bg-slate-700 rounded-sm"
              />
            ))}
          </div>
        </div>
      </m.div>
  );
};
