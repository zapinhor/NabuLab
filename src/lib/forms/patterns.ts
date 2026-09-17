export const USERNAME_HTML_PATTERN = "[A-Za-z0-9][A-Za-z0-9._\\-]{2,31}";
export const ORGANIZATION_SLUG_HTML_PATTERN = "[a-z0-9][a-z0-9\\-]{1,62}[a-z0-9]";

const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,31}$/;

export function isValidUsername(value: string) {
  return USERNAME_PATTERN.test(value);
}
