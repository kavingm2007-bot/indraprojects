/* INDRAPROJECTS — shared site logic. Contact details & social links live in SITE below. */
const SITE = {
  name: "INDRAPROJECTS",
  tagline: "Dream. Design. Develop. Deliver.",
  description: "We bring ideas to life through thoughtful branding, professional websites, refined UI/UX, enterprise analytics and practical technology — and we guide students with projects, courses and internships that build real careers.",
  address: "124/9, Mahaliyamman Kovil Street, Suriyampalayam, Erode, Tamil Nadu, India.",
  phone: "9524165106", email: "kavingm2007@gmail.com", whatsapp: "https://wa.me/919524165106",
  // Replace with real company profile links when available:
  social: { instagram: "https://www.instagram.com/", facebook: "https://www.facebook.com/", linkedin: "https://www.linkedin.com/", x: "https://x.com/" },
};
const $ = (s, r = document) => r.querySelector(s);
const svg = (k, c = "") => `<svg class="ic ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;
const brand = (k) => `<svg class="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${BRAND[k]}"/></svg>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const NAV = [["index.html", "Home"], ["about.html", "About Us"], ["services.html", "Services"], ["projects.html", "Our Projects"], ["contact.html", "Contact"]];
const page = document.body.dataset.page;
const socials = () => Object.keys(SITE.social).map((k) => `<a href="${SITE.social[k]}" target="_blank" rel="noopener noreferrer" aria-label="${k === "x" ? "X (Twitter)" : k[0].toUpperCase() + k.slice(1)}" class="soc">${brand(k)}</a>`).join("");

/* ---------- Header & footer ---------- */
function mountChrome() {
  document.body.insertAdjacentHTML("beforeend", `<a class="wa-fab" href="${SITE.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">${brand("whatsapp")}</a>`);
  $("#site-header").innerHTML = `<header class="nav"><div class="wrap nav-in">
    <a href="index.html" class="brand" aria-label="INDRAPROJECTS home"><img src="assets/logo.png" alt="INDRAPROJECTS logo" width="159" height="135"><span>INDRA<b>PROJECTS</b></span></a>
    <button class="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button>
    <nav id="menu">${NAV.map(([h, t]) => `<a href="${h}" ${h.startsWith(page) ? 'class="on" aria-current="page"' : ""}>${t}</a>`).join("")}</nav></div></header>`;
  const b = $(".burger");
  b.onclick = () => { const o = document.body.classList.toggle("menu-open"); b.setAttribute("aria-expanded", o); };
  $("#menu").onclick = (e) => e.target.tagName === "A" && document.body.classList.remove("menu-open");
  $("#site-footer").innerHTML = `<footer class="foot"><div class="wrap foot-grid">
    <div><a href="index.html" class="brand"><img src="assets/logo.png" alt="INDRAPROJECTS logo" width="159" height="135"><span>INDRA<b>PROJECTS</b></span></a>
      <p class="muted sm">${SITE.tagline}<br>IT Solutions &amp; Branding Agency. ${SITE.description}</p></div>
    <div><h4>Quick links</h4>${NAV.map(([h, t]) => `<a href="${h}" class="fl">${t}</a>`).join("")}</div>
    <div><h4>Contact</h4><a class="fl" href="tel:+91${SITE.phone}">+91 ${SITE.phone}</a><a class="fl" href="mailto:${SITE.email}">${SITE.email}</a><p class="muted sm">${SITE.address}</p><div class="socs">${socials()}</div></div>
  </div><div class="wrap copy">© ${new Date().getFullYear()} INDRAPROJECTS. All rights reserved.</div></footer>`;
}

