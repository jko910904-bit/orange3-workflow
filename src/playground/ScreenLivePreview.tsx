"use client";

import {
  AnalyticsPattern,
  BillingPattern,
  CalendarPattern,
  DashboardPattern,
  FileManagerPattern,
  KanbanPattern,
  MemberManagementPattern,
  NotificationsPattern,
  OnboardingPattern,
  PortalFaqPattern,
  PortalNoticeDetailPattern,
  PortalNoticeListPattern,
  SearchFilterTablePattern,
  SettingsPermissionsPattern,
  TeamPermissionsPattern,
  TimelinePattern,
} from "@/design-system/patterns";
import { DensityProvider } from "@/design-system/DensityProvider";

/** Map /screens/:id (or recipe liveHref) to live kit compose */
export function screenIdFromLiveHref(liveHref: string): string | null {
  const match = liveHref.match(/\/screens\/([^/?#]+)/);
  return match?.[1] ?? null;
}

const LIVE_SCREEN_IDS = new Set([
  "member-management",
  "member",
  "product-management",
  "notice",
  "faq",
  "dashboard",
  "onboarding",
  "team-permissions",
  "settings",
  "timeline",
  "analytics",
  "notifications",
  "billing",
  "file-manager",
  "calendar",
  "kanban",
]);

export function hasScreenLivePreview(screenId: string): boolean {
  return LIVE_SCREEN_IDS.has(screenId);
}

export function ScreenLivePreview({ screenId }: { screenId: string }) {
  switch (screenId) {
    case "member-management":
    case "member":
      return (
        <DensityProvider defaultSurface="admin">
          <MemberManagementPattern />
        </DensityProvider>
      );
    case "product-management":
      return (
        <DensityProvider defaultSurface="admin">
          <SearchFilterTablePattern />
        </DensityProvider>
      );
    case "notice":
      return (
        <DensityProvider defaultSurface="portal">
          <div className="ds-stack" style={{ gap: "var(--spacing-24)" }}>
            <PortalNoticeListPattern />
            <PortalNoticeDetailPattern />
          </div>
        </DensityProvider>
      );
    case "faq":
      return (
        <DensityProvider defaultSurface="portal">
          <PortalFaqPattern />
        </DensityProvider>
      );
    case "dashboard":
      return (
        <DensityProvider defaultSurface="admin">
          <DashboardPattern />
        </DensityProvider>
      );
    case "onboarding":
      return (
        <DensityProvider defaultSurface="portal">
          <OnboardingPattern />
        </DensityProvider>
      );
    case "team-permissions":
      return (
        <DensityProvider defaultSurface="admin">
          <TeamPermissionsPattern />
        </DensityProvider>
      );
    case "settings":
      return (
        <DensityProvider defaultSurface="admin">
          <SettingsPermissionsPattern />
        </DensityProvider>
      );
    case "timeline":
      return (
        <DensityProvider defaultSurface="admin">
          <TimelinePattern />
        </DensityProvider>
      );
    case "analytics":
      return (
        <DensityProvider defaultSurface="admin">
          <AnalyticsPattern />
        </DensityProvider>
      );
    case "notifications":
      return (
        <DensityProvider defaultSurface="admin">
          <NotificationsPattern />
        </DensityProvider>
      );
    case "billing":
      return (
        <DensityProvider defaultSurface="admin">
          <BillingPattern />
        </DensityProvider>
      );
    case "file-manager":
      return (
        <DensityProvider defaultSurface="admin">
          <FileManagerPattern />
        </DensityProvider>
      );
    case "calendar":
      return (
        <DensityProvider defaultSurface="admin">
          <CalendarPattern />
        </DensityProvider>
      );
    case "kanban":
      return (
        <DensityProvider defaultSurface="admin">
          <KanbanPattern />
        </DensityProvider>
      );
    default:
      return null;
  }
}
