export function formatRuntime(minutes?: number | string | null) {
  if (!minutes) return null;

  const mins =
    typeof minutes === "string" ? parseInt(minutes) : minutes;

  if (!mins || isNaN(mins)) return null;

  const h = Math.floor(mins / 60);
  const m = mins % 60;

  return `${h}h ${m}m`;
}