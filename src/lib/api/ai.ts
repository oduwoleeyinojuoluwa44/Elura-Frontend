import { apiRequest } from "@/lib/api/client";
import type {
  ConsultationPackRequest,
  ConsultationPackResponse,
} from "~types/api";

export function generateConsultationPack(payload: ConsultationPackRequest) {
  return apiRequest<ConsultationPackResponse>("/api/ai/consultation-pack", {
    method: "POST",
    body: payload,
  });
}
