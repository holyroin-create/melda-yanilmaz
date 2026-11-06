// Ana sayfa 3B sahneleri (three.js r128, yerel kopya): giriş küresi ve kaydırmalı "yolculuk".
// Performans: three.js yalnızca sahne görüş alanına yaklaşınca yüklenir; zayıf cihaz/telefonda nokta sayısı ve çözünürlük düşer;
// ekran dışındayken çizim durur; WebGL yoksa düz görsel kalır.
(function () {
  "use strict";
  var azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hafif = window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4;
  var T = window.THREE;

  function renderer(canvas) {
    if (!T) return null;
    try { var r = new T.WebGLRenderer({ canvas: canvas, antialias: !hafif, alpha: true, powerPreference: "low-power" }); r.setPixelRatio(Math.min(window.devicePixelRatio || 1, hafif ? 1.25 : 1.75)); return r; }
    catch (e) { return null; }
  }
  function gorunurlukIzle(el, cb) {
    if (!("IntersectionObserver" in window)) { cb(true); return; }
    new IntersectionObserver(function (g) { cb(g[0].isIntersecting); }).observe(el);
  }

  // three.js'i gerektiğinde bir kez yükle (ilk boyamayı ve etkileşimi geciktirmez)
  var bekleyen = [];
  function threeYukle(cb) {
    if (window.THREE) { T = window.THREE; cb(); return; }
    bekleyen.push(cb);
    if (bekleyen.length > 1) return;
    var sc = document.createElement("script"); sc.src = (window.__yol || String)("/vendor/three.r128.min.js"); sc.async = true;
    sc.onload = function () { T = window.THREE; var k = bekleyen; bekleyen = []; k.forEach(function (f) { f(); }); };
    document.head.appendChild(sc);
  }
  // Öğe görüş alanına yaklaşınca, tarayıcı boşta kaldığında başlat
  function yaklasinca(el, f) {
    if (!el) return;
    var bosta = function () { if ("requestIdleCallback" in window) requestIdleCallback(function () { threeYukle(f); }, { timeout: 1500 }); else threeYukle(f); };
    if (!("IntersectionObserver" in window)) { bosta(); return; }
    var io = new IntersectionObserver(function (g) { if (g[0].isIntersecting) { io.disconnect(); bosta(); } }, { rootMargin: "250px 0px" });
    io.observe(el);
  }

  /* ---------- Giriş küresi ---------- */
  yaklasinca(document.querySelector(".sahne-kap"), function kure() {
    var canvas = document.getElementById("sahne"); if (!canvas) return;
    var gl = renderer(canvas); if (!gl) return;
    document.getElementById("sahne-yedek").hidden = true;
    var kap = canvas.parentNode, sc = new T.Scene(), cam = new T.PerspectiveCamera(40, 1, 0.1, 100);
    cam.position.set(0, 0, 6.2);
    var N = hafif ? 900 : 2000, poz = new Float32Array(N * 3), taban = new Float32Array(N * 3), renk = new Float32Array(N * 3);
    var c1 = new T.Color("#16243b"), c2 = new T.Color("#1f4b4c"), c3 = new T.Color("#b8892b");
    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      taban[i * 3] = Math.cos(th) * r; taban[i * 3 + 1] = y; taban[i * 3 + 2] = Math.sin(th) * r;
      var c = i % 17 === 0 ? c3 : (i % 3 === 0 ? c2 : c1);
      renk[i * 3] = c.r; renk[i * 3 + 1] = c.g; renk[i * 3 + 2] = c.b;
    }
    var geo = new T.BufferGeometry();
    geo.setAttribute("position", new T.BufferAttribute(poz, 3)); geo.setAttribute("color", new T.BufferAttribute(renk, 3));
    var grup = new T.Group();
    grup.add(new T.Points(geo, new T.PointsMaterial({ size: hafif ? 0.05 : 0.035, vertexColors: true, transparent: true, opacity: 0.95 })));
    [1.55, 1.85].forEach(function (rr, k) {
      var h = new T.Mesh(new T.TorusGeometry(rr, 0.004, 8, 160), new T.MeshBasicMaterial({ color: k ? 0x9aa4b1 : 0xb8892b, transparent: true, opacity: k ? 0.5 : 0.85 }));
      h.rotation.x = k ? 1.2 : 1.45; h.rotation.y = k ? 0.4 : -0.2; grup.add(h);
    });
    sc.add(grup);
    var hx = 0, hy = 0;
    window.addEventListener("pointermove", function (e) { hx = (e.clientX / window.innerWidth - 0.5) * 0.6; hy = (e.clientY / window.innerHeight - 0.5) * 0.4; }, { passive: true });
    function boyut() { var w = kap.clientWidth, h = kap.clientHeight; gl.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    window.addEventListener("resize", boyut); boyut();
    var gorunur = true; gorunurlukIzle(kap, function (v) { gorunur = v; });
    var t0 = performance.now();
    function kare(now) {
      var t = (now - t0) / 1000;
      for (var i = 0; i < N; i++) {
        var x = taban[i * 3], y = taban[i * 3 + 1], z = taban[i * 3 + 2];
        var d = 1.35 + 0.09 * Math.sin(x * 3.1 + t * 0.9) * Math.cos(y * 2.7 - t * 0.7) + 0.05 * Math.sin(z * 4 + t * 1.3);
        poz[i * 3] = x * d; poz[i * 3 + 1] = y * d; poz[i * 3 + 2] = z * d;
      }
      geo.attributes.position.needsUpdate = true;
      grup.rotation.y = t * 0.08 + hx; grup.rotation.x = 0.25 + hy;
      gl.render(sc, cam);
    }
    if (azHareket) { kare(t0 + 2000); return; }
    (function dongu(now) { if (!canvas.isConnected) return; requestAnimationFrame(dongu); if (gorunur && !document.hidden) kare(now); })(t0);
  });

  /* ---------- Yolculuk: karmaşa → fark etmek → düzen ---------- */
  (function yolculuk() {
    var bolum = document.getElementById("yolculuk"); if (!bolum) return;
    var sahneEl = document.getElementById("yolculuk-sahne"), canvas = document.getElementById("yolculuk-canvas");
    var adimlar = [].slice.call(bolum.querySelectorAll(".adim-metin")), noktalar = [].slice.call(bolum.querySelectorAll(".yolculuk-nokta i"));
    if (azHareket) { adimlar.forEach(function (x) { x.classList.add("aktif"); }); return; }
    var ilerleme = 0, aktif = 0;
    function hesapla() {
      var r = bolum.getBoundingClientRect(), yol = r.height - window.innerHeight;
      ilerleme = Math.min(1, Math.max(0, -r.top / (yol || 1)));
      var a = ilerleme < 0.34 ? 0 : ilerleme < 0.67 ? 1 : 2;
      if (a !== aktif) { aktif = a; adimlar.forEach(function (x, i) { x.classList.toggle("aktif", i === a); }); noktalar.forEach(function (x, i) { x.classList.toggle("aktif", i === a); }); }
    }
    window.addEventListener("scroll", function sc() { if (!bolum.isConnected) return window.removeEventListener("scroll", sc); hesapla(); }, { passive: true }); hesapla();

    var basladi = false;
    function baslat() {
      if (basladi) return; basladi = true;
      var gl = renderer(canvas); if (!gl) return;
      document.getElementById("yolculuk-yedek").hidden = true;
      var sc = new T.Scene(), cam = new T.PerspectiveCamera(50, 1, 0.1, 100);
      cam.position.set(0, 1.9, 6.4); cam.lookAt(0, -0.2, 0);
      var K = hafif ? 28 : 44, N = K * K;
      var A = new Float32Array(N * 3), B = new Float32Array(N * 3), C = new Float32Array(N * 3), poz = new Float32Array(N * 3), renk = new Float32Array(N * 3);
      var rnd = function () { return Math.random() * 2 - 1; }, gauss = function () { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; };
      var merkez = [[-2.4, .6, -1], [-.4, 1.1, .8], [1.8, .3, -.6], [.9, -.9, 1.2], [-1.6, -.8, .5]];
      for (var i = 0; i < N; i++) {
        A[i * 3] = rnd() * 4.6; A[i * 3 + 1] = rnd() * 2.6; A[i * 3 + 2] = rnd() * 3.2;
        var m = merkez[i % merkez.length];
        B[i * 3] = m[0] + gauss() * .55; B[i * 3 + 1] = m[1] + gauss() * .45; B[i * 3 + 2] = m[2] + gauss() * .55;
        C[i * 3] = ((i % K) / (K - 1) - .5) * 9; C[i * 3 + 1] = -.6; C[i * 3 + 2] = (Math.floor(i / K) / (K - 1) - .5) * 6.5;
      }
      var geo = new T.BufferGeometry();
      geo.setAttribute("position", new T.BufferAttribute(poz, 3)); geo.setAttribute("color", new T.BufferAttribute(renk, 3));
      sc.add(new T.Points(geo, new T.PointsMaterial({ size: hafif ? 0.065 : 0.045, vertexColors: true, transparent: true, opacity: .95 })));
      var gri = new T.Color("#5b6678"), petrol = new T.Color("#6fa3a1"), hardal = new T.Color("#e9c983"), beyaz = new T.Color("#f3f5f7"), k = new T.Color();
      var z1 = new T.Color("#0e1828"), z2 = new T.Color("#17393b"), zm = new T.Color();
      var fx = 99, fz = 99, hfx = 99, hfz = 99, ray = new T.Raycaster(), duz = new T.Plane(new T.Vector3(0, 1, 0), .6), v2 = new T.Vector2(), kes = new T.Vector3();
      sahneEl.addEventListener("pointermove", function (e) {
        var r = canvas.getBoundingClientRect(); v2.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(v2, cam); if (ray.ray.intersectPlane(duz, kes)) { hfx = kes.x; hfz = kes.z; }
      }, { passive: true });
      sahneEl.addEventListener("pointerleave", function () { hfx = 99; hfz = 99; });
      function boyut() { var w = sahneEl.clientWidth, h = sahneEl.clientHeight; gl.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
      window.addEventListener("resize", boyut); boyut();
      var yum = function (x) { return x * x * (3 - 2 * x); };
      var gorunur = true; gorunurlukIzle(bolum, function (v) { gorunur = v; });
      var t0 = performance.now();
      (function dongu(now) {
        if (!canvas.isConnected) return;
        requestAnimationFrame(dongu);
        if (!gorunur || document.hidden) return;
        var t = (now - t0) / 1000, p = ilerleme, ab = yum(Math.min(1, p / .45)), bc = yum(Math.min(1, Math.max(0, (p - .45) / .4))), rk = Math.min(1, p * 1.2);
        fx += (hfx - fx) * .08; fz += (hfz - fz) * .08;
        for (var i = 0; i < N; i++) {
          var j = i * 3, ti = (1 - bc) * .06;
          var x = A[j] + (B[j] - A[j]) * ab + Math.sin(t * 1.3 + i) * ti, y = A[j + 1] + (B[j + 1] - A[j + 1]) * ab + Math.cos(t * 1.1 + i * .7) * ti, z = A[j + 2] + (B[j + 2] - A[j + 2]) * ab;
          var cx = C[j], cz = C[j + 2], d = Math.sqrt((cx - fx) * (cx - fx) + (cz - fz) * (cz - fz));
          var dalga = .16 * Math.sin(cx * .9 + t * .9) + .12 * Math.cos(cz * 1.2 - t * .7) + .35 * Math.exp(-d * d * .6) * Math.sin(d * 3 - t * 3);
          poz[j] = x + (cx - x) * bc; poz[j + 1] = y + (C[j + 1] + dalga - y) * bc; poz[j + 2] = z + (cz - z) * bc;
          k.copy(gri).lerp(i % 11 === 0 ? hardal : (i % 3 === 0 ? beyaz : petrol), rk);
          if (bc > 0) k.lerp(beyaz, Math.max(0, dalga) * .8 * bc);
          renk[j] = k.r; renk[j + 1] = k.g; renk[j + 2] = k.b;
        }
        geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
        zm.copy(z1).lerp(z2, yum(p)); sahneEl.style.backgroundColor = "#" + zm.getHexString();
        gl.render(sc, cam);
      })(t0);
    }
    if ("IntersectionObserver" in window) {
      var on = new IntersectionObserver(function (g) { if (g[0].isIntersecting) { on.disconnect(); threeYukle(baslat); } }, { rootMargin: "400px 0px" });
      on.observe(bolum);
    } else threeYukle(baslat);
  })();
})();
