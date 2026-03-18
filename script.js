/**
 * RPS COMBATE - Motor de Lógica, Visuales y Audio
 * @author Joshua Chiguay - Estudiante de Ingeniería Civil en Informática
 */

// --- ESTADO GLOBAL ---
let p1Choice = null;
let p2Choice = null;
let currentTurn = 1;

// --- CONFIGURACIÓN DE AUDIO ---
const sounds = {
    win: new Audio('assets/win.mp3'),
    tie: new Audio('assets/tie.mp3')
};

function playSound(effect) {
    sounds[effect].currentTime = 0; 
    sounds[effect].play().catch(e => console.log("Audio esperando interacción del usuario"));
}

// --- RECURSOS: ICONOS VECTORIALES (SVGs) ---
const icons = {
    rock: `<svg viewBox="0 0 384 512" fill="currentColor"><path d="M96 400c-17.7 0-32 14.3-32 32l0 48c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-48c0-17.7-14.3-32-32-32L96 400zM73.2 352l64.6 0-79.5-88.3C51.7 256.3 48 246.8 48 236.9L48 204c0-16.1 11.9-29.5 27.4-31.7 11.8-1.7 20.6-11.8 20.6-23.8L96 72c0-13.3 10.7-24 24-24 7.2 0 13.6 3.1 18 8.1 4.6 5.2 11.1 8.1 18 8.1s13.4-3 18-8.1c4.4-5 10.8-8.1 18-8.1 8.5 0 15.9 4.4 20.2 11.1 6.9 10.7 20.9 14.2 32 8 3.5-1.9 7.4-3.1 11.8-3.1 10.6 0 19.7 6.9 22.8 16.6 3.8 11.7 15.9 18.7 28 16 1.7-.4 3.4-.6 5.2-.6 13.3 0 24 10.7 24 24l0 92.2c0 14.4-3.5 28.5-10.2 41.2l-52.2 98.6 54.3 0 40.3-76.2c10.4-19.6 15.8-41.5 15.8-63.6l0-92.2c0-38.4-30.1-69.8-68.1-71.9-12.9-19.3-34.9-32.1-59.9-32.1-5.7 0-11.2 .7-16.5 1.9-12.7-11.1-29.3-17.9-47.5-17.9-13.1 0-25.4 3.5-36 9.6-10.6-6.1-22.9-9.6-36-9.6-39.8 0-72 32.2-72 72l0 58.7C19.7 143 0 171.2 0 204l0 32.9c0 21.7 8 42.7 22.6 58.9L73.2 352z"/></svg>`,
    paper: `<svg viewBox="0 0 512 512" fill="currentColor"><path d="M256.5 0c-25.3 0-47.2 14.7-57.6 36-7-2.6-14.5-4-22.4-4-35.3 0-64 28.7-64 64l0 165.5-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5L107 437c48 48 113.1 75 181 75l16.5 0c1.5 0 3-.1 4.5-.4 91.7-6.2 165-79.4 171.1-171.1 .3-1.5 .4-3 .4-4.5l0-176c0-35.3-28.7-64-64-64-5.5 0-10.9 .7-16 2l0-2c0-35.3-28.7-64-64-64-7.9 0-15.4 1.4-22.4 4-10.4-21.3-32.3-36-57.6-36zm-16 96.1l0-.1 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 168c0 13.3 10.7 24 24 24s24-10.7 24-24l0-136c0-8.8 7.2-16 16-16s16 7.2 16 16l0 136c0 13.3 10.7 24 24 24s24-10.7 24-24l0-72c0-8.8 7.2-16 16-16s16 7.2 16 16l0 172.9c-.1 .6-.1 1.3-.2 1.9-3.4 69.7-59.3 125.6-129 129-.6 0-1.3 .1-1.9 .2L288 464C232.9 464 180 442.1 141 403.1L53.2 315.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l43.7 43.7c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2l0-223.4c0-8.8 7.2-16 16-16 8.8 0 16 7.1 16 15.9l0 136.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-135.9z"/></svg>`,
    scissors: `<svg viewBox="0 0 640 640" fill="currentColor"><path d="M64.2 340.3C63 305 90.6 275.3 125.9 274.1L129.2 274L121 272.2C86.5 264.5 64.7 230.3 72.3 195.8C79.9 161.3 114.2 139.5 148.7 147.2L321.7 185.5C324 182.6 326.3 179.8 328.8 177L347.2 156.7C363.9 138.5 387.5 128 412.3 128L422.5 128C476.6 128 526.6 156.7 553.8 203.4L555.3 206C568.9 229.2 576 255.7 576 282.6L576 408C576 474.3 522.3 528 456 528L352 528C316.7 528 288 499.3 288 464C288 461.2 288.2 458.4 288.5 455.7C269.1 444.7 256 423.9 256 400C256 399.2 256 398.4 256 397.6L130.4 402C95.1 403.2 65.4 375.6 64.2 340.3zM127.6 322.1C118.8 322.4 111.9 329.8 112.2 338.7C112.5 347.6 119.9 354.4 128.7 354.1L290.2 348.5C300 348.2 308.9 353.8 312.9 362.7C316.9 371.6 315.1 382 308.4 389.1C305.6 392 304 395.8 304 400.1C304 408.9 311.2 416.1 320 416.1C329.1 416.1 337.4 421.2 341.5 429.4C345.6 437.6 344.7 447.3 339.2 454.5C337.2 457.2 336 460.5 336 464.1C336 472.9 343.2 480.1 352 480.1L456 480.1C495.8 480.1 528 447.9 528 408.1L528 282.7C528 264.3 523.1 246.2 513.8 230.3L512.3 227.7C493.7 195.7 459.5 176.1 422.5 176.1L412.3 176.1C401 176.1 390.3 180.9 382.7 189.2L382.7 189.2L364.3 209.5C363.7 210.1 363.2 210.8 362.6 211.4L419.6 224.6C428.2 226.6 433.6 235.2 431.6 243.8C429.6 252.4 421 257.8 412.4 255.8L326.8 235.8L138.3 194C129.7 192.1 121.1 197.5 119.2 206.2C117.3 214.9 122.7 223.4 131.4 225.3L318.9 266.9C329.1 269.2 336.7 277.8 337.6 288.3L337.7 289.3C338.3 295.9 336.2 302.4 331.9 307.4C327.6 312.4 321.3 315.3 314.7 315.6L127.6 322.1z"/></svg>`
};

