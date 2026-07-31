"use client";

import { useMemo, useState } from "react";
import { Button } from "@/design-system/components";
import {
  exportCatalogComponentsJson,
  exportCatalogPatternsJson,
  exportCatalogRecipesJson,
  getCatalogComponent,
  getPatternRegistry,
  getRecipe,
  listCatalogComponentIds,
  listPatternRegistry,
  listRecipes,
  recipeComponentLabels,
} from "@/catalog";
import styles from "./registry.module.css";

type Tab = "components" | "recipes" | "patterns" | "json";

export default function RegistryViewerPage() {
  const componentIds = listCatalogComponentIds();
  const recipes = listRecipes();
  const patterns = listPatternRegistry();

  const [tab, setTab] = useState<Tab>("components");
  const [componentId, setComponentId] = useState(componentIds[0] ?? "button");
  const [recipeId, setRecipeId] = useState(recipes[0]?.id ?? "login-form");
  const [patternId, setPatternId] = useState(patterns[0]?.id ?? "Login");

  const component = getCatalogComponent(componentId);
  const recipe = getRecipe(recipeId);
  const pattern = getPatternRegistry(patternId);

  const activeJson = useMemo(() => {
    if (tab === "json") {
      return JSON.stringify(
        {
          components: JSON.parse(exportCatalogComponentsJson(false)),
          recipes: JSON.parse(exportCatalogRecipesJson(false)),
          patterns: JSON.parse(exportCatalogPatternsJson(false)),
        },
        null,
        2,
      );
    }
    if (tab === "components") {
      return component ? JSON.stringify(component, null, 2) : "{}";
    }
    if (tab === "recipes") {
      return recipe ? JSON.stringify(recipe, null, 2) : "{}";
    }
    return pattern ? JSON.stringify(pattern, null, 2) : "{}";
  }, [tab, component, recipe, pattern]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Registry Viewer</p>
        <h1 className={styles.title}>Component · Recipe · Pattern Registry</h1>
        <p className={styles.sub}>
          JSON 기반 Registry — 수정하면 Prompt Playground Preview가 자동으로
          반영됩니다.
        </p>
      </header>

      <div className={styles.tabs}>
        {(
          [
            ["components", "Components"],
            ["recipes", "Recipes"],
            ["patterns", "Patterns"],
            ["json", "JSON"],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            size="s"
            variant={tab === id ? "primary" : "ghost"}
            onClick={() => setTab(id)}
          >
            {label}
          </Button>
        ))}
        <Button
          size="s"
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(activeJson)}
        >
          Copy JSON
        </Button>
      </div>

      {tab === "components" ? (
        <>
          <div className={styles.row}>
            {componentIds.map((id) => (
              <Button
                key={id}
                size="s"
                variant={componentId === id ? "primary" : "ghost"}
                onClick={() => setComponentId(id)}
              >
                {id}.json
              </Button>
            ))}
          </div>
          {component ? (
            <div className={styles.metaGrid}>
              {(
                [
                  ["id", component.id],
                  ["name", component.name],
                  ["category", component.category],
                  ["purpose", component.purpose],
                  ["aliases", component.aliases.join(", ")],
                  ["variants", component.variants.join(", ")],
                  ["sizes", component.sizes.join(", ")],
                  ["states", component.states.join(", ")],
                  ["dependencies", component.dependencies.join(", ")],
                  ["accessibility", component.accessibility.join(" · ")],
                  [
                    "aiRules",
                    component.aiRules.map((r) => r.id).join(", "),
                  ],
                  ["figmaMapping", component.figmaMapping.join(" · ")],
                ] as const
              ).map(([label, value]) => (
                <article key={label} className={styles.metaCard}>
                  <h2>{label}</h2>
                  <p>{value}</p>
                </article>
              ))}
            </div>
          ) : null}
        </>
      ) : null}

      {tab === "recipes" ? (
        <>
          <div className={styles.row}>
            {recipes.map((r) => (
              <Button
                key={r.id}
                size="s"
                variant={recipeId === r.id ? "primary" : "ghost"}
                onClick={() => setRecipeId(r.id)}
              >
                {r.id}.json
              </Button>
            ))}
          </div>
          {recipe ? (
            <div className={styles.metaGrid}>
              <article className={styles.metaCard}>
                <h2>id</h2>
                <p>{recipe.id}</p>
              </article>
              <article className={styles.metaCard}>
                <h2>name</h2>
                <p>{recipe.name}</p>
              </article>
              <article className={styles.metaCard}>
                <h2>description</h2>
                <p>{recipe.description}</p>
              </article>
              <article className={styles.metaCard}>
                <h2>components (id refs)</h2>
                <p>
                  {recipe.components
                    .map(
                      (c) =>
                        `${c.componentId}${c.variant ? `.${c.variant}` : ""}`,
                    )
                    .join(" → ")}
                </p>
              </article>
              <article className={styles.metaCard}>
                <h2>display</h2>
                <p>{recipeComponentLabels(recipe).join(" · ")}</p>
              </article>
              <article className={styles.metaCard}>
                <h2>status</h2>
                <p>{recipe.status}</p>
              </article>
            </div>
          ) : null}
        </>
      ) : null}

      {tab === "patterns" ? (
        <>
          <div className={styles.row}>
            {patterns.map((p) => (
              <Button
                key={p.id}
                size="s"
                variant={patternId === p.id ? "primary" : "ghost"}
                onClick={() => setPatternId(p.id)}
              >
                {p.id}.json
              </Button>
            ))}
          </div>
          {pattern ? (
            <div className={styles.metaGrid}>
              <article className={styles.metaCard}>
                <h2>id</h2>
                <p>{pattern.id}</p>
              </article>
              <article className={styles.metaCard}>
                <h2>name</h2>
                <p>{pattern.name}</p>
              </article>
              <article className={styles.metaCard}>
                <h2>description</h2>
                <p>{pattern.description}</p>
              </article>
              <article className={styles.metaCard}>
                <h2>recipes</h2>
                <p>{pattern.recipes.join(" → ")}</p>
              </article>
              <article className={styles.metaCard}>
                <h2>surface / intent</h2>
                <p>
                  {pattern.surface} / {pattern.intent}
                </p>
              </article>
              <article className={styles.metaCard}>
                <h2>keywords</h2>
                <p>{pattern.keywords.join(", ")}</p>
              </article>
            </div>
          ) : null}
        </>
      ) : null}

      {tab === "json" ? (
        <p className={styles.sub}>
          Full export of Components + Recipes + Patterns registries.
        </p>
      ) : null}

      <section className={styles.codePanel}>
        <h2 className={styles.sectionTitle}>
          {tab === "json"
            ? "registries.json"
            : tab === "components"
              ? `${componentId}.json`
              : tab === "recipes"
                ? `${recipeId}.json`
                : `${String(patternId).toLowerCase()}.json`}
        </h2>
        <pre className={styles.code}>{activeJson}</pre>
      </section>
    </main>
  );
}
