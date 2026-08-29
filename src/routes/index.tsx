import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import homeHtml from "../site/home.html?raw";
import locksCss from "../site/locks.css?raw";
import { initSiteRuntime } from "../site/runtime";

const yellowThemeOverrides = `
:root{--theme-blue:#facc15;--theme-blue-bright:#fde047;--theme-blue-electric:#eab308;--theme-blue-soft:#fef08a}
body:before{background:radial-gradient(circle at 16% 10%,rgba(250,204,21,.24),transparent 32%),radial-gradient(circle at 82% 36%,rgba(234,179,8,.14),transparent 30%),radial-gradient(circle at 52% 82%,rgba(253,224,71,.09),transparent 28%),linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.58))!important}
[data-copyai-node-id="n81"],[data-copyai-node-id="n141"],[data-copyai-node-id="n170"]{background-image:linear-gradient(135deg,#fefce8 0%,#fef08a 30%,#fde047 62%,#eab308 100%)!important;filter:drop-shadow(0 0 20px rgba(250,204,21,.38))!important}
[data-copyai-node-id="n84"],[data-copyai-node-id="n148"],[data-copyai-node-id="n173"],[data-copyai-node-id="n156"],[data-copyai-node-id="n160"],[data-copyai-node-id="n164"]{color:#fde047!important}
[data-copyai-node-id="n250"],[data-copyai-node-id="n267"],.conversion-sticky-cta button{background:linear-gradient(135deg,#eab308,#fde047)!important}
[data-copyai-node-id="n88"].btn-primary,[data-copyai-node-id="n177"].btn-primary{background:linear-gradient(135deg,#a16207 0%,#ca8a04 32%,#eab308 62%,#fde047 100%)!important;border-color:rgba(254,240,138,.70)!important;box-shadow:0 16px 40px rgba(234,179,8,.34),0 0 30px rgba(250,204,21,.20),inset 0 1px 0 rgba(255,255,255,.55)!important}
[data-copyai-node-id="n88"].btn-primary:hover,[data-copyai-node-id="n177"].btn-primary:hover{background:linear-gradient(135deg,#eab308,#facc15,#fde047)!important;box-shadow:0 22px 56px rgba(234,179,8,.44),0 0 38px rgba(253,224,71,.24)!important}
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
      <style id="yellow-theme-overrides" dangerouslySetInnerHTML={{ __html: yellowThemeOverrides }} />
    </>
  );
}
