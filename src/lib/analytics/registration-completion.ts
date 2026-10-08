export const REGISTRATION_COMPLETION_COOKIE = "nabulab_registration_completed";

export const REGISTRATION_COMPLETION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 24 * 60 * 60,
};
