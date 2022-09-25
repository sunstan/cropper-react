import React from 'react';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  readonly size?: Size;
  readonly className?: string;
}

const Loader: React.FC<Props> = ({ size = 'sm', className }) => {
  return (
    <div className={`
      text-current
      ${className}
      ${size === 'xs' ? 'w-3 h-3' : ''}
      ${size === 'sm' ? 'w-4 h-4' : ''}
      ${size === 'md' ? 'w-6 h-6' : ''}
      ${size === 'lg' ? 'w-10 h-10' : ''}
      ${size === 'xl' ? 'w-16 h-16' : ''}
    `}>
      <svg className='animate-rotate' viewBox='25 25 50 50'>
        <circle
          r='20'
          cx='50'
          cy='50'
          fill='none'
          className='animate-dash stroke-current'
          strokeMiterlimit='10'
          strokeWidth={`
            ${size === 'xs' ? '8' : ''}
            ${size === 'sm' ? '7' : ''}
            ${size === 'md' ? '6' : ''}
            ${size === 'lg' ? '5' : ''}
            ${size === 'xl' ? '4' : ''}
          `} />
      </svg>
    </div>
  );
};

export default Loader;
