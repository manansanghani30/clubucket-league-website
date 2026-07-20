export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
}

export function getOrganizationSlug(): string {
  return import.meta.env.VITE_ORGANIZATION_SLUG || "ligad1";
}

export function getPublicSurface(): string {
  return "public_web";
}

export function getCurrentHostname(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.hostname;
}

export function getPublicTenantKey(): string {
  return getCurrentHostname() || getOrganizationSlug();
}
