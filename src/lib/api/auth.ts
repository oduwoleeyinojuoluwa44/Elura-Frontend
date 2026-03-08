import { apiRequest } from "@/lib/api/client";
import type { AuthResponse, AuthUser } from "~types/api";

export function signUp(email: string, password: string) {
  return apiRequest<AuthResponse>("/api/auth/sign-up", {
    method: "POST",
    body: { email, password },
  });
}

export function signIn(email: string, password: string) {
  return apiRequest<AuthResponse>("/api/auth/sign-in", {
    method: "POST",
    body: { email, password },
  });
}

export function signOut() {
  return apiRequest<{ success: true }>("/api/auth/sign-out", {
    method: "POST",
  });
}

export function getCurrentUser() {
  return apiRequest<AuthUser>("/api/auth/me");
}

