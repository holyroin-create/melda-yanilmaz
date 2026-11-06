// Ana sayfa 3B coverflow karuseli: ok düğmeleri, fare/dokunma sürükleme, klavye ← →, tıklanan yan kart merkeze gelir.
// Arama çubuğu, filtreler ve etiketler "kesif:degisti" olayıyla kartları süzer (site.js).
(function () {
  "use strict";
  var sahne = document.getElementById("karusel"); if (!sahne || sahne.dataset.bagli) return;
  sahne.dataset.bagli = "1";
  var iz = document.getElementById("kf-iz"), bos = document.getElementById("kf-bos"), sayac = document.getElementById("kf-sayac");
  var onceki = document.getElementById("kf-onceki"), sonraki = document.getElementById("kf-sonraki");
  var kartlar = [].slice.call(sahne.querySelectorAll(".kf-kart"));
  var gorunen = kartlar.slice(), aktif = Math.min(2, kartlar.length - 1), W = 0, kw = 0, mobil = false, sonDuyuru = "";
  sahne.classList.add("hazir");

  function olc() {
    W = sahne.clientWidth; mobil = W < 560;
    kw = mobil ? Math.min(320, W - 56) : Math.max(210, Math.min(300, W * 0.36));
    sahne.style.setProperty("--kf-w", kw + "px");
    sahne.style.setProperty("--kf-h", Math.round(kw * 0.75 + 214) + "px");
  }

  function yerlestir(duyur) {
    kartlar.forEach(function (k) {
      var i = gorunen.indexOf(k);
      if (i < 0) { k.classList.add("disari"); k.classList.remove("aktif"); k.inert = true; k.setAttribute("aria-hidden", "true"); k.style.transform = "translate(-50%,-50%) scale(.6)"; k.style.opacity = "0"; return; }
      var d = i - aktif, a = Math.abs(d), s = d < 0 ? -1 : 1;
      var x = a === 0 ? 0 : s * (kw * 0.6 + (a - 1) * kw * 0.4);
      var rot = a === 0 ? 0 : -s * (a === 1 ? 34 : 42);
      var sc = 1 - 0.15 * Math.min(a, 3), z = -a * 110;
      var op = a > 2 ? 0 : a === 0 ? 1 : a === 1 ? 0.94 : 0.72;
      if (mobil) { x = s * Math.min(a, 1) * W * 0.85; rot = 0; z = 0; sc = a ? 0.85 : 1; op = a ? 0 : 1; }
      var gizle = op === 0;
      k.classList.remove("disari");
      k.classList.toggle("aktif", a === 0);
      k.classList.toggle("uzak", a >= 2); // uzak kartlar yalnızca önizleme: düğmesi gizli, kartın kendisi tıklanınca merkeze gelir
      k.classList.toggle("sagda", d > 0); // sağdaki kartta düğme sağa yaslanır, merkez kartın altında kalmaz
      k.inert = gizle; k.setAttribute("aria-hidden", gizle ? "true" : "false");
      k.style.transform = "translate(-50%,-50%) translateX(" + x.toFixed(1) + "px) perspective(1100px) translateZ(" + z + "px) rotateY(" + rot + "deg) scale(" + sc.toFixed(3) + ")";
      k.style.opacity = String(op);
      k.style.zIndex = String(50 - a);
    });
    bos.hidden = gorunen.length > 0;
    onceki.disabled = aktif <= 0; sonraki.disabled = aktif >= gorunen.length - 1;
    var t = gorunen.length ? (aktif + 1) + " / " + gorunen.length : "0 içerik";
    sayac.textContent = t;
    if (duyur && gorunen[aktif]) {
      var b = gorunen[aktif].querySelector(".kf-baslik").textContent;
      if (b !== sonDuyuru) { sayac.textContent = t + " · " + b; sonDuyuru = b; }
    }
  }

  function git(n, duyur) {
    if (!gorunen.length) return;
    aktif = Math.max(0, Math.min(gorunen.length - 1, n));
    yerlestir(duyur !== false);
  }

  onceki.addEventListener("click", function () { git(aktif - 1); });
  sonraki.addEventListener("click", function () { git(aktif + 1); });

  sahne.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); git(aktif - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); git(aktif + 1); }
    else if (e.key === "Home") { e.preventDefault(); git(0); }
    else if (e.key === "End") { e.preventDefault(); git(gorunen.length - 1); }
  });

  // Klavyeyle (Tab) bir yan kartın bağlantısına gelinirse o kart merkeze gelir
  sahne.addEventListener("focusin", function (e) {
    var k = e.target.closest(".kf-kart"); if (!k) return;
    // Yalnızca klavye odağı: fareyle basışta odak tıklamadan önce gelir ve tıklamayı "merkez kart" sanırdı
    var klavye = true; try { klavye = e.target.matches(":focus-visible"); } catch (x) {}
    if (!klavye) return;
    var i = gorunen.indexOf(k); if (i >= 0 && i !== aktif) git(i);
  });

  // Sürükleme / kaydırma (fare ve dokunma)
  var basX = null, basY = 0, fark = 0, surukledi = false;
  sahne.addEventListener("pointerdown", function (e) {
    if (e.button !== 0 || e.target.closest("button")) return;
    basX = e.clientX; basY = e.clientY; fark = 0; surukledi = false;
  });
  sahne.addEventListener("pointermove", function (e) {
    if (basX === null) return;
    fark = e.clientX - basX;
    if (!surukledi && Math.abs(fark) > 8 && Math.abs(fark) > Math.abs(e.clientY - basY)) { surukledi = true; sahne.classList.add("suruklen"); try { sahne.setPointerCapture(e.pointerId); } catch (x) {} }
    if (surukledi) iz.style.transform = "translateX(" + (fark * 0.35).toFixed(1) + "px)";
  });
  function birak() {
    if (basX === null) return;
    if (surukledi && Math.abs(fark) > 40) git(aktif + (fark < 0 ? 1 : -1));
    iz.style.transform = ""; sahne.classList.remove("suruklen"); basX = null;
    if (surukledi) setTimeout(function () { surukledi = false; }, 0);
  }
  sahne.addEventListener("pointerup", birak);
  sahne.addEventListener("pointercancel", birak);

  // Tıklama: yan kart merkeze gelir; merkezdeki kartın herhangi bir yeri bağlantıyı açar
  sahne.addEventListener("click", function (e) {
    if (surukledi) { e.preventDefault(); e.stopPropagation(); return; }
    var k = e.target.closest(".kf-kart"); if (!k) return;
    var i = gorunen.indexOf(k); if (i < 0) return;
    if (i !== aktif) { e.preventDefault(); git(i); return; }
    if (!e.target.closest("a")) { var a = k.querySelector(".kf-git"); if (a) a.click(); }
  }, true);

  // Arama, filtre ve etiketlerle süzme
  window.addEventListener("kesif:degisti", function (e) {
    var ids = e.detail && e.detail.eslesen;
    gorunen = kartlar.filter(function (k) { return !ids || ids.indexOf(k.dataset.id) >= 0; });
    aktif = ids ? 0 : Math.min(2, gorunen.length - 1); yerlestir(false);
  });

  var zaman;
  window.addEventListener("resize", function () { clearTimeout(zaman); zaman = setTimeout(function () { olc(); yerlestir(false); }, 80); });
  olc(); yerlestir(false);
  if (window.__kesifDurum) window.dispatchEvent(new CustomEvent("kesif:degisti", { detail: window.__kesifDurum }));
})();
