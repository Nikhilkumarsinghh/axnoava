"use client";
export function CookieSettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event("axn:cookie-settings"))}>Open cookie settings <span>↗</span></button>;
}
