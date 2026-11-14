'use client';

import React, { useState } from 'react';
import {
  Lock,
  User,
  KeyRound,
  ArrowRight,
  Sparkles,
  Music,
  Users,
  Shield,
  Plus,
  X,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { useCreatorAuth } from '../context/CreatorAuthContext';
import type { UserRole, SampleAccount } from '../types/creators';

interface CreatorLoginScreenProps {
  onSuccess?: () => void;
}

export function CreatorLoginScreen({ onSuccess }: CreatorLoginScreenProps) {
  const { login, sampleLogins, addSampleLogin } = useCreatorAuth();

  const [username, setUsername] = useState('creator');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('creator');
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add Sample Login Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalStageName, setModalStageName] = useState('');
  const [modalUsername, setModalUsername] = useState('');
  const [modalPassword, setModalPassword] = useState('password123');
  const [modalRole, setModalRole] = useState<UserRole>('creator');
  const [modalTitle, setModalTitle] = useState('');
  const [modalCity, setModalCity] = useState('Patna');

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFeedback(null);
    setIsSubmitting(true);

    if (!username.trim()) {
      setError('Please provide a valid username or moniker.');
      setIsSubmitting(false);
      return;
    }

    const res = login(username, selectedRole);
    if (res.success) {
      if (onSuccess) onSuccess();
    } else {
      setError(res.message || 'Authentication failed. Please verify credentials.');
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (account: SampleAccount) => {
    setUsername(account.username);
    setPassword(account.password || 'password123');
    setSelectedRole(account.role);

    const res = login(account.username, account.role);
    if (res.success && onSuccess) {
      onSuccess();
    }
  };

  const handleAutoFill = (account: SampleAccount) => {
    setUsername(account.username);
    setPassword(account.password || 'password123');
    setSelectedRole(account.role);
    setFeedback(`Filled credentials for ${account.name} (${account.role.toUpperCase()}). Click 'Sign In' or modify.`);
    setError(null);
  };

  const handleAddSample = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim() || !modalUsername.trim()) return;

    const newSample: SampleAccount = {
      name: modalName.trim(),
      stageName: modalStageName.trim() || undefined,
      username: modalUsername.toLowerCase().trim(),
      password: modalPassword.trim() || 'password123',
      role: modalRole,
      title:
        modalTitle.trim() ||
        (modalRole === 'creator'
          ? 'Guest Creator'
          : modalRole === 'employee'
          ? 'Operations Staff'
          : 'Executive Director'),
      city: modalCity.trim() || 'Patna',
    };

    addSampleLogin(newSample);

    // Auto-fill newly created sample account
    setUsername(newSample.username);
    setPassword(newSample.password || 'password123');
    setSelectedRole(newSample.role);
    setFeedback(`New sample login "@${newSample.username}" created and filled ready to sign in!`);

    // Reset modal fields
    setModalName('');
    setModalStageName('');
    setModalUsername('');
    setModalPassword('password123');
    setModalTitle('');
    setShowAddModal(false);
  };

  const creatorSamples = sampleLogins.filter((s) => s.role === 'creator');
  const employeeSamples = sampleLogins.filter((s) => s.role === 'employee');
  const adminSamples = sampleLogins.filter((s) => s.role === 'admin');

  return (
    <div className="neckt-portal-login-only">
      <div className="neckt-portal-login-layout">
        {/* LEFT COLUMN: Main Login Box */}
        <div className="neckt-login-card" style={{ maxWidth: 'none', margin: 0 }}>
          <div className="neckt-login-card__header">
            <div className="neckt-kicker" style={{ justifyContent: 'center', marginBottom: '0.6rem' }}>
              <Sparkles size={14} />
              <span>NECKT BACKSTAGE // TALENT & CREW</span>
            </div>
            <h1 className="neckt-login-card__headline">Backstage Login</h1>
            <p className="neckt-login-card__subheadline">
              Select or enter your credentials to open your personalized dashboard.
            </p>
          </div>

          {error && (
            <div className="neckt-error-message" role="alert" style={{ marginBottom: '1.25rem' }}>
              {error}
            </div>
          )}

          {feedback && (
            <div
              style={{
                padding: '0.75rem 1rem',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '4px',
                color: '#6ee7b7',
                fontSize: '0.8rem',
                marginBottom: '1.25rem',
              }}
            >
              {feedback}
            </div>
          )}

          <form onSubmit={handleFormLogin} className="neckt-login-form">
            <div className="neckt-form-group">
              <label className="neckt-form-label" htmlFor="username-input">
                Username / Moniker
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="username-input"
                  type="text"
                  className="neckt-input"
                  placeholder="e.g. creator, employee, admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <User
                  size={16}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.4)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            <div className="neckt-form-group">
              <label className="neckt-form-label" htmlFor="password-input">
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password-input"
                  type="password"
                  className="neckt-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <KeyRound
                  size={16}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.4)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            <div className="neckt-form-group">
              <label className="neckt-form-label" htmlFor="role-select">
                Permission Tier
              </label>
              <select
                id="role-select"
                className="neckt-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              >
                <option value="creator">Creator Tier (Artist / Producer / DJ / Visualist)</option>
                <option value="employee">Employee Tier (Stage Ops / Sound Crew / Talent Lead)</option>
                <option value="admin">Admin Tier (Executive Board / Director)</option>
              </select>
            </div>

            <button
              type="submit"
              className="neckt-btn neckt-btn--primary neckt-btn--full"
              disabled={isSubmitting}
              style={{ marginTop: '0.5rem' }}
            >
              <Lock size={15} />
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <span style={{ color: 'var(--text-tertiary)', font: '600 0.65rem var(--font-mono)', textTransform: 'uppercase' }}>
              Click any sample on the right to Auto-Fill or Quick-Login
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Sample Logins By Tier + Add Sample Login */}
        <div className="neckt-sample-panel">
          <div className="neckt-sample-panel__header">
            <div>
              <h2 className="neckt-sample-panel__title">
                <Zap size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>Sample Logins For Each Type</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '0.2rem' }}>
                Pre-configured verified test accounts for each of the three permission tiers.
              </p>
            </div>

            <button
              type="button"
              className="neckt-btn neckt-btn--ghost"
              onClick={() => setShowAddModal(true)}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.68rem' }}
            >
              <Plus size={14} />
              <span>Add Sample Login</span>
            </button>
          </div>

          {/* TIER 1: CREATOR LOGINS */}
          <div className="neckt-sample-tier-section">
            <div className="neckt-sample-tier-heading neckt-sample-tier-heading--creator">
              <Music size={13} />
              <span>1. Creator Logins (Artists, DJs, Performers)</span>
            </div>

            <div className="neckt-sample-grid">
              {creatorSamples.map((acc) => (
                <div key={acc.username} className="neckt-sample-card">
                  <div className="neckt-sample-card__top">
                    <div className="neckt-sample-card__name">
                      <span>{acc.stageName || acc.name}</span>
                      <span className="neckt-role-tag neckt-role-tag--creator">CREATOR</span>
                    </div>
                    <div className="neckt-sample-card__title">
                      {acc.title} {acc.city ? `• ${acc.city}` : ''}
                    </div>
                  </div>

                  <div className="neckt-sample-card__creds">
                    <div className="neckt-sample-card__cred-row">
                      <span className="neckt-sample-card__label">Username</span>
                      <span className="neckt-sample-card__val">@{acc.username}</span>
                    </div>
                    <div className="neckt-sample-card__cred-row">
                      <span className="neckt-sample-card__label">Password</span>
                      <span className="neckt-sample-card__val">{acc.password || 'password123'}</span>
                    </div>
                  </div>

                  <div className="neckt-sample-card__actions">
                    <button
                      type="button"
                      className="neckt-sample-btn-autofill"
                      onClick={() => handleAutoFill(acc)}
                    >
                      Auto-Fill
                    </button>
                    <button
                      type="button"
                      className="neckt-sample-btn-quicklogin"
                      onClick={() => handleQuickLogin(acc)}
                    >
                      <span>Quick Login</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 2: EMPLOYEE LOGINS */}
          <div className="neckt-sample-tier-section">
            <div className="neckt-sample-tier-heading neckt-sample-tier-heading--employee">
              <Users size={13} />
              <span>2. Employee Logins (Stage Ops, Sound Engineers, Crew)</span>
            </div>

            <div className="neckt-sample-grid">
              {employeeSamples.map((acc) => (
                <div key={acc.username} className="neckt-sample-card">
                  <div className="neckt-sample-card__top">
                    <div className="neckt-sample-card__name">
                      <span>{acc.name}</span>
                      <span className="neckt-role-tag neckt-role-tag--employee">EMPLOYEE</span>
                    </div>
                    <div className="neckt-sample-card__title">
                      {acc.title} {acc.city ? `• ${acc.city}` : ''}
                    </div>
                  </div>

                  <div className="neckt-sample-card__creds">
                    <div className="neckt-sample-card__cred-row">
                      <span className="neckt-sample-card__label">Username</span>
                      <span className="neckt-sample-card__val">@{acc.username}</span>
                    </div>
                    <div className="neckt-sample-card__cred-row">
                      <span className="neckt-sample-card__label">Password</span>
                      <span className="neckt-sample-card__val">{acc.password || 'password123'}</span>
                    </div>
                  </div>

                  <div className="neckt-sample-card__actions">
                    <button
                      type="button"
                      className="neckt-sample-btn-autofill"
                      onClick={() => handleAutoFill(acc)}
                    >
                      Auto-Fill
                    </button>
                    <button
                      type="button"
                      className="neckt-sample-btn-quicklogin"
                      onClick={() => handleQuickLogin(acc)}
                    >
                      <span>Quick Login</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 3: ADMIN LOGINS */}
          <div className="neckt-sample-tier-section" style={{ marginBottom: 0 }}>
            <div className="neckt-sample-tier-heading neckt-sample-tier-heading--admin">
              <Shield size={13} />
              <span>3. Admin Logins (Executive Directors, Management)</span>
            </div>

            <div className="neckt-sample-grid">
              {adminSamples.map((acc) => (
                <div key={acc.username} className="neckt-sample-card">
                  <div className="neckt-sample-card__top">
                    <div className="neckt-sample-card__name">
                      <span>{acc.name}</span>
                      <span className="neckt-role-tag neckt-role-tag--admin">ADMIN</span>
                    </div>
                    <div className="neckt-sample-card__title">
                      {acc.title} {acc.city ? `• ${acc.city}` : ''}
                    </div>
                  </div>

                  <div className="neckt-sample-card__creds">
                    <div className="neckt-sample-card__cred-row">
                      <span className="neckt-sample-card__label">Username</span>
                      <span className="neckt-sample-card__val">@{acc.username}</span>
                    </div>
                    <div className="neckt-sample-card__cred-row">
                      <span className="neckt-sample-card__label">Password</span>
                      <span className="neckt-sample-card__val">{acc.password || 'admin123'}</span>
                    </div>
                  </div>

                  <div className="neckt-sample-card__actions">
                    <button
                      type="button"
                      className="neckt-sample-btn-autofill"
                      onClick={() => handleAutoFill(acc)}
                    >
                      Auto-Fill
                    </button>
                    <button
                      type="button"
                      className="neckt-sample-btn-quicklogin"
                      onClick={() => handleQuickLogin(acc)}
                    >
                      <span>Quick Login</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add Sample Login */}
      {showAddModal && (
        <div className="neckt-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="neckt-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="neckt-modal-header">
              <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '1.4rem' }}>
                Add Sample Login For Any Tier
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSample} style={{ display: 'grid', gap: '1.2rem' }}>
              <div className="neckt-form-group">
                <label className="neckt-form-label">Permission Tier</label>
                <select
                  className="neckt-select"
                  value={modalRole}
                  onChange={(e) => setModalRole(e.target.value as UserRole)}
                >
                  <option value="creator">Creator Tier (Artist / DJ / Visualist)</option>
                  <option value="employee">Employee Tier (Stage Ops / Crew)</option>
                  <option value="admin">Admin Tier (Executive Director)</option>
                </select>
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Full Name</label>
                <input
                  type="text"
                  className="neckt-input"
                  placeholder="e.g. Sameer Dixit"
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  required
                />
              </div>

              {modalRole === 'creator' && (
                <div className="neckt-form-group">
                  <label className="neckt-form-label">Stage Name / Alias</label>
                  <input
                    type="text"
                    className="neckt-input"
                    placeholder="e.g. DJ SAM-D"
                    value={modalStageName}
                    onChange={(e) => setModalStageName(e.target.value)}
                  />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="neckt-form-group">
                  <label className="neckt-form-label">Username</label>
                  <input
                    type="text"
                    className="neckt-input"
                    placeholder="e.g. sam_d"
                    value={modalUsername}
                    onChange={(e) => setModalUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="neckt-form-group">
                  <label className="neckt-form-label">Password</label>
                  <input
                    type="text"
                    className="neckt-input"
                    placeholder="password123"
                    value={modalPassword}
                    onChange={(e) => setModalPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">Title / Designation / Genre</label>
                <input
                  type="text"
                  className="neckt-input"
                  placeholder={
                    modalRole === 'creator'
                      ? 'e.g. Progressive House Producer'
                      : modalRole === 'employee'
                      ? 'e.g. FOH Monitor Engineer'
                      : 'e.g. Managing Partner'
                  }
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                />
              </div>

              <div className="neckt-form-group">
                <label className="neckt-form-label">City</label>
                <input
                  type="text"
                  className="neckt-input"
                  placeholder="Patna"
                  value={modalCity}
                  onChange={(e) => setModalCity(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="neckt-btn neckt-btn--ghost"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neckt-btn neckt-btn--primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <CheckCircle2 size={15} />
                  <span>Save Sample Login</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatorLoginScreen;
