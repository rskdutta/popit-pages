/* Shared chrome and motion for the product site: the blurred scene behind every page (one of the four, crossfading slowly, drifting
   with the scroll), the top bar, the footer, the loader (the wordmark's letters tumble in once per visit), kinetic headings (each
   character rises in a stagger), roll-over links, and progressive reveal of blocks as they scroll into view. No dependencies. */
(function () {
  const here = location.pathname.split('/').pop() || 'index.html';
  const pages = [['index.html', 'Home'], ['viewer.html', 'Viewer perception'], ['content.html', 'Content engagement'], ['coach.html', 'Coach my reel'], ['demo.html', 'Demo (beta)']];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const roll = t => '<span class="roll"><span>' + t + '</span><span aria-hidden="true">' + t + '</span></span>';

  /* the scene */
  const bg = document.createElement('div'); bg.className = 'bg'; bg.setAttribute('aria-hidden', 'true');
  bg.innerHTML = [1, 2, 3, 4].map(i => '<img src="bg/' + i + '.jpg" alt="">').join('');
  document.body.prepend(bg);
  const imgs = bg.querySelectorAll('img'); let k = (pages.findIndex(p => p[0] === here) + 4) % 4; imgs[k].classList.add('on');
  if (!still) {
    setInterval(() => { imgs[k].classList.remove('on'); k = (k + 1) % 4; imgs[k].classList.add('on'); }, 14000);
    let raf = 0; addEventListener('scroll', () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; bg.style.transform = 'translateY(' + (-scrollY * 0.08).toFixed(1) + 'px)'; }); }, { passive: true });
  }

  /* the top bar and footer */
  const nav = document.createElement('header'); nav.className = 'nav';
  nav.innerHTML = '<a class="logo" href="index.html"><i></i>PoP It</a><button class="menuBtn" type="button" aria-label="Menu">☰</button><nav>' +
    pages.slice(1).map(p => '<a href="' + p[0] + '"' + (p[0] === here ? ' aria-current="page"' : '') + '>' + roll(p[1]) + '</a>').join('') + '</nav><a class="btn p sm cta" href="demo.html">' + roll('Try the beta') + '</a>';
  document.body.insertBefore(nav, bg.nextSibling);
  nav.querySelector('.menuBtn').addEventListener('click', () => nav.classList.toggle('open'));
  const foot = document.createElement('footer'); foot.className = 'wrap foot';
  foot.innerHTML = '<span>© ' + new Date().getFullYear() + ' PoP It · coaching for short-form creators</span><span>' + pages.slice(1).map(p => '<a href="' + p[0] + '">' + p[1] + '</a>').join('') + '</span>';
  document.body.appendChild(foot);

  /* kinetic headings: split every h1/h2 (and anything marked .kin) into words and characters; inline marks like <span class="g">
     keep their styling because the split happens inside each text node */
  function split(el) {
    if (el.classList.contains('kin')) return; el.classList.add('kin');
    let i = 0;
    const walk = node => {
      for (const n of [...node.childNodes]) {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const part of n.textContent.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); continue; }
            const w = document.createElement('span'); w.className = 'wd';
            for (const c of [...part]) { const s = document.createElement('span'); s.className = 'ch'; s.innerHTML = '<i style="--i:' + (i++) + '">' + (c === '&' ? '&amp;' : c === '<' ? '&lt;' : c) + '</i>'; w.appendChild(s); }
            frag.appendChild(w);
          }
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('ch')) walk(n);
      }
    };
    walk(el);
  }
  if (!still) document.querySelectorAll('h1, main h2, .kin').forEach(split);
  // gradient words: clip-to-text does not reach the character boxes, so each character paints its slice of the gradient
  function paintG() {
    document.querySelectorAll('.kin .g').forEach(g => { const gr = g.getBoundingClientRect(); g.querySelectorAll('.ch i').forEach(i => { const r = i.getBoundingClientRect(); i.style.backgroundSize = gr.width + 'px 100%'; i.style.backgroundPosition = (gr.left - r.left) + 'px 0'; }); });
  }
  paintG(); addEventListener('resize', paintG); if (document.fonts) document.fonts.ready.then(paintG);
  document.querySelectorAll('.btn:not(.cta)').forEach(b => { if (!b.querySelector('.roll') && b.children.length === 0) b.innerHTML = roll(b.textContent.trim()); });

  /* progressive reveal: cards, steps, quotes and bands rise into view; items inside one grid stagger */
  const groups = document.querySelectorAll('main .grid, main .steps, main .two, main section > .shot, main .quote, main .band, main .sub, main .chk, .dhead');
  groups.forEach(g => {
    const kids = (g.matches('.grid, .steps, .chk') ? [...g.children] : [g]);
    kids.forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--i', i); });
  });
  const hero = document.querySelector('main h1');
  let seen = false; try { seen = sessionStorage.getItem('popit_ld') === '1'; } catch (e) {}
  const useLoader = !still && !seen && here !== 'demo.html';
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('.rv, .kin').forEach(el => { if (!(useLoader && el === hero)) io.observe(el); });

  /* the loader, once per visit; the hero's first heading starts its rise as the panel wipes away */
  if (useLoader) {
    const ld = document.createElement('div'); ld.className = 'ld'; ld.setAttribute('aria-hidden', 'true');
    ld.innerHTML = '<div class="ldw">' + [...'PoP It'].map(c => c === ' ' ? '<b class="sp"></b>' : '<b style="--r:' + (Math.random() * 160 - 80).toFixed(0) + 'deg;--y:' + (40 + Math.random() * 60).toFixed(0) + '%;transition-delay:' + (Math.random() * 260).toFixed(0) + 'ms">' + c + '</b>').join('') + '</div><small>Loading</small><div class="ldb"><i></i></div>';
    document.body.appendChild(ld); document.body.classList.add('lding');
    requestAnimationFrame(() => requestAnimationFrame(() => ld.classList.add('go')));
    const done = () => { ld.classList.add('off'); document.body.classList.remove('lding'); if (hero) hero.classList.add('in'); setTimeout(() => ld.remove(), 900); try { sessionStorage.setItem('popit_ld', '1'); } catch (e) {} };
    Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 1500))]).then(() => setTimeout(done, 1250));
  }

  /* the scroll pill under the landing hero */
  const acts = document.querySelector('.hero .actions');
  if (acts && here === 'index.html') { const p = document.createElement('div'); p.className = 'scrollpill'; p.innerHTML = '<span>' + '<i>scroll</i>'.repeat(6) + '</span>'; acts.after(p); }
})();
