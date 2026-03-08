import type { HealthResponse } from "~types/api";

export async function getHealth() {
  const response = await fetch("/api/health", {
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Health check failed");
  }

  return (await response.json()) as HealthResponse;
}
