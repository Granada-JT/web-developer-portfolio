/* ==========================================================================
   Jomar Granada — portfolio engine. Vanilla JS, zero dependencies.

   One requestAnimationFrame loop drives everything (parallax, particles,
   hero letters, tilt, cursor) and it stops completely while the tab is hidden
   or a dialog/menu covers the page. Layout is measured once (and on resize),
   never per frame.

   Parallax attributes (any element):
     data-speed="0.2"   vertical drift vs. scroll. + = slower (recedes), - = faster (comes forward)
     data-wide-speed    same, but only used at >=1200px (two-column layouts)
     data-depth="30"    pointer / gyro parallax, in px
     data-x="0.3"       horizontal drift vs. scroll
     data-rot="0.04"    rotation in degrees per scrolled px
     data-zoom="0.001"  scale growth with scroll
     data-max="22"      clamp for the vertical offset, in px
   Column groups (grids): data-col-speeds=".07,-.05" on the container. Every child in
   the same column gets the SAME offset (measured from the container), so gaps inside
   a column never change; only the columns drift against each other.
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const root = document.documentElement;
  const mq = (q) => matchMedia(q);

  const motion = !mq('(prefers-reduced-motion: reduce)').matches;
  const fine = mq('(hover: hover) and (pointer: fine)').matches;
  const wideMQ = mq('(min-width: 1200px)');
  const lite = !fine || (navigator.hardwareConcurrency || 8) <= 4; // cheaper particles on phones / weak CPUs

  /* shared state, read by every module */
  const S = { y: 0, sy: 0, vy: 0, vw: innerWidth, vh: innerHeight, docH: 1,
              tx: 0, ty: 0, mx: 0, my: 0, cx: -999, cy: -999, hover: null, mag: null };

  /* ------------------------------------------------------------------ *
   * Scroll lock + loop control (dialogs and the mobile menu pause the loop)
   * ------------------------------------------------------------------ */
  let locks = 0;
  function lock(on) {
    locks = Math.max(0, locks + (on ? 1 : -1));
    root.classList.toggle('no-scroll', locks > 0);
    locks > 0 ? stop() : start();
  }

  /* ------------------------------------------------------------------ *
   * Parallax engine
   * ------------------------------------------------------------------ */
  const items = [];
  const docTop = (el) => { let y = 0; for (; el; el = el.offsetParent) y += el.offsetTop; return y; };
  const docLeft = (el) => { let x = 0; for (; el; el = el.offsetParent) x += el.offsetLeft; return x; };

  function collect() {
    $$('[data-speed],[data-wide-speed],[data-depth],[data-x],[data-rot],[data-zoom]').forEach((el) => {
      const d = el.dataset;
      items.push({
        el, top: 0, h: 0, y: 0,
        sp: +d.speed || 0, spw: d.wideSpeed != null ? +d.wideSpeed : null,
        dp: +d.depth || 0, dx: +d.x || 0, rot: +d.rot || 0, zoom: +d.zoom || 0, max: +d.max || 0,
      });
    });
  }

  function collectGroups() {
    $$('[data-col-speeds]').forEach((g) => {
      const speeds = g.dataset.colSpeeds.split(',').map(Number), max = +g.dataset.max || 0;
      Array.from(g.children).forEach((el, i) => items.push({ el, g, i, speeds, max, top: 0, h: 0, y: 0, sp: 0, spw: null, dp: 0, dx: 0, rot: 0, zoom: 0 }));
    });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle('in', e.isIntersecting)),
      { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach((el) => io.observe(el));
    $$('.menu li').forEach((li, i) => li.style.setProperty('--i', i));
  }

  let dirty = true, lastSy = -1, lastMx = 9e9, lastMy = 9e9;

  function measure() {
    S.vw = innerWidth; S.vh = innerHeight;
    S.docH = Math.max(1, root.scrollHeight - S.vh);
    const cols = new Map();
    for (const it of items) {
      if (it.g) {                                       // grouped: position + column come from the grid container
        let c = cols.get(it.g);
        if (!c) cols.set(it.g, c = getComputedStyle(it.g).gridTemplateColumns.split(' ').length);
        it.sp = it.speeds[(it.i % c) % it.speeds.length];
        it.top = docTop(it.g); it.h = it.g.offsetHeight;
      } else { it.top = docTop(it.el); it.h = it.el.offsetHeight; }
    }
    measureLetters();
    dirty = true;
  }

  function applyParallax() {
    const vc = S.sy + S.vh / 2, wide = wideMQ.matches, lim = S.vh * 0.5 + 220;
    for (const it of items) {
      const rel = it.top + it.h / 2 - vc;                 // >0: element is below viewport centre
      if (Math.abs(rel) > lim + it.h / 2) continue;       // off-screen: leave it alone
      const sp = wide && it.spw !== null ? it.spw : it.sp;
      let y = -rel * sp + S.my * it.dp;
      if (it.max) y = clamp(y, -it.max, it.max);
      const x = rel * it.dx + S.mx * it.dp;
      it.y = y;
      it.el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      if (it.rot) it.el.style.rotate = `${(S.sy * it.rot).toFixed(2)}deg`;
      if (it.zoom) it.el.style.scale = Math.max(0.05, 1 - rel * it.zoom).toFixed(3);
    }
  }

  /* ------------------------------------------------------------------ *
   * Reveal on scroll (replays, like the original)
   * ------------------------------------------------------------------ */
  function initReveal() {
    $$('[data-stagger]').forEach((p) => {
      const n = +p.dataset.stagger || 99;
      Array.from(p.children).forEach((c, i) => c.style.setProperty('--i', i % n));
    });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle('in', e.isIntersecting)),
      { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach((el) => io.observe(el));
    $$('.menu li').forEach((li, i) => li.style.setProperty('--i', i));
  }

  /* ------------------------------------------------------------------ *
   * Hero: scramble text, reactive letters, scroll scatter
   * ------------------------------------------------------------------ */
  const hero = $('#landing');
  const nav = $('#nav-bar');
  const arrow = $('#arrow-down');
  const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-';
  let nameCh = [], roleCh = [], letters = [], heroItem = null;
  let scrTimer = 0, arrowTimer = 0, heroOn = false, lastP = -1;

  function split(el, scatter) {
    const txt = el.textContent.trim();
    el.textContent = '';
    const sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = txt;
    const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
    const chars = []; let n = 0;
    txt.split(' ').forEach((word) => {
      const w = document.createElement('span'); w.className = 'w';
      for (const c of word) {
        const s = document.createElement('span');
        s.className = 'ch'; s.dataset.c = c; s.textContent = c; s._n = n++;
        s.style.setProperty('--i', s._n);
        s.style.setProperty('--s', ((s._n % 2 ? -1 : 1) * (30 + Math.random() * 170 * scatter)).toFixed(0));
        s.style.setProperty('--r', ((Math.random() - 0.5) * 70 * scatter).toFixed(0));
        chars.push(s); w.appendChild(s);
      }
      vis.append(w, ' ');
    });
    el.append(sr, vis);
    el.classList.add('ready');
    return chars;
  }

  function startScramble() {
    const all = nameCh.concat(roleCh);
    if (!motion) { all.forEach((c) => c.classList.add('on')); return; }
    const ws = all.map((c) => { c.style.width = ''; return c.getBoundingClientRect().width; }); // read…
    const t0 = performance.now();
    all.forEach((c, i) => {                                                                      // …then write
      c.style.width = ws[i] + 'px';
      c._end = t0 + 100 + c._n * 60; c._done = false;
      c.classList.add('on', 'scr');
    });
    clearInterval(scrTimer);
    scrTimer = setInterval(() => {
      const now = performance.now(); let alive = 0;
      for (const c of all) {
        if (c._done) continue;
        if (now >= c._end) { c.textContent = c.dataset.c; c.style.width = ''; c.classList.remove('scr'); c._done = true; }
        else { c.textContent = CHARSET[(Math.random() * CHARSET.length) | 0]; alive++; }
      }
      if (!alive) { clearInterval(scrTimer); measureLetters(); }
    }, 50);
  }

  function resetScramble() {
    clearInterval(scrTimer);
    nameCh.concat(roleCh).forEach((c) => { c.textContent = c.dataset.c; c.style.width = ''; c.classList.remove('on', 'scr'); });
  }

  function measureLetters() {
    for (const L of letters) { L.cx = docLeft(L.el) + L.el.offsetWidth / 2; L.cy = docTop(L.el) + L.el.offsetHeight / 2; }
  }

  function stepLetters() {
    const live = fine && motion && S.cx > -500 && S.y < S.vh * 0.35;
    const R = clamp(S.vw * 0.13, 100, 190), hy = heroItem ? heroItem.y : 0;
    for (const L of letters) {
      let f = 0, tx = 0, ty = 0;
      if (live) {
        const dx = S.cx - L.cx, dy = S.cy - (L.cy - S.y + hy), d = Math.hypot(dx, dy);
        if (d < R) { f = 1 - d / R; f = f * f * (3 - 2 * f); tx = (-dx / (d || 1)) * f * 22; ty = (-dy / (d || 1)) * f * 22; }
      }
      L.f += (f - L.f) * 0.16; L.x += (tx - L.x) * 0.16; L.y += (ty - L.y) * 0.16;
      if (L.f < 0.002 && f === 0) {
        if (L.on) { L.on = false; const st = L.el.style; st.removeProperty('--f'); st.removeProperty('--tx'); st.removeProperty('--ty'); st.removeProperty('--sc'); }
        continue;
      }
      L.on = true;
      const st = L.el.style;
      st.setProperty('--f', L.f.toFixed(3)); st.setProperty('--tx', L.x.toFixed(1) + 'px');
      st.setProperty('--ty', L.y.toFixed(1) + 'px'); st.setProperty('--sc', (1 + L.f * 0.3).toFixed(3));
    }
  }

  function initHero() {
    nameCh = split($('#full-name'), 1);
    roleCh = split($('#profession'), 0.45);
    letters = nameCh.map((el) => ({ el, cx: 0, cy: 0, f: 0, x: 0, y: 0, on: false }));
    heroItem = items.find((i) => i.el.classList.contains('hero-content')) || null;
    measure();
    new IntersectionObserver(([e]) => {
      const on = e.isIntersecting;
      if (on === heroOn) return;
      heroOn = on;
      nav.classList.toggle('off', on);
      if (on) { setMenu(false); hero.classList.add('in'); startScramble();
        arrowTimer = setTimeout(() => arrow.classList.add('on'), mq('(max-width: 991px)').matches ? 3000 : 6000); }
      else { hero.classList.remove('in'); resetScramble(); clearTimeout(arrowTimer); arrow.classList.remove('on'); }
    }, { rootMargin: '-20px' }).observe(hero);
  }

  /* ------------------------------------------------------------------ *
   * Particle field (replaces particles.js): depth-parallaxed, palette-per-section
   * ------------------------------------------------------------------ */
  const fx = $('#fx'), g = fx.getContext('2d');
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const PAL = {
    landing: ['#FF3F4A', '#C41E3A'], home: ['#9D4EDD', '#DC143C'], projects: ['#4CC9F0', '#FF3F4A'],
    skills: ['#F72585', '#B22222'], contact: ['#7209B7', '#FF6347'],
  };
  const P = { list: [], pts: new Float32Array(0), w: 0, h: 0, base: 40, link: 135,
              cur: PAL.landing.map(hex), tgt: PAL.landing.map(hex) };
  const spawn = (x, y) => ({ x, y, ox: 0, oy: 0, vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7,
    r: 1 + Math.random() * 2.6, z: 0.3 + Math.random() * 0.9, k: Math.random() < 0.55 ? 0 : 1, ph: Math.random() * 6.28, sp: 0.6 + Math.random() * 1.6 });

  function sizeFx() {
    const dpr = Math.min(devicePixelRatio || 1, lite ? 1.25 : 2);
    P.w = innerWidth; P.h = innerHeight;
    fx.width = Math.round(P.w * dpr); fx.height = Math.round(P.h * dpr);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    P.base = clamp(Math.round((P.w * P.h) / (lite ? 22000 : 15000)), 24, lite ? 50 : 90);
    P.link = clamp(P.w * 0.11, 100, 150);
    while (P.list.length < P.base) P.list.push(spawn(Math.random() * P.w, Math.random() * P.h));
    if (P.list.length > P.base + 24) P.list.length = P.base + 24;
    P.pts = new Float32Array(P.list.length * 2 + 48);
  }

  function burst(x, y) {                                   // click / tap adds a few particles
    for (let i = 0; i < 4; i++) {
      const p = spawn(x + (Math.random() - 0.5) * 30, 0); p.y = y + (Math.random() - 0.5) * 30 + S.sy * p.z * 0.2;
      p.vx *= 2.2; p.vy *= 2.2;
      if (P.list.length >= P.base + 24) P.list.splice(0, 1);
      P.list.push(p);
    }
    if (P.pts.length < P.list.length * 2) P.pts = new Float32Array(P.list.length * 2 + 48);
  }

  function drawFx(dt) {
    const { w, h, list, pts } = P, n = list.length;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) P.cur[i][j] += (P.tgt[i][j] - P.cur[i][j]) * 0.05;
    const c0 = `rgb(${P.cur[0].map((v) => v | 0)})`, c1 = `rgb(${P.cur[1].map((v) => v | 0)})`;
    const t = performance.now() / 1000, hasPtr = S.cx > -500;
    g.clearRect(0, 0, w, h);

    for (let i = 0; i < n; i++) {
      const p = list[i];
      if (dt) { p.x += p.vx * dt * 0.06; p.y += p.vy * dt * 0.06; p.ox *= 0.94; p.oy *= 0.94; }
      if (p.x < -30) p.x = w + 30; else if (p.x > w + 30) p.x = -30;
      if (p.y < -30) p.y = h + 30; else if (p.y > h + 30) p.y = -30;
      let y = (p.y - S.sy * p.z * 0.2) % h; if (y < 0) y += h;           // scroll parallax by depth
      let x = p.x + S.mx * 26 * p.z, yy = y + S.my * 16 * p.z;
      if (hasPtr && dt) {                                                 // gentle repulse from pointer
        const dx = x - S.cx, dy = yy - S.cy, d2 = dx * dx + dy * dy;
        if (d2 < 8100 && d2 > 1) { const d = Math.sqrt(d2), f = (1 - d / 90) * 2.2; p.ox += (dx / d) * f; p.oy += (dy / d) * f; }
      }
      pts[i * 2] = x + p.ox; pts[i * 2 + 1] = yy + p.oy;
    }

    const L = P.link, L2 = L * L;
    g.lineWidth = 1; g.strokeStyle = c0;
    for (let i = 0; i < n; i++) {
      const ax = pts[i * 2], ay = pts[i * 2 + 1];
      for (let j = i + 1; j < n; j++) {
        const dx = ax - pts[j * 2]; if (dx > L || dx < -L) continue;
        const dy = ay - pts[j * 2 + 1], d2 = dx * dx + dy * dy; if (d2 > L2) continue;
        g.globalAlpha = (1 - Math.sqrt(d2) / L) * 0.5;
        g.beginPath(); g.moveTo(ax, ay); g.lineTo(pts[j * 2], pts[j * 2 + 1]); g.stroke();
      }
    }
    if (hasPtr) {                                                         // "grab" lines to the pointer
      g.strokeStyle = c1;
      for (let i = 0; i < n; i++) {
        const dx = pts[i * 2] - S.cx, dy = pts[i * 2 + 1] - S.cy, d2 = dx * dx + dy * dy;
        if (d2 > 28900) continue;
        g.globalAlpha = (1 - Math.sqrt(d2) / 170) * 0.8;
        g.beginPath(); g.moveTo(S.cx, S.cy); g.lineTo(pts[i * 2], pts[i * 2 + 1]); g.stroke();
      }
    }
    for (let i = 0; i < n; i++) {
      const p = list[i];
      g.globalAlpha = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(t * p.sp + p.ph));
      g.fillStyle = p.k ? c1 : c0;
      g.beginPath(); g.arc(pts[i * 2], pts[i * 2 + 1], p.r, 0, 6.2832); g.fill();
    }
    g.globalAlpha = 1;
  }

  /* ------------------------------------------------------------------ *
   * Sections: particle palette, nav highlight, nav show/hide, progress
   * ------------------------------------------------------------------ */
  const burger = $('#burger'), progress = $('#progress');
  const links = $$('.menu a');

  function setSection(id) {
    if (PAL[id]) { P.tgt = PAL[id].map(hex); if (!motion) { P.cur = P.tgt.map((c) => c.slice()); drawFx(0); } }
    links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + id));
  }

  function setMenu(open) {
    if (root.classList.contains('menu-open') === open) return;
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    lock(open);
  }

  function initNav() {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: '-50% 0px -50% 0px' });
    ['landing', 'home', 'projects', 'skills', 'contact'].forEach((id) => io.observe($('#' + id)));
    burger.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
    links.forEach((a) => a.addEventListener('click', () => setMenu(false)));
    $('#brand').addEventListener('click', () => setMenu(false));
  }

  /* ------------------------------------------------------------------ *
   * Pointer effects: tilt, magnetic, cursor ring, glow
   * ------------------------------------------------------------------ */
  const cursor = $('#cursor'), glow = $('#glow');
  const fxState = new Map();   // element -> animated tilt / magnet state
  let cxs = 0, cys = 0, gxs = 0, gys = 0;

  function initPointer() {
    addEventListener('pointermove', (e) => {
      S.cx = e.clientX; S.cy = e.clientY;
      if (e.pointerType !== 'mouse') return;
      S.tx = (e.clientX / S.vw - 0.5) * 2; S.ty = (e.clientY / S.vh - 0.5) * 2;
      const t = e.target;
      S.hover = t.closest ? t.closest('[data-tilt]') : null;
      S.mag = t.closest ? t.closest('.mag') : null;
      cursor.classList.add('on');
      cursor.classList.toggle('hot', !!(t.closest && t.closest('a,button,[role="button"],input,textarea,.carousel')));
    }, { passive: true });
    root.addEventListener('mouseleave', () => {
      S.cx = S.cy = -999; S.tx = S.ty = 0; S.hover = S.mag = null; cursor.classList.remove('on');
    });
    addEventListener('pointerdown', (e) => {
      if (e.target.closest && e.target.closest('a,button,input,textarea,[role="button"],dialog')) return;
      burst(e.clientX, e.clientY);
    }, { passive: true });
    addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') setTimeout(() => { S.cx = S.cy = -999; }, 450); }, { passive: true });

    // phones: tilt the layers with the gyroscope where no permission prompt is needed (Android)
    if (!fine && motion && 'DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      addEventListener('deviceorientation', (e) => {
        if (e.gamma == null) return;
        S.tx = clamp(e.gamma / 25, -1, 1); S.ty = clamp((e.beta - 50) / 25, -1, 1);
      }, { passive: true });
    }
  }

  function stepHover() {
    const h = S.hover, m = S.mag;
    if (h && !fxState.has(h)) { fxState.set(h, { k: 'tilt', a: 0, b: 0, ta: 0, tb: 0 }); h.classList.add('lv'); }
    if (m && !fxState.has(m)) fxState.set(m, { k: 'mag', a: 0, b: 0, ta: 0, tb: 0 });
    for (const [el, st] of fxState) {
      const active = el === h || el === m;
      if (active) {
        const r = el.getBoundingClientRect();
        if (st.k === 'tilt') {
          const nx = (S.cx - r.left) / r.width, ny = (S.cy - r.top) / r.height, k = +el.dataset.tilt || 6;
          st.ta = (0.5 - ny) * k; st.tb = (nx - 0.5) * k; st.gx = nx * 100; st.gy = ny * 100;
        } else {
          st.ta = clamp((S.cx - (r.left + r.width / 2)) * 0.3, -14, 14); st.tb = clamp((S.cy - (r.top + r.height / 2)) * 0.3, -14, 14);
        }
      } else { st.ta = st.tb = 0; }
      st.a += (st.ta - st.a) * 0.14; st.b += (st.tb - st.b) * 0.14;
      const s = el.style;
      if (st.k === 'tilt') {
        s.setProperty('--rx', st.a.toFixed(2) + 'deg'); s.setProperty('--ry', st.b.toFixed(2) + 'deg');
        if (active) { s.setProperty('--gx', st.gx.toFixed(0) + '%'); s.setProperty('--gy', st.gy.toFixed(0) + '%'); }
      } else { s.setProperty('--mx', st.a.toFixed(1)); s.setProperty('--my', st.b.toFixed(1)); }
      if (!active && Math.abs(st.a) < 0.01 && Math.abs(st.b) < 0.01) {
        if (st.k === 'tilt') { s.removeProperty('--rx'); s.removeProperty('--ry'); el.classList.remove('lv'); } else { s.removeProperty('--mx'); s.removeProperty('--my'); }
        fxState.delete(el);
      }
    }
    if (fine) {
      cxs += (S.cx - cxs) * 0.28; cys += (S.cy - cys) * 0.28; gxs += (S.cx - gxs) * 0.08; gys += (S.cy - gys) * 0.08;
      cursor.style.translate = `${cxs.toFixed(1)}px ${cys.toFixed(1)}px`;
      glow.style.translate = `${gxs.toFixed(1)}px ${gys.toFixed(1)}px`;
    }
  }

  /* ------------------------------------------------------------------ *
   * Carousel (about photo + certificates) with swipe, dots, autoplay
   * ------------------------------------------------------------------ */
  function carousel(el, auto) {
    const slides = $$('.slide', el), dotsEl = $('.dots', el);
    let i = 0, timer = 0, vis = true, hov = false, sx = 0, sy = 0, down = false, swallow = false;
    const dots = dotsEl ? slides.map((_, k) => {
      const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Show slide ' + (k + 1));
      b.addEventListener('click', (e) => { e.stopPropagation(); go(k); restart(); }); dotsEl.appendChild(b); return b;
    }) : [];
    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle('active', k === i); s.setAttribute('aria-hidden', k !== i); });
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
    }
    function restart() {
      clearInterval(timer);
      if (auto && motion) timer = setInterval(() => { if (vis && !hov && !document.hidden && !locks) go(i + 1); }, auto);
    }
    $('.c-prev', el)?.addEventListener('click', (e) => { e.stopPropagation(); go(i - 1); restart(); });
    $('.c-next', el)?.addEventListener('click', (e) => { e.stopPropagation(); go(i + 1); restart(); });
    el.addEventListener('pointerdown', (e) => { sx = e.clientX; sy = e.clientY; down = true; swallow = false; });
    el.addEventListener('pointerup', (e) => {
      if (!down) return; down = false;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) { go(i + (dx < 0 ? 1 : -1)); restart(); swallow = true; }
    });
    el.addEventListener('pointercancel', () => { down = false; });
    el.addEventListener('click', (e) => { if (swallow) { swallow = false; e.stopPropagation(); e.preventDefault(); } }, true);
    el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hov = true; });
    el.addEventListener('pointerleave', () => { hov = false; });
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(el);
    go(0); restart();
    return { go, get i() { return i; } };
  }

  function initCarousels() {
    carousel($('#about-carousel'), 5000);
    const certEl = $('#cert-carousel'), cert = carousel(certEl, 5000);

    /* lightbox: a native <dialog>, so focus trap, Esc and inert page come for free */
    const lb = $('#lightbox'), lbImg = $('img', lb), imgs = $$('.slide img', certEl);
    let li = 0, lx = 0;
    const show = (n) => { li = (n + imgs.length) % imgs.length; lbImg.src = imgs[li].currentSrc || imgs[li].src; lbImg.alt = imgs[li].alt; };
    certEl.addEventListener('click', (e) => {
      if (e.target.closest('.c-btn,.dots')) return;
      show(cert.i); lb.showModal(); lock(true);
    });
    lb.addEventListener('close', () => { lock(false); cert.go(li); });
    $('.lb-close', lb).addEventListener('click', () => lb.close());
    $('.lb-prev', lb).addEventListener('click', () => show(li - 1));
    $('.lb-next', lb).addEventListener('click', () => show(li + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') show(li - 1); else if (e.key === 'ArrowRight') show(li + 1); });
    lb.addEventListener('pointerdown', (e) => { lx = e.clientX; });
    lb.addEventListener('pointerup', (e) => { const dx = e.clientX - lx; if (Math.abs(dx) > 50) show(li + (dx < 0 ? 1 : -1)); });
  }

  /* ------------------------------------------------------------------ *
   * Project details: card -> iris-reveal dialog; videos load only when opened
   * ------------------------------------------------------------------ */
  function initProjects() {
    const pd = $('#project-details'), panels = $$('.detail', pd), tpl = $('#note');
    panels.forEach((p) => { if (p.hasAttribute('data-note')) $('.d-text', p).appendChild(tpl.content.cloneNode(true)); });

    const stopVideos = () => $$('video', pd).forEach((v) => { v.pause(); try { v.currentTime = 0; } catch (_) {} });
    function open(card, ev) {
      const panel = panels.find((p) => p.dataset.target === card.dataset.name);
      if (!panel) return;
      const r = card.getBoundingClientRect(), kb = !ev || (!ev.clientX && !ev.clientY);
      pd.style.setProperty('--cx', (kb ? r.left + r.width / 2 : ev.clientX) + 'px');
      pd.style.setProperty('--cy', (kb ? r.top + r.height / 2 : ev.clientY) + 'px');
      panels.forEach((p) => p.classList.toggle('active', p === panel));
      panel.scrollTop = 0;
      pd.classList.remove('closing');
      pd.showModal(); lock(true);
      $$('video', panel).forEach((v) => {
        if (!v.querySelector('source')) { const s = document.createElement('source'); s.src = v.dataset.src; s.type = 'video/mp4'; v.appendChild(s); v.load(); }
        v.play().catch(() => {});
      });
      $('.d-close', pd).focus({ preventScroll: true });
    }
    function finish() { pd.classList.remove('closing'); pd.close(); }
    function close() {
      if (!pd.open || pd.classList.contains('closing')) return;
      stopVideos();
      if (!motion) return finish();
      pd.classList.add('closing');
      pd.addEventListener('animationend', function h(e) { if (e.target === pd) { pd.removeEventListener('animationend', h); finish(); } });
    }
    document.addEventListener('click', (e) => { const c = e.target.closest && e.target.closest('.card'); if (c) open(c, e); });
    document.addEventListener('keydown', (e) => {
      const c = e.target.classList && e.target.classList.contains('card') ? e.target : null;
      if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(c, null); }
    });
    $('.d-close', pd).addEventListener('click', close);
    pd.addEventListener('click', (e) => { if (e.target === pd) close(); });
    pd.addEventListener('cancel', (e) => { e.preventDefault(); close(); });     // Esc runs the animated close
    pd.addEventListener('close', () => { lock(false); stopVideos(); });
  }

  /* ------------------------------------------------------------------ *
   * Contact form (same validation + endpoints as before)
   * ------------------------------------------------------------------ */
  function initForm() {
    const form = $('#form-col'), thanks = $('#thanks');
    const rules = {
      name: (v) => v.trim() !== '',
      email: (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
      phone: (v) => /^[0-9]+$/.test(v),
      message: (v) => v.trim() !== '',
    };
    const check = (id) => {
      const el = document.getElementById(id), ok = rules[id](el.value);
      el.parentElement.classList.toggle('bad', !ok); el.setAttribute('aria-invalid', !ok);
      return ok;
    };
    Object.keys(rules).forEach((id) => document.getElementById(id).addEventListener('input', (e) => {
      if (e.target.parentElement.classList.contains('bad')) check(id);
    }));
    const reset = () => { form.reset(); Object.keys(rules).forEach((id) => { const el = document.getElementById(id); el.parentElement.classList.remove('bad'); el.removeAttribute('aria-invalid'); }); };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valid = Object.keys(rules).map(check).every(Boolean);       // check all so every error shows
      if (!valid) return;
      const body = { name: $('#name').value, emailAddress: $('#email').value, contactNo: $('#phone').value, message: $('#message').value };
      thanks.showModal(); lock(true);
      fetch('https://capstone-1-granada.onrender.com/visitors', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      }).catch((err) => console.error('Error:', err));
    });
    $('#modal-close-button').addEventListener('click', () => thanks.close());
    thanks.addEventListener('close', () => { lock(false); reset(); });
  }

  async function recordView() {
    try {
      const ip = (await (await fetch('https://api.ipify.org/?format=json')).json()).ip;
      await fetch('https://capstone-1-granada.onrender.com/views/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ipaddress: ip }),
      });
    } catch (_) { /* analytics must never break the page */ }
  }

  /* ------------------------------------------------------------------ *
   * Small builders
   * ------------------------------------------------------------------ */
  function initDecor() {
    // ticker band is built from the skills list, so there is one source of truth
    const names = $$('.skill b').map((b) => b.textContent);
    const track = $('.band-track');
    if (names.length) { track.innerHTML = names.map((n) => `<span>${n}</span>`).join(''); track.innerHTML += track.innerHTML; }
    // ring of text around the about photo
    $$('[data-orbit]').forEach((el) => {
      const chars = Array.from(el.dataset.orbit.repeat(2));
      el.style.setProperty('--n', chars.length);
      el.innerHTML = chars.map((c, k) => `<span${c === '•' ? ' class="d"' : ''} style="--k:${k}">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    });
    $('#yr').textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------ *
   * Main loop
   * ------------------------------------------------------------------ */
  const band = $('.band');
  let raf = 0, last = 0, fxLast = 0, frame = 0;

  function tick(now) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(now - last, 64); last = now; frame++;

    S.y = scrollY;
    const k = 1 - Math.exp(-dt / 90), prev = S.sy;                    // frame-rate independent smoothing
    S.sy += (S.y - S.sy) * k; if (Math.abs(S.y - S.sy) < 0.05) S.sy = S.y;
    S.vy += (S.sy - prev - S.vy) * 0.2;
    S.mx += (S.tx - S.mx) * k; S.my += (S.ty - S.my) * k;

    if (dirty || Math.abs(S.sy - lastSy) > 0.02 || Math.abs(S.mx - lastMx) > 0.0004 || Math.abs(S.my - lastMy) > 0.0004) {
      applyParallax(); lastSy = S.sy; lastMx = S.mx; lastMy = S.my; dirty = false;
      progress.style.scale = clamp(S.y / S.docH, 0, 1).toFixed(4) + ' 1';
    }
    if (S.sy < S.vh * 1.2) {                                           // hero scroll progress (letters scatter, content fades)
      const p = clamp(S.sy / (S.vh * 0.9), 0, 1);
      if (Math.abs(p - lastP) > 0.002) { hero.style.setProperty('--p', p.toFixed(3)); lastP = p; }
      stepLetters();
    }
    band.style.setProperty('--sk', clamp(S.vy * -0.3, -8, 8).toFixed(2) + 'deg');
    stepHover();

    if (!lite || frame & 1) { drawFx(Math.min(now - fxLast, 64)); fxLast = now; }
  }
  function start() { if (!raf && motion && !document.hidden && !locks) { last = fxLast = performance.now(); raf = requestAnimationFrame(tick); } }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  /* ------------------------------------------------------------------ *
   * Init
   * ------------------------------------------------------------------ */
  function init() {
    collect(); collectGroups(); initDecor(); initReveal(); initNav(); initPointer(); initCarousels(); initProjects(); initForm();
    sizeFx(); measure();

    let rt = 0;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { sizeFx(); measure(); if (!motion) drawFx(0); }, 120); });
    new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(measure, 80); }).observe(document.body);   // lazy images change heights
    addEventListener('load', measure);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

    if (motion) start();
    else {                                                              // reduced motion: static particles, live progress bar only
      drawFx(0);
      addEventListener('scroll', () => { progress.style.scale = clamp(scrollY / S.docH, 0, 1).toFixed(4) + ' 1'; }, { passive: true });
    }

    // start the hero once the font is ready (never wait more than 1.2s)
    Promise.race([document.fonts ? document.fonts.ready : 0, new Promise((r) => setTimeout(r, 1200))]).then(initHero);
    (window.requestIdleCallback || setTimeout)(recordView);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();