const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl !== "undefined") {
    return envUrl.replace(/\/$/, "");
  }
  // Fallback to production API if env var is missing or 'undefined' string
  return "https://api.rennystrips.com";
};

export const API_BASE_URL = getApiUrl();

export const buildApiUrl = (path = "") => {
  if (!path) return API_BASE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
