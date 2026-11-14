import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  withTagline?: boolean;
}

export function BrandLogo({ className = '', withTagline = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`neckt-logo-link ${className}`}
      aria-label="NECKT — Home"
    >
      <div className="neckt-logo-container">
        <div className="neckt-line" aria-hidden="true" />
        <span className="neckt-brand-text">NECKT</span>
        <div className="neckt-line" aria-hidden="true" />
      </div>
      {withTagline && <span className="neckt-brand-subtag">EXPERIENCES</span>}
    </Link>
  );
}

export default BrandLogo;
