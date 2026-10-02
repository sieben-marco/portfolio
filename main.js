const btnMenu = document.querySelector(".btn-menu");
btnMenu.addEventListener("click", (event) => {
  event.stopPropagation();
  const isExpanded = btnMenu.getAttribute("aria-expanded") === "true";
  btnMenu.setAttribute("aria-expanded", String(!isExpanded));
  if (!isExpanded) {
    document.addEventListener("click", closeMenu);
  }
});

function closeMenu(event) {
  btnMenu.setAttribute("aria-expanded", "false");
  document.removeEventListener("click", closeMenu);
  btnMenu.focus();
}

const backToTop = document.querySelector(".back-to-top");
let lastScrollY = window.scrollY;
let isScrolling = false;
const SCROLL_THRESHOLD = 30;
window.addEventListener(
  "scroll",
  () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(0, window.scrollY);

        if (currentScrollY < 300) {
          backToTop.classList.remove("visible");
          lastScrollY = currentScrollY;
          isScrolling = false;
          return;
        }

        const diffScroll = currentScrollY - lastScrollY;
        if (Math.abs(diffScroll) < SCROLL_THRESHOLD) {
          isScrolling = false;
          return;
        }

        if (diffScroll < 0) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }

        lastScrollY = currentScrollY;
        isScrolling = false;
      });

      isScrolling = true;
    }
  },
  { passive: true },
);

function applyTheme(theme) {
  if (theme === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
  localStorage.setItem("theme", theme);
}

window
  .matchMedia("(preders-color-scheme: dark)")
  .addEventListener("change", () => {
    const theme = localStorage.getItem("theme") ?? "system";
    if (theme === "system") {
      applyTheme(theme);
    }
  });
