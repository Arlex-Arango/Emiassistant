document.addEventListener("DOMContentLoaded", function () {
    const investmentSlider = document.getElementById("investment-slider");
    const investmentInput = document.getElementById("investment");
    const priceSlider = document.getElementById("price-slider");
    const priceInput = document.getElementById("price");
    const incomeResult = document.getElementById("income");
    const leadsResult = document.getElementById("leads");

    // Variables de cálculo
    const visitorsPerDollar = 10; // Visitantes por dólar invertido
    const conversionRate = 0.05; // Tasa de conversión (5%)

    // Función para calcular resultados
    function calculateResults() {
        const investment = parseInt(investmentInput.value, 10);
        const price = parseInt(priceInput.value, 10);

        const estimatedVisitors = investment * visitorsPerDollar;
        const potentialLeads = Math.floor(estimatedVisitors * conversionRate);
        const monthlyIncome = potentialLeads * price;

        incomeResult.textContent = `$${monthlyIncome.toLocaleString()}`;
        leadsResult.textContent = `${potentialLeads}`;
    }

    // Sincronizar slider con el input
    function syncSliderWithInput(slider, input) {
        slider.addEventListener("input", () => {
            input.value = slider.value;
            calculateResults();
        });
    }

    // Sincronizar input con el slider
    function syncInputWithSlider(input, slider) {
        input.addEventListener("input", () => {
            const value = parseInt(input.value, 10);
            if (!isNaN(value)) {
                slider.value = value;
                calculateResults();
            }
        });
    }

    // Sincronizar sliders y inputs
    syncSliderWithInput(investmentSlider, investmentInput);
    syncInputWithSlider(investmentInput, investmentSlider);
    syncSliderWithInput(priceSlider, priceInput);
    syncInputWithSlider(priceInput, priceSlider);

    // Calcular los resultados iniciales
    calculateResults();
});
