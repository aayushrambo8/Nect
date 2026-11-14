'use client';

import React from 'react';
import { ArrowRight, Calendar, MapPin, Ticket } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/eventsData';
import type { EventItem } from '../types';

interface HomeEventFeatureProps {
  onSelectTicket?: (event: EventItem) => void;
}

export function HomeEventFeature({ onSelectTicket }: HomeEventFeatureProps) {
  const event = UPCOMING_EVENTS.find((item) => item.id === 'after-dark-2026');

  if (!event) return null;

  const imageSrc = typeof event.image === 'string' ? event.image : event.image.src;

  const handleTicketClick = () => {
    if (onSelectTicket) {
      onSelectTicket(event);
    } else {
      window.alert('Ticket details for AFTER DARK will be announced soon.');
    }
  };

  return (
    <section className="neckt-home-event neckt-section" aria-labelledby="home-event-title">
      <div className="neckt-container">
        <div className="neckt-home-event__layout">
          <div className="neckt-home-event__media">
            <img src={imageSrc} alt={`${event.title} event`} loading="lazy" />
            <span className="neckt-home-event__edition">{event.category}</span>
          </div>

          <div className="neckt-home-event__content">
            <div className="neckt-kicker">
              <span className="neckt-kicker-line" />
              <span className="neckt-kicker-text">UP NEXT AT NECKT</span>
            </div>
            <h2 id="home-event-title">{event.title}</h2>
            <p className="neckt-home-event__description">{event.description}</p>

            <div className="neckt-home-event__meta">
              <span>
                <Calendar size={16} />
                {event.date}
              </span>
              <span>
                <MapPin size={16} />
                {event.venue}
              </span>
            </div>

            {event.highlights && (
              <ul className="neckt-home-event__programme" aria-label="Event programme">
                {event.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            <div className="neckt-home-event__actions">
              {event.ticketUrl ? (
                <a
                  className="neckt-btn neckt-btn--primary"
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Ticket size={16} />
                  <span>GET TICKETS</span>
                  <ArrowRight size={14} />
                </a>
              ) : (
                <button
                  type="button"
                  className="neckt-btn neckt-btn--primary"
                  onClick={handleTicketClick}
                >
                  <Ticket size={16} />
                  <span>GET TICKETS</span>
                  <ArrowRight size={14} />
                </button>
              )}
              <span className="neckt-home-event__eligibility">{event.ticketStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeEventFeature;
