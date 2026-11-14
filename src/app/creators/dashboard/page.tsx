'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Shield,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  Sliders,
  Download,
  Phone,
  Mail,
  Disc,
  ArrowRight,
  UserPlus,
  X,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { useCreatorAuth } from '../../../context/CreatorAuthContext';
import {
  RIDER_ITEMS,
  MEDIA_VAULT_ASSETS,
  COMPANY_NOTICES,
} from '../../../data/creatorsData';
import type { UserRole } from '../../../types/creators';

export default function CreatorDashboardPage() {
  const {
    user,
    role,
    effectiveRole,
    previewRole,
    setPreviewRole,
    isAuthenticated,
    isLoading,
    submissions,
    addSubmission,
    updateSubmissionStatus,
    checklist,
    toggleChecklistItem,
    usersList,
    updateUserStatus,
    updateUserRole,
    addUser,
    gigs,
  } = useCreatorAuth();

  // Navigation tab states: default derived from effectiveRole
  const defaultTab =
    effectiveRole === 'creator'
      ? 'gigs'
      : effectiveRole === 'employee'
      ? 'queue'
      : 'hub';
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const activeTab = selectedTab || defaultTab;
  const setActiveTab = (tab: string) => setSelectedTab(tab);

  // Modals
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // New Demo Submission Form State
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('Melodic Techno');
  const [newAudioUrl, setNewAudioUrl] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newTargetEvent, setNewTargetEvent] = useState('NECKT Arena: Patna Sessions #04');

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('creator');
  const [newUserTitle, setNewUserTitle] = useState('');

  if (isLoading) {
    return (
      <div className="neckt-dashboard-wrapper" style={{ textAlign: 'center', paddingTop: '12rem' }}>
        <p style={{ color: 'var(--text-secondary)', font: '600 0.8rem var(--font-mono)' }}>
          AUTHENTICATING BACKSTAGE CREDENTIALS...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="neckt-dashboard-wrapper">
        <div className="neckt-login-card" style={{ margin: '0 auto', textAlign: 'center' }}>
          <Lock size={32} style={{ color: 'var(--accent-gold)', margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
            Backstage Access Required
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            Please authenticate with your creator, employee, or administrator credentials to view this dashboard.
          </p>
          <Link href="/creators/login" className="neckt-btn neckt-btn--primary neckt-btn--full">
            <span>Proceed to Login</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  // Handle new submission
  const handleCreateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addSubmission({
      title: newTitle,
      genre: newGenre,
      audioUrl: newAudioUrl || 'https://soundcloud.com/demo-upload',
      notes: newNotes,
      targetEvent: newTargetEvent,
    });

    setNewTitle('');
    setNewNotes('');
    setNewAudioUrl('');
    setShowSubmitModal(false);
  };

  // Handle new user creation (Admin)
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserUsername.trim()) return;

    addUser({
      username: newUserUsername.toLowerCase().trim(),
      name: newUserName.trim(),
      email: newUserEmail || `${newUserUsername.trim()}@neckt.in`,
      role: newUserRole,
      title: newUserTitle || (newUserRole === 'creator' ? 'Performing Artist' : 'Operations Crew'),
      status: 'active',
      city: 'Patna',
    });

    setNewUserName('');
    setNewUserUsername('');
    setNewUserEmail('');
    setNewUserTitle('');
    setShowAddUserModal(false);
  };

  return (
    <div className="neckt-dashboard-wrapper">
      {/* Admin Live Role Preview Banner (Only visible to authentic Admin) */}
      {role === 'admin' && (
        <div className="neckt-preview-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Shield size={16} />
            <span>EXECUTIVE PRIVILEGE: Simulate Portal Views as Different Tiers</span>
          </div>

          <div className="neckt-preview-banner__switchers">
            <button
              type="button"
              className={`neckt-preview-btn ${previewRole === null ? 'neckt-preview-btn--active' : ''}`}
              onClick={() => {
                setPreviewRole(null);
                setSelectedTab(null);
              }}
            >
              Admin View
            </button>
            <button
              type="button"
              className={`neckt-preview-btn ${previewRole === 'creator' ? 'neckt-preview-btn--active' : ''}`}
              onClick={() => {
                setPreviewRole('creator');
                setSelectedTab(null);
              }}
            >
              Preview as Creator
            </button>
            <button
              type="button"
              className={`neckt-preview-btn ${previewRole === 'employee' ? 'neckt-preview-btn--active' : ''}`}
              onClick={() => {
                setPreviewRole('employee');
                setSelectedTab(null);
              }}
            >
              Preview as Employee
            </button>
          </div>
        </div>
      )}

      {/* User Identity Hero Header */}
      <div className="neckt-dash-header">
        <div className="neckt-dash-header__user">
          <div className="neckt-avatar-box">
            {user.stageName ? user.stageName.charAt(0) : user.name.charAt(0)}
          </div>

          <div>
            <div className="neckt-dash-header__title">
              <span>{effectiveRole === 'creator' ? (user.stageName || user.name) : user.name}</span>
              <span className={`neckt-role-tag neckt-role-tag--${effectiveRole}`}>
                {effectiveRole?.toUpperCase()} TIER
              </span>
              <span className="neckt-status-pill neckt-status-pill--verified">
                <CheckCircle2 size={11} />
                <span>{user.status.toUpperCase()}</span>
              </span>
            </div>

            <div className="neckt-dash-header__subtitle">
              <span>{user.title}</span>
              <span>•</span>
              <span>{user.city || 'Patna'}</span>
              <span>•</span>
              <span style={{ color: 'var(--text-tertiary)' }}>Member since {user.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Right context actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {effectiveRole === 'creator' && (
            <button
              type="button"
              className="neckt-btn neckt-btn--primary"
              onClick={() => setShowSubmitModal(true)}
            >
              <Plus size={15} />
              <span>Drop Track / Demo</span>
            </button>
          )}

          {effectiveRole === 'admin' && (
            <button
              type="button"
              className="neckt-btn neckt-btn--primary"
              onClick={() => setShowAddUserModal(true)}
            >
              <UserPlus size={15} />
              <span>+ Add User / Staff</span>
            </button>
          )}

          <Link href="/creators" className="neckt-btn neckt-btn--ghost">
            <span>Portal Home</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Tab Navigation Based on Role */}
      <div className="neckt-dash-tabs">
        {effectiveRole === 'creator' && (
          <>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'gigs' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('gigs')}
            >
              <Calendar size={14} />
              <span>My Gigs & Stages ({gigs.length})</span>
            </button>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'submissions' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('submissions')}
            >
              <Disc size={14} />
              <span>Track Submissions ({submissions.length})</span>
            </button>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'rider' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('rider')}
            >
              <Sliders size={14} />
              <span>Tech Rider Specs</span>
            </button>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'media' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('media')}
            >
              <Download size={14} />
              <span>Media Vault ({MEDIA_VAULT_ASSETS.length})</span>
            </button>
          </>
        )}

        {effectiveRole === 'employee' && (
          <>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'queue' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('queue')}
            >
              <Disc size={14} />
              <span>Demo Review Queue ({submissions.filter((s) => s.status === 'pending').length} Pending)</span>
            </button>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'roster' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('roster')}
            >
              <Users size={14} />
              <span>Backstage Roster</span>
            </button>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'checklist' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('checklist')}
            >
              <CheckCircle2 size={14} />
              <span>Stage Ops Checklist</span>
            </button>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'notices' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('notices')}
            >
              <AlertCircle size={14} />
              <span>Company Notices</span>
            </button>
          </>
        )}

        {effectiveRole === 'admin' && (
          <>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'hub' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('hub')}
            >
              <Shield size={14} />
              <span>Command Hub</span>
            </button>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'users' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={14} />
              <span>User Directory ({usersList.length})</span>
            </button>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'checklist' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('checklist')}
            >
              <CheckCircle2 size={14} />
              <span>Production Oversight</span>
            </button>
            <button
              type="button"
              className={`neckt-tab-btn ${activeTab === 'audits' ? 'neckt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('audits')}
            >
              <AlertCircle size={14} />
              <span>System & Sound Permits</span>
            </button>
          </>
        )}
      </div>

      {/* =========================================================================
          TIER 1: CREATOR VIEWS
          ========================================================================= */}
      {effectiveRole === 'creator' && (
        <div>
          {/* TAB 1: GIGS */}
          {activeTab === 'gigs' && (
            <div className="neckt-dash-grid">
              <div>
                <div className="neckt-card">
                  <div className="neckt-card__header">
                    <h3 className="neckt-card__title">
                      <Calendar size={16} />
                      <span>Confirmed Stage Bookings</span>
                    </h3>
                    <span style={{ font: '600 0.68rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                      PATNA & PAN-INDIA
                    </span>
                  </div>

                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {gigs.map((gig) => (
                      <div
                        key={gig.id}
                        style={{
                          padding: '1.4rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '6px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div>
                            <span className="neckt-status-pill neckt-status-pill--approved" style={{ marginBottom: '0.45rem' }}>
                              {gig.status.toUpperCase()}
                            </span>
                            <h4 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.25rem', marginTop: '0.35rem' }}>
                              {gig.title}
                            </h4>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <span style={{ font: '700 0.85rem var(--font-mono)', color: '#fff' }}>
                              {gig.eventDate}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <div>
                            <span style={{ color: 'var(--text-tertiary)', font: '600 0.62rem var(--font-mono)', textTransform: 'uppercase' }}>
                              Stage & Slot Time
                            </span>
                            <p style={{ color: '#fff', fontSize: '0.86rem', marginTop: '0.2rem' }}>
                              {gig.stage} — {gig.slotTime}
                            </p>
                          </div>

                          <div>
                            <span style={{ color: 'var(--text-tertiary)', font: '600 0.62rem var(--font-mono)', textTransform: 'uppercase' }}>
                              Mandatory Soundcheck
                            </span>
                            <p style={{ color: 'var(--accent-gold)', fontSize: '0.86rem', marginTop: '0.2rem', fontWeight: 600 }}>
                              <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
                              {gig.soundcheckTime}
                            </p>
                          </div>

                          <div>
                            <span style={{ color: 'var(--text-tertiary)', font: '600 0.62rem var(--font-mono)', textTransform: 'uppercase' }}>
                              Venue Location
                            </span>
                            <p style={{ color: '#fff', fontSize: '0.86rem', marginTop: '0.2rem' }}>
                              <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
                              {gig.venue}, {gig.city}
                            </p>
                          </div>
                        </div>

                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span className={`neckt-status-pill ${gig.soundRiderStatus === 'approved' ? 'neckt-status-pill--approved' : 'neckt-status-pill--pending'}`}>
                            Sound Rider: {gig.soundRiderStatus}
                          </span>
                          <span className={`neckt-status-pill ${gig.hospitalityRiderStatus === 'approved' ? 'neckt-status-pill--approved' : 'neckt-status-pill--pending'}`}>
                            Hospitality: {gig.hospitalityRiderStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Assigned Producer Info */}
              <div>
                <div className="neckt-card" style={{ marginBottom: '1.5rem' }}>
                  <div className="neckt-card__header">
                    <h3 className="neckt-card__title">
                      <Phone size={15} />
                      <span>Company Point of Contact</span>
                    </h3>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                    Your assigned event coordinator for hospitality, stage access, and artist liaison:
                  </p>

                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {user.assignedProducer?.name || 'Neha Sharma'}
                    </p>
                    <p style={{ color: 'var(--accent-gold)', font: '600 0.68rem var(--font-mono)', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                      {user.assignedProducer?.role || 'Head of Artist Relations & Stage Ops'}
                    </p>

                    <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                      <a
                        href={`tel:${user.assignedProducer?.phone || '+919123456789'}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#eee', textDecoration: 'none', fontSize: '0.84rem' }}
                      >
                        <Phone size={13} style={{ color: 'var(--accent-gold)' }} />
                        <span>{user.assignedProducer?.phone || '+91 91234 56789'}</span>
                      </a>
                      <a
                        href={`mailto:${user.assignedProducer?.email || 'neha@neckt.in'}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#eee', textDecoration: 'none', fontSize: '0.84rem' }}
                      >
                        <Mail size={13} style={{ color: 'var(--accent-gold)' }} />
                        <span>{user.assignedProducer?.email || 'neha@neckt.in'}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="neckt-card">
                  <div className="neckt-card__header">
                    <h3 className="neckt-card__title">
                      <Disc size={15} />
                      <span>Artist Bio & Links</span>
                    </h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.6 }}>
                    {user.bio || 'Resident artist profile verified with NECKT Stage Production.'}
                  </p>
                  <div style={{ marginTop: '1rem', font: '600 0.72rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                    Instagram: {user.instagramHandle || '@avex_live'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEMO DROPS */}
          {activeTab === 'submissions' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <Disc size={16} />
                  <span>Your Submitted Mixtapes & Demo Tracks</span>
                </h3>
                <button
                  type="button"
                  className="neckt-btn neckt-btn--primary"
                  onClick={() => setShowSubmitModal(true)}
                >
                  <Plus size={14} />
                  <span>Submit New Set</span>
                </button>
              </div>

              <div className="neckt-table-container">
                <table className="neckt-table">
                  <thead>
                    <tr>
                      <th>Title & Audio Link</th>
                      <th>Genre</th>
                      <th>Target Show</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Reviewer Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => (
                      <tr key={sub.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: '#fff' }}>{sub.title}</div>
                          <a
                            href={sub.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}
                          >
                            <span>Listen to Demo Link</span>
                            <ExternalLink size={10} />
                          </a>
                        </td>
                        <td>
                          <span style={{ font: '600 0.72rem var(--font-mono)', color: '#ccc' }}>
                            {sub.genre}
                          </span>
                        </td>
                        <td>{sub.targetEvent || 'General'}</td>
                        <td style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem' }}>{sub.submittedAt}</td>
                        <td>
                          <span className={`neckt-status-pill neckt-status-pill--${sub.status}`}>
                            {sub.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ maxWidth: '280px', fontSize: '0.82rem', color: sub.reviewerNotes ? '#ddd' : 'var(--text-tertiary)' }}>
                          {sub.reviewerNotes ? (
                            <div>
                              <div>{sub.reviewerNotes}</div>
                              <span style={{ fontSize: '0.68rem', color: 'var(--accent-gold)' }}>— {sub.reviewedBy}</span>
                            </div>
                          ) : (
                            'In review queue'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: RIDER SPECS */}
          {activeTab === 'rider' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <Sliders size={16} />
                  <span>Verified Stage Equipment Rider</span>
                </h3>
                <span style={{ font: '600 0.68rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                  STAGE HARDWARE & MONITORING SPECS
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                The following technical audio hardware and hospitality provisions have been registered for your stage performances:
              </p>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {RIDER_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.2rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      flexWrap: 'wrap',
                      gap: '0.8rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ font: '700 0.62rem var(--font-mono)', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                          [{item.category}]
                        </span>
                        <h4 style={{ fontWeight: 600, fontSize: '0.98rem' }}>{item.name}</h4>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                        {item.spec}
                      </p>
                    </div>

                    <span className="neckt-status-pill neckt-status-pill--approved">
                      <CheckCircle2 size={12} />
                      <span>{item.status.toUpperCase()}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA VAULT */}
          {activeTab === 'media' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <Download size={16} />
                  <span>Concert Media Vault (High-Res Downloads)</span>
                </h3>
                <span style={{ font: '600 0.68rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                  COLOR GRADED & PRESS READY
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {MEDIA_VAULT_ASSETS.map((asset) => (
                  <div
                    key={asset.id}
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ height: '180px', position: 'relative', background: '#1c1722' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset.thumbnail}
                        alt={asset.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span
                        className="neckt-status-pill neckt-status-pill--verified"
                        style={{ position: 'absolute', top: '0.65rem', right: '0.65rem' }}
                      >
                        {asset.type.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ padding: '1.2rem' }}>
                      <h4 style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                        {asset.title}
                      </h4>
                      <p style={{ color: 'var(--text-tertiary)', font: '600 0.7rem var(--font-mono)' }}>
                        {asset.eventName} • {asset.date}
                      </p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                        Photo: {asset.photographer} ({asset.resolution})
                      </p>

                      <a
                        href={asset.downloadUrl}
                        download
                        className="neckt-btn neckt-btn--ghost"
                        style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', fontSize: '0.65rem' }}
                      >
                        <Download size={13} />
                        <span>Download Master File</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TIER 2: EMPLOYEE / CREW OPS VIEWS
          ========================================================================= */}
      {effectiveRole === 'employee' && (
        <div>
          {/* TAB 1: DEMO REVIEW QUEUE */}
          {activeTab === 'queue' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <Disc size={16} />
                  <span>Incoming Creator Mixtapes & Demo Review Queue</span>
                </h3>
                <span style={{ font: '600 0.68rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                  CURATORIAL & TALENT VERIFICATION
                </span>
              </div>

              <div className="neckt-table-container">
                <table className="neckt-table">
                  <thead>
                    <tr>
                      <th>Artist & Stage Name</th>
                      <th>Track Title & Audio</th>
                      <th>Genre & Target Event</th>
                      <th>Submitted</th>
                      <th>Current Status</th>
                      <th>Production Review Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => (
                      <tr key={sub.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{sub.stageName}</div>
                          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.76rem' }}>
                            {sub.creatorName}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{sub.title}</div>
                          <a
                            href={sub.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <span>Listen to Audio Stream</span>
                            <ExternalLink size={10} />
                          </a>
                        </td>
                        <td>
                          <span style={{ font: '600 0.72rem var(--font-mono)', color: '#d18add' }}>
                            {sub.genre}
                          </span>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                            {sub.targetEvent || 'General'}
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem' }}>{sub.submittedAt}</td>
                        <td>
                          <span className={`neckt-status-pill neckt-status-pill--${sub.status}`}>
                            {sub.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {sub.status !== 'shortlisted' && (
                              <button
                                type="button"
                                className="neckt-btn neckt-btn--ghost"
                                style={{ padding: '0.4rem 0.6rem', fontSize: '0.62rem' }}
                                onClick={() => updateSubmissionStatus(sub.id, 'shortlisted', 'Shortlisted by Stage Ops')}
                              >
                                Shortlist
                              </button>
                            )}

                            {sub.status !== 'approved' && (
                              <button
                                type="button"
                                className="neckt-btn neckt-btn--primary"
                                style={{ padding: '0.4rem 0.6rem', fontSize: '0.62rem' }}
                                onClick={() => updateSubmissionStatus(sub.id, 'approved', 'Approved for upcoming stage roster')}
                              >
                                Approve
                              </button>
                            )}

                            {sub.status !== 'declined' && (
                              <button
                                type="button"
                                style={{
                                  padding: '0.4rem 0.6rem',
                                  fontSize: '0.62rem',
                                  background: 'transparent',
                                  border: '1px solid rgba(239,68,68,0.4)',
                                  color: '#f87171',
                                  cursor: 'pointer',
                                  borderRadius: '4px',
                                  fontFamily: 'var(--font-mono)',
                                }}
                                onClick={() => updateSubmissionStatus(sub.id, 'declined', 'Tempo or style outside festival brief')}
                              >
                                Decline
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ROSTER */}
          {activeTab === 'roster' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <Users size={16} />
                  <span>Backstage Talent Roster & Stage Management</span>
                </h3>
              </div>

              <div className="neckt-table-container">
                <table className="neckt-table">
                  <thead>
                    <tr>
                      <th>Artist</th>
                      <th>Stage Alias</th>
                      <th>Genre / Specialty</th>
                      <th>City</th>
                      <th>Direct Contact</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList
                      .filter((u) => u.role === 'creator')
                      .map((u) => (
                        <tr key={u.id}>
                          <td style={{ fontWeight: 600 }}>{u.name}</td>
                          <td>
                            <span style={{ font: '700 0.8rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                              {u.stageName || '—'}
                            </span>
                          </td>
                          <td style={{ color: 'var(--text-secondary)' }}>{u.genre || u.title}</td>
                          <td>{u.city || 'Patna'}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.6rem' }}>
                              <a href={`tel:${u.phone || '+919876543210'}`} style={{ color: '#eee' }}>
                                <Phone size={13} />
                              </a>
                              <a href={`mailto:${u.email}`} style={{ color: '#eee' }}>
                                <Mail size={13} />
                              </a>
                            </div>
                          </td>
                          <td>
                            <span className="neckt-status-pill neckt-status-pill--verified">
                              {u.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <CheckCircle2 size={16} />
                  <span>Live Event Stage Operations Checklist</span>
                </h3>
                <span style={{ font: '600 0.68rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                  {checklist.filter((c) => c.completed).length} / {checklist.length} TASKS VERIFIED
                </span>
              </div>

              <div className="neckt-checklist">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className={`neckt-checklist-item ${item.completed ? 'neckt-checklist-item--checked' : ''}`}
                    onClick={() => toggleChecklistItem(item.id)}
                  >
                    <input
                      type="checkbox"
                      className="neckt-checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(item.id)}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                        <span style={{ font: '700 0.62rem var(--font-mono)', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                          [{item.area}]
                        </span>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.74rem' }}>
                          Assigned to: {item.assignedTo}
                        </span>
                      </div>
                      <p style={{ color: item.completed ? 'var(--text-tertiary)' : '#ffffff', fontSize: '0.9rem' }}>
                        {item.task}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: NOTICES */}
          {activeTab === 'notices' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <AlertCircle size={16} />
                  <span>Internal Company & Production Notices</span>
                </h3>
              </div>

              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {COMPANY_NOTICES.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '1.4rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                      <span className={`neckt-status-pill ${n.priority === 'urgent' ? 'neckt-status-pill--declined' : 'neckt-status-pill--pending'}`}>
                        {n.priority.toUpperCase()} PRIORITY
                      </span>
                      <span style={{ color: 'var(--text-tertiary)', font: '600 0.72rem var(--font-mono)' }}>
                        {n.date}
                      </span>
                    </div>

                    <h4 style={{ fontWeight: 700, fontSize: '1.05rem', margin: '0.4rem 0' }}>{n.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{n.content}</p>
                    <span style={{ display: 'block', marginTop: '0.8rem', font: '600 0.68rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                      Author: {n.author}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TIER 3: ADMIN / EXECUTIVE VIEWS
          ========================================================================= */}
      {effectiveRole === 'admin' && (
        <div>
          {/* Executive KPI Row */}
          <div className="neckt-kpi-row">
            <div className="neckt-kpi-box">
              <div className="neckt-kpi-box__number">{usersList.filter((u) => u.role === 'creator').length}</div>
              <div className="neckt-kpi-box__label">Verified Creators</div>
            </div>
            <div className="neckt-kpi-box">
              <div className="neckt-kpi-box__number">{usersList.filter((u) => u.role === 'employee').length}</div>
              <div className="neckt-kpi-box__label">Stage & Ops Crew</div>
            </div>
            <div className="neckt-kpi-box">
              <div className="neckt-kpi-box__number">{submissions.length}</div>
              <div className="neckt-kpi-box__label">Mixtapes & Demos</div>
            </div>
            <div className="neckt-kpi-box">
              <div className="neckt-kpi-box__number">4 / 6</div>
              <div className="neckt-kpi-box__label">Active Events Scheduled</div>
            </div>
          </div>

          {/* TAB 1: HUB */}
          {activeTab === 'hub' && (
            <div className="neckt-dash-grid">
              <div className="neckt-card">
                <div className="neckt-card__header">
                  <h3 className="neckt-card__title">
                    <Shield size={16} />
                    <span>Executive Operations & Platform Summary</span>
                  </h3>
                  <span style={{ font: '600 0.68rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                    PATNA REGIONAL HQ
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  NECKT Backstage is currently synchronizing operations across Tier-1 and Tier-2 concert stages in Bihar,
                  Jharkhand, and West Bengal. Artist onboarding, sound ordinances, and equipment safety checklists
                  are monitored in real time.
                </p>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      Next Flagship: NECKT Arena Patna Sessions #04
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                      Scheduled: Dec 05, 2026 at Gyan Bhawan Grand Amphitheatre. Stage lineup 85% locked.
                    </p>
                  </div>

                  <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      Winter Tour Expansion 2026–2027
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                      Expansion into Ranchi, Kolkata, and Delhi underway. Artist applications open.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="neckt-card">
                  <div className="neckt-card__header">
                    <h3 className="neckt-card__title">
                      <Users size={16} />
                      <span>Quick User Directory</span>
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {usersList.slice(0, 5).map((u) => (
                      <div
                        key={u.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 0.8rem',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '4px',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{u.name}</div>
                          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem' }}>
                            @{u.username}
                          </span>
                        </div>

                        <span className={`neckt-role-tag neckt-role-tag--${u.role}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="neckt-btn neckt-btn--ghost"
                    style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center' }}
                    onClick={() => setActiveTab('users')}
                  >
                    <span>View All Users ({usersList.length})</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER DIRECTORY & PERMISSIONS */}
          {activeTab === 'users' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <Users size={16} />
                  <span>Platform User & Permissions Directory</span>
                </h3>
                <button
                  type="button"
                  className="neckt-btn neckt-btn--primary"
                  onClick={() => setShowAddUserModal(true)}
                >
                  <UserPlus size={14} />
                  <span>+ Onboard New Staff / Talent</span>
                </button>
              </div>

              <div className="neckt-table-container">
                <table className="neckt-table">
                  <thead>
                    <tr>
                      <th>Name & Moniker</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Access Tier (Role)</th>
                      <th>Status</th>
                      <th>Permissions Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div style={{ fontWeight: 700 }}>{u.name}</div>
                          {u.stageName && (
                            <span style={{ font: '600 0.72rem var(--font-mono)', color: 'var(--accent-gold)' }}>
                              Alias: {u.stageName}
                            </span>
                          )}
                        </td>
                        <td style={{ font: '600 0.78rem var(--font-mono)' }}>@{u.username}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                        <td>
                          <select
                            className="neckt-select"
                            value={u.role}
                            style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                            onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                          >
                            <option value="creator">Creator</option>
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <span
                            className={`neckt-status-pill ${
                              u.status === 'suspended' ? 'neckt-status-pill--declined' : 'neckt-status-pill--verified'
                            }`}
                          >
                            {u.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="neckt-btn neckt-btn--ghost"
                            style={{ padding: '0.35rem 0.6rem', fontSize: '0.65rem' }}
                            onClick={() =>
                              updateUserStatus(u.id, u.status === 'suspended' ? 'active' : 'suspended')
                            }
                          >
                            {u.status === 'suspended' ? 'Re-Activate' : 'Suspend'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST OVERVIEW */}
          {activeTab === 'checklist' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <CheckCircle2 size={16} />
                  <span>Company Stage Production Oversight Checklist</span>
                </h3>
              </div>

              <div className="neckt-checklist">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className={`neckt-checklist-item ${item.completed ? 'neckt-checklist-item--checked' : ''}`}
                    onClick={() => toggleChecklistItem(item.id)}
                  >
                    <input
                      type="checkbox"
                      className="neckt-checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(item.id)}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                        <span style={{ font: '700 0.62rem var(--font-mono)', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                          [{item.area}]
                        </span>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.74rem' }}>
                          Lead: {item.assignedTo}
                        </span>
                      </div>
                      <p style={{ color: item.completed ? 'var(--text-tertiary)' : '#ffffff', fontSize: '0.9rem' }}>
                        {item.task}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AUDITS */}
          {activeTab === 'audits' && (
            <div className="neckt-card">
              <div className="neckt-card__header">
                <h3 className="neckt-card__title">
                  <AlertCircle size={16} />
                  <span>System Audits, Decibel Permits & Safety Approvals</span>
                </h3>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 700 }}>Patna District Collectorate Sound Clearance Permit</span>
                    <span className="neckt-status-pill neckt-status-pill--approved">VALIDATED</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                    Clearance No: PAT/ENT/2026/099. Valid for outdoor acoustic amplification until 22:00 IST. FOH Limiter calibrated to 100 dBA Leq.
                  </p>
                </div>

                <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 700 }}>Venue Fire & Electrical Safety Certificate (Gyan Bhawan)</span>
                    <span className="neckt-status-pill neckt-status-pill--approved">CLEARED</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                    Main feeder generator load 250 kVA checked with stage left distribution box. Dual earth pit certification logged.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODALS
          ========================================================================= */}
      {/* 1. Modal: Submit Demo (Creator) */}
      {showSubmitModal && (
        <div className="neckt-modal-overlay" onClick={() => setShowSubmitModal(false)}>
          <div className="neckt-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="neckt-modal-header">
              <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.4rem' }}>Drop New Track / Set Demo</h3>
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmission} style={{ display: 'grid', gap: '1.2rem' }}>
              <div className="neckt-form-group">
                <label className="neckt-form-label">Track / Set Title</label>
                <input
                  type="text"
                  className="neckt-input"
                  placeholder="e.g. Midnight Horizon Live Session 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Primary Genre</label>
                <select
                  className="neckt-select"
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                >
                  <option value="Melodic Techno">Melodic Techno</option>
                  <option value="Afro House">Afro House</option>
                  <option value="Indie Dance / Disco">Indie Dance / Disco</option>
                  <option value="Commercial / Live Vocals">Commercial / Live Vocals</option>
                  <option value="Visual FX / Timecode">Visual FX / Timecode</option>
                </select>
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Streaming Link (SoundCloud / Mixcloud / Drive)</label>
                <input
                  type="url"
                  className="neckt-input"
                  placeholder="https://soundcloud.com/your-profile/track"
                  value={newAudioUrl}
                  onChange={(e) => setNewAudioUrl(e.target.value)}
                />
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Target Stage / Event</label>
                <select
                  className="neckt-select"
                  value={newTargetEvent}
                  onChange={(e) => setNewTargetEvent(e.target.value)}
                >
                  <option value="NECKT Arena: Patna Sessions #04">NECKT Arena: Patna Sessions #04</option>
                  <option value="Euphoria Horizon Rooftop Curated Live">Euphoria Horizon Rooftop Curated Live</option>
                  <option value="General Ingestion Pool">General Ingestion Pool</option>
                </select>
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Curator Notes (BPM, key, unreleased IDs)</label>
                <textarea
                  className="neckt-input"
                  rows={3}
                  placeholder="BPM 124, opening breakdown at 3:20, tailored for the sunset hour slot."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="neckt-btn neckt-btn--ghost"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setShowSubmitModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neckt-btn neckt-btn--primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Submit For Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal: Add User (Admin) */}
      {showAddUserModal && (
        <div className="neckt-modal-overlay" onClick={() => setShowAddUserModal(false)}>
          <div className="neckt-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="neckt-modal-header">
              <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.4rem' }}>Onboard Staff or Creator</h3>
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} style={{ display: 'grid', gap: '1.2rem' }}>
              <div className="neckt-form-group">
                <label className="neckt-form-label">Full Name</label>
                <input
                  type="text"
                  className="neckt-input"
                  placeholder="e.g. Rahul Sen"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Username</label>
                <input
                  type="text"
                  className="neckt-input"
                  placeholder="e.g. rahul_sound"
                  value={newUserUsername}
                  onChange={(e) => setNewUserUsername(e.target.value)}
                  required
                />
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Email</label>
                <input
                  type="email"
                  className="neckt-input"
                  placeholder="rahul@neckt.in"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Permission Tier</label>
                <select
                  className="neckt-select"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                >
                  <option value="creator">Creator (Artist / DJ / Visualist)</option>
                  <option value="employee">Employee (Stage Ops / Crew)</option>
                  <option value="admin">Admin (Executive Director)</option>
                </select>
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Designation / Title</label>
                <input
                  type="text"
                  className="neckt-input"
                  placeholder="e.g. Senior FOH Sound Engineer"
                  value={newUserTitle}
                  onChange={(e) => setNewUserTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="neckt-btn neckt-btn--ghost"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neckt-btn neckt-btn--primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Save & Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