/* ---------- Services: cards + green frosted-glass popup ---------- */
function services(grid) {
  grid.innerHTML = SERVICES.map((s, i) => `<li><button type="button" class="card svc" data-i="${i}"><span class="svc-top"><span class="ico">${svg(s.icon)}</span><span class="num">${s.number}</span></span><h2>${esc(s.title)}</h2><p class="clamp">${esc(s.short)}</p><span class="more">Learn more ${svg("arrow", "sm")}</span></button></li>`).join("");
  const m = document.createElement("div"); m.className = "modal"; m.hidden = true;
  m.innerHTML = `<div class="m-bg"></div><div class="glass" role="dialog" aria-modal="true" aria-labelledby="m-title"><button class="m-x" aria-label="Close">${svg("x")}</button><div id="m-body"></div></div>`;
  document.body.append(m); let last;
  const close = () => { m.classList.remove("open"); setTimeout(() => { m.hidden = true; document.body.style.overflow = ""; last && last.focus(); }, 250); };
  const open = (i) => {
    const s = SERVICES[i];
    $("#m-body", m).innerHTML = `<div class="m-head"><span class="ico g">${svg(s.icon)}</span><div><p class="eyebrow g">What We Do</p><h3 id="m-title">${esc(s.title)}</h3></div></div>
      <p class="m-p">${esc(s.whatWeDo)}</p><h4>Key features</h4><ul class="m-feat">${s.features.map((f) => `<li>${svg("check", "sm")}<span>${esc(f)}</span></li>`).join("")}</ul>
      ${s.technologies ? `<h4>Technologies &amp; tools</h4><ul class="chips">${s.technologies.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      <div class="m-act"><button class="btn glass-ghost m-close" type="button">Close</button><a class="btn glass-btn" href="contact.html?service=${encodeURIComponent(s.title)}">Get Started ${svg("arrow", "sm")}</a></div>`;
    m.hidden = false; document.body.style.overflow = "hidden"; requestAnimationFrame(() => m.classList.add("open"));
    $(".m-close", m).onclick = close; $(".m-x", m).focus();
  };
  grid.onclick = (e) => { const b = e.target.closest(".svc"); if (b) { last = b; open(+b.dataset.i); } };
  $(".m-bg", m).onclick = close; $(".m-x", m).onclick = close;
  addEventListener("keydown", (e) => e.key === "Escape" && !m.hidden && close());
}

/* ---------- Projects ---------- */
function projects(grid) {
  grid.innerHTML = PROJECTS.map((p) => `<li class="card proj"><img src="${p.image}" alt="" loading="lazy" width="600" height="400"><div class="pb"><span class="tag">${esc(p.category)}</span><h2>${esc(p.title)}</h2><p class="muted sm">${esc(p.description)}</p><ul class="chips">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>${p.link ? `<a class="btn gold-o" href="${p.link}" target="_blank" rel="noopener noreferrer">View Project</a>` : ""}</div></li>`).join("");
}

/* ---------- Contact: details, validation, mailto, map ---------- */
function contact() {
  const f = $("#cform"), q = new URLSearchParams(location.search).get("service");
  if (q) f.subject.value = "Enquiry: " + q.slice(0, 100);
  $("#map").src = "https://www.google.com/maps?q=" + encodeURIComponent(SITE.address) + "&output=embed";
  $("#maplink").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(SITE.address);
  const rules = { name: [2, 100, "Please enter your full name"], email: [1, 255, "Please enter a valid email address"], subject: [3, 150, "Please add a subject"], message: [10, 2000, "Message should be at least 10 characters"] };
  const bad = (k, v) => { const [mn, mx, msg] = rules[k]; v = v.trim(); return v.length < mn || v.length > mx || (k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) ? msg : ""; };
  f.onsubmit = (e) => {
    e.preventDefault(); let ok = true;
    for (const k in rules) { const m = bad(k, f[k].value); $("#e-" + k).textContent = m; f[k].setAttribute("aria-invalid", !!m); if (m) ok = false; }
    if (!ok) return;
    const body = `${f.message.value.trim()}\n\n— ${f.name.value.trim()}\n${f.email.value.trim()}`;
    location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(f.subject.value.trim())}&body=${encodeURIComponent(body)}`;
    $("#fstatus").hidden = false;
  };
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js");
  mountChrome();
  if (page === "home") { $("#teaser").innerHTML = SERVICES.map((s) => `<li>${svg(s.icon, "sm g")}${esc(s.title)}</li>`).join(""); $("#count").textContent = SERVICES.length; }
  if (page === "services") services($("#svc-grid"));
  if (page === "projects") projects($("#proj-grid"));
  if (page === "contact") { contact(); $("#soc").innerHTML = socials(); }
  const wa = $("#wa"); if (wa) wa.innerHTML = `<path d="${BRAND.whatsapp}"/>`;
  document.querySelectorAll("[data-ic]").forEach((e) => (e.innerHTML = svg(e.dataset.ic)));


  // ---------- Premium motion: progress bar, nav shadow, 3D tilt, parallax, particles, marquee, count-up ----------
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches, mouse = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const bar = document.createElement("div"); bar.className = "prog"; document.body.append(bar);
  const nav = $(".nav"); let tick = false;
  const onScroll = () => { if (tick) return; tick = true; requestAnimationFrame(() => { const m = document.documentElement.scrollHeight - innerHeight; bar.style.setProperty("--p", m > 0 ? scrollY / m : 0); nav.classList.toggle("sc", scrollY > 8); tick = false; }); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const ph = $(".ph"); if (ph) ph.insertAdjacentHTML("beforeend", '<i class="sh s1"></i><i class="sh s2"></i><i class="sh s3"></i>');
  if (page === "home") {
    const row = (a) => a.map((s, i) => `<span class="mi" style="--a:${["#2f5bff", "#12b3a8", "#f59e0b", "#e5489b", "#8b5cf6", "#10b981"][i % 6]}">${svg(s.icon)}${esc(s.title)}</span>`).join("");
    $("#mq1").innerHTML = row(SERVICES) + row(SERVICES); $("#mq2").innerHTML = row([...SERVICES].reverse()) + row([...SERVICES].reverse());
    const art = $(".hero-art"), hero = $(".hero"), cols = ["#2f5bff", "#12b3a8", "#f59e0b", "#e5489b", "#8b5cf6", "#10b981"];
    [["compass", 4, 8], ["globe", 82, 6], ["pen", 94, 46], ["chart", 80, 84], ["cpu", 6, 78], ["award", -4, 42]].forEach(([k, l, t], i) => art.insertAdjacentHTML("beforeend", `<span class="fb" style="left:${l}%;top:${t}%;--a:${cols[i]};--dl:${i * -0.8}s">${svg(k)}</span>`));
    if (!calm) {
      for (let i = 0; i < 16; i++) { const z = 6 + Math.random() * 16; hero.insertAdjacentHTML("beforeend", `<i class="pt" style="left:${Math.random() * 100}%;width:${z}px;height:${z}px;--c:${cols[i % 6]};--t:${9 + Math.random() * 10}s;--dl:${-Math.random() * 12}s;--dx:${(Math.random() - 0.5) * 120}px"></i>`); }
      if (mouse) hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; hero.style.setProperty("--px", (x - 0.5) * 2); hero.style.setProperty("--py", (y - 0.5) * 2); hero.style.setProperty("--sx", x * 100 + "%"); hero.style.setProperty("--sy", y * 100 + "%"); });
      const n = $("#count"), to = SERVICES.length; n.textContent = "0";
      new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { o.disconnect(); let c = 0; const id = setInterval(() => { n.textContent = ++c; if (c >= to) clearInterval(id); }, 110); } }).observe(n);
    }
  }
  if (mouse && !calm) document.querySelectorAll(".card:not(.cbox), .steps li, .val").forEach((el) => {
    el.classList.add("tilt");
    el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; el.style.transition = "transform .08s"; el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 12}deg) rotateY(${(x - 0.5) * 14}deg) translateY(-6px) scale(1.02)`; el.style.setProperty("--mx", x * 100 + "%"); el.style.setProperty("--my", y * 100 + "%"); });
    el.addEventListener("pointerleave", () => { el.style.transition = "transform .5s"; el.style.transform = ""; });
  });


  // Scroll-reveal animation (cards, steps, sections fade up as they enter the screen)
  const els = document.querySelectorAll(".card, .steps li, .val, .tz, .cta, .two > *, .map, .pills li, .ph .wrap > *");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  els.forEach((el) => { const sib = [...el.parentElement.children]; el.style.setProperty("--d", Math.min(sib.indexOf(el), 6)); el.classList.add("rv"); io.observe(el); });
});
