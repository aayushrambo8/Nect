import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  withTagline?: boolean;
  subtag?: string;
  href?: string;
}

export function BrandLogo({
  className = '',
  withTagline = false,
  subtag,
  href = '/',
}: BrandLogoProps) {
  const displayTag = subtag || (withTagline ? 'EXPERIENCES' : null);

  return (
    <Link
      href={href}
      className={`neckt-logo-link ${className}`}
      aria-label="NECKT — Home"
    >
      <div className="neckt-logo-container">
        <div className="neckt-line" aria-hidden="true" />
        <span className="neckt-brand-text">NECKT</span>
        <div className="neckt-line" aria-hidden="true" />
      </div>
      {displayTag && <span className="neckt-brand-subtag">{displayTag}</span>}
    </Link>
  );
}

export default BrandLogo;
