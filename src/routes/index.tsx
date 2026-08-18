import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import homeHtml from "../site/home.html?raw";
import locksCss from "../site/locks.css?raw";
import { initSiteRuntime } from "../site/runtime";

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
      <style id="copyai-hard-visual-locks" dangerouslySetInnerHTML={{ __html: locksCss }} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: homeHtml }} />
    </>
  );
}
