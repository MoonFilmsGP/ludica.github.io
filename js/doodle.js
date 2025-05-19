< !DOCTYPE html >
    <html lang="es">
        <head>
            <meta charset="UTF-8">
                <title>Lúdica - Doodle Engine</title>
                <style>
                    html, body {
                        margin: 0;
                    padding: 0;
                    background: #111;
                    font-family: 'Inter', sans-serif;
    }
                    canvas {
                        display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 60vh;
                    z-index: 1;
                    pointer-events: none;
                    background: #000;
    }
                </style>
        </head>
        <body>
            <canvas id="doodle-canvas"></canvas>
            <script>
                const canvas = document.getElementById('doodle-canvas');
                const ctx = canvas.getContext('2d');

                function resize() {
                    canvas.width = window.innerWidth;
                canvas.height = window.innerHeight * 0.6;
}
                window.addEventListener('resize', resize);
                resize();

                const gravity = 0.6;
                const jumpStrength = -12;
                const floorY = canvas.height * 0.75;
                const letterSpacing = 100;

                const player = {
                    x: 100,
                y: floorY - 40,
                width: 30,
                height: 30,
                color: '#00f',
                vy: 0,
                onGround: false
};

const letters = 'LÚDICA'.split('').map((char, i) => ({
                    x: 100 + i * letterSpacing,
                y: floorY,
                width: 60,
                height: 20,
                label: char
}));

                let keys = { };
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

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

                function draw() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#444';
  letters.forEach(l => {
                    ctx.fillRect(l.x, l.y, l.width, l.height);
                ctx.fillStyle = '#eee';
                ctx.font = '20px sans-serif';
                ctx.fillText(l.label, l.x + 15, l.y - 10);
                ctx.fillStyle = '#444';
  }););

                ctx.fillStyle = player.color;
                ctx.fillRect(player.x, player.y, player.width, player.height);
}

                function loop() {
                    update();
                draw();
                requestAnimationFrame(loop);
}

                loop();
            </script>
        </body>
    </html>
