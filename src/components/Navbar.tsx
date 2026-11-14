'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, LogOut, Shield, Music, UserCheck, KeyRound } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useCreatorAuth } from '../context/CreatorAuthContext';

interface NavLinkItem {
  label: string;
  path: string;
  badge?: string;
}

const CREATOR_UNAUTH_LINKS: NavLinkItem[] = [
  { label: 'Backstage Portal', path: '/' },
  { label: 'Sample Logins', path: '/#samples' },
  { label: 'Events Hub', path: '/events' },
  { label: 'About', path: '/about' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, effectiveRole, isAuthenticated, logout } = useCreatorAuth();

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

  // Build role-specific navigation for authenticated portal users
  const getAuthenticatedCreatorLinks = (): NavLinkItem[] => {
    const base = [{ label: 'Dashboard', path: '/creators/dashboard' }];

    if (effectiveRole === 'creator') {
      return [
        ...base,
        { label: 'My Gigs', path: '/creators/dashboard?tab=gigs' },
        { label: 'Track Drops', path: '/creators/dashboard?tab=submissions' },
        { label: 'Rider Specs', path: '/creators/dashboard?tab=rider' },
        { label: 'Media Vault', path: '/creators/dashboard?tab=media' },
      ];
    }

    if (effectiveRole === 'employee') {
      return [
        ...base,
        { label: 'Review Queue', path: '/creators/dashboard?tab=queue' },
        { label: 'Artist Roster', path: '/creators/dashboard?tab=roster' },
        { label: 'Stage Ops', path: '/creators/dashboard?tab=checklist' },
      ];
    }

    if (effectiveRole === 'admin') {
      return [
        ...base,
        { label: 'Executive Hub', path: '/creators/dashboard?tab=hub' },
        { label: 'User Directory', path: '/creators/dashboard?tab=users' },
        { label: 'Stage Oversight', path: '/creators/dashboard?tab=checklist' },
        { label: 'Sound Permits', path: '/creators/dashboard?tab=audits' },
      ];
    }

    return base;
  };

  const currentNavLinks = isAuthenticated
    ? getAuthenticatedCreatorLinks()
    : CREATOR_UNAUTH_LINKS;

  const getRoleIcon = () => {
    if (effectiveRole === 'admin') return <Shield size={12} />;
    if (effectiveRole === 'employee') return <UserCheck size={12} />;
    return <Music size={12} />;
  };

  return (
    <>
      <header
        className={`neckt-navbar ${isScrolled ? 'neckt-navbar--scrolled' : ''}`}
        role="banner"
      >
        <div className="neckt-navbar__container">
          {/* Brand Logo with Creator Portal Badge */}
          <div className="neckt-navbar__brand">
            <BrandLogo
              subtag="CREATORS // BACKSTAGE"
              href="/"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="neckt-navbar__nav" aria-label="Main Navigation">
            <ul className="neckt-navbar__list">
              {currentNavLinks.map((link) => {
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

          {/* Desktop CTA / User Profile Bar */}
          <div className="neckt-navbar__actions">
            {isAuthenticated && user ? (
              <div className="neckt-portal-user-bar">
                <div className="neckt-user-pill">
                  <span className="neckt-user-pill__icon">{getRoleIcon()}</span>
                  <span className="neckt-user-pill__name">
                    {user.stageName || user.name.split(' ')[0]}
                  </span>
                  <span className={`neckt-role-tag neckt-role-tag--${effectiveRole}`}>
                    {effectiveRole?.toUpperCase()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="neckt-btn-icon"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <div className="neckt-portal-guest-actions">
                <Link
                  href="/creators/login"
                  className="neckt-btn neckt-btn--primary neckt-btn--nav"
                  id="nav-creator-login-cta"
                >
                  <KeyRound size={13} />
                  <span>Backstage Login</span>
                  <ArrowRight size={13} className="neckt-btn__arrow" />
                </Link>
              </div>
            )}

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
            <BrandLogo
              subtag="CREATORS // BACKSTAGE"
              href="/"
            />
            <button
              type="button"
              className="neckt-mobile-drawer__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {isAuthenticated && user && (
            <div className="neckt-mobile-drawer__user-summary">
              <div className="neckt-user-pill">
                <span className="neckt-user-pill__icon">{getRoleIcon()}</span>
                <span className="neckt-user-pill__name">{user.name}</span>
                <span className={`neckt-role-tag neckt-role-tag--${effectiveRole}`}>
                  {effectiveRole?.toUpperCase()}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="neckt-btn-text-danger"
              >
                Sign Out
              </button>
            </div>
          )}

          <nav className="neckt-mobile-drawer__nav">
            <ul className="neckt-mobile-drawer__list">
              {currentNavLinks.map((link) => {
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
            {isAuthenticated ? (
              <Link
                href="/creators/dashboard"
                className="neckt-btn neckt-btn--primary neckt-btn--full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Open Dashboard</span>
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                href="/creators/login"
                className="neckt-btn neckt-btn--primary neckt-btn--full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Backstage Login</span>
                <ArrowRight size={16} />
              </Link>
            )}

            <div className="neckt-mobile-drawer__meta">
              <span className="neckt-mobile-drawer__city">TALENT & OPS DESK</span>
              <a href="mailto:creators@neckt.in" className="neckt-mobile-drawer__email">
                creators@neckt.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
