(function () {
  // Мобилно меню
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Прозрачна навигация над началната снимка
  if (nav && nav.classList.contains('nav--over')) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // Филтри в галерията
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
  document.querySelectorAll('.filters button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filters button').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.dataset.filter;
      tiles.forEach(function (t) { t.classList.toggle('is-hidden', f !== '*' && t.dataset.category !== f); });
    });
  });

  // Lightbox
  var lb = document.querySelector('.lightbox');
  if (!lb || !tiles.length) return;
  var img = lb.querySelector('img'), title = lb.querySelector('figcaption strong'), desc = lb.querySelector('figcaption span');
  var current = 0;
  function visible() { return tiles.filter(function (t) { return !t.classList.contains('is-hidden'); }); }
  function show(i) {
    var list = visible(); if (!list.length) return;
    current = (i + list.length) % list.length;
    var t = list[current];
    img.src = t.getAttribute('href'); img.alt = t.dataset.title || '';
    title.textContent = t.dataset.title || ''; desc.textContent = t.dataset.desc || '';
    lb.hidden = false; document.body.style.overflow = 'hidden';
  }
  function close() { lb.hidden = true; document.body.style.overflow = ''; }
  tiles.forEach(function (t) {
    t.addEventListener('click', function (e) { e.preventDefault(); show(visible().indexOf(t)); });
  });
  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.querySelector('.lightbox__prev').addEventListener('click', function () { show(current - 1); });
  lb.querySelector('.lightbox__next').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  // Плъзгане с пръст
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1)); x0 = null;
  });
})();
