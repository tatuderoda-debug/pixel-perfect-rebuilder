// Stable runtime for the mirrored JordanX page.
// Keeps interaction logic isolated and avoids injecting layout/content after first paint.

type Dot = { x: number; y: number; vx: number; vy: number };

export function initSiteRuntime(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  /* ---------- constellation background canvas ---------- */
  const canvas = root.querySelector<HTMLCanvasElement>("canvas.pointer-events-none");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let dots: Dot[] = [];
    let raf = 0;
    let running = true;
    let resizeTimer = 0;

    const build = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.max(28, Math.round((w * h) / 28000)));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
      }));
    };

    const draw = () => {
      if (!ctx || !running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
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
          const distSq = dx * dx + dy * dy;
          if (distSq < 22500) {
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(99, 148, 255, ${0.14 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        ctx.fillStyle = "rgba(120, 165, 255, 0.48)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 120);
    };

    build();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    cleanups.push(() => {
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
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
      chevron?.classList.toggle("rotate-180", open);
    };

    const onToggle = (event: Event) => {
      event.stopPropagation();
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
        options.forEach((item) => {
          item.classList.remove("bg-primary/10");
          const label = item.querySelector("span");
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

  /* ---------- theme switch ---------- */
  const themeButton = Array.from(root.querySelectorAll<HTMLElement>("header button")).find(
    (button) => button.querySelector("svg.lucide-moon") && button.querySelector("svg.lucide-sun"),
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
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
    };
    tab.addEventListener("click", handler);
    cleanups.push(() => tab.removeEventListener("click", handler));
  });

  /* ---------- CTA and footer scrolling ---------- */
  const productsSection = Array.from(root.querySelectorAll<HTMLElement>("section")).find((section) =>
    section.querySelector("button.category-tab"),
  );

  const scrollTargets: HTMLElement[] = [
    ...Array.from(root.querySelectorAll<HTMLElement>("button.btn-primary")),
    ...Array.from(root.querySelectorAll<HTMLElement>('a[href="#"]')).filter((anchor) =>
      /catalogo/i.test(anchor.textContent ?? ""),
    ),
  ];

  scrollTargets.forEach((element) => {
    const handler = (event: Event) => {
      event.preventDefault();
      productsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    element.addEventListener("click", handler);
    cleanups.push(() => element.removeEventListener("click", handler));
  });

  const homeLinks = Array.from(root.querySelectorAll<HTMLElement>('a[href="#"]')).filter((anchor) =>
    /pagina inicial/i.test(anchor.textContent ?? ""),
  );

  homeLinks.forEach((element) => {
    const handler = (event: Event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    element.addEventListener("click", handler);
    cleanups.push(() => element.removeEventListener("click", handler));
  });

  /* ---------- feedback carousel ---------- */
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

  return () => cleanups.forEach((cleanup) => cleanup());
}
