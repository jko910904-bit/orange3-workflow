"use client";

import { useState } from "react";
import { Drawer } from "antd";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Pagination,
  Table,
} from "@/design-system/components";
import type { ScreenComposition } from "@/types/screen-composition";
import type {
  ActionCardSpec,
  ColumnSpec,
  ComposedSection,
  FaqItemSpec,
  FilterFieldSpec,
  MetricSpec,
  NoticeRow,
  ProductCardSpec,
  ProfileSpec,
  ToolbarAction,
} from "@/generator/compose/types";
import styles from "./composedScreen.module.css";

type ComposedScreenProps = {
  composition: ScreenComposition;
};

function StatusBadge({
  value,
  tone,
}: {
  value: string;
  tone: "status" | "role";
}) {
  const statusClass =
    /정상|판매중|완료|운영반영|결제완료/.test(value)
      ? styles.badgeOk
      : /휴면|품절임박|작성중|배송중|진행/.test(value)
        ? styles.badgeWarn
        : /탈퇴|품절|판매중지|취소|반려|대기/.test(value)
          ? styles.badgeDanger
          : styles.badgeNeutral;
  const roleClass =
    value === "관리자"
      ? styles.badgeRoleAdmin
      : value === "VIP" || value === "임직원"
        ? styles.badgeRoleVip
        : styles.badgeRoleDefault;
  return (
    <span
      className={`${styles.badge} ${tone === "role" ? roleClass : statusClass}`}
    >
      {value}
    </span>
  );
}

function PageHeader({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <header className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>{title ?? "화면"}</h1>
      {description ? <p className={styles.pageDesc}>{description}</p> : null}
    </header>
  );
}

function FilterBar({
  fields,
  primaryCta,
  filterCols,
  showError,
}: {
  fields: FilterFieldSpec[];
  primaryCta: string;
  filterCols: number;
  showError?: boolean;
}) {
  return (
    <section
      className={styles.filterPanel}
      aria-label="검색 조건"
      style={{
        ["--filter-cols" as string]: String(Math.max(2, filterCols)),
      }}
    >
      {showError ? (
        <p className={styles.errorBanner} role="alert">
          검색 조건을 확인해 주세요.
        </p>
      ) : null}
      <div className={styles.filterGrid}>
        {fields.map((field) => (
          <div key={field.id} className={styles.field}>
            {field.kind === "select" ? (
              <>
                <label htmlFor={`f-${field.id}`}>{field.label}</label>
                <select
                  id={`f-${field.id}`}
                  className={styles.select}
                  defaultValue={field.options?.[0] ?? "전체"}
                >
                  {(field.options ?? ["전체"]).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </>
            ) : field.kind === "date" ? (
              <>
                <label htmlFor={`f-${field.id}`}>{field.label}</label>
                <input
                  id={`f-${field.id}`}
                  className={styles.nativeInput}
                  type="text"
                  placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
                />
              </>
            ) : (
              <Input
                size="s"
                label={field.label}
                placeholder={field.placeholder ?? ""}
              />
            )}
          </div>
        ))}
        <div className={styles.filterActions}>
          <Button variant="primary" size="s" data-primary-cta="true">
            {primaryCta}
          </Button>
          <Button variant="ghost" size="s">
            초기화
          </Button>
        </div>
      </div>
    </section>
  );
}

function ActionToolbar({
  actions,
  sortOptions,
  viewMode,
  showViewToggle,
  onViewModeChange,
}: {
  actions: ToolbarAction[];
  sortOptions: string[];
  viewMode?: "grid" | "list";
  showViewToggle?: boolean;
  onViewModeChange?: (mode: "grid" | "list") => void;
}) {
  const primaryActions = actions.filter((a) => a.id !== "view-grid" && a.id !== "view-list");
  return (
    <div className={styles.actionToolbar} aria-label="작업 도구">
      <div className={styles.actionGroup}>
        {primaryActions.map((action) => (
          <Button
            key={action.id}
            size="s"
            variant={
              action.variant === "primary"
                ? "primary"
                : action.variant === "danger"
                  ? "danger"
                  : action.variant === "ghost"
                    ? "ghost"
                    : "secondary"
            }
          >
            {action.label}
          </Button>
        ))}
      </div>
      <div className={styles.actionGroup}>
        {showViewToggle ? (
          <div className={styles.viewToggle} role="group" aria-label="보기 방식">
            <Button
              size="s"
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              aria-pressed={viewMode === "grid"}
              onClick={() => onViewModeChange?.("grid")}
            >
              그리드
            </Button>
            <Button
              size="s"
              variant={viewMode === "list" ? "secondary" : "ghost"}
              aria-pressed={viewMode === "list"}
              onClick={() => onViewModeChange?.("list")}
            >
              목록
            </Button>
          </div>
        ) : null}
        {sortOptions.length > 0 ? (
          <label className={styles.sortControl}>
            <span>정렬</span>
            <select className={styles.select} defaultValue={sortOptions[0]}>
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>
    </div>
  );
}

function BulkBar({
  selectedCount,
  visible,
}: {
  selectedCount: number;
  visible?: boolean;
}) {
  if (!visible && selectedCount <= 0) return null;
  return (
    <div className={styles.bulkBar} role="status">
      <span>
        선택 <strong>{selectedCount}</strong>건
      </span>
      <div className={styles.actionGroup}>
        <Button size="s" variant="danger">
          삭제
        </Button>
        <Button size="s" variant="ghost">
          선택 해제
        </Button>
      </div>
    </div>
  );
}

function ResultMeta({ totalCount }: { totalCount: number }) {
  return (
    <p className={styles.total}>
      총 <strong>{totalCount.toLocaleString("ko-KR")}</strong>건
    </p>
  );
}

function EmptyState({
  title,
  description,
  visible,
}: {
  title?: string;
  description?: string;
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <div className={styles.emptyState} role="status">
      <p className={styles.emptyTitle}>{title ?? "데이터가 없습니다"}</p>
      <p className={styles.emptyDesc}>
        {description ?? "조건을 변경한 뒤 다시 시도해 주세요."}
      </p>
    </div>
  );
}

function LoadingState({ active, rows }: { active?: boolean; rows?: number }) {
  if (!active) return null;
  const count = Math.max(2, rows ?? 3);
  return (
    <div className={styles.loadingState} aria-busy="true" aria-label="로딩 중">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.skeletonRow} />
      ))}
    </div>
  );
}

