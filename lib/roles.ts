export type Role = "customer" | "staff" | "owner";

/** Demo-only: production would read app_metadata.role from the auth server. */
export function roleFromEmail(email: string): Role {
  const e = email.toLowerCase();
  if (e.includes("owner") || e.includes("admin")) return "owner";
  if (e.includes("staff")) return "staff";
  return "customer";
}

export function canOps(role: Role | undefined | null) {
  return role === "staff" || role === "owner";
}

export function canOwner(role: Role | undefined | null) {
  return role === "owner";
}

export function deskHome(role: Role) {
  if (role === "owner") return "/owner/";
  if (role === "staff") return "/ops/";
  return "/account/";
}

export function roleLabel(role: Role) {
  if (role === "owner") return "Owner";
  if (role === "staff") return "Staff";
  return "Customer";
}
