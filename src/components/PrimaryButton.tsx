import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  ariaLabel?: string;
}

export function PrimaryButton({
  onClick,
  children,
  variant = 'primary',
  ariaLabel,
}: PrimaryButtonProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'danger':
        return '#ef4444';
      case 'secondary':
        return '#e5e7eb';
      default:
        return '#3b82f6';
    }
  };

  const getTextColor = () => {
    return variant === 'secondary' ? '#374151' : 'white';
  };

  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        background: getBackgroundColor(),
        color: getTextColor(),
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
