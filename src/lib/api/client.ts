import type { ApiResponse } from "~types/api";

type JsonBody = object | undefined;
type ApiRequestInit = Omit<RequestInit, "body"> & {
  body?: JsonBody;
};

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

export async function apiRequest<T>(
  input: string,
  init?: ApiRequestInit,
): Promise<ApiResponse<T>> {
  const response = await fetch(input, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });

  return parseJson<ApiResponse<T>>(response);
}
