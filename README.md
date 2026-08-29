# Pixel Perfect Rebuilder

REGRA DE UPLOAD MULTIPART: se existir UPLOAD_PARTS_MANIFEST.json e o conjunto indicar mais de um lote, NÃO reconstrua enquanto a parte final e o arquivo ALL_PARTS_RECEIVED_WHEN_THIS_IS_PRESENT.md não tiverem sido recebidos. Ao fim de lote não-final, peça explicitamente o próximo lote.

Reconstrua este projeto no Lovable com fidelidade visual e funcional máxima. Antes de começar, leia CAPTURE_COMPLETENESS.json: se unresolvedPublicLinks for maior que 0, journey.timedOut for true ou houver páginas em deepEvidenceTruncatedPages, NÃO finja que o ecossistema está completo; informe que a captura precisa ser refeita/completada. Leia PROJECT_CONTEXT.md, CAPTURE_COMPLETENESS.json, LOVABLE.md, visual-spec.json, LAYOUT_MAP.json, ROUTE_MAP.json, LINK_MAP.json, ANCHOR_MAP.json, SITE_JOURNEY.json, BEHAVIOR_TIMELINE.json, ANIMATION_MAP.json, MOTION_TIMELINE.json, EXACT_TEXT.json, EXACT_TEXT_ALL_PAGES.json, PAGE_EVIDENCE.json, ANIMATION_MAP_ALL_PAGES.json, EVIDENCE_REUSE_MAP.json, ASSET_REFERENCE_REPAIR.json, ASSET_BINDINGS_ALL_PAGES.json, ASSET_CAPTURE_AUDIT.json, PUBLIC_RUNTIME_RESOURCES.json, CRITICAL_VISUAL_LOCKS.json, PAINT_STYLE_MAP.json, STYLE_STATE_MAP.json, INTERACTION_CONTRACTS.json, NAVIGATION_CONTRACTS.json, EMBED_MAP.json, CAPTURE_VISUAL_READINESS.json, PIXEL_QA_CHECKLIST.md, UI_CONTROL_MAP.json, THEME_ASSET_MAP.json, WIDGET_CONTRACTS.json, COMMUNICATION_LINKS.json, CRITICAL_GEOMETRY.json, INTERACTION_STATES.json, SCROLL_CONTAINER_STATES.json, media-manifest.json, MEDIA_TO_REPLACE.json, INTERACTIONS.json, LINKS_TO_REPLACE.json e todos os arquivos de referência antes de alterar qualquer coisa. Se LAYOUT_MAP.json, PAGE_EVIDENCE.json, EXACT_TEXT_ALL_PAGES.json ou ANIMATION_MAP_ALL_PAGES.json tiver sharded=true, leia TODOS os arquivos listados em shards na ordem e una logicamente os arrays items antes de reconstruir. Se existir oversized-json-recovery/, siga cada RECOVERY.json e recupere o conteúdo original; não ignore evidência por tamanho. Use TODAS as capturas da pasta screenshots/ como evidência, mas respeite a função de cada conjunto: screenshots/detail-XX.png e screenshots/pages/*/detail-XX.png são a BASELINE LIMPA e têm prioridade absoluta para o layout geral da página; screenshots/interactions/ e screenshots/pages/*/interactions/ representam SOMENTE o estado isolado aberto pelo gatilho correspondente. Nunca transforme backdrop, overlay, modal ou fundo escurecido de uma captura de interação em estado permanente da página. Use o manifest.json com posições; HTML/CSS como fonte estrutural e assets locais como fonte prioritária de imagens, fontes e vídeos. REGRA DE FIDELIDADE BLOQUEANTE: leia 00_RECONSTRUCTION_CONTRACT.md primeiro. Não redesenhe nem "interprete" uma página que já existe em HTML/CSS capturado. Primeiro preserve literalmente a ordem do DOM, classes, estilos inline, dimensões e bindings de assets e importe/use styles.css original sem convertê-lo para Tailwind; só componentize ou converta estilos depois de a comparação visual bater. Se ASSET_BINDINGS_ALL_PAGES.json indicar localPath para uma imagem/background/poster, é proibido deixar o espaço vazio, trocar a arte ou substituir por placeholder. PUBLIC_RUNTIME_RESOURCES.json contém scripts públicos locais: execute-os na mesma ordem da página capturada para tema, idioma, catálogo, contadores, modais e utilidades; não dependa do domínio original quando houver localPath. Preserve responsividade, tipografia, espaçamentos, cores, gradientes, sombras, bordas, filtros, pseudo-elementos, ícones, vídeos, animações e interações de interface. EMBEDS EXTERNOS SÃO OBRIGATÓRIOS: leia EMBED_MAP.json. Para YouTube/Vimeo/Wistia/Bunny/Cloudflare Stream e demais iframes capturados, preserve/recrie um iframe funcional usando exatamente o src capturado, allow, allowfullscreen, dimensões, aspect-ratio, bordas e posição. Quando EMBED_MAP fornecer mode=custom-launcher, preserve PRIMEIRO o botão/poster/overlay original capturado (launcherNodeId, posterNodeId e overlayNodes) sem redesenhá-lo; no primeiro clique troque somente a área de mídia pelo iframe real. Quando EMBED_MAP fornecer posterLocalPath em iframe nativo, use esse poster HD local como camada inicial nítida exatamente até o primeiro clique e então revele/inicie o iframe real; isso NÃO é substituição estática do player. Fora desse estado inicial, não substitua um player incorporado por imagem, caixa vazia ou MEDIA_TO_REPLACE; embeds não são vídeos grandes para download separado. CRITICAL_VISUAL_LOCKS.json é a lista curta de aceitação visual e tem prioridade máxima: aplique literalmente backgroundImage/gradient, cor, borda, sombra, filtro e text-fill de cada lock; nunca troque um CTA violeta/verde/ciano por uma cor primária genérica. O HTML também contém <style id="copyai-hard-visual-locks"> com seletores por data-copyai-node-id e !important SOMENTE para acentos estáticos. É PROIBIDO remover esse style ou os data-copyai-node-id antes da QA. IMPORTANTE: STYLE_STATE_MAP, THEME_ASSET_MAP e ANIMATION_MAP/MOTION_TIMELINE têm prioridade sobre hard locks para dark/light, hover/active e elementos animados; jamais congele uma superfície do tema inicial nem torne texto shiny transparente se o computed text-fill original era visível. THEME_ASSET_MAP registra logos/imagens que trocam entre claro/escuro e deve ser aplicado em runtime. WIDGET_CONTRACTS registra abrir/fechar de widgets públicos; preserve somente a UI, sem restaurar backend privado. Não congele transform/opacity/fase de animações: gradientes animados podem estar em fase temporal diferente, mas devem manter os mesmos stops, direção, duração e keyframes. PAINT_STYLE_MAP e STYLE_STATE_MAP têm prioridade sobre qualquer tentativa de simplificar para uma cor primária. FAQ/accordions, tabs, menus, drawers, modais, botões "ver pacote", "ver ferramentas" e componentes expansíveis devem ser clicáveis e reproduzir o comportamento observado; use INTERACTIONS.json, INTERACTION_STATES.json, screenshots/interactions/ e copyai-runtime.js como evidência/fallback. Não deixe controles visualmente clicáveis sem ação. EVIDENCE_REUSE_MAP.json e arquivos EVIDENCE_REUSE.json indicam somente reutilização de comportamento entre traduções estruturalmente equivalentes: cada página ainda deve usar seu próprio HTML, texto exato, rota e baseline; nunca copie o idioma/texto do representante. Abra e reconstrua todos os estados seguros observados: tabs, categorias, drawers, modais, menus, FAQs, detalhes, “ver pacote”, “ver ferramentas” e painéis internos roláveis. Use SCROLL_CONTAINER_STATES.json para conteúdos que exigem scroll dentro de containers. Elementos que mudam com o tempo (widgets de suporte, mensagens rotativas, banners, toasts e CTAs) devem reproduzir exatamente a sequência registrada em BEHAVIOR_TIMELINE.json, incluindo ordem, textos e timing aproximado. Use screenshots/temporal/ para validar cada estado e mantenha a sequência cíclica quando houver múltiplas mensagens/estados do mesmo componente. Preserve animações contínuas, fundos vivos, canvas/Lottie/GIF/partículas e estados de modal conforme ANIMATION_MAP.json e as capturas em screenshots/temporal/. Para preços, valores e textos sensíveis, use EXACT_TEXT.json e EXACT_TEXT_ALL_PAGES.json literalmente em TODAS as páginas, inclusive pseudo-elementos, tipografia e line-height. Se uma captura visual estiver parcialmente coberta por modal/overlay ou divergir do texto exato, o conteúdo textual e a geometria computada têm prioridade; nunca invente preço, valor, moeda, periodicidade ou alinhamento. Converta páginas internas em rotas, reutilize header/footer/componentes repetidos sem mudar a aparência e não invente elementos. Links de checkout/pagamento, submissões de backend/autenticação e comunicação externa foram intencionalmente neutralizados: preserve o visual dos botões/CTAs/formulários, mas não restaure os destinos originais. Isso inclui WhatsApp, Telegram, Discord, Google Meet, Zoom, Teams, Slack, Skype, Signal, Messenger, Viber, LINE, WeChat, Kakao, Matrix/Element, Jitsi, Webex, Whereby, GoTo Meeting, RingCentral, Chime, Lark/Feishu, Tencent/VooV Meeting, DingTalk, Zoho Meeting/Cliq, Mattermost, Rocket.Chat, SimpleX, Session, FaceTime/SIP, serviços de agendamento e live-chat equivalentes; use COMMUNICATION_LINKS.json e LINKS_TO_REPLACE.json para os pontos que o usuário deve substituir. Use ROUTE_MAP.json, LINK_MAP.json, ANCHOR_MAP.json, SITE_JOURNEY.json e PAGE_EVIDENCE.json para reconstruir TODO o front-end público alcançável do ecossistema, inclusive páginas de outros domínios que façam parte do fluxo. Em login/área de membros, replique apenas o front público observado e não invente autenticação/backend. Estados internos revelados por FAQ, catálogo, drawer, modal, tabs e botões devem continuar funcionais. Todo link cuja página foi capturada deve apontar para a rota local clonada, nunca para o domínio original. Âncoras que descem para outra seção da mesma página devem continuar funcionando como âncoras locais. Leia LAYOUT_MAP.json antes de posicionar qualquer componente: preserve centro, largura, margens, flex/grid, proporções e relação pai/filho; logos devem manter exatamente a centragem observada. Antes de finalizar, percorra primeiro screenshots/temporal/ para entender mudanças ao longo do tempo e depois todas as capturas detail-XX.png em ordem e confira cada transição de viewport, botão, CTA, card, borda, ícone e estado visível. Antes de reconstruir, confira CRITICAL_GEOMETRY.json e screenshots/critical/ para logos, preços, suporte, modais e CTAs; preserve centragem e relação geométrica com o elemento pai. Faça uma primeira reconstrução funcional e depois uma segunda passada de comparação visual seção por seção, corrigindo alinhamento, dimensões, line-height, gaps, breakpoints, posicionamento e comportamento até ficar o mais próximo possível da referência. Na QA final, valide obrigatoriamente: (1) nenhuma imagem/background com localPath ficou vazia; (2) contadores/preços exibem o estado hidratado capturado, nunca placeholders como 0+ quando a baseline mostra valor final; (3) seletor PT/EN/ES navega para as rotas locais corretas e muda o conteúdo; (4) tema claro/escuro funciona quando o controle existe; (5) FAQ, "VER BENEFÍCIOS", "Ver Pacote", menus, tabs e utilidades públicas usam os scripts locais/fallbacks; (6) mascotes/Spline/widgets permanecem na camada e posição registradas, sem invadir cards ou mudar de lado; (7) todo item de EMBED_MAP.json renderiza player/iframe funcional, especialmente YouTube/Vimeo; quando houver posterLocalPath, a miniatura inicial é o asset HD local, nítida, e o clique inicia o iframe real; nenhum aparece como caixa vazia ou thumbnail borrada. Se MEDIA_TO_REPLACE.json tiver itens, preserve exatamente o espaço, proporção, poster, bordas e responsividade do player original e deixe o componente claramente preparado para receber uma nova URL; não restaure automaticamente a URL original. Não implemente backend privado, autenticação de terceiros, DRM ou conteúdo protegido que não esteja presente no pacote.

