import {
  buildDesignContract,
  type DesignContract,
  type DesignSetupSnapshot,
} from "@/generator/designContract";
import {
  checklistSummary,
  composeScreen,
  suggestSurfaceFromPrompt,
  type LayoutMaterials,
} from "@/generator/compose";
import type { GenerateResult } from "@/types/recipe";
import type { CompositionNode } from "@/types/screen-composition";

export type MockGenerateOptions = {
  /** When set, attaches designContract to result + composition + json */
  setup?: DesignSetupSnapshot;
};

function attachContract(
  result: GenerateResult,
  contract: DesignContract,
  materials: LayoutMaterials,
): GenerateResult {
  return {
    ...result,
    designContract: contract,
    composition: {
      ...result.composition,
      surface: contract.surface,
      designContract: contract,
    },
    json: {
      ...result.json,
      designContract: contract,
      materials: {
        archetype: materials.archetype,
        domain: materials.domain,
        title: materials.title,
        primaryCta: materials.primaryCta,
        filterFieldIds: materials.filterFields.map((f) => f.id),
        columnKeys: materials.columns.map((c) => c.key),
        pageSize: contract.pageSize,
        totalCount: materials.totalCount,
        visibleCount:
          materials.notices.length ||
          materials.rows.length ||
          materials.faqItems.length ||
          materials.products.length ||
          0,
      },
      checklist: checklistSummary(materials.archetype),
    },
  };
}

/**
 * Materials-driven generate:
 * Prompt + DesignContract → LayoutMaterials → Composed ScreenComposition
 */
export function mockGenerate(
  prompt: string,
  options?: MockGenerateOptions,
): GenerateResult {
  const setup = options?.setup;
  const surface =
    setup?.surface ?? suggestSurfaceFromPrompt(prompt);

  const contract = setup
    ? buildDesignContract({ ...setup, surface })
    : buildDesignContract({
        resolution: "fhd",
        width: 1200,
        gap: 24,
        primary: "#228BE6",
        secondary: "#1C7ED6",
        theme: "default",
        surface,
      });

  const { composition, materials } = composeScreen(prompt, contract);

  if (materials.archetype === "unsupported") {
    const emptyNodes: CompositionNode[] = [];
    const base: GenerateResult = {
      version: "1.0",
      prompt,
      provider: "mock",
      pattern: null,
      recipes: [],
      components: [],
      composition: {
        ...composition,
        intent: "unsupported",
        nodes: emptyNodes,
        sections: [],
        recipe: [],
      },
      json: {
        error:
          "지원 Prompt: 로그인 / 회원·상품 목록 / 마이페이지 / 공지사항 / 공지사항 상세 / 자주하는 질문",
        prompt,
        flow: [
          "Prompt",
          "DesignContract materials",
          "Compose sections",
          "ComposedScreen",
        ],
      },
    };
    return attachContract(base, contract, materials);
  }

  const base: GenerateResult = {
    version: "1.0",
    prompt,
    provider: "mock",
    pattern: {
      id: `Composed:${materials.archetype}`,
      name: materials.title,
      reason: `Materials → ${materials.archetype} (${materials.domain})`,
    },
    recipes: composition.recipe,
    components: composition.nodes.map((n) => n.component),
    composition,
    json: {
      prompt,
      flow: [
        "Prompt",
        "DesignContract materials",
        "Compose sections",
        "ComposedScreen",
      ],
      archetype: materials.archetype,
      domain: materials.domain,
      checklist: checklistSummary(materials.archetype),
      sections: composition.sections?.map((s) => ({
        id: s.id,
        kind: s.kind,
      })),
      nodes: composition.nodes.map((node) => ({
        id: node.id,
        component: node.component,
        variant: node.variant,
      })),
    },
  };

  return attachContract(base, contract, materials);
}

export async function generateFromPrompt(
  prompt: string,
  provider: "mock" = "mock",
  options?: MockGenerateOptions,
): Promise<GenerateResult> {
  if (provider !== "mock") {
    throw new Error(`Provider ${provider} is not wired yet. Use mock.`);
  }
  return mockGenerate(prompt, options);
}

export type { DesignContract, DesignSetupSnapshot };
export { suggestSurfaceFromPrompt };
