/**
 * helper to parse multiple set-cookie headers to array
 */
export const parseCookieHeader = (header: string): string[] => {
  if (header.length === 0) {
    return [];
  }
  const parts = header.split(",").map((part) => part.trim());

  for (let i = parts.length - 1; i > 0; i -= 1) {
    if (parts[i].indexOf("=") >= parts[i].indexOf(" ")) {
      parts[i - 1] += `, ${parts[i]}`;
      parts.splice(i, 1);
    }
  }

  return parts;
};