## ETAPA FINAL OBRIGATÓRIA — PIXEL QA AUTOMÁTICO PÓS-RECONSTRUÇÃO

IMPORTANTE: esta etapa faz parte do MESMO trabalho. Quando a primeira reconstrução funcional estiver concluída, NÃO finalize, NÃO responda ao usuário ainda e NÃO espere um novo prompt. Continue automaticamente com toda a etapa abaixo sobre a implementação já criada.

A captura e a reconstrução funcional já estão concluídas. NÃO recrie o projeto do zero e NÃO altere a arquitetura que já está funcionando.

Agora execute exclusivamente uma PASSADA FINAL DE QA VISUAL / PIXEL MATCH usando todos os arquivos de evidência já enviados.

OBJETIVO:

Levar a implementação atual ao máximo de fidelidade visual possível em relação às capturas originais.

REGRA PRINCIPAL:

A implementação atual NÃO deve ser considerada aprovada apenas porque as rotas, textos e interações funcionam. Compare visualmente a página pronta contra as screenshots originais e corrija todas as diferenças perceptíveis.

1. HOME — comparação obrigatória

Compare a página `/` sequencialmente com TODAS as imagens listadas em `screenshots/manifest.json`, começando em `screenshots/detail-01.png` e seguindo até o último `detail-XX.png` existente.

