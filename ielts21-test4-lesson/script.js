(() => {
  const topBtn = document.getElementById("toTop");

  const onScroll = () => {
    if (!topBtn) return;
    topBtn.classList.toggle("show", window.scrollY > 480);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  topBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal panels gently as they enter the viewport
  const panels = document.querySelectorAll(".panel, .lesson");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transition = "opacity 0.45s ease, transform 0.45s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    panels.forEach((el, i) => {
      if (i === 0) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      io.observe(el);
    });
  }
})();
