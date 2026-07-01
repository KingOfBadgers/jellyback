


/**
 * =========================================================
 * NORMALIZE TREATMENTS
 * =========================================================
 */

export function flattenTreatments(
  treatmentGroup:
    | Record<string, string | null>
    | null
    | undefined
): string[] {
  if (!treatmentGroup) return [];

  return Object.values(treatmentGroup).filter(
    (v): v is string => Boolean(v)
  );
}