function DataTableBlock({
  columns,
  rows,
  density,
  selectable,
  stickyHeader,
  rowActions,
  detailDrawer,
}: {
  columns: ColumnSpec[];
  rows: Record<string, string>[];
  density: "dense" | "comfortable";
  selectable?: boolean;
  stickyHeader?: boolean;
  rowActions?: boolean;
  detailDrawer?: boolean;
}) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [drawerRow, setDrawerRow] = useState<Record<string, string> | null>(
    null,
  );
  const rowKey = (row: Record<string, string>, idx: number) =>
    String(row[columns[0]?.key] ?? idx);

  const selectedCount = Object.values(selected).filter(Boolean).length;
  const allSelected = rows.length > 0 && selectedCount === rows.length;

  return (
    <>
      {selectable && selectedCount > 0 ? (
        <BulkBar selectedCount={selectedCount} visible />
      ) : null}
      <div
        className={`${styles.tablePanel} ${stickyHeader ? styles.tableSticky : ""}`}
      >
        <Table density={density} className={styles.tableRoot}>
          <Table.Scroll className={styles.tableScroll}>
            <Table.Header>
              <Table.Row>
                {selectable ? (
                  <Table.Head>
                    <Table.Checkbox
                      aria-label="전체 선택"
                      checked={allSelected}
                      indeterminate={
                        selectedCount > 0 && selectedCount < rows.length
                      }
                      onChange={(checked) => {
                        const next: Record<string, boolean> = {};
                        if (checked) {
                          rows.forEach((row, idx) => {
                            next[rowKey(row, idx)] = true;
                          });
                        }
                        setSelected(next);
                      }}
                    />
                  </Table.Head>
                ) : null}
                {columns.map((col) => (
                  <Table.Head
                    key={col.key}
                    align={col.align}
                    sortable={col.key !== "email"}
                  >
                    {col.label}
                  </Table.Head>
                ))}
                {rowActions ? (
                  <Table.Head align="right">작업</Table.Head>
                ) : null}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row, idx) => {
                const key = rowKey(row, idx);
                return (
                  <Table.Row key={key} selected={Boolean(selected[key])}>
                    {selectable ? (
                      <Table.Cell>
                        <Table.Checkbox
                          aria-label={`${key} 선택`}
                          checked={Boolean(selected[key])}
                          onChange={(checked) =>
                            setSelected((prev) => ({
                              ...prev,
                              [key]: checked,
                            }))
                          }
                        />
                      </Table.Cell>
                    ) : null}
                    {columns.map((col) => (
                      <Table.Cell key={col.key} align={col.align}>
                        {col.badge ? (
                          <StatusBadge
                            value={row[col.key] ?? "—"}
                            tone={col.badge}
                          />
                        ) : (
                          (row[col.key] ?? "—")
                        )}
                      </Table.Cell>
                    ))}
                    {rowActions ? (
                      <Table.Cell align="right">
                        <div className={styles.rowActions}>
                          {detailDrawer ? (
                            <Button
                              size="s"
                              variant="ghost"
                              onClick={() => setDrawerRow(row)}
                            >
                              상세
                            </Button>
                          ) : null}
                          <Button size="s" variant="ghost">
                            수정
                          </Button>
                          <Button size="s" variant="ghost">
                            삭제
                          </Button>
                        </div>
                      </Table.Cell>
                    ) : null}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Scroll>
        </Table>
      </div>
      {detailDrawer ? (
        <Drawer
          title="회원 상세"
          open={drawerRow != null}
          onClose={() => setDrawerRow(null)}
          size={400}
        >
          {drawerRow ? (
            <dl className={styles.drawerDl}>
              {columns.map((col) => (
                <div key={col.key} className={styles.drawerRow}>
                  <dt>{col.label}</dt>
                  <dd>
                    {col.badge ? (
                      <StatusBadge
                        value={drawerRow[col.key] ?? "—"}
                        tone={col.badge}
                      />
                    ) : (
                      (drawerRow[col.key] ?? "—")
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Drawer>
      ) : null}
    </>
  );
}

function ProductGrid({
  products,
  cardCols,
  viewMode,
  columns,
  density,
}: {
  products: ProductCardSpec[];
  cardCols: number;
  viewMode: "grid" | "list";
  columns?: ColumnSpec[];
  density?: "dense" | "comfortable";
}) {
  const [wished, setWished] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(products.map((p) => [p.id, Boolean(p.wishlisted)])),
  );

  if (products.length === 0) {
    return null;
  }

  if (viewMode === "list") {
    const cols: ColumnSpec[] =
      columns && columns.length > 0
        ? columns
        : [
            { key: "id", label: "상품코드" },
            { key: "name", label: "상품명" },
            { key: "category", label: "카테고리" },
            { key: "price", label: "가격", align: "right" },
            { key: "status", label: "상태", badge: "status" },
          ];
    const rows = products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      status: p.status ?? "판매중",
    }));
    return (
      <DataTableBlock
        columns={cols}
        rows={rows}
        density={density === "comfortable" ? "comfortable" : "dense"}
        selectable={false}
        stickyHeader
        rowActions={false}
      />
    );
  }

  return (
    <div
      className={styles.productGrid}
      style={{
        ["--card-cols" as string]: String(Math.max(2, Math.min(4, cardCols))),
      }}
    >
      {products.map((product) => (
        <article key={product.id} className={styles.productCard}>
          <div className={styles.productImage} aria-hidden>
            {product.imageLabel ?? product.category}
          </div>
          <div className={styles.productBody}>
            <div className={styles.productTop}>
              <span className={styles.productCategory}>{product.category}</span>
              <button
                type="button"
                className={styles.wishBtn}
                aria-label="위시리스트"
                aria-pressed={Boolean(wished[product.id])}
                onClick={() =>
                  setWished((prev) => ({
                    ...prev,
                    [product.id]: !prev[product.id],
                  }))
                }
              >
                {wished[product.id] ? "♥" : "♡"}
              </button>
            </div>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price}원</p>
            {product.status ? (
              <StatusBadge value={product.status} tone="status" />
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function PaginationBlock({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <div className={styles.pager}>
      <Pagination
        page={page}
        pageCount={totalPages}
        onPageChange={() => undefined}
      />
    </div>
  );
}

function KpiGrid({
  metrics,
  cardCols,
}: {
  metrics: MetricSpec[];
  cardCols: number;
}) {
  return (
    <div
      className={styles.kpiGrid}
      style={{
        ["--card-cols" as string]: String(Math.max(2, Math.min(4, cardCols))),
      }}
    >
      {metrics.map((m) => (
        <Card key={m.label} shadow="1" radius="8" padding="m">
          <Card.Body>
            <p className={styles.kpiLabel}>{m.label}</p>
            <p className={styles.kpiValue}>{m.value}</p>
            {m.delta ? <p className={styles.kpiDelta}>{m.delta}</p> : null}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

function ProfileCard({ profile }: { profile: ProfileSpec }) {
  return (
    <section className={styles.profileCard} aria-label="프로필">
      <div className={styles.avatar} aria-hidden>
        {profile.avatarInitial ?? profile.name.slice(0, 1)}
      </div>
      <div className={styles.profileInfo}>
        <p className={styles.profileName}>{profile.name}</p>
        <p className={styles.profileEmail}>{profile.email}</p>
      </div>
      <StatusBadge value={profile.grade} tone="role" />
      <Button size="s" variant="secondary">
        프로필 수정
      </Button>
    </section>
  );
}

function CardGrid({
  cards,
  cardCols,
  highlightFirst,
}: {
  cards: ActionCardSpec[];
  cardCols: number;
  highlightFirst?: boolean;
}) {
  return (
    <div
      className={styles.cardGrid}
      style={{
        ["--card-cols" as string]: String(Math.max(1, Math.min(3, cardCols))),
      }}
    >
      {cards.map((card, idx) => (
        <Card key={card.title} shadow="1" radius="8" padding="m">
          <Card.Header>
            <strong>{card.title}</strong>
          </Card.Header>
          <Card.Body>
            <p className={styles.cardDesc}>{card.description}</p>
          </Card.Body>
          <Card.Footer>
            <Button
              variant={highlightFirst && idx === 0 ? "primary" : "secondary"}
              size="s"
              data-primary-cta={
                highlightFirst && idx === 0 ? "true" : undefined
              }
            >
              {card.action}
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}

function LoginForm({
  title,
  primaryCta,
  showError,
  saveId,
  rememberMe,
  showSecondaryAuth,
}: {
  title: string;
  primaryCta: string;
  showError?: boolean;
  saveId?: boolean;
  rememberMe?: boolean;
  showSecondaryAuth?: boolean;
}) {
  return (
    <div className={styles.loginWrap}>
      <Card shadow="1" radius="8" padding="l" className={styles.loginCard}>
        <Card.Header>
          <h2 className={styles.loginTitle}>{title}</h2>
        </Card.Header>
        <Card.Body>
          <form
            className={styles.loginForm}
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <Input
              kind="text"
              size="m"
              label="이메일 / 아이디"
              placeholder="이메일 또는 아이디"
              autoComplete="username"
            />
            <Input
              kind="password"
              size="m"
              label="비밀번호"
              placeholder="비밀번호 입력"
              autoComplete="current-password"
            />
            {showError ? (
              <p className={styles.fieldError} role="alert">
                아이디 또는 비밀번호가 올바르지 않습니다.
              </p>
            ) : null}
            <div className={styles.loginOptions}>
              {rememberMe || saveId ? (
                <Checkbox label="로그인 상태 유지" defaultChecked={false} />
              ) : null}
            </div>
            <Button
              type="submit"
              variant="primary"
              size="l"
              width="fill"
              data-primary-cta="true"
            >
              {primaryCta}
            </Button>
            <div className={styles.loginLinks}>
              <button type="button" className={styles.linkBtn}>
                비밀번호 재설정
              </button>
            </div>
            {showSecondaryAuth ? (
              <div className={styles.secondaryAuth}>
                <button type="button" className={styles.linkBtn}>
                  Passkey로 로그인
                </button>
                <span aria-hidden>·</span>
                <button type="button" className={styles.linkBtn}>
                  OTP 로그인
                </button>
              </div>
            ) : null}
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

function SocialLogin({ providers }: { providers: string[] }) {
  return (
    <div className={styles.socialLogin} aria-label="소셜 로그인">
      <p className={styles.socialLabel}>소셜 계정으로 로그인</p>
      <div className={styles.socialRow}>
        {providers.map((provider) => (
          <Button key={provider} variant="secondary" size="m" width="fill">
            {provider}
          </Button>
        ))}
      </div>
    </div>
  );
}

function SearchBar({
  placeholder,
  primaryCta,
}: {
  placeholder: string;
  primaryCta: string;
}) {
  return (
    <div className={styles.searchBar}>
      <Input kind="search" size="m" placeholder={placeholder} label="검색" />
      <Button variant="primary" size="m" data-primary-cta="true">
        {primaryCta}
      </Button>
    </div>
  );
}

function NoticeList({ notices }: { notices: NoticeRow[] }) {
  if (notices.length === 0) {
    return null;
  }
  return (
    <div className={styles.noticeList}>
      <ul className={styles.noticeUl}>
        {notices.map((n) => (
          <li
            key={n.no}
            className={`${styles.noticeRow} ${n.pinned ? styles.noticePinned : ""}`}
          >
            <span className={styles.noticeNo}>{n.no}</span>
            <div className={styles.noticeMain}>
              <span className={styles.noticeTitle}>
                {n.pinned ? <span className={styles.pin}>중요</span> : null}
                {n.title}
              </span>
              <div className={styles.noticeMeta}>
                {n.author ? <span>{n.author}</span> : null}
                {(n.tags ?? []).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className={styles.noticeDate}>{n.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArticleBlock({
  title,
  meta,
  body,
  attachment,
}: {
  title?: string;
  meta?: string;
  body?: string[];
  attachment?: string;
}) {
  return (
    <article className={styles.article}>
      <h2 className={styles.articleTitle}>{title}</h2>
      {meta ? <p className={styles.articleMeta}>{meta}</p> : null}
      <div className={styles.articleBody}>
        {(body ?? []).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {attachment ? (
        <div className={styles.attachment}>
          <span className={styles.attachmentLabel}>첨부파일</span>
          <button type="button" className={styles.linkBtn}>
            {attachment}
          </button>
        </div>
      ) : null}
    </article>
  );
}

function PrevNextNav({
  prevTitle,
  nextTitle,
}: {
  prevTitle?: string;
  nextTitle?: string;
}) {
  return (
    <nav className={styles.prevNext} aria-label="이전·다음 글">
      <button type="button" className={styles.prevNextItem}>
        <span className={styles.prevNextLabel}>이전</span>
        <span className={styles.prevNextTitle}>{prevTitle ?? "—"}</span>
      </button>
      <button type="button" className={styles.prevNextItem}>
        <span className={styles.prevNextLabel}>다음</span>
        <span className={styles.prevNextTitle}>{nextTitle ?? "—"}</span>
      </button>
    </nav>
  );
}

function ListAction({
  label,
  showShare,
}: {
  label: string;
  showShare?: boolean;
}) {
  return (
    <div className={styles.listAction}>
      <Button variant="secondary" size="m">
        {label}
      </Button>
      {showShare ? (
        <Button variant="ghost" size="m">
          공유
        </Button>
      ) : null}
    </div>
  );
}

function CategoryTabs({
  categories,
  active,
}: {
  categories: string[];
  active?: string;
}) {
  const current = active ?? categories[0];
  return (
    <div className={styles.categoryTabs} role="tablist" aria-label="카테고리">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          aria-selected={cat === current}
          className={
            cat === current ? styles.categoryTabActive : styles.categoryTab
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function FaqList({ items }: { items: FaqItemSpec[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);
  return (
    <ul className={styles.faqList}>
      {items.map((item) => {
        const isOpen = open === item.question;
        return (
          <li key={item.question} className={styles.faqItem}>
            <button
              type="button"
              className={styles.faqQ}
              aria-expanded={isOpen}
              onClick={() =>
                setOpen((prev) =>
                  prev === item.question ? null : item.question,
                )
              }
            >
              <span>{item.question}</span>
              <span aria-hidden>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? <p className={styles.faqA}>{item.answer}</p> : null}
          </li>
        );
      })}
    </ul>
  );
}

function PopularFaq({ items }: { items: FaqItemSpec[] }) {
  if (items.length === 0) return null;
  return (
    <section className={styles.popularFaq} aria-label="인기 질문">
      <h2 className={styles.popularTitle}>인기 질문</h2>
      <ol className={styles.popularList}>
        {items.map((item, idx) => (
          <li key={item.question} className={styles.popularItem}>
            <span className={styles.popularRank}>{idx + 1}</span>
            <span>{item.question}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProductCatalogSections({
  sections,
}: {
  sections: ComposedSection[];
}) {
  const toolbar = sections.find((s) => s.kind === "action-toolbar");
  const grid = sections.find((s) => s.kind === "product-grid");
  const initialMode =
    ((toolbar?.props?.viewMode as string) ??
      (grid?.props?.viewMode as string) ??
      "grid") === "list"
      ? "list"
      : "grid";
  const [viewMode, setViewMode] = useState<"grid" | "list">(initialMode);

  return (
    <>
      {sections.map((section) => {
        if (section.kind === "action-toolbar") {
          const p = section.props ?? {};
          return (
            <ActionToolbar
              key={section.id}
              actions={(p.actions as ToolbarAction[]) ?? []}
              sortOptions={(p.sortOptions as string[]) ?? []}
              viewMode={viewMode}
              showViewToggle={Boolean(p.showViewToggle)}
              onViewModeChange={setViewMode}
            />
          );
        }
        if (section.kind === "product-grid") {
          const p = section.props ?? {};
          return (
            <ProductGrid
              key={section.id}
              products={(p.products as ProductCardSpec[]) ?? []}
              cardCols={(p.cardCols as number) ?? 3}
              viewMode={viewMode}
              columns={p.columns as ColumnSpec[] | undefined}
              density={
                (p.density as "dense" | "comfortable") === "comfortable"
                  ? "comfortable"
                  : "dense"
              }
            />
          );
        }
        return renderSection(section);
      })}
    </>
  );
}

function renderSection(section: ComposedSection) {
  const p = section.props ?? {};
  switch (section.kind) {
    case "shell-admin":
    case "shell-portal":
      return null;
    case "page-header":
      return (
        <PageHeader
          key={section.id}
          title={p.title as string | undefined}
          description={p.description as string | undefined}
        />
      );
    case "filter-bar":
      return (
        <FilterBar
          key={section.id}
          fields={(p.fields as FilterFieldSpec[]) ?? []}
          primaryCta={(p.primaryCta as string) ?? "조회"}
          filterCols={(p.filterCols as number) ?? 3}
          showError={Boolean(p.showError)}
        />
      );
    case "action-toolbar":
      return (
        <ActionToolbar
          key={section.id}
          actions={(p.actions as ToolbarAction[]) ?? []}
          sortOptions={(p.sortOptions as string[]) ?? []}
          viewMode={
            p.viewMode === "list" || p.viewMode === "grid"
              ? p.viewMode
              : undefined
          }
          showViewToggle={Boolean(p.showViewToggle)}
        />
      );
    case "bulk-bar":
      return (
        <BulkBar
          key={section.id}
          selectedCount={(p.selectedCount as number) ?? 0}
          visible={Boolean(p.visible)}
        />
      );
    case "result-meta":
      return (
        <ResultMeta
          key={section.id}
          totalCount={(p.totalCount as number) ?? 0}
        />
      );
    case "data-table":
      return (
        <DataTableBlock
          key={section.id}
          columns={(p.columns as ColumnSpec[]) ?? []}
          rows={(p.rows as Record<string, string>[]) ?? []}
          density={
            (p.density as "dense" | "comfortable") === "comfortable"
              ? "comfortable"
              : "dense"
          }
          selectable={Boolean(p.selectable)}
          stickyHeader={p.stickyHeader !== false}
          rowActions={Boolean(p.rowActions)}
          detailDrawer={Boolean(p.detailDrawer)}
        />
      );
    case "product-grid":
      return (
        <ProductGrid
          key={section.id}
          products={(p.products as ProductCardSpec[]) ?? []}
          cardCols={(p.cardCols as number) ?? 3}
          viewMode={p.viewMode === "list" ? "list" : "grid"}
          columns={p.columns as ColumnSpec[] | undefined}
          density={
            (p.density as "dense" | "comfortable") === "comfortable"
              ? "comfortable"
              : "dense"
          }
        />
      );
    case "pagination":
      return (
        <PaginationBlock
          key={section.id}
          page={(p.page as number) ?? 1}
          totalPages={(p.totalPages as number) ?? 1}
        />
      );
    case "kpi-grid":
      return (
        <KpiGrid
          key={section.id}
          metrics={(p.metrics as MetricSpec[]) ?? []}
          cardCols={(p.cardCols as number) ?? 4}
        />
      );
    case "profile-card":
      return (
        <ProfileCard
          key={section.id}
          profile={
            (p.profile as ProfileSpec) ?? {
              name: "회원",
              email: "user@example.com",
              grade: "일반",
            }
          }
        />
      );
    case "card-grid":
      return (
        <CardGrid
          key={section.id}
          cards={(p.cards as ActionCardSpec[]) ?? []}
          cardCols={(p.cardCols as number) ?? 2}
          highlightFirst={Boolean(p.highlightFirst)}
        />
      );
    case "login-form":
      return (
        <LoginForm
          key={section.id}
          title={(p.title as string) ?? "로그인"}
          primaryCta={(p.primaryCta as string) ?? "로그인"}
          showError={Boolean(p.showError)}
          saveId={Boolean(p.saveId)}
          rememberMe={Boolean(p.rememberMe)}
          showSecondaryAuth={Boolean(p.showSecondaryAuth)}
        />
      );
    case "social-login":
      return (
        <SocialLogin
          key={section.id}
          providers={(p.providers as string[]) ?? ["Google", "Kakao", "Naver"]}
        />
      );
    case "search-bar":
      return (
        <SearchBar
          key={section.id}
          placeholder={(p.placeholder as string) ?? "검색"}
          primaryCta={(p.primaryCta as string) ?? "검색"}
        />
      );
    case "notice-list":
      return (
        <NoticeList
          key={section.id}
          notices={(p.notices as NoticeRow[]) ?? []}
        />
      );
    case "article":
      return (
        <ArticleBlock
          key={section.id}
          title={p.title as string | undefined}
          meta={p.meta as string | undefined}
          body={p.body as string[] | undefined}
          attachment={p.attachment as string | undefined}
        />
      );
    case "prev-next":
      return (
        <PrevNextNav
          key={section.id}
          prevTitle={p.prevTitle as string | undefined}
          nextTitle={p.nextTitle as string | undefined}
        />
      );
    case "list-action":
      return (
        <ListAction
          key={section.id}
          label={(p.label as string) ?? "목록"}
          showShare={Boolean(p.showShare)}
        />
      );
    case "category-tabs":
      return (
        <CategoryTabs
          key={section.id}
          categories={(p.categories as string[]) ?? ["전체"]}
          active={p.active as string | undefined}
        />
      );
    case "faq-list":
      return (
        <FaqList
          key={section.id}
          items={(p.items as FaqItemSpec[]) ?? []}
        />
      );
    case "popular-faq":
      return (
        <PopularFaq
          key={section.id}
          items={(p.items as FaqItemSpec[]) ?? []}
        />
      );
    case "empty-state":
      return (
        <EmptyState
          key={section.id}
          title={p.title as string | undefined}
          description={p.description as string | undefined}
          visible={Boolean(p.visible)}
        />
      );
    case "loading-state":
      return (
        <LoadingState
          key={section.id}
          active={Boolean(p.active)}
          rows={p.rows as number | undefined}
        />
      );
    default:
      return null;
  }
}

/**
 * Renders a materials-composed screen (not a frozen Real Example).
 * Shell chrome is light; content uses DS components + designContract tokens.
 */
export function ComposedScreen({ composition }: ComposedScreenProps) {
  const sections = composition.sections ?? [];
  const shell = sections.find(
    (s) => s.kind === "shell-admin" || s.kind === "shell-portal",
  );
  const body = sections.filter(
    (s) => s.kind !== "shell-admin" && s.kind !== "shell-portal",
  );
  const isAdmin = composition.surface === "admin";
  const navLabel = (shell?.props?.navLabel as string) ?? composition.title;
  const title = (shell?.props?.title as string) ?? composition.title;
  const isProductCatalog = composition.archetype === "product-catalog";

  return (
    <div
      className={styles.root}
      data-surface={composition.surface}
      data-archetype={composition.archetype}
      data-composed="true"
    >
      <header className={isAdmin ? styles.adminTop : styles.portalTop}>
        <div className={styles.brandMark}>{isAdmin ? "Admin" : "Portal"}</div>
        <nav className={styles.topNav} aria-label="주요 메뉴">
          <span className={styles.topNavActive}>{navLabel}</span>
          <span>홈</span>
          <span>설정</span>
        </nav>
        <div className={styles.topMeta}>미리보기</div>
      </header>

      <div className={styles.frame}>
        <div className={styles.content}>
          {isAdmin && title ? (
            <p className={styles.crumb}>
              Home / {navLabel} / {title}
            </p>
          ) : null}
          {isProductCatalog ? (
            <ProductCatalogSections sections={body} />
          ) : (
            body.map(renderSection)
          )}
        </div>
      </div>
    </div>
  );
}
