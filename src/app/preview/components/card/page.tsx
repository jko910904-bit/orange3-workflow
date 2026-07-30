"use client";

import { useState } from "react";
import { Button, Card, Input } from "@/design-system/components";
import styles from "@/design-system/components/card/card.module.css";
import { DensityProvider, useDensity } from "@/design-system/DensityProvider";

function CardMatrix() {
  const { surface, setSurface, label } = useDensity();
  const [selected, setSelected] = useState(0);

  return (
    <main className="ds-stack mx-auto max-w-5xl px-6 py-12">
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Components · Card
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          State · Slots · Shadow / Radius / Padding
        </h1>
        <p className="ds-muted text-sm">
          Default / Selected / Hover · Header / Body / Footer · token elevation
          · {label}
        </p>
      </header>

      <div className="ds-row">
        <Button
          variant={surface === "admin" ? "primary" : "ghost"}
          size="s"
          onClick={() => setSurface("admin")}
        >
          Admin / Compact
        </Button>
        <Button
          variant={surface === "portal" ? "primary" : "ghost"}
          size="s"
          onClick={() => setSurface("portal")}
        >
          Portal / Comfortable
        </Button>
      </div>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">State · Default / Hover / Selected</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Card
              key={i}
              interactive
              state={selected === i ? "selected" : "default"}
              shadow="1"
              radius="8"
              padding="m"
              role="button"
              tabIndex={0}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(i);
                }
              }}
            >
              <Card.Header>
                <span className={styles.badge}>API</span>
              </Card.Header>
              <Card.Body>
                <h3 className={styles.title}>
                  {selected === i ? "Selected" : "Default → Hover"}
                </h3>
                <p className={styles.description}>
                  Click to select. Hover lifts shadow via elevation.2.
                </p>
              </Card.Body>
              <Card.Footer>
                <Button variant="tertiary" size="s" width="fill">
                  API 보기
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Slots · Header / Body / Footer</h2>
        <div style={{ maxWidth: 360 }}>
          <Card shadow="2" radius="8" padding="l">
            <Card.Header>
              <span className={styles.badge}>DATA API</span>
              <span className="ds-muted text-xs">Header</span>
            </Card.Header>
            <Card.Body>
              <h3 className={styles.title}>ESG인증통계</h3>
              <p className={styles.description}>
                Body — 기업의 ESG인증 보유 현황을 제공
              </p>
            </Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="s" width="fill">
                Footer action
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Shadow · Radius · Padding</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card shadow="1" radius="4" padding="s">
            <Card.Body>
              <h3 className={styles.title}>shadow.1 · R4 · pad S</h3>
              <p className={styles.description}>elevation.1 / radius.4 / spacing.12</p>
            </Card.Body>
          </Card>
          <Card shadow="2" radius="8" padding="m">
            <Card.Body>
              <h3 className={styles.title}>shadow.2 · R8 · pad M</h3>
              <p className={styles.description}>elevation.2 / radius.8 / spacing.16</p>
            </Card.Body>
          </Card>
          <Card shadow="3" radius="16" padding="l">
            <Card.Body>
              <h3 className={styles.title}>shadow.3 · R16 · pad L</h3>
              <p className={styles.description}>elevation.3 / radius.16 / spacing.20</p>
            </Card.Body>
          </Card>
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Composition · Card + Input + Button</h2>
        <div style={{ maxWidth: 420 }}>
          <Card shadow="1" radius="8" padding="m">
            <Card.Header>
              <h3 className={styles.title}>Search in card</h3>
            </Card.Header>
            <Card.Body>
              <Input kind="search" size="s" placeholder="Keyword" />
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" size="s" width="fill">
                조회
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default function CardPreviewPage() {
  return (
    <DensityProvider defaultSurface="portal">
      <CardMatrix />
    </DensityProvider>
  );
}
