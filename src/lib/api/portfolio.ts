import { apiRequest } from "@/lib/api/client";
import type { CreatePortfolioImageRequest, PortfolioImage } from "~types/api";

export function createPortfolioImage(payload: CreatePortfolioImageRequest) {
  return apiRequest<PortfolioImage>("/api/portfolio", {
    method: "POST",
    body: payload,
  });
}
