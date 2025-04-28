import React from 'react';

export default function CustomButton({ onClick, children, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      tabIndex={0}
      style={{
        outline: 'none',
        border: '2px solid #005fcc',
        background: '#fff',
        color: '#005fcc',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
      onFocus={e => e.target.style.outline = '3px solid #005fcc'}
      onBlur={e => e.target.style.outline = 'none'}
    >
      {children}
    </button>
  );
}
