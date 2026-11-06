// Çalışma alanları sayfası: şema sekmeleri, ABC örnekleri, bilişsel üçgen
(function () {
  "use strict";
  var $ = function (s, k) { return (k || document).querySelector(s); };
  var $$ = function (s, k) { return Array.prototype.slice.call((k || document).querySelectorAll(s)); };

  var sekmeler = $$(".sekme");
  function sec(s) { sekmeler.forEach(function (x) { var on = x === s; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; }); }
  sekmeler.forEach(function (s, i) {
    s.addEventListener("click", function () { sec(s); });
    s.addEventListener("keydown", function (e) {
      var j = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? sekmeler.length - 1 : null;
      if (j === null) return; e.preventDefault(); var n = sekmeler[(j + sekmeler.length) % sekmeler.length]; sec(n); n.focus();
    });
  });

  var ABC = [
    ["Arkadaşınız mesajınıza saatlerdir cevap vermedi.", "“Bana kırıldı, artık beni önemsemiyor.”", "Huzursuzluk, üzüntü; telefonu sürekli kontrol etme.", "“Herhalde yoğun, müsait olunca yazar.”", "Sakinlik; güne devam etme."],
    ["Sunum sırasında bir an ne diyeceğinizi unuttunuz.", "“Herkes beceriksiz olduğumu düşündü.”", "Utanç; bir sonraki sunumdan kaçınma isteği.", "“Bir an takıldım, toparladım; çoğu kişi fark etmemiştir.”", "Hafif bir mahcubiyet; sonra rahatlama."],
    ["Trafikte biri önünüze kırdı.", "“Bunu bana bilerek yaptı.”", "Öfke; korna, gerginlik.", "“Acelesi vardır, belki dikkat etmedi.”", "Kısa bir irkilme; öfke yumuşar."]
  ];
  var kutular = $$("#abc span");
  function abc(i) { ABC[i].forEach(function (m, k) { kutular[k].textContent = m; }); $$("#abc-sec button").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.i === i)); }); }
  $$("#abc-sec button").forEach(function (b) { b.addEventListener("click", function () { abc(+b.dataset.i); }); });
  if (kutular.length) abc(0);

  var UCGEN = [
    "Düşünce: “Bu işi asla bitiremeyeceğim” düşüncesi kaygıyı artırır; kaygı başlamayı zorlaştırır; başlamamak da düşünceyi doğrular gibi görünür.",
    "Duygu: Yoğun kaygı, düşünceyi daha karamsar hâle getirebilir ve kaçınma davranışını tetikleyebilir.",
    "Davranış: Küçük bir adım atmak (ilk paragrafı yazmak) “yapamam” düşüncesini sınar. Bilişsel modele göre davranış değişince düşünce ve duygu da değişebilir."
  ];
  var bilgi = $("#ucgen-bilgi");
  $$(".ucgen-uc").forEach(function (g) {
    function s() { $$(".ucgen-uc").forEach(function (x) { x.classList.remove("secili"); }); g.classList.add("secili"); bilgi.textContent = UCGEN[+g.dataset.u]; }
    g.addEventListener("click", s);
    g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); s(); } });
  });
  if (bilgi) bilgi.textContent = UCGEN[0];

  // /hizmetler/#semalar ile gelindiyse sekmeler bölümüne odaklan
  if (location.hash === "#semalar" && sekmeler[0]) sekmeler[0].focus({ preventScroll: true });
})();
