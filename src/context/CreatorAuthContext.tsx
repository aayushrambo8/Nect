'use client';

import React, { createContext, useContext, useState } from 'react';
import type {
  CreatorUser,
  UserRole,
  CreatorSubmission,
  CreatorGig,
  OperationalChecklistItem,
  SampleAccount,
} from '../types/creators';
import {
  SEEDED_USERS,
  DEFAULT_SAMPLE_LOGINS,
  INITIAL_SUBMISSIONS,
  CREATOR_GIGS,
  OPERATIONAL_CHECKLIST,
} from '../data/creatorsData';

interface AuthContextType {
  user: CreatorUser | null;
  role: UserRole | null;
  effectiveRole: UserRole | null;
  previewRole: UserRole | null;
  setPreviewRole: (role: UserRole | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, preferredRole?: UserRole) => { success: boolean; user?: CreatorUser; message?: string };
  loginAsDemo: (role: UserRole) => void;
  logout: () => void;

  // Sample Logins Management
  sampleLogins: SampleAccount[];
  addSampleLogin: (account: SampleAccount) => void;

  // Submissions State & Actions
  submissions: CreatorSubmission[];
  addSubmission: (sub: { title: string; genre: string; audioUrl: string; notes: string; targetEvent?: string }) => void;
  updateSubmissionStatus: (id: string, status: CreatorSubmission['status'], notes?: string) => void;

  // Checklist State & Actions
  checklist: OperationalChecklistItem[];
  toggleChecklistItem: (id: string) => void;

  // User Directory State & Actions
  usersList: CreatorUser[];
  updateUserStatus: (id: string, status: CreatorUser['status']) => void;
  updateUserRole: (id: string, role: UserRole) => void;
  addUser: (newUser: Omit<CreatorUser, 'id' | 'joinDate'>) => void;

  // Gigs State
  gigs: CreatorGig[];
  updateGigRiderStatus: (id: string, type: 'sound' | 'hospitality', status: 'approved' | 'pending') => void;
}

const CreatorAuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'neckt_creator_auth_user';
const STORAGE_KEY_SAMPLE_LOGINS = 'neckt_creator_sample_logins';
const STORAGE_KEY_SUBMISSIONS = 'neckt_creator_submissions';
const STORAGE_KEY_CHECKLIST = 'neckt_creator_checklist';
const STORAGE_KEY_USERS = 'neckt_creator_all_users';

