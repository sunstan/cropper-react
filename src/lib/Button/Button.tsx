import styles from './Button.module.css';
import React from 'react';
import Loader from '../Loader';

type Type = 'submit' | 'button';
type Color = 'primary' | 'secondary';
type Variant = 'filled' | 'outlined';

interface Props {
  readonly type?: Type;
  readonly color?: Color;
  readonly loading?: boolean;
  readonly variant?: Variant;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
}

const Button: React.FC<Props> = ({
  type,
  onClick,
  loading,
  children,
  disabled,
  className,
  color = 'primary',
  variant = 'filled',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
       ${className} 
        ${styles.root} 
        ${styles[color]} 
        ${styles[variant]} 
        ${loading ? styles.loading : ''}
        ${disabled ? styles.disabled : ''}`}
    >
      <span className={styles.span}>{children}</span>
      <Loader size='md' className={styles.loader} />
    </button>
  );
};

export default Button;
