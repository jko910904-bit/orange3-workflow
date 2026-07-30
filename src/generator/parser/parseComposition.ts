import type { CompositionNode, ScreenComposition } from "@/types/screen-composition";

function isLoginPrompt(prompt: string): boolean {
  const lower = prompt.toLowerCase();
  return ["로그인", "login", "signin", "sign in", "인증"].some((k) =>
    lower.includes(k),
  );
}

/**
 * Prompt → ScreenComposition (mock AI).
 * Example: "로그인 화면 만들어줘" →
 *   Button.Primary → Input.Email → Input.Password → Checkbox → Button.Primary
 */
export function parsePromptToComposition(prompt: string): ScreenComposition {
  if (isLoginPrompt(prompt)) {
    const nodes: CompositionNode[] = [
      {
        id: "login-cta-social",
        component: "Button",
        variant: "Primary",
        size: "M",
        props: { children: "소셜 계정으로 계속", width: "fill" },
      },
      {
        id: "login-email",
        component: "Input",
        variant: "Email",
        size: "M",
        props: {
          label: "이메일",
          placeholder: "name@company.com",
          autoComplete: "email",
        },
      },
      {
        id: "login-password",
        component: "Input",
        variant: "Password",
        size: "M",
        props: {
          label: "비밀번호",
          placeholder: "Password",
          autoComplete: "current-password",
        },
      },
      {
        id: "login-remember",
        component: "Checkbox",
        variant: "Default",
        props: { label: "로그인 유지", defaultChecked: false },
      },
      {
        id: "login-submit",
        component: "Button",
        variant: "Primary",
        size: "M",
        props: { children: "로그인", width: "fill", type: "submit" },
      },
    ];

    return {
      version: "1.0",
      intent: "login",
      prompt,
      surface: "portal",
      recipe: nodes.map(
        (n) => `${n.component}.${n.variant ?? "Default"}`,
      ),
      nodes,
    };
  }

  // Fallback: single primary action (extensible later)
  const nodes: CompositionNode[] = [
    {
      id: "fallback-action",
      component: "Button",
      variant: "Primary",
      size: "M",
      props: { children: "확인" },
    },
  ];

  return {
    version: "1.0",
    intent: "unknown",
    prompt,
    surface: "admin",
    recipe: ["Button.Primary"],
    nodes,
  };
}
