import type { DesignSurface } from "@/generator/designContract";
import type { DomainId, LayoutArchetype } from "./types";

export function classifyArchetype(prompt: string): LayoutArchetype {
  const lower = prompt.trim().toLowerCase().replace(/\s+/g, " ");
  if (!lower) return "unsupported";

  if (
    /로그인|login|signin|sign in|인증/.test(lower) &&
    !/마이페이지|mypage/.test(lower)
  ) {
    return "auth";
  }

  if (/마이페이지|mypage|my page|대시보드|dashboard/.test(lower)) {
    return "dashboard-hub";
  }

  if (/자주\s*하는\s*질문|faq/.test(lower)) {
    return "faq-accordion";
  }

  if (
    /공지사항\s*상세|공지\s*상세|notice[- ]?detail/.test(lower) ||
    (/공지/.test(lower) && /상세/.test(lower))
  ) {
    return "content-detail";
  }

  if (/공지사항|공지|notice/.test(lower)) {
    return "content-list";
  }

  if (/상품|product|sku|카탈로그|catalog/.test(lower)) {
    return "product-catalog";
  }

  if (
    /목록|리스트|관리|crud|회원|member|조회|신청|계약|주문|list|admin/.test(
      lower,
    )
  ) {
    return "list-inquiry";
  }

  return "unsupported";
}

export function classifyDomain(
  prompt: string,
  archetype: LayoutArchetype,
): DomainId {
  if (archetype === "auth") return "account";
  if (archetype === "faq-accordion") return "faq";
  if (archetype === "content-list" || archetype === "content-detail") {
    return "notice";
  }
  if (archetype === "dashboard-hub") return "account";
  if (archetype === "product-catalog") return "product";

  if (/상품|product|sku|재고/.test(prompt)) return "product";
  if (/회원|member|유저|사용자/.test(prompt)) return "member";
  if (/계약|신청/.test(prompt)) return "contract";
  if (/주문|order/.test(prompt)) return "order";
  return "generic";
}

export function suggestSurface(
  archetype: LayoutArchetype,
  locked?: DesignSurface,
): DesignSurface {
  if (locked) return locked;
  switch (archetype) {
    case "list-inquiry":
      return "admin";
    case "product-catalog":
      return "portal";
    case "auth":
    case "dashboard-hub":
    case "content-list":
    case "content-detail":
    case "faq-accordion":
      return "portal";
    default:
      return "admin";
  }
}
