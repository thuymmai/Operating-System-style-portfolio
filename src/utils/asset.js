const BASE = import.meta.env.BASE_URL;

export function asset(path = "") {
  const p = String(path);

  // Leave real URLs (https://..., //cdn...) untouched.
  if (/^(https?:)?\/\//.test(p)) return p;

  const clean = p.replace(/^\/+/, "");

  // Already prefixed? Don't prefix twice.
  if (BASE !== "/" && clean.startsWith(BASE.slice(1))) return `/${clean}`;

  return `${BASE}${clean}`;
}

export default asset;
