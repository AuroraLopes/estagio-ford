
const sliderButton = document.getElementById('sliderButton');
const sliderFill = document.getElementById('sliderFill');
const sliderPercent = document.getElementById('sliderPercent');
const sliderContainer = document.querySelector('.slider-container');
let isDraggingLuz = false;
let isDragging = false;

updateLuz(false)


sliderButton.addEventListener('mousedown', function (e) {
    isDraggingLuz = true;
});

document.addEventListener('mouseup', function (e) {
    isDraggingLuz = false;
});

document.addEventListener('mousemove', updateLuz);

function updateLuz(e) {
    let percentage = 0;
    if (isDraggingLuz) {
        const rect = sliderContainer.getBoundingClientRect();
        let offsetX = e.clientX - rect.left - sliderButton.offsetWidth / 2;

        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width - sliderButton.offsetWidth) offsetX = rect.width - sliderButton.offsetWidth;

        sliderButton.style.left = `${offsetX}px`;
        const fillWidth = offsetX + sliderButton.offsetWidth / 2;
        sliderFill.style.width = `${fillWidth}px`;

        percentage = Math.round((offsetX / (rect.width - sliderButton.offsetWidth)) * 100);
        sliderPercent.textContent = `${percentage}%`;

        // Ajuste para não sobrepor a porcentagem ao botão
        if (percentage > 90) {
            sliderPercent.style.transform = `translateX(-${offsetX - rect.width + 60}px)`;
        } else {
            sliderPercent.style.transform = 'translateX(10px)';

        }

        // Trocar os traços pela lua quando o valor for 0%
        if (percentage === 0) {
            sliderButton.classList.add('moon');
            sliderButton.innerHTML = "🌙";
        } else if (percentage >= 95) {
            sliderButton.innerHTML = ""
        } 
            else {
            sliderButton.classList.remove('moon');
            sliderButton.innerHTML = `
                <div class="lines">
                    <div>| |</div>
                </div>`;
        }
    }

}