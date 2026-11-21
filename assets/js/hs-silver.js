(function () {
  "use strict";
  // GANTI nomor WhatsApp (format internasional tanpa +)
  var WA_NUMBER = "6281286080823"; // 0812-8608-0823


  // Logo + nama HS SILVER di halaman utama: klik = kembali ke atas, TANPA refresh halaman
  document.querySelectorAll("a[data-no-reload]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.history && history.replaceState) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  });

  // Kartu harga: klik kartu = kartu itu "timbul" seperti kartu tengah
  var cards = document.querySelectorAll(".pricing .pricing-card");
  function selectCard(card) {
    cards.forEach(function (c) {
      var on = c === card;
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
  cards.forEach(function (card) {
    card.addEventListener("click", function () { selectCard(card); });
    card.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target === card) { e.preventDefault(); selectCard(card); }
    });
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  var form = document.getElementById("wa-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements;
    var name = f["name"].value.trim();
    var msg = f["message"].value.trim();
    var err = document.getElementById("wa-error");
    if (!name || !msg) { err.hidden = false; return; }
    err.hidden = true;
    var text = "Halo HS SILVER, saya ingin memesan:\n\n" +
      "Produk: " + f["product"].value + "\n" +
      "Ukuran: " + f["size"].value.trim() + "\n" +
      "Jumlah: " + f["qty"].value.trim() + "\n" +
      "Catatan: " + msg + "\n\n" +
      "Nama: " + name + "\n" +
      "Alamat pengiriman: " + f["addr"].value.trim() + "\n\nTerima kasih.";
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  });
})();
