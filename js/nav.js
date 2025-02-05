document.addEventListener("DOMContentLoaded", () => {
  const dropdownTriggers = document.querySelectorAll("[data-dropdown]");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  function closeDropdowns() {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      closeDropdowns();
    }
  });
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdownId = `${trigger.dataset.dropdown}-dropdown`;
      const dropdown = document.getElementById(dropdownId);

      document.querySelectorAll(".dropdown").forEach((d) => {
        if (d.id !== dropdownId) {
          d.classList.remove("active");
        }
      });

      dropdown.classList.toggle("active");
    });
  });
});
