const lamp = document.querySelectorAll('.light')[0];
const lampWidgets = document.querySelector('.item-4');
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const circle_background = document.getElementById('line-background');
const circle_progress = document.getElementById('line-progress');
const handle = document.getElementById('handle');
const infoCat = document.querySelector('.item-3')
const currentTimeElement = document.getElementById('current-time');
const totalTimeElement = document.getElementById('total-time');
const musicHeader = document.getElementById('music');
const musicHeaderMobile = document.getElementById('music-mobile');
const musicPlayer = document.querySelector('.item-5');
let musicPlayerOpened = false ;
let lampOn = false;
let isDraggingMusic= false;
const lampHeader = document.getElementById('lamp');
const radius = circle_background.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const maxDegrees = 330; // Define o limite em graus do círculo preenchido
const offset300 = circumference * (60 / 360);
const offset330 = circumference * (30 / 360);



circle_background.style.strokeDasharray = `${circumference - offset300} ${offset300}`;
circle_background.style.strokeDashoffset = circumference;

circle_progress.style.strokeDasharray = 565.48;
circle_background.style.strokeDashoffset = 0;

function setProgress(percent) {
    const adjustedPercent = percent * ((maxDegrees) / 360); // Ajustar para 330 graus

    const offset = (circumference) - (adjustedPercent / 100 * (circumference - offset330)) + 125;

    circle_progress.style.strokeDashoffset = offset;

    const angle = adjustedPercent / 100 * maxDegrees - 60; // Calcular o ângulo ajustado
    const x = 75 + radius * Math.cos(angle * Math.PI / 180); // Calcular a nova posição X
    const y = 75 + radius * Math.sin(angle * Math.PI / 180); // Calcular a nova posição Y

    handle.setAttribute('cx', x);
    handle.setAttribute('cy', y);
}

audioPlayer.addEventListener('timeupdate', () => {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    setProgress(percent);
    currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
});

audioPlayer.addEventListener('loadedmetadata', () => {
    console.info('loadmetada', formatTime(audioPlayer.currentTime))
    console.info('loadmetada', `/ ${formatTime(audioPlayer.duration)}`)
    totalTimeElement.textContent = `/ ${formatTime(audioPlayer.duration)}`;
    
});

playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Lógica para arrastar a bolinha e definir a posição da música

handle.addEventListener('mousedown', () => isDraggingMusic = true);
window.addEventListener('mouseup', () => isDraggingMusic = false);
handle.addEventListener('touchstart', () => isDraggingMusic = true);
window.addEventListener('touchend', () => isDraggingMusic = false);

window.addEventListener('mousemove', (e) => {
    if (isDraggingMusic) {
        const rect = circle_progress.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI + 90;
        angle = (angle < 0 ? angle + 360 : angle) % 360;
        
        console.info(angle)
        // Limitar o ângulo ao intervalo de 330 graus
        if (angle >= 30 && angle <= 330) {

            const adjustedAngle = angle - 30;
            const percent = adjustedAngle / 300  * 100;
            const newTime = audioPlayer.duration * (percent / 100);
            audioPlayer.currentTime = newTime;
            setProgress(percent);
        }
    }
});

window.addEventListener('touchmove', (e) => {
    if (isDraggingMusic) {
        var touchTarget = e.targetTouches[0]

        const rect = circle_progress.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let angle = Math.atan2(touchTarget.clientY - centerY, touchTarget.clientX - centerX) * 180 / Math.PI + 90;
        angle = (angle < 0 ? angle + 360 : angle) % 360;
        
        console.info(angle)
        // Limitar o ângulo ao intervalo de 330 graus
        if (angle >= 30 && angle <= 330) {

            const adjustedAngle = angle - 30;
            const percent = adjustedAngle / 300  * 100;
            const newTime = audioPlayer.duration * (percent / 100);
            audioPlayer.currentTime = newTime;
            setProgress(percent);
        }
    }
});


musicHeader.addEventListener("click", function(){
   if( musicPlayerOpened ){
    musicPlayerOpened = false;
    musicPlayer.style.display = "none";
   } else {
    musicPlayerOpened = true;
    musicPlayer.style.display = "flex";
   }

});

musicHeaderMobile.addEventListener("click", function(){
    if( musicPlayerOpened ){
     musicPlayerOpened = false;
     musicPlayer.style.display = "none";
    } else {
     musicPlayerOpened = true;
     musicPlayer.style.display = "flex";
    }
 
 });

 lampHeader.addEventListener("click", function(){
    if(lampOn ){
     lampOn = false;
     lampWidgets.style.display = "none";
    } else {
        lampOn = true;
        lampWidgets.style.display = "flex";
    }
 
 });


 