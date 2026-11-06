// Kutu nefesi zamanlayıcısı (4-4-4-4). Veri saklamaz.
(function () {
  "use strict";
  var EVRE = [["Nefes al", 1], ["Tut", 1], ["Ver", 0.45], ["Bekle", 0.45]];
  var daire = document.getElementById("nefes-daire"); if (!daire) return;
  var evreEl = document.getElementById("nefes-evre"), sayi = document.getElementById("nefes-sayi"), kalan = document.getElementById("nefes-kalan"), btn = document.getElementById("nefes-basla"), sahne = document.getElementById("nefes-sahne");
  var z = null, bitis = 0, ei = 0, eb = 0;
  function evre(i, t) { ei = i; eb = t + 4000; evreEl.textContent = EVRE[i][0]; daire.style.transitionDuration = "4s"; daire.style.transform = "scale(" + EVRE[i][1] + ")"; }
  function tik() {
    var t = Date.now();
    if (t >= eb) { if (t >= bitis && ei === 3) return dur(true); evre((ei + 1) % 4, eb); }
    sayi.textContent = Math.max(1, Math.ceil((eb - t) / 1000));
    var k = Math.max(0, Math.ceil((bitis - t) / 1000)); kalan.textContent = "Kalan süre: " + Math.floor(k / 60) + ":" + String(k % 60).padStart(2, "0");
  }
  function basla() {
    var dk = +(document.querySelector('input[name="nsure"]:checked') || { value: 3 }).value, t = Date.now();
    bitis = t + dk * 60000; sahne.classList.remove("nefes-hazir"); evre(0, t); tik(); z = setInterval(tik, 200); btn.textContent = "Durdur";
  }
  function dur(tamam) {
    clearInterval(z); z = null; daire.style.transitionDuration = "1.2s"; daire.style.transform = "scale(.45)"; sahne.classList.add("nefes-hazir");
    evreEl.textContent = tamam ? "Tamamlandı. Nasıl hissediyorsunuz?" : "Durduruldu"; sayi.textContent = ""; kalan.textContent = ""; btn.textContent = "Yeniden başlat";
  }
  btn.addEventListener("click", function () { z ? dur(false) : basla(); });
  document.addEventListener("visibilitychange", function () { if (document.hidden && z) dur(false); });
})();
