const manualAssetBaseUrl =
  process.env.NEXT_PUBLIC_MANUAL_ASSET_BASE_URL?.trim().replace(/\/+$/, "") || ""

export function resolveManualAssetSrc(src: string): string {
  if (!src.startsWith("/manual/")) {
    return src
  }

  return manualAssetBaseUrl ? `${manualAssetBaseUrl}${src}` : src
}
