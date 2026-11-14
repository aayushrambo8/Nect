export type UserRole = 'creator' | 'employee' | 'admin';

export interface AssignedProducer {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface CreatorUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title: string;
  city?: string;
  stageName?: string;
  genre?: string;
  department?: string;
  phone?: string;
  spotifyUrl?: string;
  instagramHandle?: string;
  joinDate: string;
  status: 'active' | 'pending' | 'verified' | 'suspended';
  bio?: string;
  assignedProducer?: AssignedProducer;
}

export interface SampleAccount {
  name: string;
  username: string;
  password?: string;
  role: UserRole;
  title: string;
  stageName?: string;
  city?: string;
  genre?: string;
}

export interface CreatorSubmission {
  id: string;
  creatorId: string;
  creatorName: string;
  stageName: string;
  title: string;
  genre: string;
  audioUrl: string;
  notes: string;
  submittedAt: string;
  status: 'pending' | 'shortlisted' | 'approved' | 'declined';
  targetEvent?: string;
  reviewerNotes?: string;
  reviewedBy?: string;
}

export interface CreatorGig {
  id: string;
  title: string;
  eventDate: string;
  venue: string;
  city: string;
  slotTime: string;
  soundcheckTime: string;
  stage: string;
  status: 'confirmed' | 'pending_rider' | 'completed';
  feeStatus: 'paid' | 'processing' | 'scheduled';
  assignedProducer: string;
  hospitalityRiderStatus: 'approved' | 'pending';
  soundRiderStatus: 'approved' | 'pending';
}

export interface RiderItem {
  id: string;
  name: string;
  category: 'audio' | 'monitoring' | 'lighting' | 'hospitality';
  spec: string;
  status: 'ready' | 'pending_check' | 'missing';
}

export interface MediaVaultAsset {
  id: string;
  title: string;
  eventName: string;
  date: string;
  type: 'photo' | 'video';
  thumbnail: string;
  downloadUrl: string;
  photographer: string;
  resolution: string;
}

export interface CompanyNotice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'normal' | 'urgent';
  author: string;
}

export interface OperationalChecklistItem {
  id: string;
  task: string;
  area: 'Stage & Sound' | 'Artist Hospitality' | 'Lighting & FX' | 'Security & Access';
  completed: boolean;
  assignedTo: string;
}
