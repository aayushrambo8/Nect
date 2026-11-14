'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import heroPoster from '../assets/hero.jpg';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Hero video autoplay notice:', err);
      });
    }
  }, []);

  const posterSrc = typeof heroPoster === 'string' ? heroPoster : heroPoster.src;

  return (
    <section className="neckt-hero" id="hero" aria-label="Hero Introduction">
      {/* Background Video Layer */}
      <div className="neckt-hero__video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="neckt-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src="https://res.cloudinary.com/kpa6g7an/video/upload/v1788555515/bg_video.mp4"
          poster={posterSrc}
        />

        {/* Subtle Dark Cinematic Scrim & Gradient Overlays for Readability */}
        <div className="neckt-hero__overlay-cinematic" />
        <div className="neckt-hero__overlay-vignette" />
        <div className="neckt-hero__overlay-radial" />
      </div>

      {/* Main Content Container */}
      <div className="neckt-hero__content">
        {/* Main Headline */}
        <h1 className="neckt-hero__headline">
          <span className="neckt-hero__headline-row">EXPERIENCES</span>
          <span className="neckt-hero__headline-row neckt-hero__headline-accent">
            THAT MOVE PEOPLE<span className="neckt-gold-dot">.</span>
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="neckt-hero__subheadline">
          We create, curate and deliver experiences that bring people together.
        </p>

        {/* Action CTAs */}
        <div className="neckt-hero__cta-group">
          <Link
            href="/events"
            className="neckt-btn neckt-btn--primary"
            id="hero-explore-cta"
          >
            <span>EXPLORE EVENTS</span>
            <ArrowRight size={16} className="neckt-btn__arrow" />
          </Link>

          <Link
            href="/about"
            className="neckt-btn neckt-btn--ghost"
            id="hero-discover-cta"
          >
            <span>DISCOVER NECKT</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