Use o `screenshots/manifest.json` para respeitar exatamente as posições de scroll e viewports capturadas.

Para cada screenshot:

- vá para a mesma posição da página;

- compare a implementação atual;

- corrija a diferença;

- só depois passe para a próxima.

Não altere conteúdo correto apenas para “melhorar” o design.

2. NÃO ACEITE APROXIMAÇÕES

Corrija especialmente:

- largura máxima dos containers;

- escala geral dos componentes;

- margens laterais;

- alturas das seções;

- gaps verticais;

- gaps horizontais;

- alinhamento centro/esquerda;

- tamanho dos cards;

- tamanho dos títulos;

- line-height;

- peso das fontes;

- tracking;

- largura dos textos;

- posicionamento dos CTAs;

- radius;

- sombras;

- bordas;

- opacidades;

- gradientes;

- glow;

- blur;

- background lights;

- pseudo-elementos;

- posição dos elementos decorativos;

- posição dos widgets flutuantes.

A página deve parecer a MESMA página da screenshot, não apenas uma página parecida com o mesmo conteúdo.

3. FUNDO / EFEITOS VISUAIS

As screenshots originais mostram halos/glows coloridos e efeitos de fundo em posições específicas.

Leia:

- `PAINT_STYLE_MAP.json`

- `CRITICAL_VISUAL_LOCKS.json`

