import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import homeHtml from "../site/home.html?raw";
import locksCss from "../site/locks.css?raw";
import { initSiteRuntime } from "../site/runtime";

const redBackgroundOverrides = `
body:before {
  background: radial-gradient(circle at 16% 10%, rgba(220,38,38,.24), transparent 32%),
    radial-gradient(circle at 82% 36%, rgba(185,28,28,.14), transparent 30%),
    radial-gradient(circle at 52% 82%, rgba(248,113,113,.09), transparent 28%),
    linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.58)) !important;
}
.hero-card,
[data-copyai-node-id="n78"],
[data-copyai-node-id="n167"] {
  background: linear-gradient(145deg, rgba(55,8,8,.96) 0%, rgba(3,3,3,.99) 52%, rgba(48,6,6,.94) 100%) !important;
}
.hero-card:before,
[data-copyai-node-id="n78"]:before,
[data-copyai-node-id="n167"]:before {
  background: radial-gradient(circle, rgba(220,38,38,.22), transparent 66%) !important;
}
.hero-card:after,
[data-copyai-node-id="n78"]:after,
[data-copyai-node-id="n167"]:after {
  background: radial-gradient(circle, rgba(185,28,28,.13), transparent 70%) !important;
}
.stats-card,
.feature-card {
  background: linear-gradient(145deg, rgba(52,7,7,.90), rgba(3,3,3,.97)) !important;
}
.category-big-card:hover {
  background: linear-gradient(145deg, rgba(185,28,28,.13), rgba(5,5,5,.72)) !important;
}
.conversion-sticky-cta {
  background: linear-gradient(135deg, rgba(55,8,8,.96), rgba(1,1,1,.98)) !important;
}
`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JordanX — Domine o jogo sem limites" },
      {
        name: "description",
        content:
          "Paineis, otimizacao, bypass e headtrick. Tudo o que voce precisa para elevar sua gameplay ao proximo nivel.",
      },
      { property: "og:title", content: "JordanX — Domine o jogo sem limites" },
      {
        property: "og:description",
        content:
          "Paineis, otimizacao, bypass e headtrick. Tudo o que voce precisa para elevar sua gameplay ao proximo nivel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/images/logo.webp" },
      { rel: "apple-touch-icon", href: "/images/logo.webp" },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return initSiteRuntime(ref.current);
  }, []);

  return (
    <>
      <div ref={ref} dangerouslySetInnerHTML={{ __html: homeHtml }} />
      <style id="copyai-hard-visual-locks" dangerouslySetInnerHTML={{ __html: locksCss }} />
      <style id="red-background-overrides" dangerouslySetInnerHTML={{ __html: redBackgroundOverrides }} />
    </>
  );
}
