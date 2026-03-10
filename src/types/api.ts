export type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "CONFLICT"
  | "NOT_FOUND"
  | "NOT_IMPLEMENTED"
  | "INTERNAL_ERROR";

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiFailure {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface AuthUser {
  id: string;
  email: string | null;
  emailConfirmedAt: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  requiresEmailConfirmation: boolean;
}

export type ArtistSpecialty = string;

export interface ArtistProfile {
  id: string;
  username: string;
  fullName: string;
  bio: string | null;
  location: string | null;
  specialty: ArtistSpecialty[];
  priceRange: string | null;
  instagramHandle: string | null;
  profileImageUrl: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArtistProfileDetail extends ArtistProfile {
  portfolioImages: PortfolioImage[];
}

export interface UpsertArtistProfileRequest {
  fullName: string;
  username: string;
  bio?: string | null;
  location?: string | null;
  specialty?: ArtistSpecialty[];
  priceRange?: string | null;
  instagramHandle?: string | null;
  profileImageUrl?: string | null;
  isPublished?: boolean;
}

export interface DiscoverArtistsQuery {
  location?: string;
  specialty?: string;
  price_range?: string;
}

export interface PortfolioImage {
  id: string;
  artistId: string;
  imageUrl: string;
  storagePath: string;
  caption: string | null;
  sortOrder: number;
  createdAt: string;
}

export interface CreatePortfolioImageRequest {
  artistId: string;
  imageUrl: string;
  storagePath: string;
  caption?: string;
  sortOrder?: number;
}

export type BookingRequestStatus = "new" | "viewed" | "accepted" | "declined";

export interface BookingRequest {
  id: string;
  artistId: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  eventType: string;
  eventDate: string | null;
  message: string;
  status: BookingRequestStatus;
  createdAt: string;
}

export interface CreateBookingRequestRequest {
  artistId: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  eventType: string;
  eventDate?: string;
  message: string;
}

export interface ConsultationPackRequest {
  eventType: string;
  skinType: string;
  desiredFinish: string;
  timeConstraint?: string;
  notes?: string;
}

export interface ConsultationPackResponse {
  questionnaire: string[];
  prepMessage: string;
  kitChecklist: string[];
  timeline: string[];
  artistTips: string[];
}

export interface HealthResponse {
  status: "ok";
  service: "elura-backend";
}