- `ANIMATION_MAP.json`

- `MOTION_TIMELINE.json`

- `STYLE_STATE_MAP.json`

Não deixe o fundo visualmente mais simples que o original.

Preserve:

- intensidade;

- blur;

- tamanho;

- posição;

- transparência;

- movimento;

- direção;

- gradientes.

Não substitua efeitos por um background escuro uniforme.

4. ESCALA E GEOMETRIA

Leia novamente:

- `LAYOUT_MAP.json`

- `CRITICAL_GEOMETRY.json`

- `visual-spec.json`

- visual-spec de cada página.

Se a reconstrução atual estiver maior, menor, mais larga ou mais espaçada que a referência, ajuste.

Dê prioridade à geometria computada capturada, não à interpretação visual.

5. ROTAS INTERNAS

Faça a mesma comparação visual em TODAS as rotas internas capturadas neste pacote:

(nenhuma rota interna adicional foi capturada neste pacote)

Use as screenshots dentro de:

`screenshots/pages/<rota-capturada>/detail-XX.png`

e o `manifest.json` existente dentro de cada pasta de página para identificar a ordem, posição de scroll e quantidade real de screenshots.

Não use a aparência da HOME como padrão para essas páginas. Cada rota possui sua própria baseline.

6. TEMA CLARO E ESCURO

