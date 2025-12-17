const modal = document.getElementById("cta-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalTriggers = [
  document.getElementById("open-modal"),
  document.getElementById("open-modal-bottom"),
];

const openModal = () => {
  if (!modal) return;
  modal.classList.add("open");
  const firstField = modal.querySelector("input, textarea");
  if (firstField) firstField.focus();
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("open");
};

modalTriggers.forEach((trigger) => {
  if (trigger) trigger.addEventListener("click", openModal);
});

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

const handleFormSubmit = (formId) => {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      const originalText = submitButton.textContent;
      submitButton.textContent = "Request received!";
      submitButton.disabled = true;
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 3200);
    }
    form.reset();
    closeModal();
  });
};

handleFormSubmit("estimate-form");
handleFormSubmit("estimate-form-modal");

document.querySelectorAll(".img-card img").forEach((image) => {
  image.addEventListener("click", () => {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-inner">
        <img src="${image.src}" alt="${image.alt}">
        <button class="close" aria-label="Close image">&times;</button>
      </div>
    `;
    document.body.appendChild(lightbox);

    const closeButton = lightbox.querySelector(".close");
    const dismiss = () => document.body.removeChild(lightbox);
    if (closeButton) closeButton.addEventListener("click", dismiss);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) dismiss();
    });
  });
});

const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

const nav = document.querySelector(".main-nav");
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    });
  });
}
