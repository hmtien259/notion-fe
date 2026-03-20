import { appConfig } from "@/shared/config/app-config";

interface ApiClientOptions extends RequestInit {
  path: string;
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export async function apiClient<T>({ path, headers, ...options }: ApiClientOptions): Promise<T> {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new ApiClientError(responseText || `Request failed with status ${response.status}`, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