function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function CreatorAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CreatorUser | null>(() =>
    getStoredItem<CreatorUser | null>(STORAGE_KEY_USER, null)
  );
  const [previewRole, setPreviewRole] = useState<UserRole | null>(null);

  // Sample Logins
  const [sampleLogins, setSampleLogins] = useState<SampleAccount[]>(() =>
    getStoredItem<SampleAccount[]>(STORAGE_KEY_SAMPLE_LOGINS, DEFAULT_SAMPLE_LOGINS)
  );

  // Dynamic application state
  const [submissions, setSubmissions] = useState<CreatorSubmission[]>(() =>
    getStoredItem<CreatorSubmission[]>(STORAGE_KEY_SUBMISSIONS, INITIAL_SUBMISSIONS)
  );
  const [checklist, setChecklist] = useState<OperationalChecklistItem[]>(() =>
    getStoredItem<OperationalChecklistItem[]>(STORAGE_KEY_CHECKLIST, OPERATIONAL_CHECKLIST)
  );
  const [usersList, setUsersList] = useState<CreatorUser[]>(() =>
    getStoredItem<CreatorUser[]>(STORAGE_KEY_USERS, SEEDED_USERS)
  );
  const [gigs, setGigs] = useState<CreatorGig[]>(CREATOR_GIGS);

  // Sync state helpers
  const saveUser = (u: CreatorUser | null) => {
    setUser(u);
    setPreviewRole(null);
    if (typeof window !== 'undefined') {
      if (u) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    }
  };

  const addSampleLogin = (account: SampleAccount) => {
    const cleanUsername = account.username.toLowerCase().trim();
    // Add to sample logins
    setSampleLogins((prev) => {
      const filtered = prev.filter((a) => a.username.toLowerCase() !== cleanUsername);
      const next = [account, ...filtered];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_SAMPLE_LOGINS, JSON.stringify(next));
      }
      return next;
    });

    // Also register in usersList so credentials immediately match
    const newUserRecord: CreatorUser = {
      id: `user-${Date.now()}`,
      username: cleanUsername,
      name: account.name,
      stageName: account.stageName,
      email: `${cleanUsername}@neckt.in`,
      role: account.role,
      title: account.title || (account.role === 'creator' ? 'Resident Talent' : 'Backstage Crew'),
      city: account.city || 'Patna',
      genre: account.genre,
      joinDate: 'Nov 2026',
      status: 'active',
    };

    setUsersList((prev) => {
      const filtered = prev.filter((u) => u.username.toLowerCase() !== cleanUsername);
      const next = [newUserRecord, ...filtered];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(next));
      }
      return next;
    });
  };

  const login = (usernameInput: string, preferredRole?: UserRole) => {
    const cleanUsername = usernameInput.trim().toLowerCase();

    // Look for exact match in current user list or sample logins
    let matchedUser = usersList.find(
      (u) =>
        u.username.toLowerCase() === cleanUsername ||
        u.email.toLowerCase() === cleanUsername ||
        (u.stageName && u.stageName.toLowerCase() === cleanUsername)
    );

    // If not found in usersList, check sampleLogins
    if (!matchedUser) {
      const matchedSample = sampleLogins.find(
        (s) =>
          s.username.toLowerCase() === cleanUsername ||
          (s.stageName && s.stageName.toLowerCase() === cleanUsername)
      );

      if (matchedSample) {
        matchedUser = {
          id: `user-${Date.now()}`,
          username: matchedSample.username,
          name: matchedSample.name,
          stageName: matchedSample.stageName,
          email: `${matchedSample.username}@neckt.in`,
          role: matchedSample.role,
          title: matchedSample.title,
          city: matchedSample.city || 'Patna',
          genre: matchedSample.genre,
          joinDate: 'Nov 2026',
          status: 'active',
        };
      }
    }

    // If still no exact match, allow fallback creation or role selection
    if (!matchedUser) {
      const roleToUse = preferredRole || 'creator';
      matchedUser = {
        id: `user-${Date.now()}`,
        username: cleanUsername || `user_${Math.floor(Math.random() * 1000)}`,
        name: cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1) || 'Creator Guest',
        email: `${cleanUsername || 'guest'}@neckt.in`,
        role: roleToUse,
        title:
          roleToUse === 'admin'
            ? 'Executive Director'
            : roleToUse === 'employee'
            ? 'Production Coordinator'
            : 'Independent Artist',
        city: 'Patna',
        joinDate: 'Nov 2026',
        status: 'active',
        stageName: roleToUse === 'creator' ? cleanUsername.toUpperCase() : undefined,
      };

      setUsersList((prev) => {
        const next = [...prev, matchedUser!];
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(next));
        }
        return next;
      });
    }

    if (matchedUser.status === 'suspended') {
      return { success: false, message: 'This account has been suspended by an administrator.' };
    }

    saveUser(matchedUser);
    return { success: true, user: matchedUser };
  };

  const loginAsDemo = (demoRole: UserRole) => {
    const demoUser =
      usersList.find((u) => u.role === demoRole) || SEEDED_USERS.find((u) => u.role === demoRole);
    if (demoUser) {
      saveUser(demoUser);
    }
  };

  const logout = () => {
    saveUser(null);
  };

  // Submissions management
  const addSubmission = (sub: {
    title: string;
    genre: string;
    audioUrl: string;
    notes: string;
    targetEvent?: string;
  }) => {
    const newSub: CreatorSubmission = {
      id: `sub-${Date.now()}`,
      creatorId: user?.id || 'guest',
      creatorName: user?.name || 'Anonymous Creator',
      stageName: user?.stageName || user?.name || 'Creator',
      title: sub.title,
      genre: sub.genre,
      audioUrl: sub.audioUrl,
      notes: sub.notes,
      submittedAt: 'Just now',
      status: 'pending',
      targetEvent: sub.targetEvent || 'General Ingestion Pool',
    };

    setSubmissions((prev) => {
      const next = [newSub, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(next));
      }
      return next;
    });
  };

  const updateSubmissionStatus = (
    id: string,
    status: CreatorSubmission['status'],
    reviewerNotes?: string
  ) => {
    setSubmissions((prev) => {
      const next = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            reviewerNotes: reviewerNotes || item.reviewerNotes,
            reviewedBy: user?.name || 'NECKT Production Staff',
          };
        }
        return item;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(next));
      }
      return next;
    });
  };

  // Operational Checklist
  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(next));
      }
      return next;
    });
  };

  // User Management
  const updateUserStatus = (id: string, status: CreatorUser['status']) => {
    setUsersList((prev) => {
      const next = prev.map((u) => (u.id === id ? { ...u, status } : u));
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(next));
      }
      return next;
    });
  };

  const updateUserRole = (id: string, newRole: UserRole) => {
    setUsersList((prev) => {
      const next = prev.map((u) => (u.id === id ? { ...u, role: newRole } : u));
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(next));
      }
      return next;
    });
    if (user && user.id === id) {
      saveUser({ ...user, role: newRole });
    }
  };

  const addUser = (newUser: Omit<CreatorUser, 'id' | 'joinDate'>) => {
    const created: CreatorUser = {
      ...newUser,
      id: `user-${Date.now()}`,
      joinDate: 'Nov 2026',
    };
    setUsersList((prev) => {
      const next = [...prev, created];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(next));
      }
      return next;
    });
  };

  const updateGigRiderStatus = (
    gigId: string,
    type: 'sound' | 'hospitality',
    newStatus: 'approved' | 'pending'
  ) => {
    setGigs((prev) =>
      prev.map((g) => {
        if (g.id === gigId) {
          return type === 'sound'
            ? { ...g, soundRiderStatus: newStatus }
            : { ...g, hospitalityRiderStatus: newStatus };
        }
        return g;
      })
    );
  };

  const effectiveRole = previewRole || user?.role || null;

  return (
    <CreatorAuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        effectiveRole,
        previewRole,
        setPreviewRole,
        isAuthenticated: !!user,
        isLoading: false,
        login,
        loginAsDemo,
        logout,
        sampleLogins,
        addSampleLogin,
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
        updateGigRiderStatus,
      }}
    >
      {children}
    </CreatorAuthContext.Provider>
  );
}

export function useCreatorAuth() {
  const context = useContext(CreatorAuthContext);
  if (!context) {
    throw new Error('useCreatorAuth must be used within a CreatorAuthProvider');
  }
  return context;
}
