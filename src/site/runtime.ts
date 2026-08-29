// Runtime for the mirrored JordanX page: constellation canvas, hero typewriter,
// language dropdown, theme switch, category tabs and CTA anchors.
// Recreates the observed behaviour of the captured page without its original backend.

type Dot = { x: number; y: number; vx: number; vy: number };

export function initSiteRuntime(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  /* ---------- conversion enhancements ---------- */
  const heroCopy = root.querySelector<HTMLElement>('[data-copyai-node-id="n79"]');
  const heroTitle = root.querySelector<HTMLElement>('[data-copyai-node-id="n80"]');
  const heroLead = root.querySelector<HTMLElement>('[data-copyai-node-id="n85"]');
  const heroSub = root.querySelector<HTMLElement>('[data-copyai-node-id="n86"]');
  const heroCta = root.querySelector<HTMLButtonElement>('[data-copyai-node-id="n88"]');

  if (heroCopy) {
    heroCopy.classList.add("conversion-hero-copy");

    const badge = document.createElement("div");
    badge.className = "conversion-badge";
    badge.innerHTML = '<span class="conversion-badge-dot"></span><span>Escolha sua solução em poucos cliques</span>';
    heroCopy.insertBefore(badge, heroTitle ?? heroCopy.firstChild);

    if (heroLead) {
      heroLead.textContent = "Tudo o que você precisa em um só lugar, com uma experiência rápida e direta.";
      heroLead.classList.add("conversion-lead");
    }

    if (heroSub) {
      heroSub.innerHTML = 'Encontre a opção ideal para você e vá direto ao que importa. <span class="conversion-highlight">Sem complicação.</span>';
      heroSub.classList.add("conversion-sub");
    }

    if (heroCta) {
      const label = heroCta.querySelector<HTMLElement>("span");
      if (label) label.textContent = "VER PRODUTOS AGORA";
      heroCta.classList.add("conversion-cta");
      heroCta.setAttribute("aria-label", "Ver produtos agora");

      const microcopy = document.createElement("div");
      microcopy.className = "conversion-microcopy";
      microcopy.innerHTML = "<span>⚡ Navegação rápida</span><span>🔒 Experiência segura</span><span>💬 Fácil de escolher</span>";
      heroCta.insertAdjacentElement("afterend", microcopy);
    }
  }

  const firstSection = root.querySelector<HTMLElement>("section");
  if (firstSection) firstSection.classList.add("conversion-hero-section");

  const sticky = document.createElement("div");
  sticky.className = "conversion-sticky-cta";
  sticky.innerHTML = '<div><strong>Pronto para escolher?</strong><span>Veja as opções disponíveis</span></div><button type="button">VER PRODUTOS</button>';
  root.appendChild(sticky);

  /* ---------- constellation background canvas ---------- */
  const canvas = root.querySelector<HTMLCanvasElement>("canvas.pointer-events-none");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let dots: Dot[] = [];
    let raf = 0;

    const build = () => {
      const w = window.innerWidth;
      const h = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      canvas.width = w;
      canvas.height = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const count = Math.min(150, Math.round((w * h) / 26000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const draw = () => {
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]!;
          const b = dots[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 190) {
            ctx.strokeStyle = `rgba(99, 148, 255, ${0.18 * (1 - dist / 190)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const d of dots) {
        ctx.fillStyle = "rgba(120, 165, 255, 0.55)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    build();
    raf = requestAnimationFrame(draw);
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    });
  }

  /* ---------- hero typewriter ("King") ---------- */
  const heroSpans = root.querySelectorAll<HTMLElement>("h1 .gradient-text-blue");
  const typeTarget = heroSpans[1] ?? null;
  if (typeTarget) {
    const word = "King";
    let i = 0;
    let deleting = false;
    let timer = 0;
    const step = () => {
      typeTarget.textContent = word.slice(0, i);
      let delay = deleting ? 90 : 150;
      if (!deleting && i === word.length) {
        deleting = true;
        delay = 2000;
      } else if (deleting && i === 0) {
        deleting = false;
        delay = 700;
      } else {
        i += deleting ? -1 : 1;
      }
      timer = window.setTimeout(step, delay);
    };
    step();
    cleanups.push(() => window.clearTimeout(timer));
  }

  /* ---------- language dropdown ---------- */
  const menu = root.querySelector<HTMLElement>("[data-lang-menu]");
  const langButton = menu?.parentElement?.querySelector<HTMLElement>("button");
  const chevron = langButton?.querySelector<HTMLElement>("svg.lucide-chevron-down");
  if (menu && langButton) {
    const setOpen = (open: boolean) => {
      menu.style.display = open ? "block" : "none";
      if (chevron) chevron.classList.toggle("rotate-180", open);
    };
    const onToggle = (e: Event) => {
      e.stopPropagation();
      setOpen(menu.style.display === "none");
    };
    const onDocClick = () => setOpen(false);
    langButton.addEventListener("click", onToggle);
    document.addEventListener("click", onDocClick);
    cleanups.push(() => {
      langButton.removeEventListener("click", onToggle);
      document.removeEventListener("click", onDocClick);
    });

    const options = Array.from(menu.querySelectorAll<HTMLElement>("button"));
    options.forEach((opt) => {
      const handler = () => {
        options.forEach((o) => {
          o.classList.remove("bg-primary/10");
          const label = o.querySelector("span");
          label?.classList.remove("text-primary", "font-semibold");
          label?.classList.add("text-foreground");
        });
        opt.classList.add("bg-primary/10");
        const label = opt.querySelector("span");
        label?.classList.remove("text-foreground");
        label?.classList.add("text-primary", "font-semibold");
        const flag = opt.querySelector("img");
        const current = langButton.querySelector("img");
        if (flag && current) {
          current.setAttribute("src", flag.getAttribute("src") ?? "");
          current.setAttribute("alt", flag.getAttribute("alt") ?? "");
        }
        setOpen(false);
      };
      opt.addEventListener("click", handler);
      cleanups.push(() => opt.removeEventListener("click", handler));
    });
  }

  /* ---------- theme switch (dark / light) ---------- */
  const themeButton = Array.from(root.querySelectorAll<HTMLElement>("header button")).find(
    (b) => b.querySelector("svg.lucide-moon") && b.querySelector("svg.lucide-sun"),
  );
  if (themeButton) {
    const [moonWrap, sunWrap] = Array.from(themeButton.children) as HTMLElement[];
    const moonIcon = moonWrap?.querySelector<HTMLElement>("svg");
    const sunIcon = sunWrap?.querySelector<HTMLElement>("svg");
    const apply = (dark: boolean) => {
      const html = document.documentElement;
      html.classList.toggle("dark", dark);
      html.classList.toggle("light", !dark);
      moonWrap?.classList.toggle("bg-primary", dark);
      sunWrap?.classList.toggle("bg-primary", !dark);
      moonIcon?.classList.toggle("text-white", dark);
      moonIcon?.classList.toggle("text-muted-foreground", !dark);
      sunIcon?.classList.toggle("text-white", !dark);
      sunIcon?.classList.toggle("text-muted-foreground", dark);
    };
    const onClick = () => apply(!document.documentElement.classList.contains("dark"));
    themeButton.addEventListener("click", onClick);
    cleanups.push(() => themeButton.removeEventListener("click", onClick));
  }

  /* ---------- category tabs ---------- */
  const tabs = Array.from(root.querySelectorAll<HTMLElement>("button.category-tab"));
  tabs.forEach((tab) => {
    const handler = () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    };
    tab.addEventListener("click", handler);
    cleanups.push(() => tab.removeEventListener("click", handler));
  });

  /* ---------- CTAs / footer anchors scroll to the products section ---------- */
  const productsSection = Array.from(root.querySelectorAll<HTMLElement>("section")).find((s) =>
    s.querySelector("button.category-tab"),
  );
  const scrollToProducts = () => productsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollTargets: HTMLElement[] = [
    ...Array.from(root.querySelectorAll<HTMLElement>("button.btn-primary")),
    ...Array.from(root.querySelectorAll<HTMLElement>('a[href="#"]')).filter((a) =>
      /catalogo/i.test(a.textContent ?? ""),
    ),
  ];
  scrollTargets.forEach((el) => {
    const handler = (e: Event) => {
      e.preventDefault();
      scrollToProducts();
    };
    el.addEventListener("click", handler);
    cleanups.push(() => el.removeEventListener("click", handler));
  });

  const stickyButton = sticky.querySelector<HTMLButtonElement>("button");
  if (stickyButton) {
    const handler = () => scrollToProducts();
    stickyButton.addEventListener("click", handler);
    cleanups.push(() => stickyButton.removeEventListener("click", handler));
  }

  const onScroll = () => {
    if (window.innerWidth > 767) {
      sticky.classList.remove("is-visible");
      return;
    }
    const threshold = Math.max(420, window.innerHeight * 0.65);
    sticky.classList.toggle("is-visible", window.scrollY > threshold);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  cleanups.push(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    sticky.remove();
  });

  const homeLinks = Array.from(root.querySelectorAll<HTMLElement>('a[href="#"]')).filter((a) =>
    /pagina inicial/i.test(a.textContent ?? ""),
  );
  homeLinks.forEach((el) => {
    const handler = (e: Event) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    el.addEventListener("click", handler);
    cleanups.push(() => el.removeEventListener("click", handler));
  });

  /* ---------- feedback carousel: pause on hover (as captured) ---------- */
  const track = root.querySelector<HTMLElement>(".feedback-carousel-track");
  if (track) {
    const enter = () => track.classList.add("paused");
    const leave = () => track.classList.remove("paused");
    track.addEventListener("mouseenter", enter);
    track.addEventListener("mouseleave", leave);
    cleanups.push(() => {
      track.removeEventListener("mouseenter", enter);
      track.removeEventListener("mouseleave", leave);
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