Se o controle de tema existir, ele já deve funcionar. NÃO quebre.

Agora valide visualmente todos os estados de tema realmente registrados usando:

- `STYLE_STATE_MAP.json`

- `THEME_ASSET_MAP.json`

- screenshots correspondentes.

Verifique:

- cores de fundo;

- cards;

- textos;

- bordas;

- logos;

- ícones;

- CTA;

- shadows;

- gradients.

Não aplique simplesmente “inversão de cores”.

7. INTERAÇÕES

Não altere as interações que já funcionam.

Apenas verifique visualmente os estados usando:

- `INTERACTION_STATES.json`

- `INTERACTION_CONTRACTS.json`

- `screenshots/interactions/`

- screenshots de interação de cada rota.

Modal, FAQ, menu, drawer ou widget aberto deve reproduzir apenas o estado correspondente.

Não deixe overlay/modal permanentemente ativo.

8. RESPONSIVIDADE

Depois de terminar desktop, valide todos os breakpoints e viewports registrados nas evidências.

Não “otimize” a página usando novos breakpoints.

Preserve os mesmos:

- wraps;

- stacks;

- tamanhos;

- margens;

- alinhamentos;

- ordem visual.

9. NÃO REFAÇA O QUE JÁ ESTÁ CERTO

Não:

- migre CSS para Tailwind;

- redesenhe componentes;

- substitua assets;

- altere textos;

- troque preços;

- crie novas seções;

- remova scripts;

- remova `data-copyai-node-id`;

- remova `copyai-hard-visual-locks`;

- substitua HTML capturado por uma versão “mais limpa”.

Esta etapa é somente correção final.

10. CRITÉRIO DE APROVAÇÃO

Antes de dizer que terminou, valide TODAS as screenshots de TODAS as rotas capturadas.

Para cada página, a implementação deve manter:

- mesma posição dos elementos;

- mesma largura;

- mesma altura;

- mesma escala;

- mesma tipografia;

- mesmas cores;

- mesmos efeitos;

- mesmo background;

- mesmos assets;

- mesmos estados visuais.

Se ainda existir diferença visível entre a implementação e a screenshot correspondente, continue corrigindo.

NÃO responda simplesmente “concluído”.

Ao terminar, informe objetivamente quais diferenças visuais foram encontradas e corrigidas na:

- home;

- páginas internas;

- dark mode, quando existir;

- light mode, quando existir;

- mobile/responsividade;

- interações.

Faça agora a PASSADA FINAL DE PIXEL QA e ajuste a implementação existente até ficar o mais próximo possível das evidências originais.

REGRA DE ENCERRAMENTO:

Somente depois de concluir integralmente esta segunda passada visual é permitido considerar a reconstrução finalizada. Não pare após a primeira reconstrução funcional e não espere o usuário pedir a correção.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/af9797f9-414b-46b0-b2a0-d9742ccd77ae).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
