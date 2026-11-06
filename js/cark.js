// Duygu çarkı — Plutchik'in (1980) sekiz temel duygusu. Açıklamalar Plutchik (1980) "A general psychoevolutionary theory of emotion", Tablo 1.2'deki uyarıcı → davranış → işlev dizilerine dayanır.
(function () {
  "use strict";
  var DUYGU = [
    ["Neşe", "#8c6a1f", "Plutchik'in modelinde değer verilen birine ya da bir şeye kavuşmayla ilişkilendirilir; yakınlaşma davranışına eşlik eder."],
    ["Güven", "#6b5c2b", "Modelde “bizden biri” olarak görülen birine karşı hissedilir; paylaşma ve bağ kurma (birliktelik) işlevi taşır."],
    ["Korku", "#1f4b4c", "Bir tehdit tehlike olarak algılandığında ortaya çıkar; uzaklaşma davranışıyla korunma işlevi görür."],
    ["Şaşkınlık", "#2a5f60", "Ani ve yeni bir durum karşısında ortaya çıkar (“Bu ne?”); durup dikkat kesilmeye, yani yönelime hizmet eder."],
    ["Üzüntü", "#22344f", "Değer verilen birinin kaybıyla ilişkilendirilir; yardım arama davranışı aracılığıyla yeniden bütünleşmeye (yeniden bağ kurmaya) hizmet eder."],
    ["Tiksinti", "#3d4a5c", "Zararlı görülen bir şey karşısında ortaya çıkar; onu itme ve reddetme davranışıyla ilişkilidir."],
    ["Öfke", "#16243b", "Bir engelle karşılaşıldığında ortaya çıkar; modelde işlevi engeli ortadan kaldırmaktır."],
    ["Beklenti", "#7d5a12", "Yeni bir alanla karşılaşıldığında ortaya çıkar (“Orada ne var?”); inceleme ve keşif davranışıyla ilişkilidir."]
  ];
  var svg = document.getElementById("cark"); if (!svg) return;
  var bilgi = document.getElementById("duygu-bilgi"), ns = "http://www.w3.org/2000/svg", cx = 160, cy = 160, R = 150, r0 = 46;
  function p(r, a) { return (cx + r * Math.cos(a)).toFixed(1) + " " + (cy + r * Math.sin(a)).toFixed(1); }
  DUYGU.forEach(function (d, i) {
    var a0 = (i / 8) * Math.PI * 2 - Math.PI / 2 - Math.PI / 8, a1 = a0 + Math.PI / 4;
    var yol = document.createElementNS(ns, "path");
    yol.setAttribute("d", "M" + p(r0, a0) + " L" + p(R, a0) + " A" + R + " " + R + " 0 0 1 " + p(R, a1) + " L" + p(r0, a1) + " A" + r0 + " " + r0 + " 0 0 0 " + p(r0, a0) + "Z");
    yol.setAttribute("fill", d[1]); yol.setAttribute("tabindex", "0"); yol.setAttribute("role", "button"); yol.setAttribute("aria-label", d[0]);
    function sec() {
      [].forEach.call(svg.querySelectorAll("path"), function (x) { x.classList.remove("secili"); }); yol.classList.add("secili");
      bilgi.innerHTML = ""; var h = document.createElement("h2"); h.textContent = d[0]; var t = document.createElement("p"); t.className = "soluk"; t.textContent = d[2]; bilgi.appendChild(h); bilgi.appendChild(t);
    }
    yol.addEventListener("click", sec);
    yol.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sec(); } });
    svg.appendChild(yol);
    var am = (a0 + a1) / 2, tx = document.createElementNS(ns, "text");
    tx.setAttribute("x", cx + 100 * Math.cos(am)); tx.setAttribute("y", cy + 100 * Math.sin(am) + 4); tx.setAttribute("text-anchor", "middle"); tx.textContent = d[0];
    svg.appendChild(tx);
  });
  var m = document.createElementNS(ns, "circle"); m.setAttribute("cx", cx); m.setAttribute("cy", cy); m.setAttribute("r", r0 - 6); m.setAttribute("fill", "#f3f5f7"); svg.appendChild(m);
})();
