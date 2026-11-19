export function getVerifiedWhatsAppUrl(
  rawNumber: string,
  needsVerification: boolean,
): string | null {
  if (needsVerification || !/^\+[1-9]\d{7,14}$/.test(rawNumber)) return null;
  return `https://wa.me/${rawNumber.slice(1)}`;
}
