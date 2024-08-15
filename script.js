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
next.onclick = () => nextMusic(); // Evento para avançar para a próxima música
prev.onclick = () => prevMusic(); // Evento para voltar para a música anterior

function playPauseMusic() {
    if (player.paused) {
        player.play();
        playPause.innerHTML = textButtomPause;
    } else {
        player.pause();
        playPause.innerHTML = textButtomPlay;
    }
}

function nextMusic() {
    index = (index + 1) % songs.length; // Avança para a próxima música e retorna ao início se estiver na última
    player.src = songs[index].src; // Atualiza a fonte do áudio
    nameMusic.textContent = songs[index].name; // Atualiza o nome da música
    bandName.textContent = songs[index].band; // Atualiza o nome da banda
    player.play(); // Reproduz a nova música
    playPause.innerHTML = textButtomPause; // Atualiza o ícone do botão play/pause para "pause"
}

function prevMusic() {
    index = (index - 1 + songs.length) % songs.length; // Volta para a música anterior, ou vai para a última música se estiver na primeira
    player.src = songs[index].src; // Atualiza a fonte do áudio
    nameMusic.textContent = songs[index].name; // Atualiza o nome da música
    bandName.textContent = songs[index].band; // Atualiza o nome da banda
    player.play(); // Reproduz a música anterior
    playPause.innerHTML = textButtomPause; // Atualiza o ícone do botão play/pause para "pause"
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
