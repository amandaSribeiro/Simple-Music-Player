import songs from "./songs.js";

const player = document.querySelector("#player");
const nameMusic = document.querySelector(".musicName");
const bandName = document.querySelector(".bandName");
const volumeSlider = document.querySelector(".volumeSlider");
const playPause = document.querySelector(".play");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const random = document.querySelector(".random");
const progress = document.querySelector(".progress");
const currentTime = document.querySelector(".currentTime");
const duration = document.querySelector(".duration");
const textButtomPlay = '<i class="ph ph-play"></i>';
const textButtomPause = '<i class="ph ph-pause"></i>';

let index = 0;

// Inicializando o áudio
player.src = songs[index].src;
nameMusic.textContent = songs[index].name;
bandName.textContent = songs[index].band;

playPause.onclick = () => playPauseMusic();

function playPauseMusic() {
    if (player.paused) {
        player.play();
        playPause.innerHTML = textButtomPause;
    } else {
        player.pause();
        playPause.innerHTML = textButtomPlay;
    }
}

// Controle de volume
volumeSlider.oninput = function() {
    player.volume = volumeSlider.value / 100;
};

// Atualização do tempo de música
player.ontimeupdate = function() {
    const current = player.currentTime;
    const total = player.duration;

    currentTime.textContent = formatTime(current);
    duration.textContent = formatTime(total);
    
    const progressWidth = (current / total) * 100;
    progress.style.width = `${progressWidth}%`;
};

// Função para formatar o tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}
