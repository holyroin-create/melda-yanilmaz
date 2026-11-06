// "Düşünce tuzağını yakala" — bilişsel çarpıtmaları tanıma oyunu (Beck, 1976; Burns, 1980). Veri kaydetmez.
(function () {
  "use strict";
  var TURLER = ["Aşırı genelleme", "Zihin okuma", "Felaketleştirme", "Ya hep ya hiç", "Etiketleme", "Meli-malı ifadeleri", "Olumluyu yok sayma"];
  var TUZAK = [
    ["Sınavda bir soruyu yapamadım; zaten hiçbir şeyi başaramıyorum.", 0, "Tek bir olaydan genel ve kalıcı bir sonuç çıkarılıyor.", "Bir soruyu yapamadım; diğerlerinde nasıl olduğuma bakabilirim."],
    ["Toplantıda sessizdi; kesin benim fikrimi saçma buldu.", 1, "Karşı tarafın ne düşündüğü, kanıt olmadan biliniyormuş gibi kabul ediliyor.", "Neden sessiz olduğunu bilmiyorum; merak ediyorsam sorabilirim."],
    ["Sunumda takılırsam herkes güler, işimi kaybederim.", 2, "Küçük bir olasılıktan en kötü senaryoya hızla atlanıyor.", "Takılabilirim; bu çoğu sunumda olur ve genellikle telafi edilebilir."],
    ["Ya mükemmel yaparım ya da hiç yapmamın anlamı yok.", 3, "Ara seçenekler görülmeden durum iki uca indirgeniyor.", "Yeterince iyi bir sonuç da değerlidir; başlamak bir adımdır."],
    ["Bir hata yaptım; ben tam bir beceriksizim.", 4, "Tek bir davranış, kişiliğin tamamını tanımlayan bir etikete dönüşüyor.", "Bir hata yaptım; bu benim kim olduğumun tamamı değil."],
    ["Her zaman güçlü olmalıyım, asla yorulmamalıyım.", 5, "Kendine katı ve gerçekçi olmayan kurallar koyuluyor.", "Yorulmam insani; ihtiyaç duyduğumda dinlenebilirim."],
    ["Övgü aldım ama şans eseriydi, sayılmaz.", 6, "Olumlu bir deneyim önemsizleştiriliyor.", "Bu övgüde benim emeğimin de payı olabilir."],
    ["Arkadaşım bugün aramadı; kimse beni önemsemiyor.", 0, "Tek bir olay, “kimse” ve “hiç” gibi genellemelere dönüşüyor.", "Bugün aramadı; başka zamanlarda arayan insanlar da var."]
  ];
  var kart = document.getElementById("tuzak-kart"); if (!kart) return;
  var cev = document.getElementById("tuzak-cevaplar"), gb = document.getElementById("tuzak-geri"), sn = document.getElementById("tuzak-sonraki");
  var sayac = document.getElementById("tuzak-sayac"), dus = document.getElementById("tuzak-dusunce");
  var azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tur = 0, dogru = 0, sira = [];
  function el(t, c, m) { var e = document.createElement(t); if (c) e.className = c; if (m != null) e.textContent = m; return e; }
  function karistir(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function goster() {
    cev.innerHTML = ""; gb.hidden = true; sn.hidden = true;
    if (tur >= sira.length) {
      sayac.textContent = "OYUN BİTTİ";
      dus.textContent = dogru + " / " + sira.length + " düşünce tuzağını yakaladınız.";
      var y = el("button", "dugme", "Yeniden oyna"); y.type = "button"; y.addEventListener("click", basla); cev.appendChild(y);
      var g = el("a", "dugme cizgi", "Bu konuyu konuşmak için yazın"); g.href = (window.__yol || String)("/iletisim/"); cev.appendChild(g);
      return;
    }
    var q = TUZAK[sira[tur]];
    sayac.textContent = "DÜŞÜNCE " + (tur + 1) + " / " + sira.length + " · DOĞRU: " + dogru;
    dus.textContent = "“" + q[0] + "”";
    if (!azHareket) { kart.classList.remove("dondur"); void kart.offsetWidth; kart.classList.add("dondur"); }
    TURLER.forEach(function (ad, i) {
      var b = el("button", "", ad); b.type = "button";
      b.addEventListener("click", function () {
        var d = i === q[1]; if (d) dogru++;
        [].forEach.call(cev.querySelectorAll("button"), function (x, j) { x.disabled = true; if (j === q[1]) x.classList.add("dogru"); else if (j === i) x.classList.add("yanlis"); });
        gb.innerHTML = "";
        gb.appendChild(el("p", "", (d ? "Doğru: " : "En belirgin olanı: ") + TURLER[q[1]] + ". " + q[2]));
        var a = el("p", ""); a.appendChild(el("b", "", "Daha dengeli bir düşünce: ")); a.appendChild(document.createTextNode(q[3])); gb.appendChild(a);
        gb.hidden = false; sn.hidden = false; sn.textContent = tur === sira.length - 1 ? "Sonucu gör" : "Sonraki düşünce"; sn.focus();
      });
      cev.appendChild(b);
    });
  }
  function basla() { tur = 0; dogru = 0; sira = karistir(TUZAK.map(function (_, i) { return i; })); goster(); }
  sn.addEventListener("click", function () { tur++; goster(); });
  basla();
})();
