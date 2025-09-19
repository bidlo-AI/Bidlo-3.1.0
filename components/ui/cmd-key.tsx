'use client';

/**
 * CmdKey
 * Renders ⌘ on macOS/iOS and Ctrl on other platforms.
 * No React state/effects; detection happens at render time and is SSR-safe with suppressHydrationWarning.
 */

const APPLE_REGEX = /mac|iphone|ipad|ipod/;

function isApplePlatform(): boolean {
  try {
    if (typeof navigator === 'undefined') return false; // SSR fallback
    const platform = (navigator.platform || '').toLowerCase();
    const ua = (navigator.userAgent || '').toLowerCase();
    return APPLE_REGEX.test(platform) || APPLE_REGEX.test(ua);
  } catch {
    return false;
  }
}

export function CmdKey({ className, mac = '⌘', other = 'Ctrl' }: { className?: string; mac?: string; other?: string }) {
  const isMac = isApplePlatform();

  return (
    <span suppressHydrationWarning className={className}>
      {isMac ? mac : other}
    </span>
  );
}

export default CmdKey;
