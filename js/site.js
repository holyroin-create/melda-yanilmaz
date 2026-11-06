// Tüm sayfalarda çalışan ortak davranışlar:
// cam çekmece menü (mobil), arama + filtre + etiketler, fareye göre paralaks, kavisli kaydırma göstergesi,
// SSS akordeonu, çevrilen kartlar, 3B eğilme, ölçülü görünme, sabit CTA.
// Önizleme dosyasında her sayfa geçişinde yeniden çalıştırılabilir; olay dinleyicileri bir kez bağlanır.
(function () {
  "use strict";
  var azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, k) { return (k || document).querySelector(s); };
  var $$ = function (s, k) { return Array.prototype.slice.call((k || document).querySelectorAll(s)); };

  /* ---------- Cam çekmece menü: açıkken sayfanın geri kalanı etkileşime kapanır (inert), Esc ile kapanır ---------- */
  var dugme = $("#menu-dugme"), panel = $("#yan-panel"), perde = $("#perde"), kapatD = $("#cekmece-kapat");
  var mobilMq = window.matchMedia("(max-width: 55.99rem)");
  if (dugme && panel && !dugme.dataset.bagli) {
    dugme.dataset.bagli = "1";
    var arka = function (k) { $$("main, .sag, .alt, .ara-cubuk, .sabit-cta, .mobil-ust").forEach(function (e) { e.inert = k; }); };
    var kapat = function (odak) {
      if (!panel.classList.contains("acik")) return;
      panel.classList.remove("acik"); perde.hidden = true; arka(false);
      dugme.setAttribute("aria-expanded", "false"); dugme.setAttribute("aria-label", "Menüyü aç"); document.body.style.overflow = "";
      if (odak) dugme.focus();
    };
    window.__menuKapat = kapat;
    dugme.addEventListener("click", function () {
      panel.classList.add("acik"); perde.hidden = false; arka(true);
      dugme.setAttribute("aria-expanded", "true"); dugme.setAttribute("aria-label", "Menüyü kapat"); document.body.style.overflow = "hidden";
      setTimeout(function () { var ilk = $(".menu a[aria-current]", panel) || $(".menu a", panel); if (ilk) ilk.focus(); }, 30);
    });
    kapatD.addEventListener("click", function () { kapat(true); });
    perde.addEventListener("click", function () { kapat(true); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("acik")) kapat(true); });
    mobilMq.addEventListener("change", function (m) { if (!m.matches) kapat(false); });
    panel.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !panel.classList.contains("acik")) return;
      var o = $$("a, button", panel), i = o.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); o[o.length - 1].focus(); }
      else if (!e.shiftKey && i === o.length - 1) { e.preventDefault(); o[0].focus(); }
    });
  }
  if (window.__menuKapat) window.__menuKapat(false);

  /* ---------- Arama, filtre ve etiketler (istemci tarafı; dizin: /js/dizin.js) ---------- */
  var D = window.__DIZIN || [];
  var form = $("#ara-form"), q = $("#ara-q"), turS = $("#ara-tur"), katS = $("#ara-kat");
  var sonucK = $("#ara-sonuc"), liste = $("#ara-liste"), sayi = $("#ara-sayi"), durumY = $("#ara-durum"), temizle = $("#ara-temizle");
  var durum = { q: "", tur: "", kat: "", etiket: "" };
  var KARUSEL_TUR = { "Yazı": 1, "Ölçek": 1, "Oyun": 1, "Keşif": 1, "Egzersiz": 1 };
  var norm = function (s) { return String(s || "").toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  var kacis = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  D.forEach(function (d) { d._m = norm([d.baslik, d.ozet, d.tur, d.kategori].concat(d.etiketler).join(" ")); });

  function eslesir(d) {
    if (durum.tur && d.tur !== durum.tur) return false;
    if (durum.kat && d.kategori !== durum.kat) return false;
    if (durum.etiket && d.etiketler.indexOf(durum.etiket) < 0) return false;
    if (durum.q) { var p = norm(durum.q).split(/\s+/).filter(Boolean); for (var i = 0; i < p.length; i++) if (d._m.indexOf(p[i]) < 0) return false; }
    return true;
  }
  function aktifMi() { return !!(durum.q || durum.tur || durum.kat || durum.etiket); }

  function uygula(ac) {
    var karusel = !!$("#karusel");
    var sonuc = D.filter(eslesir), filtreli = aktifMi();
    window.__kesifDurum = { eslesen: filtreli ? sonuc.map(function (d) { return d.id; }) : null };
    if (karusel) window.dispatchEvent(new CustomEvent("kesif:degisti", { detail: window.__kesifDurum }));
    var gosterilen = karusel ? sonuc.filter(function (d) { return !KARUSEL_TUR[d.tur]; }) : sonuc;
    var karuselSayi = sonuc.length - gosterilen.length;
    $$(".etiket-hap").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.etiket === durum.etiket)); });
    if (!filtreli) { sonucK.hidden = true; durumY.textContent = ""; return; }
    var baslik = karusel
      ? (karuselSayi ? karuselSayi + " yazı ya da test karuselde" : "Karuselde eşleşen yok") + (gosterilen.length ? " · diğer " + gosterilen.length + " sonuç" : "")
      : sonuc.length + " sonuç";
    sayi.textContent = baslik + (durum.etiket ? " · etiket: " + durum.etiket : "");
    var yok = '<li class="yok">Eşleşen içerik bulunamadı. Başka bir sözcük ya da filtre deneyin.</li>';
    liste.innerHTML = gosterilen.length ? gosterilen.slice(0, 12).map(function (d) {
      return '<li><a href="' + kacis((window.__yol || String)(d.url)) + '"><b>' + kacis(d.baslik) + "</b><small>" + kacis(d.tur) + " · " + kacis(d.kategori) + "</small></a></li>";
    }).join("") : yok;
    // Ana sayfada yalnızca karuseldeki kartlar eşleşiyorsa liste açılmaz; sonuçlar karuselde görünür
    sonucK.hidden = !ac || (karusel && !gosterilen.length && sonuc.length > 0);
    durumY.textContent = sonuc.length + " içerik bulundu" + (karusel && karuselSayi ? ", " + karuselSayi + " tanesi karuselde" : "");
  }

  if (form && !form.dataset.bagli) {
    form.dataset.bagli = "1";
    var z;
    form.addEventListener("submit", function (e) { e.preventDefault(); uygula(true); });
    q.addEventListener("input", function () { clearTimeout(z); z = setTimeout(function () { durum.q = q.value.trim(); uygula(true); }, 120); });
    q.addEventListener("focus", function () { if (aktifMi()) uygula(true); });
    q.addEventListener("keydown", function (e) { if (e.key === "Escape") { sonucK.hidden = true; } });
    turS.addEventListener("change", function () { durum.tur = turS.value; uygula(true); });
    katS.addEventListener("change", function () { durum.kat = katS.value; uygula(true); });
    temizle.addEventListener("click", function () { sifirla(); q.focus(); });
    document.addEventListener("click", function (e) {
      if (!sonucK.hidden && !e.target.closest("#ara-cubuk") && !e.target.closest(".etiket-hap")) sonucK.hidden = true;
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sonucK.hidden) { sonucK.hidden = true; } });
    // Popüler etiketler
    document.addEventListener("click", function (e) {
      var b = e.target.closest(".etiket-hap"); if (!b) return;
      durum.etiket = durum.etiket === b.dataset.etiket ? "" : b.dataset.etiket;
      uygula(true);
      var hedef = $("#karusel") ? $("#kesfet") : $("#ara-cubuk");
      var r = hedef.getBoundingClientRect();
      if (r.top < 0 || r.top > window.innerHeight * 0.6) hedef.scrollIntoView({ behavior: azHareket ? "auto" : "smooth", block: "start" });
    });
  }
  function sifirla() {
    durum = { q: "", tur: "", kat: "", etiket: "" };
    if (form) { q.value = ""; turS.value = ""; katS.value = ""; uygula(false); }
  }
  sifirla();

  /* ---------- Arama çubuğu: kaydırınca belirginleşir ---------- */
  var cubuk = $("#ara-cubuk");
  var cizgi = function () { if (cubuk) cubuk.classList.toggle("kaydi", window.scrollY > 8); };
  if (!window.__ustBagli) { window.__ustBagli = true; window.addEventListener("scroll", cizgi, { passive: true }); }
  cizgi();

  /* ---------- Kavisli kaydırma göstergesi (sol panel) ---------- */
  var kd = $(".kaydirma"), dugum = $("#kaydirma-dugum");
  function gosterge() {
    if (!kd || !dugum) return;
    var mak = document.documentElement.scrollHeight - window.innerHeight;
    var t = mak > 0 ? Math.min(1, Math.max(0, window.scrollY / mak)) : 0;
    var w = kd.clientWidth, h = kd.clientHeight, u = 1 - t;
    var x = (u * u * 34 + 2 * u * t * -8 + t * t * 34) * w / 40, y = (u * u * 6 + 2 * u * t * 200 + t * t * 394) * h / 400;
    dugum.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
  }
  if (!window.__gostergeBagli) {
    window.__gostergeBagli = true; var bekle = false;
    window.addEventListener("scroll", function () { if (bekle) return; bekle = true; requestAnimationFrame(function () { bekle = false; gosterge(); }); }, { passive: true });
    window.addEventListener("resize", gosterge);
  }
  gosterge();

  /* ---------- Fareye göre hafif paralaks (arka plan katmanları) ---------- */
  var arkaP = $(".sahne-arka");
  if (arkaP && !azHareket && window.matchMedia("(pointer: fine)").matches && !window.__paralaks) {
    window.__paralaks = true; var px = 0, py = 0, kare = false;
    window.addEventListener("pointermove", function (e) {
      px = e.clientX / window.innerWidth - 0.5; py = e.clientY / window.innerHeight - 0.5;
      if (kare) return; kare = true;
      requestAnimationFrame(function () { kare = false; arkaP.style.setProperty("--mx", px.toFixed(3)); arkaP.style.setProperty("--my", py.toFixed(3)); });
    }, { passive: true });
  }

  /* ---------- Görsel yedeği: yüklenemeyen fotoğraf gizlenir, arkasındaki pastel zemin görünür (kırık simge yok) ---------- */
  var yedek = function (i) { i.classList.add("yuklenmedi"); };
  if (!window.__gorselBagli) {
    window.__gorselBagli = true;
    document.addEventListener("error", function (e) { if (e.target && e.target.tagName === "IMG") yedek(e.target); }, true);
  }
  $$("img").forEach(function (i) { if (i.complete && i.currentSrc && !i.naturalWidth) yedek(i); });

  /* ---------- SSS akordeonu ---------- */
  $$(".sss-dugme:not([data-bagli])").forEach(function (b) {
    b.dataset.bagli = "1";
    var p = document.getElementById(b.getAttribute("aria-controls"));
    b.addEventListener("click", function () {
      var acik = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", String(!acik)); p.classList.toggle("acik", !acik);
    });
  });

  /* ---------- Çevrilen yaklaşım kartları ---------- */
  $$(".cevir:not([data-bagli])").forEach(function (c) {
    c.dataset.bagli = "1";
    c.addEventListener("click", function () { var d = !c.classList.contains("donuk"); c.classList.toggle("donuk", d); c.setAttribute("aria-pressed", String(d)); });
  });

  /* ---------- 3B eğilme (yalnızca hassas işaretçi, hareket azaltma kapalıyken) ---------- */
  if (!azHareket && window.matchMedia("(pointer: fine)").matches) {
    $$("[data-egim]:not([data-bagli])").forEach(function (k) {
      k.dataset.bagli = "1";
      k.addEventListener("pointermove", function (e) {
        var r = k.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        k.style.transform = "rotateY(" + (x * 9) + "deg) rotateX(" + (-y * 8) + "deg) translateZ(6px)";
      });
      k.addEventListener("pointerleave", function () { k.style.transform = ""; });
    });
  }

  /* ---------- Ölçülü görünme: yalnızca ekranın altında kalan öğeler yerine oturur ---------- */
  if ("IntersectionObserver" in window && !azHareket) {
    var go = new IntersectionObserver(function (g) { g.forEach(function (x) { if (x.isIntersecting) { x.target.classList.remove("bekliyor"); go.unobserve(x.target); } }); }, { rootMargin: "0px 0px -6% 0px" });
    $$(".belir").forEach(function (e) { if (e.getBoundingClientRect().top > window.innerHeight) { e.classList.add("bekliyor"); go.observe(e); } });
  }

  /* ---------- Sabit CTA (mobil): alt bilgi ya da bir CTA bandı görünürken gizlenir ---------- */
  var cta = $("#sabit-cta");
  if (cta && !("IntersectionObserver" in window)) cta.classList.remove("gizle");
  if (cta && "IntersectionObserver" in window) {
    if (window.__ctaIo) window.__ctaIo.disconnect();
    var gorunen = new Set();
    var io = window.__ctaIo = new IntersectionObserver(function (g) {
      g.forEach(function (x) { if (x.isIntersecting) gorunen.add(x.target); else gorunen.delete(x.target); });
      cta.classList.toggle("gizle", gorunen.size > 0);
    });
    $$(".cta-band, .alt, .giris .dugme-sira").forEach(function (e) { io.observe(e); });
  }
})();
