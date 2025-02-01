document.addEventListener("DOMContentLoaded", function() {
    // Incluir Navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            setupMenuToggle();  // Asegúrate de inicializar el menú hamburguesa
        });

    // Incluir Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });

    // Verificar si estamos en index.html o pricing.html para cargar la calculadora
    const currentPage = window.location.pathname.split("/").pop(); // Obtener el nombre del archivo
    if (currentPage === "index.html" || currentPage === "pricing.html") {
        // Incluir la calculadora solo en estas páginas
        fetch('calculator.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('calculator-container').innerHTML = data;
                initializeCalculator();  // Inicializa la calculadora
            })
            .catch(error => console.error("Error al cargar la calculadora:", error));
    }
    
    // Función para manejar el menú hamburguesa
    function setupMenuToggle() {
        const menuToggle = document.getElementById("mobile-menu");
        const navLinks = document.querySelector(".nav-links");

        if (menuToggle && navLinks) {
            menuToggle.addEventListener("click", function () {
                navLinks.classList.toggle("active");
            });
        }
    }

    // Si la calculadora está en la página, inicialízala
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

        const VISITORS_PER_DOLLAR = 10; // Visitantes por dólar invertido
        const CONVERSION_RATE = 0.05; // Tasa de conversión (5%)

        function calculateResults() {
            const investment = Math.max(0, Number(investmentInput.value)); // Evita valores negativos
            const price = Math.max(0, Number(priceInput.value));

            const estimatedVisitors = investment * VISITORS_PER_DOLLAR;
            const potentialLeads = Math.floor(estimatedVisitors * CONVERSION_RATE);
            const monthlyIncome = potentialLeads * price;

            // Mostrar resultados en la página
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
                const value = Math.max(0, Number(input.value)); // Evita valores negativos
                if (!isNaN(value)) {
                    slider.value = value;
                    calculateResults();
                }
            });
        }

        // Sincronizar sliders e inputs
        syncSliderWithInput(investmentSlider, investmentInput);
        syncInputWithSlider(investmentInput, investmentSlider);
        syncSliderWithInput(priceSlider, priceInput);
        syncInputWithSlider(priceInput, priceSlider);

        // Calcular los resultados iniciales
        calculateResults();
    }
});
