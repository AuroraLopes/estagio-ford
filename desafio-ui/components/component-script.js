
const sliderButton = document.getElementById('sliderButton');
const sliderFill = document.getElementById('sliderFill');
const sliderPercent = document.getElementById('sliderPercent');
const sliderContainer = document.querySelector('.slider-container');
let isDraggingLuz = false;

updateLuz(false);


sliderButton.addEventListener('mousedown', function (e) {
    isDraggingLuz = true;
});

document.addEventListener('mouseup', function (e) {
    isDraggingLuz = false;
});


sliderButton.addEventListener('touchend', function (e) {
    isDraggingLuz = false;
});

sliderButton.addEventListener('touchstart', function (e) {
    isDraggingLuz = true;
});

document.addEventListener('mousemove', updateLuz);

sliderButton.addEventListener('touchmove', updateLuzTouch);


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

        sliderButton.addEventListener("mousemove", function(){
            lamp.style.filter="brightness("+ percentage + "%)";
        });

        // Ajuste para não sobrepor a porcentagem ao botão
        if (percentage > 90) {
            sliderPercent.style.transform = `translateX(-${offsetX - rect.width + 60}px)`;
        } else {
            sliderPercent.style.transform = 'translateX(-10px)';

        }

        // Trocar os traços pela lua quando o valor for 0%
        if (percentage === 0) {
            sliderButton.classList.add('moon');
            sliderButton.innerHTML = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#1d1d1b"> <path d="m15.69 55.54a2.75 2.75 0 0 0 -.62-2.69 2.37 2.37 0 0 0 -2.72-.47s-1.88-2-2.6-.65.79 2.69.79 2.69a1.9 1.9 0 0 0 .46 2.34 2.88 2.88 0 0 0 2.6.37s2.37 1.6 3 .44-.91-2.03-.91-2.03zm-4.84-1.72s-.91-1.09-.53-1.56 1.56.47 1.56.47-.97 1.09-1.03 1.09zm4.94 3.38c-.32.22-1.16-.38-1.16-.38l.44-.69c.28.16 1.03.87.72 1.07z"></path> <path d="m27 33.1c.05-.53-3.81-2.25-3.87-7.18s2.37-9 8.31-10.19 8.5-.13 8.94-.56.75-2.75-2.75-4.82-14.16-3.35-22.47 4.57-7.44 16.46-6.59 19.87a20.86 20.86 0 0 0 8 11.91c4.84 3.34 7.53 4.43 11.78 5.09s8.75-1.41 11.19-3.06 3-3.41 2.93-4.16-.9-1.94-1.46-1.78-5.13 2.22-9.22 1-5.35-4-5.32-6 .41-3.5.53-4.69z"></path> <path d="m7.79 8.7c.23-.08 1.71.12 1.78 0s.25-2.16.72-2.1.53 1.72.87 1.78 1.66-.09 1.75.25-1.09 1.35-1.06 1.5.25.88 0 1-1.25-.28-1.28-.18-1.32 1.68-1.57 1.56-.5-.16-.46-.34.62-2.17.62-2.17l-1.5-.8c-.16-.1-.06-.44.13-.5z"></path> <path d="m7.16 18.73c.76-.47 1.28 0 1.13.84a.88.88 0 0 1 -1.38.53.89.89 0 0 1 .25-1.37z"></path> <path d="m37.29 4.82a1.71 1.71 0 0 1 2.4 1.69 1.8 1.8 0 0 1 -3 1.16 1.74 1.74 0 0 1 .6-2.85z"></path> </g> <path d="m37.58 5.55a.92.92 0 0 1 1.3.91 1 1 0 0 1 -1.64.63.94.94 0 0 1 .34-1.54z" fill="#ffe19b"></path> <path d="m47 12c.19 0 0-2.84.34-3s1.28 1.78 1.62 1.75 1.63-.78 2-.56-.32 2.43-.25 2.59 1 1.41.65 1.66-1.87-.32-2-.22-.84 1.44-1.15 1.4-.35-2-.69-2.09-2.06-.28-2.16-.66 1.46-.87 1.64-.87z" fill="#1d1d1b"></path> <path d="m54.13 17.23a2.52 2.52 0 0 1 2.75 2.77c-.22 2.15-3 2.25-4.16 1a2.31 2.31 0 0 1 1.41-3.77z" fill="#1d1d1b"></path> <path d="m54.32 18.26a1.37 1.37 0 0 1 1.49 1.48c-.12 1.17-1.61 1.22-2.26.56a1.26 1.26 0 0 1 .77-2.04z" fill="#ffe19b"></path> <path d="m34.75 21.67c1-.45 3.16 0 2.57 2.06s-3.32 1.56-3.82.47a2 2 0 0 1 1.25-2.53z" fill="#1d1d1b"></path> <path d="m35 22.34c.62-.27 1.88 0 1.53 1.22a1.29 1.29 0 0 1 -2.27.28 1.18 1.18 0 0 1 .74-1.5z" fill="#ffe19b"></path> <path d="m45.66 29.13s1.38-2.75 1.81-2.81.47 3 .47 3 1.94.16 1.88.47-1.57 1.06-1.57 1.06.54 2.19.25 2.35-1.4-1.66-1.4-1.66-2.13 1.09-2.31.84.46-2.12.46-2.12-1.5-.53-1.46-.78 1.65-.16 1.87-.35z" fill="#1d1d1b"></path> <path d="m35.44 34.13a1.12 1.12 0 0 1 1.31 1.44 1.24 1.24 0 0 1 -2 .31c-.59-.68.13-1.59.69-1.75z" fill="#1d1d1b"></path> <path d="m50 37.13c1-.26 2.53-.28 2.94 1.5s-1.66 2.54-3.31 2.13-1.94-3.03.37-3.63z" fill="#1d1d1b"></path> <path d="m50.26 37.92c.57-.14 1.43-.15 1.65.85s-.91 1.42-1.86 1.23a1 1 0 0 1 .21-2.08z" fill="#ffe19b"></path> <path d="m8.6 46a1.18 1.18 0 0 1 1.87.94c0 1.09-1.47 1.34-2 .9a1.22 1.22 0 0 1 .13-1.84z" fill="#1d1d1b"></path> <path d="m34.54 54.1a1.9 1.9 0 0 1 2.53 2 2.29 2.29 0 0 1 -3.5 1.38c-1.5-1.16-.97-2.88.97-3.38z" fill="#1d1d1b"></path> <path d="m34.7 55a1 1 0 0 1 1.3 1 1.2 1.2 0 0 1 -1.84.72c-.75-.58-.47-1.48.54-1.72z" fill="#ffe19b"></path> <path d="m49.22 52.2c.07-.1 1.6-2.82 2-3s.41-.16.5 0a27.3 27.3 0 0 1 0 2.84s1 0 1 .28-1.06 1.16-1.06 1.16.31 1.94 0 2.09a.75.75 0 0 1 -.69-.09l-.43-1.09a10.81 10.81 0 0 1 -2.22.87c-.16-.12-.6-.41-.38-.59a8.27 8.27 0 0 0 .78-1.28s-2.12-.19-2.18-.44-.07-.6.09-.66 2.59-.09 2.59-.09z" fill="#1d1d1b"></path> <path d="m11.75 54s1.16-1.81 2.5-.81 0 3-.09 2.94a4.64 4.64 0 0 1 -2.41-2.13z" fill="#cbe7f5"></path> <path d="m11.5 55.17s1 1 1.32 1.21l.28.22a2.61 2.61 0 0 1 -1.53-.15c-.63-.35-.07-1.28-.07-1.28z" fill="#cbe7f5"></path> <path d="m12.63 53.88s.56-.56.91-.53a.69.69 0 0 1 .5.28l-.63.38-.56.34a2.22 2.22 0 0 0 -.22-.47z" fill="#1d1d1b"></path> <path d="m38.29 13.87c.24-.06-1-2.1-2.86-2.81a16.74 16.74 0 0 0 -9.23-.14 25.3 25.3 0 0 0 -9.2 4.66 19 19 0 0 0 -4.84 6.42 14.81 14.81 0 0 0 -2.16 8 18.87 18.87 0 0 0 3.42 10.1 24.2 24.2 0 0 0 6 6 9.61 9.61 0 0 0 2 1.17s-.42-1.27-.22-1.35a1 1 0 0 1 .8.08 12.69 12.69 0 0 0 .23 1.64c.13.07.61.44.61.38a21.52 21.52 0 0 1 -.23-2.71c.1-.13 1-.1 1.08.1s0 2.71.08 2.8a2.49 2.49 0 0 0 .65.41c.06 0-.1-1.81 0-1.81s.77.06.83.19 0 1.85.09 2a9.45 9.45 0 0 0 5.32 1 15 15 0 0 0 7.46-2.31c1.67-1 2.71-2.31 2.6-2.59s-.14-.35-.29-.37-6.37 2.37-10.43.27-5.25-4.85-5.41-6.31.6-4.61.5-4.84-3.84-3.14-4-6.58.31-6.37 3.06-9.27a14.77 14.77 0 0 1 8.85-4.27c1.85-.02 5.2.16 5.29.14z" fill="#ffffff"></path> <path d="m24.1 13.19a1.58 1.58 0 0 1 2.08 1.2 1.73 1.73 0 0 1 -2.46 1.8c-1.64-.57-.83-2.57.38-3z" fill="#1d1d1b"></path> <path d="m24.31 14a.76.76 0 0 1 1 .58.83.83 0 0 1 -1.18.86c-.79-.29-.4-1.25.18-1.44z" fill="#ffffff"></path> <path d="m17.47 17.31c.77-.54 3.15-.46 3.36 1.42s-1.83 3.35-3.4 2.27a2.34 2.34 0 0 1 .04-3.69z" fill="#1d1d1b"></path> <path d="m18 18.11c.44-.32 1.82-.27 1.94.82a1.33 1.33 0 0 1 -2 1.34 1.36 1.36 0 0 1 .06-2.16z" fill="#ffffff"></path> <path d="m14.12 21.52c.14-.13.79 0 .75.37a22.52 22.52 0 0 1 -1.54 4.21c-.31.27-.75.4-.92 0a10.5 10.5 0 0 1 1.71-4.58z" fill="#1d1d1b"></path> <path d="m14.27 28.77c1.34-.56 4.25 0 3.77 3.44s-3.86 2.52-4.75 1.14-1.21-3.66.98-4.58z" fill="#1d1d1b"></path> <path d="m14.59 29.61c.94-.39 3 0 2.64 2.41s-2.7 1.76-3.32.8-.85-2.56.68-3.21z" fill="#ffffff"></path> <path d="m19.37 37.67c1.34-.57 4.25 0 3.77 3.43s-3.85 2.52-4.75 1.15-1.21-3.67.98-4.58z" fill="#1d1d1b"></path> <path d="m19.69 38.51c.94-.39 3 0 2.64 2.41s-2.69 1.76-3.32.8-.85-2.57.68-3.21z" fill="#ffffff"></path> <path d="m27.66 45.87a1.14 1.14 0 0 1 1.63 1.13c0 .9-.67 1.58-1.61 1.25a1.26 1.26 0 0 1 -.02-2.38z" fill="#1d1d1b"></path> <path d="m27.87 46.5a.53.53 0 0 1 .76.53c0 .42-.32.75-.76.59a.59.59 0 0 1 0-1.12z" fill="#ffffff"></path> </g></svg>`;
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

function updateLuzTouch(e) {
    let percentage = 0;
    if (isDraggingLuz) {
        const rect = sliderContainer.getBoundingClientRect();
        var touchTarget = e.targetTouches[0]

        let offsetX = touchTarget.clientX - rect.left - sliderButton.offsetWidth / 2;

        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width - sliderButton.offsetWidth) offsetX = rect.width - sliderButton.offsetWidth;

        sliderButton.style.left = `${offsetX}px`;
        const fillWidth = offsetX + sliderButton.offsetWidth / 2;
        sliderFill.style.width = `${fillWidth}px`;

        percentage = Math.round((offsetX / (rect.width - sliderButton.offsetWidth)) * 100);
        sliderPercent.textContent = `${percentage}%`;

        sliderButton.addEventListener("mousemove", function(){
            lamp.style.filter="brightness("+ percentage + "%)";
        });

        // Ajuste para não sobrepor a porcentagem ao botão
        if (percentage > 90) {
            sliderPercent.style.transform = `translateX(-${offsetX - rect.width + 60}px)`;
        } else {
            sliderPercent.style.transform = 'translateX(-10px)';

        }

        // Trocar os traços pela lua quando o valor for 0%
        if (percentage === 0) {
            sliderButton.classList.add('moon');
            sliderButton.innerHTML = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#1d1d1b"> <path d="m15.69 55.54a2.75 2.75 0 0 0 -.62-2.69 2.37 2.37 0 0 0 -2.72-.47s-1.88-2-2.6-.65.79 2.69.79 2.69a1.9 1.9 0 0 0 .46 2.34 2.88 2.88 0 0 0 2.6.37s2.37 1.6 3 .44-.91-2.03-.91-2.03zm-4.84-1.72s-.91-1.09-.53-1.56 1.56.47 1.56.47-.97 1.09-1.03 1.09zm4.94 3.38c-.32.22-1.16-.38-1.16-.38l.44-.69c.28.16 1.03.87.72 1.07z"></path> <path d="m27 33.1c.05-.53-3.81-2.25-3.87-7.18s2.37-9 8.31-10.19 8.5-.13 8.94-.56.75-2.75-2.75-4.82-14.16-3.35-22.47 4.57-7.44 16.46-6.59 19.87a20.86 20.86 0 0 0 8 11.91c4.84 3.34 7.53 4.43 11.78 5.09s8.75-1.41 11.19-3.06 3-3.41 2.93-4.16-.9-1.94-1.46-1.78-5.13 2.22-9.22 1-5.35-4-5.32-6 .41-3.5.53-4.69z"></path> <path d="m7.79 8.7c.23-.08 1.71.12 1.78 0s.25-2.16.72-2.1.53 1.72.87 1.78 1.66-.09 1.75.25-1.09 1.35-1.06 1.5.25.88 0 1-1.25-.28-1.28-.18-1.32 1.68-1.57 1.56-.5-.16-.46-.34.62-2.17.62-2.17l-1.5-.8c-.16-.1-.06-.44.13-.5z"></path> <path d="m7.16 18.73c.76-.47 1.28 0 1.13.84a.88.88 0 0 1 -1.38.53.89.89 0 0 1 .25-1.37z"></path> <path d="m37.29 4.82a1.71 1.71 0 0 1 2.4 1.69 1.8 1.8 0 0 1 -3 1.16 1.74 1.74 0 0 1 .6-2.85z"></path> </g> <path d="m37.58 5.55a.92.92 0 0 1 1.3.91 1 1 0 0 1 -1.64.63.94.94 0 0 1 .34-1.54z" fill="#ffe19b"></path> <path d="m47 12c.19 0 0-2.84.34-3s1.28 1.78 1.62 1.75 1.63-.78 2-.56-.32 2.43-.25 2.59 1 1.41.65 1.66-1.87-.32-2-.22-.84 1.44-1.15 1.4-.35-2-.69-2.09-2.06-.28-2.16-.66 1.46-.87 1.64-.87z" fill="#1d1d1b"></path> <path d="m54.13 17.23a2.52 2.52 0 0 1 2.75 2.77c-.22 2.15-3 2.25-4.16 1a2.31 2.31 0 0 1 1.41-3.77z" fill="#1d1d1b"></path> <path d="m54.32 18.26a1.37 1.37 0 0 1 1.49 1.48c-.12 1.17-1.61 1.22-2.26.56a1.26 1.26 0 0 1 .77-2.04z" fill="#ffe19b"></path> <path d="m34.75 21.67c1-.45 3.16 0 2.57 2.06s-3.32 1.56-3.82.47a2 2 0 0 1 1.25-2.53z" fill="#1d1d1b"></path> <path d="m35 22.34c.62-.27 1.88 0 1.53 1.22a1.29 1.29 0 0 1 -2.27.28 1.18 1.18 0 0 1 .74-1.5z" fill="#ffe19b"></path> <path d="m45.66 29.13s1.38-2.75 1.81-2.81.47 3 .47 3 1.94.16 1.88.47-1.57 1.06-1.57 1.06.54 2.19.25 2.35-1.4-1.66-1.4-1.66-2.13 1.09-2.31.84.46-2.12.46-2.12-1.5-.53-1.46-.78 1.65-.16 1.87-.35z" fill="#1d1d1b"></path> <path d="m35.44 34.13a1.12 1.12 0 0 1 1.31 1.44 1.24 1.24 0 0 1 -2 .31c-.59-.68.13-1.59.69-1.75z" fill="#1d1d1b"></path> <path d="m50 37.13c1-.26 2.53-.28 2.94 1.5s-1.66 2.54-3.31 2.13-1.94-3.03.37-3.63z" fill="#1d1d1b"></path> <path d="m50.26 37.92c.57-.14 1.43-.15 1.65.85s-.91 1.42-1.86 1.23a1 1 0 0 1 .21-2.08z" fill="#ffe19b"></path> <path d="m8.6 46a1.18 1.18 0 0 1 1.87.94c0 1.09-1.47 1.34-2 .9a1.22 1.22 0 0 1 .13-1.84z" fill="#1d1d1b"></path> <path d="m34.54 54.1a1.9 1.9 0 0 1 2.53 2 2.29 2.29 0 0 1 -3.5 1.38c-1.5-1.16-.97-2.88.97-3.38z" fill="#1d1d1b"></path> <path d="m34.7 55a1 1 0 0 1 1.3 1 1.2 1.2 0 0 1 -1.84.72c-.75-.58-.47-1.48.54-1.72z" fill="#ffe19b"></path> <path d="m49.22 52.2c.07-.1 1.6-2.82 2-3s.41-.16.5 0a27.3 27.3 0 0 1 0 2.84s1 0 1 .28-1.06 1.16-1.06 1.16.31 1.94 0 2.09a.75.75 0 0 1 -.69-.09l-.43-1.09a10.81 10.81 0 0 1 -2.22.87c-.16-.12-.6-.41-.38-.59a8.27 8.27 0 0 0 .78-1.28s-2.12-.19-2.18-.44-.07-.6.09-.66 2.59-.09 2.59-.09z" fill="#1d1d1b"></path> <path d="m11.75 54s1.16-1.81 2.5-.81 0 3-.09 2.94a4.64 4.64 0 0 1 -2.41-2.13z" fill="#cbe7f5"></path> <path d="m11.5 55.17s1 1 1.32 1.21l.28.22a2.61 2.61 0 0 1 -1.53-.15c-.63-.35-.07-1.28-.07-1.28z" fill="#cbe7f5"></path> <path d="m12.63 53.88s.56-.56.91-.53a.69.69 0 0 1 .5.28l-.63.38-.56.34a2.22 2.22 0 0 0 -.22-.47z" fill="#1d1d1b"></path> <path d="m38.29 13.87c.24-.06-1-2.1-2.86-2.81a16.74 16.74 0 0 0 -9.23-.14 25.3 25.3 0 0 0 -9.2 4.66 19 19 0 0 0 -4.84 6.42 14.81 14.81 0 0 0 -2.16 8 18.87 18.87 0 0 0 3.42 10.1 24.2 24.2 0 0 0 6 6 9.61 9.61 0 0 0 2 1.17s-.42-1.27-.22-1.35a1 1 0 0 1 .8.08 12.69 12.69 0 0 0 .23 1.64c.13.07.61.44.61.38a21.52 21.52 0 0 1 -.23-2.71c.1-.13 1-.1 1.08.1s0 2.71.08 2.8a2.49 2.49 0 0 0 .65.41c.06 0-.1-1.81 0-1.81s.77.06.83.19 0 1.85.09 2a9.45 9.45 0 0 0 5.32 1 15 15 0 0 0 7.46-2.31c1.67-1 2.71-2.31 2.6-2.59s-.14-.35-.29-.37-6.37 2.37-10.43.27-5.25-4.85-5.41-6.31.6-4.61.5-4.84-3.84-3.14-4-6.58.31-6.37 3.06-9.27a14.77 14.77 0 0 1 8.85-4.27c1.85-.02 5.2.16 5.29.14z" fill="#ffffff"></path> <path d="m24.1 13.19a1.58 1.58 0 0 1 2.08 1.2 1.73 1.73 0 0 1 -2.46 1.8c-1.64-.57-.83-2.57.38-3z" fill="#1d1d1b"></path> <path d="m24.31 14a.76.76 0 0 1 1 .58.83.83 0 0 1 -1.18.86c-.79-.29-.4-1.25.18-1.44z" fill="#ffffff"></path> <path d="m17.47 17.31c.77-.54 3.15-.46 3.36 1.42s-1.83 3.35-3.4 2.27a2.34 2.34 0 0 1 .04-3.69z" fill="#1d1d1b"></path> <path d="m18 18.11c.44-.32 1.82-.27 1.94.82a1.33 1.33 0 0 1 -2 1.34 1.36 1.36 0 0 1 .06-2.16z" fill="#ffffff"></path> <path d="m14.12 21.52c.14-.13.79 0 .75.37a22.52 22.52 0 0 1 -1.54 4.21c-.31.27-.75.4-.92 0a10.5 10.5 0 0 1 1.71-4.58z" fill="#1d1d1b"></path> <path d="m14.27 28.77c1.34-.56 4.25 0 3.77 3.44s-3.86 2.52-4.75 1.14-1.21-3.66.98-4.58z" fill="#1d1d1b"></path> <path d="m14.59 29.61c.94-.39 3 0 2.64 2.41s-2.7 1.76-3.32.8-.85-2.56.68-3.21z" fill="#ffffff"></path> <path d="m19.37 37.67c1.34-.57 4.25 0 3.77 3.43s-3.85 2.52-4.75 1.15-1.21-3.67.98-4.58z" fill="#1d1d1b"></path> <path d="m19.69 38.51c.94-.39 3 0 2.64 2.41s-2.69 1.76-3.32.8-.85-2.57.68-3.21z" fill="#ffffff"></path> <path d="m27.66 45.87a1.14 1.14 0 0 1 1.63 1.13c0 .9-.67 1.58-1.61 1.25a1.26 1.26 0 0 1 -.02-2.38z" fill="#1d1d1b"></path> <path d="m27.87 46.5a.53.53 0 0 1 .76.53c0 .42-.32.75-.76.59a.59.59 0 0 1 0-1.12z" fill="#ffffff"></path> </g></svg>`;
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