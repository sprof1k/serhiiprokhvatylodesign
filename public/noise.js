/* Animated noise (film grain) — fixed overlay across the whole viewport.
   Tiny perf footprint: pre-generates a few noise tiles, cycles them. */
(function () {
  if (window.__noiseInit) return;
  window.__noiseInit = true;

  // Respect reduced motion — show one static tile instead of animating
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Tunables (also exposed via data-* attrs on <html> if user wants to tweak)
  const root = document.documentElement;
  const TILE = 140;
  const FRAMES = 4;
  const INTERVAL_MS = 70;
  const OPACITY = parseFloat(root.dataset.noiseOpacity || '0.14');

  // Build the overlay canvas
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.className = 'noise-overlay';
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '0',
    opacity: String(OPACITY),
    mixBlendMode: 'normal',
  });
  // Insert it just before </body> once body is ready
  function attach() {
    if (!document.body) {
      requestAnimationFrame(attach);
      return;
    }
    document.body.appendChild(canvas);
    start();
  }

  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1;
  let patterns = [];
  let idx = 0;
  let raf = 0;
  let lastDraw = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeTile() {
    const oc = document.createElement('canvas');
    oc.width = TILE;
    oc.height = TILE;
    const octx = oc.getContext('2d');
    const id = octx.createImageData(TILE, TILE);
    const data = id.data;
    for (let p = 0; p < data.length; p += 4) {
      // Monochrome noise biased darker so the grain reads as shadow, not haze
      const v = ((Math.random() + Math.random()) * 55) | 0;
      data[p] = v;
      data[p + 1] = v;
      data[p + 2] = v;
      data[p + 3] = 255;
    }
    octx.putImageData(id, 0, 0);
    return oc;
  }

  function buildPatterns() {
    patterns = [];
    const n = reducedMotion ? 1 : FRAMES;
    for (let i = 0; i < n; i++) {
      const tile = makeTile();
      patterns.push(ctx.createPattern(tile, 'repeat'));
    }
  }

  function draw(time) {
    raf = requestAnimationFrame(draw);
    if (time - lastDraw < INTERVAL_MS) return;
    lastDraw = time;
    ctx.fillStyle = patterns[idx];
    ctx.fillRect(0, 0, w, h);
    idx = (idx + 1) % patterns.length;
  }

  function drawStatic() {
    ctx.fillStyle = patterns[0];
    ctx.fillRect(0, 0, w, h);
  }

  function start() {
    resize();
    buildPatterns();

    if (reducedMotion) {
      drawStatic();
      return;
    }
    raf = requestAnimationFrame(draw);
  }

  // Pause animation when tab not visible — save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else if (!reducedMotion) {
      raf = requestAnimationFrame(draw);
    }
  });

  window.addEventListener('resize', () => {
    resize();
    buildPatterns();
    if (reducedMotion) drawStatic();
  });

  attach();
})();
