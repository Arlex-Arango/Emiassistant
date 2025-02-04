document.addEventListener("DOMContentLoaded", function () {
    
    // Incluir Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el footer:", error));

    // Verificar si estamos en index.html, pricing.html o plans.html para cargar la calculadora
    const currentPage = window.location.pathname.split("/").pop();
    if (["index.html", "pricing.html", "plans.html"].includes(currentPage)) {
        fetch('calculator.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('calculator-container').innerHTML = data;
                initializeCalculator();
            })
            .catch(error => console.error("Error al cargar la calculadora:", error));
    }

    // Función para manejar el menú hamburguesa en móviles
    function setupMenuToggle() {
        const menuToggle = document.getElementById("mobile-menu");
        const navLinks = document.querySelector(".nav-links");

        if (menuToggle && navLinks) {
            menuToggle.addEventListener("click", function () {
                navLinks.classList.toggle("active");
            });
        }
    }

    // Función para manejar dropdowns (submenu en navbar)
    function setupDropdownMenus() {
        document.querySelectorAll(".nav-item").forEach(item => {
            const button = item.querySelector(".nav-link[data-dropdown]");
            const menu = item.querySelector(".dropdown");

            if (button && menu) {
                // Mostrar dropdown en hover (solo en pantallas grandes)
                button.addEventListener("mouseenter", () => {
                    if (window.innerWidth > 768) menu.style.display = "block";
                });

                item.addEventListener("mouseleave", () => {
                    if (window.innerWidth > 768) menu.style.display = "none";
                });

                // Alternar dropdown en móviles con clic
                button.addEventListener("click", function (event) {
                    event.stopPropagation(); // Evita que se cierre inmediatamente
                    menu.style.display = menu.style.display === "block" ? "none" : "block";
                });

                // Cerrar el dropdown si se hace clic fuera
                document.addEventListener("click", function (e) {
                    if (!item.contains(e.target)) {
                        menu.style.display = "none";
                    }
                });
            }
        });
    }

    // Inicializar Calculadora si está en la página
    function initializeCalculator() {
        const investmentSlider = document.getElementById("investment-slider");
        const investmentInput = document.getElementById("investment");
        const priceSlider = document.getElementById("price-slider");
        const priceInput = document.getElementById("price");
        const incomeResult = document.getElementById("income");
        const leadsResult = document.getElementById("leads");

        if (!investmentSlider || !investmentInput || !priceSlider || !priceInput || !incomeResult || !leadsResult) {
            console.error("Uno o más elementos de la calculadora no se encontraron.");
            return;
        }

        const VISITORS_PER_DOLLAR = 10;
        const CONVERSION_RATE = 0.05;

        function calculateResults() {
            const investment = Math.max(0, Number(investmentInput.value));
            const price = Math.max(0, Number(priceInput.value));

            const estimatedVisitors = investment * VISITORS_PER_DOLLAR;
            const potentialLeads = Math.floor(estimatedVisitors * CONVERSION_RATE);
            const monthlyIncome = potentialLeads * price;

            incomeResult.textContent = `$${monthlyIncome.toLocaleString()}`;
            leadsResult.textContent = `${potentialLeads}`;
        }

        function syncSliderWithInput(slider, input) {
            slider.addEventListener("input", () => {
                input.value = slider.value;
                calculateResults();
            });
        }

        function syncInputWithSlider(input, slider) {
            input.addEventListener("input", () => {
                const value = Math.max(0, Number(input.value));
                if (!isNaN(value)) {
                    slider.value = value;
                    calculateResults();
                }
            });
        }

        syncSliderWithInput(investmentSlider, investmentInput);
        syncInputWithSlider(investmentInput, investmentSlider);
        syncSliderWithInput(priceSlider, priceInput);
        syncInputWithSlider(priceInput, priceSlider);

        calculateResults();
    }

    // Inicializar Preguntas Frecuentes (FAQ)
    function initializeFAQs() {
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            question.addEventListener('click', () => {
                const isVisible = answer.style.display === 'block';
                answer.style.display = isVisible ? 'none' : 'block';
                icon.classList.toggle('fa-plus', isVisible);
                icon.classList.toggle('fa-minus', !isVisible);
            });
        });
    }

    
    setupMenuToggle();
    setupDropdownMenus();
    initializeFAQs();
});
