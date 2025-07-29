export function isAValidUrl(url: string) {
  try {
    const validUrl = new URL(url);
    return validUrl.toString() !== "";
  } catch {
    return false;
  }
}
