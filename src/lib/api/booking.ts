import { apiRequest } from "@/lib/api/client";
import type {
  BookingRequest,
  CreateBookingRequestRequest,
} from "~types/api";

export function createBookingRequest(payload: CreateBookingRequestRequest) {
  return apiRequest<BookingRequest>("/api/booking-requests", {
    method: "POST",
    body: payload,
  });
}

