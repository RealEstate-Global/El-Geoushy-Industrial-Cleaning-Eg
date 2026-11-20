export function getVerifiedWhatsAppUrl(
  rawNumber: string,
  needsVerification: boolean,
): string | null {
  if (needsVerification || !/^\+[1-9]\d{7,14}$/.test(rawNumber)) return null;
  return `https://wa.me/${rawNumber.slice(1)}`;
}

/**
 * Normalizes any Egyptian or international phone number into standard wa.me format.
 * Corrects Egyptian numbers starting with +020... -> 20... or 01... -> 201...
 */
export function formatWhatsAppNumber(rawNumber: string): string {
  const digits = rawNumber.replace(/\D/g, "");
  if (digits.startsWith("020")) {
    return `20${digits.slice(3)}`;
  }
  if (digits.startsWith("01") && digits.length === 11) {
    return `2${digits}`;
  }
  return digits;
}

/**
 * Generates an active, direct WhatsApp chat URL for the provided number.
 * Defaults to the official El-Gioushy number: +0201016264326 (wa.me/201016264326).
 */
export function getWhatsAppChatUrl(
  rawNumber: string = "+0201016264326",
  message?: string,
): string {
  const formatted = formatWhatsAppNumber(rawNumber || "+0201016264326");
  const base = `https://wa.me/${formatted}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}
