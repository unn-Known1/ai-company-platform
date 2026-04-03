import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', style, ...props }) => {
  const baseStyle: React.CSSProperties = {
    padding: size === 'sm' ? '0.25rem 0.5rem' : size === 'lg' ? '0.75rem 1.5rem' : '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: '#2563eb', color: 'white' },
    secondary: { backgroundColor: '#f3f4f6', color: '#374151' },
    danger: { backgroundColor: '#dc2626', color: 'white' },
  };

  return <button style={{ ...baseStyle, ...variantStyles[variant], ...style }} {...props} />;
};

export default Button;
