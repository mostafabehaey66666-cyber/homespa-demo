// Settings: set EMAIL to show the email button.
var WHATSAPP = "966550958815";
var EMAIL = "";

function waLink(text) {
  return "https://wa.me/" + WHATSAPP + (text ? "?text=" + encodeURIComponent(text) : "");
}
["wa-hero", "wa-foot", "wa-fab"].forEach(function (id) {
  var a = document.getElementById(id);
  if (a) { a.href = waLink("السلام عليكم، أرغب بالاستفسار عن الحجز"); a.target = "_blank"; a.rel = "noopener"; }
});

var form = document.getElementById("bookForm");
var err = document.getElementById("err");

function buildMessage() {
  var f = form.elements;
  var lines = [
    "طلب حجز جديد",
    "الاسم: " + f.name.value.trim(),
    "الجوال: " + f.phone.value.trim(),
    "الخدمة: " + f.service.value,
    "الحي: " + (f.district.value.trim() || "-"),
    "التاريخ: " + (f.date.value || "-"),
    "الوقت: " + f.time.value
  ];
  if (f.notes.value.trim()) lines.push("ملاحظات: " + f.notes.value.trim());
  return lines.join("\n");
}
function valid() {
  var ok = form.elements.name.value.trim() && form.elements.phone.value.trim();
  err.hidden = !!ok;
  return !!ok;
}
document.getElementById("sendWa").addEventListener("click", function () {
  if (valid()) window.open(waLink(buildMessage()), "_blank", "noopener");
});
var mailBtn = document.getElementById("sendMail");
if (EMAIL) {
  mailBtn.hidden = false;
  mailBtn.addEventListener("click", function () {
    if (valid()) {
      location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("طلب حجز") +
        "&body=" + encodeURIComponent(buildMessage());
    }
  });
}

var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 }) : null;
document.querySelectorAll(".reveal").forEach(function (el) { if (io) io.observe(el); else el.classList.add("in"); });
