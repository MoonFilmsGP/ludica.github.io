const canvas = document.getElementById('doodle-canvas');
const ctx = canvas.getContext('2d');

// Ajustar tamaño
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.6;
}
window.addEventListener('resize', resize);
resize();

// Actualizar encabezado
const headlineEl = document.getElementById('headline');
const leadEl = document.getElementById('lead');
headlineEl.textContent = 'Expedition Clair Obscur 33: Indie GOTY?';
leadEl.textContent = '¿Será este el primer indie GOTY de la historia? Prueba su sistema de parry…';

// ==================== ENGINE DEL MONITO ====================

// Config
const gravity = 0.6;
const jumpStrength = -12;
const floorY = canvas.height * 0.75;
const letterSpacing = 100;

// Jugador
const player = {
    x: 100,
    y: floorY - 40,
    width: 30,
    height: 30,
    color: '#00f',
    vy: 0,
    onGround: false
};

// Letras como plataformas
const letters = 'LÚDICA'.split('').map((char, i) => ({
    x: 100 + i * letterSpacing,
    y: floorY,
    width: 60,
    height: 20,
    label: char
}));

// Controles
let keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Lógica
function update() {
    if (keys['ArrowLeft'] || keys['a']) player.x -= 5;
    if (keys['ArrowRight'] || keys['d']) player.x += 5;

    if ((keys['ArrowUp'] || keys['w'] || keys[' ']) && player.onGround) {
        player.vy = jumpStrength;
        player.onGround = false;
    }

    player.vy += gravity;
    player.y += player.vy;

    player.onGround = false;
    letters.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height < platform.y + 10 &&
            player.y + player.height + player.vy >= platform.y
        ) {
            player.y = platform.y - player.height;
            player.vy = 0;
            player.onGround = true;
        }
    });

    if (player.y > canvas.height) {
        player.y = floorY - player.height;
        player.vy = 0;
        player.x = 100;
    }
}

// Dibujo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#444';
    letters.forEach(l => {
        ctx.fillRect(l.x, l.y, l.width, l.height);
        ctx.fillStyle = '#eee';
        ctx.font = '20px sans-serif';
        ctx.fillText(l.label, l.x + 15, l.y - 10);
        ctx.fillStyle = '#444';
    });

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
