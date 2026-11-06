// PHQ-9 ve GAD-7 — Türkçe madde metinleri: Türkiye Psikiyatri Derneği formları.
// Yanıtlar yalnızca bu sayfada, tarayıcıda puanlanır; hiçbir yere gönderilmez veya kaydedilmez.
(function () {
  "use strict";
  var OLCEK = {
    phq: {
      yonerge: "Geçen 2 hafta süresince, aşağıdaki sorunlardan ne sıklıkla rahatsız oldunuz?",
      sec: ["Hiçbir zaman", "Bazı günler", "Günlerin yarıdan fazlasında", "Hemen hemen her gün"],
      maddeler: [
        "Yaptığınız işlere karşı ilgi azlığı ya da yaptığınız işlerden zevk almama",
        "Kendini çökkün, depresif ya da ümitsiz hissetme",
        "Uykuya dalmakta güçlük çekme, uykuyu sürdürmekte güçlük çekme ya da fazla uyuma",
        "Kendini yorgun hissetme ya da enerjinin az olması",
        "İştah azlığı ya da aşırı yeme",
        "Kendinizi kötü hissetme ya da kendinizin veya ailenizin yüz karası olduğunuzu düşünme",
        "Gazete okuma ya da televizyon seyretmek gibi işlere yoğunlaşmada güçlük çekme",
        "Başkalarının fark edebileceği kadar yavaş hareket etme ya da konuşma. Aksine normalden daha hareketli ve huzursuz olma",
        "Ölü olsanız ya da kendinize bir şekilde zarar verseniz daha iyi olacağını düşünme"
      ],
      bant: [[0, 4, "En az düzeyde", "Yanıtlarınız son iki haftada depresif belirtilerin en az düzeyde olduğunu gösteriyor."],
             [5, 9, "Hafif", "Yanıtlarınız son iki haftada hafif düzeyde depresif belirti yaşadığınızı gösteriyor. Belirtiler sürer ya da artarsa bir uzmanla konuşmak yararlı olabilir."],
             [10, 14, "Orta", "Yanıtlarınız son iki haftada orta düzeyde depresif belirti yaşadığınızı gösteriyor. Bir ruh sağlığı uzmanıyla görüşmeniz önerilir."],
             [15, 19, "Orta-ağır", "Yanıtlarınız son iki haftada belirgin düzeyde depresif belirti yaşadığınızı gösteriyor. Yakın zamanda bir ruh sağlığı uzmanıyla görüşmeniz önerilir."],
             [20, 27, "Ağır", "Yanıtlarınız son iki haftada yoğun depresif belirti yaşadığınızı gösteriyor. Bir ruh sağlığı uzmanına mümkün olan en kısa sürede başvurmanız önerilir."]],
      risk: 8,
      kaynak: ['Kroenke, K., Spitzer, R. L. ve Williams, J. B. W. (2001). The PHQ-9: Validity of a brief depression severity measure. <i>Journal of General Internal Medicine, 16</i>(9), 606–613. <a href="https://doi.org/10.1046/j.1525-1497.2001.016009606.x" rel="noopener" target="_blank">doi.org/10.1046/j.1525-1497.2001.016009606.x</a>', 'Sarı, Y. E., Kökoğlu, B., Balcıoğlu, H., Bilge, U., Çolak, E. ve Ünlüoğlu, İ. (2016). Turkish reliability of the Patient Health Questionnaire-9. <i>Biomedical Research (India), 27</i>. <a href="https://avesis.ogu.edu.tr/yayin/ca1eb04f-c519-4256-afea-2ce098caa4cb/turkish-reliability-of-the-patient-health-questionnaire-9" rel="noopener" target="_blank">avesis.ogu.edu.tr</a>'],
      gelistiren: "PHQ-9: Kroenke, Spitzer ve Williams (2001). Puan aralıkları 5, 10, 15 ve 20 kesme noktalarına göre hafif, orta, orta-ağır ve ağır düzeyleri gösterir (Kroenke ve ark., 2001). Türkçe güvenirlik çalışması: Sarı ve ark. (2016)."
    },
    gad: {
      yonerge: "Geçen 2 hafta süresince, aşağıdaki sorunlardan ne sıklıkla rahatsız oldunuz?",
      sec: ["Hiçbir zaman", "Bazı günler", "Günlerin yarısından fazlasında", "Hemen hemen her gün"],
      maddeler: [
        "Kendini sinirli, kaygılı veya çok gergin hissetme",
        "Kaygılarını durduramama veya kontrol edememe",
        "Farklı şeylerden çok fazla endişelenme",
        "Gevşemede güçlük çekme",
        "Sakince oturamayacak kadar kendini huzursuz hissetme",
        "Kolayca kızma ve asabilenme",
        "Sanki çok kötü bir şey olacakmış gibi bir korku duyma"
      ],
      bant: [[0, 4, "En az düzeyde", "Yanıtlarınız son iki haftada kaygı belirtilerinin en az düzeyde olduğunu gösteriyor."],
             [5, 9, "Hafif", "Yanıtlarınız son iki haftada hafif düzeyde kaygı belirtisi yaşadığınızı gösteriyor."],
             [10, 14, "Orta", "Yanıtlarınız son iki haftada orta düzeyde kaygı belirtisi yaşadığınızı gösteriyor. Bir ruh sağlığı uzmanıyla görüşmeniz önerilir."],
             [15, 21, "Ağır", "Yanıtlarınız son iki haftada yoğun kaygı belirtisi yaşadığınızı gösteriyor. Bir ruh sağlığı uzmanına mümkün olan en kısa sürede başvurmanız önerilir."]],
      kesme: 8,
      kesmeNot: "Türkçe uyarlama çalışmasında en uygun kesme puanı 8 bulunmuştur (Konkan ve ark., 2013). Puanınız 8 veya üzerindeyse bir ruh sağlığı uzmanıyla görüşmeniz önerilir.",
      kaynak: ['Spitzer, R. L., Kroenke, K., Williams, J. B. W. ve Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. <i>Archives of Internal Medicine, 166</i>, 1092–1097. <a href="https://depts.washington.edu/psychres/wordpress/wp-content/uploads/2017/09/gad7_ref.pdf" rel="noopener" target="_blank">depts.washington.edu (tam metin)</a>', 'Konkan, R., Şenormancı, Ö., Güçlü, O., Aydın, E. ve Sungur, M. Z. (2013). Validity and reliability study for the Turkish adaptation of the Generalized Anxiety Disorder-7 (GAD-7) scale. <i>Nöropsikiyatri Arşivi, 50</i>(1), 53–58. <a href="https://doi.org/10.4274/npa.y6308" rel="noopener" target="_blank">doi.org/10.4274/npa.y6308</a>'],
      gelistiren: "GAD-7: Spitzer, Kroenke, Williams ve Löwe (2006). 5, 10 ve 15 kesme noktaları hafif, orta ve ağır kaygı düzeylerini gösterir (Spitzer ve ark., 2006). Türkçe uyarlama: Konkan ve ark. (2013)."
    }
  };

  function puanla(o, y) {
    if (y.length !== o.maddeler.length || y.some(function (v) { return v === null; })) return null;
    var t = y.reduce(function (a, b) { return a + b; }, 0);
    var b = o.bant.filter(function (x) { return t >= x[0] && t <= x[1]; })[0];
    return { toplam: t, max: o.maddeler.length * 3, bant: b, kriz: o.risk != null && y[o.risk] > 0, kesme: o.kesme != null && t >= o.kesme };
  }
  window.__puanla = function (k, y) { return puanla(OLCEK[k], y); }; // bağımsız doğrulama için

  var f = document.getElementById("olcek"); if (!f) return;
  var k = f.dataset.olcek, o = OLCEK[k];
  var azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function el(t, c, m) { var e = document.createElement(t); if (c) e.className = c; if (m != null) e.textContent = m; return e; }

  function kur() {
    f.innerHTML = "";
    var il = el("div", "ilerleme"); var sayac = el("span", "", "0 / " + o.maddeler.length + " soru yanıtlandı"); sayac.setAttribute("aria-live", "polite");
    var cub = el("div", "ilerleme-cubuk"), ic = el("i"); cub.appendChild(ic); il.appendChild(sayac); il.appendChild(cub); f.appendChild(il);
    f.appendChild(el("p", "vurgu-cumle", o.yonerge)).style.fontSize = "1.2rem";
    o.maddeler.forEach(function (m, i) {
      var fs = el("fieldset", "madde"), lg = el("legend"); lg.appendChild(el("b", "", (i + 1) + ".")); lg.appendChild(document.createTextNode(" " + m)); fs.appendChild(lg);
      var s = el("div", "secenek");
      o.sec.forEach(function (sc, p) { var lb = el("label"), inp = el("input"); inp.type = "radio"; inp.name = k + "-m" + i; inp.value = p; inp.id = k + "-m" + i + "-" + p; lb.appendChild(inp); lb.appendChild(el("span", "", sc)); s.appendChild(lb); });
      fs.appendChild(s); f.appendChild(fs);
    });
    var gonder = el("button", "dugme", "Sonucu göster"); gonder.type = "button"; gonder.disabled = true;
    var sira = el("div", "dugme-sira"); sira.appendChild(gonder); f.appendChild(sira);
    var sonucAlani = el("div", "arac-alan"); f.appendChild(sonucAlani);
    function yanitlar() { return o.maddeler.map(function (_, i) { var s = f.querySelector('input[name="' + k + "-m" + i + '"]:checked'); return s ? +s.value : null; }); }
    f.addEventListener("change", function () {
      var d = yanitlar().filter(function (v) { return v !== null; }).length;
      ic.style.width = (d / o.maddeler.length * 100) + "%"; sayac.textContent = d + " / " + o.maddeler.length + " soru yanıtlandı"; gonder.disabled = d !== o.maddeler.length;
    });
    gonder.addEventListener("click", function () {
      var s = puanla(o, yanitlar()); if (!s) return;
      sonucAlani.innerHTML = "";
      if (s.kriz) {
        var kr = el("div", "kriz"); kr.setAttribute("role", "alert");
        kr.appendChild(el("b", "", "Kendinize zarar verme düşünceleriniz olduğunu belirttiniz."));
        kr.appendChild(el("p", "", "Bu düşünceler şu an yoğunsa ya da kendinizi güvende hissetmiyorsanız hemen 112'yi arayın veya en yakın acil servise başvurun. Güvendiğiniz biriyle şimdi iletişime geçmek de önemli bir adımdır."));
        var a = el("a", "", "112'yi ara"); a.href = "tel:112"; kr.appendChild(a); sonucAlani.appendChild(kr);
      }
      var kut = el("div", "sonuc"); kut.tabIndex = -1;
      kut.appendChild(el("h2", "h2", "Sonucunuz")).style.fontSize = "1.6rem";
      var p = el("p", "puan", s.toplam + " "); p.appendChild(el("small", "", "/ " + s.max + " puan · " + s.bant[2])); kut.appendChild(p);
      var bt = el("div", "bant"), nk = el("i"); nk.style.left = (s.toplam / s.max * 100) + "%"; bt.appendChild(nk); bt.setAttribute("aria-hidden", "true"); kut.appendChild(bt);
      kut.appendChild(el("p", "", s.bant[3]));
      if (s.kesme && o.kesmeNot) kut.appendChild(el("p", "", o.kesmeNot));
      kut.appendChild(el("p", "", "Bu bir tanı değildir. Ölçek yalnızca son iki haftanıza dair kaba bir fikir verir.")).style.fontWeight = "600";
      kut.appendChild(el("p", "soluk kucuk", "Yanıtlarınız kaydedilmedi ve hiçbir yere gönderilmedi."));
      var ds = el("div", "dugme-sira"), il2 = el("a", "dugme", "Görüşme için yazın"); il2.href = (window.__yol || String)("/iletisim/"); ds.appendChild(il2);
      var tk = el("button", "dugme cizgi", "Yeniden başla"); tk.type = "button"; tk.addEventListener("click", function () { kur(); window.scrollTo({ top: 0, behavior: azHareket ? "auto" : "smooth" }); }); ds.appendChild(tk); kut.appendChild(ds);
      sonucAlani.appendChild(kut);
      sonucAlani.firstChild.scrollIntoView({ behavior: azHareket ? "auto" : "smooth", block: "start" });
      kut.focus({ preventScroll: true });
    });
  }
  kur();
  var kay = document.getElementById("olcek-kaynak");
  if (kay) kay.innerHTML = '<div class="kaynakca"><b>Ölçek hakkında</b><p style="margin-top:.4rem">Puan aralıkları: ' + o.bant.map(function (b) { return b[0] + "–" + b[1] + " " + b[2].toLowerCase(); }).join("; ") + ".</p>" + (o.kesmeNot ? "<p>" + o.kesmeNot + "</p>" : "") + "<ol>" + o.kaynak.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol><p><b>Geliştiren ve geçerlik:</b> " + o.gelistiren + "</p><p><b>Lisans:</b> Pfizer, PHQ ve GAD-7 ölçeklerinin telif kısıtlaması olmadan ve ücretsiz kullanılabileceğini duyurmuştur (<a href=\"https://www.news-medical.net/news/20100723/Pfizer-announces-unrestricted-access-to-patient-assessment-aids-for-mental-disorders.aspx\" rel=\"noopener\" target=\"_blank\">duyuru, 23 Temmuz 2010</a>). Lisanslı ya da ücretli bir ölçek kullanılmamıştır.</p></div>";
})();
