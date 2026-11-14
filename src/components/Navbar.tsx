'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface NavLinkItem {
  label: string;
  path: string;
}

const navLinks: NavLinkItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Moments', path: '/moments' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    if (pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`neckt-navbar ${isScrolled ? 'neckt-navbar--scrolled' : ''}`}
        role="banner"
      >
        <div className="neckt-navbar__container">
          {/* Brand Logo */}
          <div className="neckt-navbar__brand">
            <BrandLogo />
          </div>

          {/* Desktop Navigation */}
          <nav className="neckt-navbar__nav" aria-label="Main Navigation">
            <ul className="neckt-navbar__list">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.path} className="neckt-navbar__item">
                    <Link
                      href={link.path}
                      className={`neckt-navbar__link ${isActive ? 'neckt-navbar__link--active' : ''}`}
                      onClick={() => handleLinkClick(link.path)}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="neckt-navbar__indicator" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="neckt-navbar__actions">
            <Link
              href="/events"
              onClick={() => handleLinkClick('/events')}
              className="neckt-btn neckt-btn--nav"
              id="nav-explore-cta"
            >
              <span>Explore Events</span>
              <ArrowRight size={14} className="neckt-btn__arrow" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="neckt-navbar__toggle"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`neckt-mobile-drawer ${mobileMenuOpen ? 'neckt-mobile-drawer--open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="neckt-mobile-drawer__overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="neckt-mobile-drawer__content">
          <div className="neckt-mobile-drawer__header">
            <BrandLogo />
            <button
              type="button"
              className="neckt-mobile-drawer__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="neckt-mobile-drawer__nav">
            <ul className="neckt-mobile-drawer__list">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.path} className="neckt-mobile-drawer__item">
                    <Link
                      href={link.path}
                      className={`neckt-mobile-drawer__link ${isActive ? 'neckt-mobile-drawer__link--active' : ''}`}
                      onClick={() => handleLinkClick(link.path)}
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={16} className="neckt-mobile-drawer__arrow" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="neckt-mobile-drawer__footer">
            <Link
              href="/events"
              className="neckt-btn neckt-btn--primary neckt-btn--full"
              onClick={() => handleLinkClick('/events')}
            >
              <span>Explore Events</span>
              <ArrowRight size={16} />
            </Link>

            <div className="neckt-mobile-drawer__meta">
              <span className="neckt-mobile-drawer__city">PAN INDIA</span>
              <a href="mailto:hello@neckt.in" className="neckt-mobile-drawer__email">
                hello@neckt.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
