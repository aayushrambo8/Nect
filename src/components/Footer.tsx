import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, AtSign, Mail } from 'lucide-react';
import BrandLogo from './BrandLogo';

export function Footer() {
  return (
    <footer className="landing-footer" role="contentinfo">
      <div className="footer-main">
        <div className="footer-brand-column">
          <BrandLogo withTagline />
        </div>

        <div className="footer-links-column">
          <h2 className="footer-column-heading">Quick Links</h2>
          <nav className="footer-nav" aria-label="Footer Navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/events">Events</Link>
            <Link href="/moments">Moments</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <div className="footer-contact-column">
          <h2 className="footer-column-heading">Connect With Us</h2>
          <div className="footer-contact-links">
            <a
              href="https://www.instagram.com/neckt.india/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AtSign size={15} aria-hidden="true" />
              <span>Instagram @Neckt.India</span>
            </a>
            <a href="mailto:hello@neckt.in">
              <Mail size={15} aria-hidden="true" />
              <span>hello@neckt.in</span>
            </a>
          </div>
        </div>

        <div className="footer-legal-column">
          <span className="footer-copyright">© 2026 NECKT. ALL RIGHTS RESERVED.</span>
          <span className="footer-developer-credit">
            Developed by{' '}
            <a
              href="https://projectx-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              WebTiqo <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