// --- FLUJO DE JUEGO ---

function makeSelection(choice) {
    if (currentTurn === 1) {
        p1Choice = choice;
        currentTurn = 2;
        showPassView();
    } else {
        p2Choice = choice;
        showResultView();
    }
}

function showPassView() {
    toggleVisibility('view-selection', false);
    toggleVisibility('turn-badge', false);
    toggleVisibility('view-pass', true);
}

function startJ2Turn() {
    toggleVisibility('view-pass', false);
    toggleVisibility('view-selection', true);
    
    const badge = document.getElementById('turn-badge');
    badge.classList.remove('hidden', 'p1-theme');
    badge.classList.add('p2-theme');
    badge.innerText = "JUGADOR 2";
}

function showResultView() {
    toggleVisibility('view-selection', false);
    toggleVisibility('turn-badge', false);
    toggleVisibility('view-result', true);

    renderFighterIcon('icon-p1', p1Choice, 'var(--p1)');
    renderFighterIcon('icon-p2', p2Choice, 'var(--p2)');

    determinarGanador(); // Esta es la única función que queda para decidir el final
}

/** * Lógica Maestra de Resultados: Decide Ganador, Audio y Vibración
 */
function determinarGanador() {
    const status = document.getElementById('match-status');
    
    if (p1Choice === p2Choice) {
        status.innerText = "EMPATE EN EL COSMOS";
        status.style.color = "#888";
        playSound('tie');
    } else if (
        (p1Choice === 'rock' && p2Choice === 'scissors') ||
        (p1Choice === 'paper' && p2Choice === 'rock') ||
        (p1Choice === 'scissors' && p2Choice === 'paper')
    ) {
        status.innerText = "¡VICTORIA JUGADOR 1!";
        status.style.color = "var(--p1)";
        playSound('win');
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    } else {
        status.innerText = "¡VICTORIA JUGADOR 2!";
        status.style.color = "var(--p2)";
        playSound('win');
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
}

function resetGame() {
    p1Choice = null; p2Choice = null; currentTurn = 1;
    toggleVisibility('view-result', false);
    toggleVisibility('view-selection', true);
    
    const badge = document.getElementById('turn-badge');
    badge.classList.remove('hidden', 'p2-theme');
    badge.classList.add('p1-theme');
    badge.innerText = "JUGADOR 1";
}

// --- HELPERS DE UI ---

function toggleVisibility(id, show) {
    const el = document.getElementById(id);
    if (el) show ? el.classList.remove('hidden') : el.classList.add('hidden');
}

function renderFighterIcon(id, choice, color) {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = icons[choice];
        el.style.color = color;
        el.style.filter = `drop-shadow(0 0 12px ${color})`;
    }
}

// --- MOTOR VISUAL (CANVAS & PARTICLES) ---

function initStars() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const stars = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 350; i++) {
        stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 1.2 + 0.3, velocity: Math.random() * 0.15 });
    }

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(180, 180, 180, 0.4)";
        stars.forEach(s => {
            ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
            s.y += s.velocity;
            if (s.y > canvas.height) s.y = 0;
        });
        requestAnimationFrame(draw);
    };
    draw();
}

function createShootingStar() {
    const container = document.getElementById('shooting-stars-container');
    if (!container) return;
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * 80 + 'vw';
    star.style.top = Math.random() * 40 + 'vh';
    container.appendChild(star);
    setTimeout(() => star.remove(), 2000);
}

// --- INICIALIZACIÓN ---
window.addEventListener('DOMContentLoaded', () => {
    const rockBtn = document.getElementById('svg-rock');
    const paperBtn = document.getElementById('svg-paper');
    const scissorsBtn = document.getElementById('svg-scissors');

    if (rockBtn) rockBtn.innerHTML = icons.rock;
    if (paperBtn) paperBtn.innerHTML = icons.paper;
    if (scissorsBtn) scissorsBtn.innerHTML = icons.scissors;

    initStars();
    setInterval(createShootingStar, 3500);
});