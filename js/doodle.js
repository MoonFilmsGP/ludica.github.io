< !DOCTYPE html >
    <html lang="es">
        <head>
            <meta charset="UTF-8">
                <title>Lúdica - Doodle Engine</title>
                <style>
                    html, body {
                        margin: 0;
                    padding: 0;
                    overflow: hidden;
                    background: #111;
                    font-family: 'Inter', sans-serif;
    }
                    canvas {
                        display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 0;
}
                    .banner {
                        position: absolute;
                    top: 2rem;
                    left: 2rem;
                    z-index: 10;
                    font-size: 3rem;
                    font-weight: bold;
                    color: #fff;
                    text-shadow: 2px 2px 5px rgba(0,0,0,0.6);
                    font-family: 'Orbitron', sans-serif;
    }
                    section {
                        display: none;
                    padding: 2rem;
                    background: #222;
                    color: #eee;
                    font-size: 1.2rem;
    }
                    section.active {
                        display: block;
    }
                    #articles-grid {
                        display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1rem;
                    padding: 2rem;
    }
                    .article-card {
                        border: 1px solid #444;
                    border-radius: 8px;
                    overflow: hidden;
                    background-color: #1a1a1a;
                    color: #eee;
                    transition: transform 0.2s;
    }
                    .article-card:hover {
                        transform: scale(1.02);
    }
                    .article-card img {
                        width: 100%;
                    height: auto;
                    display: block;
    }
                    .article-card h2 {
                        font - size: 1.2rem;
                    margin: 1rem;
    }
                    .article-card p {
                        font - size: 1rem;
                    margin: 0 1rem 1rem;
    }
                    .article-card a {
                        display: block;
                    text-align: right;
                    margin: 0 1rem 1rem;
                    color: #89c4f4;
                    text-decoration: none;
    }
                </style>
                <link href="https://fonts.googleapis.com/css2?family=Inter&family=Orbitron:wght@700&display=swap" rel="stylesheet">
                </head>
                <body>
                    <div class="banner">LÚDICA</div>
                    <canvas id="gameCanvas"></canvas>

                    <section id="Principal" class="active">
                        <div id="articles-grid">
                            <!-- Aquí se generarán las tarjetas de artículos -->
                        </div>
                    </section>
                    <section id="Actualidad">
                        <div id="articles-grid"></div>
                    </section>
                    <section id="Reportajes">
                        <div id="articles-grid"></div>
                    </section>
                    <section id="Entrevistas">
                        <div id="articles-grid"></div>
                    </section>
                    <section id="Opiniones">
                        <div id="articles-grid"></div>
                    </section>

                    <script>
                        const canvas = document.getElementById('gameCanvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight * 0.6;

                        const gravity = 0.6;
                        const jumpStrength = -12;
                        const floorY = canvas.height * 0.75;
                        const sectionSpacing = canvas.width / 6;

                        const player = {
                            x: 100,
                        y: floorY - 40,
                        width: 30,
                        height: 30,
                        color: '#00f',
                        vy: 0,
                        onGround: false
};

                        const sections = ['Principal', 'Actualidad', 'Reportajes', 'Entrevistas', 'Opiniones'];
const platforms = sections.map((label, i) => ({
                            x: sectionSpacing * (i + 1) - 30,
                        y: floorY,
                        width: 120,
                        height: 20,
                        label: label
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
  platforms.forEach(platform => {
    if (
                        player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
                        player.y + player.height < platform.y + 10 &&
      player.y + player.height + player.vy >= platform.y
                        ) {
                            player.y = platform.y - player.height;
                        player.vy = 0;
                        player.onGround = true;
                        activateSection(platform.label);
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
  platforms.forEach(p => {
                            ctx.fillRect(p.x, p.y, p.width, p.height);
                        ctx.fillStyle = '#fff';
                        ctx.font = '16px Inter';
                        ctx.fillText(p.label, p.x + 10, p.y - 10);
                        ctx.fillStyle = '#444';
  });

                        ctx.fillStyle = player.color;
                        ctx.fillRect(player.x, player.y, player.width, player.height);
}

                        function activateSection(label) {
                            sections.forEach(s => {
                                const el = document.getElementById(s);
                                if (el) el.classList.remove('active');
                            });
                        const target = document.getElementById(label);
                        if (target) target.classList.add('active');

  // Filtrar artículos según categoría
  document.querySelectorAll('.article-card').forEach(card => {
                            card.style.display = (card.dataset.category === label || label === 'Principal') ? 'block' : 'none';
  });
}

                        function loop() {
                            update();
                        draw();
                        requestAnimationFrame(loop);
}

                        loop();
                    </script>

                    <script>
// Cargar artículos desde index.json (debe estar servido desde el mismo dominio)
                        fetch('index.json')
  .then(res => res.json())
  .then(data => {
    const allGrids = document.querySelectorAll('#articles-grid');
    allGrids.forEach(grid => grid.innerHTML = '');
    data.forEach(article => {
      const card = document.createElement('div');
                        card.className = 'article-card';
                        card.dataset.category = article.category || 'Principal';
                        card.innerHTML = `
                        <img src="${article.thumbnail}" alt="${article.title}" />
                        <h2>${article.title}</h2>
                        <p>${article.lead}</p>
                        <a href="articles/${article.path}">Leer más</a>
                        `;
                        allGrids[0].appendChild(card); // solo al primero (Principal), luego JS lo filtra
    });
  })
  .catch(err => console.error('Error cargando artículos:', err));
                    </script>
                </body>
            </html>
