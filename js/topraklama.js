// 5-4-3-2-1 topraklama egzersizi — adım adım. Veri saklamaz.
(function () {
  "use strict";
  var ADIM = [[5, "Gördüğünüz", "Çevrenizde görebildiğiniz beş şeyi fark edin. Renklerine, biçimlerine bakın."],
              [4, "Dokunabildiğiniz", "Dokunabildiğiniz dört şeyi fark edin: kıyafetinizin dokusu, oturduğunuz yer, ayaklarınızın altındaki zemin."],
              [3, "Duyduğunuz", "Duyabildiğiniz üç sesi fark edin; uzaktaki ve yakındaki sesler."],
              [2, "Kokusunu aldığınız", "Kokusunu alabildiğiniz iki şeyi fark edin. Hiç koku yoksa sevdiğiniz bir kokuyu düşünebilirsiniz."],
              [1, "Tadını aldığınız", "Ağzınızdaki bir tadı ya da sevdiğiniz bir tadı fark edin."]];
  var kap = document.getElementById("topraklama"); if (!kap) return;
  var gosterge = [].slice.call(document.querySelectorAll("#topr-gosterge i"));
  var i = 0;
  function el(t, c, m) { var e = document.createElement(t); if (c) e.className = c; if (m != null) e.textContent = m; return e; }
  function goster(odak) {
    kap.innerHTML = "";
    gosterge.forEach(function (g, j) { g.classList.toggle("dolu", j < i || (i < ADIM.length && j === i)); });
    if (i >= ADIM.length) {
      kap.appendChild(el("h2", "h2", "Tamamlandı.")).style.fontSize = "2rem";
      kap.appendChild(el("p", "vurgu-cumle", "Şu an bedeninizde ne fark ediyorsunuz?"));
      var ds = el("div", "dugme-sira"), y = el("button", "dugme cizgi", "Yeniden başla"); y.type = "button"; y.addEventListener("click", function () { i = 0; goster(true); }); ds.appendChild(y);
      var n = el("a", "dugme", "Kutu nefesini deneyin"); n.href = (window.__yol || String)("/araclar/kutu-nefesi/"); ds.appendChild(n); kap.appendChild(ds);
      return;
    }
    var a = ADIM[i];
    kap.appendChild(el("p", "adim-sayi", String(a[0]))).setAttribute("aria-hidden", "true");
    var h = el("h2", "etiket", a[0] + " şey · " + a[1]); h.tabIndex = -1; kap.appendChild(h);
    kap.appendChild(el("p", "vurgu-cumle", a[2])).style.fontSize = "1.2rem";
    var kt = el("div", "kutucuklar");
    for (var n2 = 1; n2 <= a[0]; n2++) { var l = el("label"), c = el("input"); c.type = "checkbox"; c.id = "tp-" + i + "-" + n2; l.appendChild(c); l.appendChild(document.createTextNode(n2 + ". fark ettim")); kt.appendChild(l); }
    kap.appendChild(kt);
    var ds2 = el("div", "dugme-sira"), s = el("button", "dugme", i === ADIM.length - 1 ? "Bitir" : "Sonraki adım"); s.type = "button"; s.addEventListener("click", function () { i++; goster(true); }); ds2.appendChild(s); kap.appendChild(ds2);
    if (odak) h.focus();
  }
  goster(false);
})();
