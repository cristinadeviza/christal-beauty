// Navbar scroll + shadow
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});
// CURSOR
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();

document
  .querySelectorAll("a, button, .service-card, .gallery-item")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hovered"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hovered"));
  });

// Scroll progress bar
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + "%";
});

// Back to top button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

// Mobile menu
function openMobileMenu() {
  document.getElementById("mobileMenu").classList.add("open");
}
function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}

// Tabs
function showTab(id, btn) {
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("tab-" + id).classList.add("active");
  btn.classList.add("active");
}

// Skin filter with animation
function filterSkin(cat, btn) {
  document
    .querySelectorAll(".skin-tab")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".skin-card").forEach((card, i) => {
    if (cat === "all" || card.dataset.cat.includes(cat)) {
      card.style.display = "";
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 60);
    } else {
      card.style.display = "none";
    }
  });
}

// Contact form – send via WhatsApp
function submitWhatsApp(e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const service = document.getElementById("contactService").value;
  const message =
    "Hallo, ich bin " +
    name +
    " und ich interessiere mich für: " +
    service +
    ". Ich würde gerne einen Termin vereinbaren.";
  const phone = "491734347914";
  const url =
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

// Fade-up on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// Staggered animation for cards on scroll
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(
          ".skin-card, .hot-card, .review-card",
        );
        cards.forEach((card, i) => {
          card.style.opacity = "0";
          card.style.transform = "translateY(30px)";
          setTimeout(() => {
            card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, i * 100);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".skin-grid, .hot-grid, .reviews-grid")
  .forEach((grid) => {
    cardObserver.observe(grid);
  });

// Flip card toggle
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    // Don't flip when clicking the booking button
    if (e.target.closest(".flip-back-btn")) return;
    card.classList.toggle("flipped");
  });
});

// Lightbox for service galleries
function openLightbox(item) {
  const lightbox = document.getElementById("svcLightbox");
  if (!lightbox) return;
  const img = item.querySelector("img");
  const label = item.getAttribute("data-label") || "";
  document.getElementById("svcLightboxImg").src = img.src;
  document.getElementById("svcLightboxImg").alt = img.alt;
  document.getElementById("svcLightboxLabel").textContent = label;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("svcLightbox");
  if (!lightbox) return;
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Cookie banner
(function () {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;
  if (localStorage.getItem("cookieConsent")) {
    banner.classList.add("hidden");
    return;
  }
  banner.classList.remove("hidden");
  document.getElementById("cookieAccept").addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    banner.classList.add("hidden");
  });
  document.getElementById("cookieReject").addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "rejected");
    banner.classList.add("hidden");
  });
})();

// Active nav link highlight on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = "#045b55";
      } else {
        link.style.color = "";
      }
    }
  });
});
