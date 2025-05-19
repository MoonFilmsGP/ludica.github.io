// js/articles-loader.js

// Helper para crear un elemento con clases y contenido
function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}

// RENDERIZAR VERSIÓN “GRID” EN INDEX.HTML
async function loadIndex() {
  // 1) Cargar el listado de artículos
  const idx = await fetch('articles/index.json').then(r => r.json());
  const grid = document.getElementById('articles-grid');

  // 2) Por cada nombre de archivo, traer su JSON y crear una card
  for (const file of idx) {
    const data = await fetch(`articles/${file}`).then(r => r.json());
    const card = el('article', 'card');
    card.appendChild(el('h2', null, data.title));
    card.appendChild(el('p', 'lead', data.lead));
    // enlace a detalle: article.html?file=nombre.json
    const link = el('a', 'read-more', 'Leer más');
    link.href = `article.html?file=${file}`;
    card.appendChild(link);
    grid.appendChild(card);
  }
}

// RENDERIZAR VERSIÓN “DETALLE” EN ARTICLE.HTML
async function loadDetail() {
  const params = new URLSearchParams(window.location.search);
  const file = params.get('file');
  if (!file) return; // estamos en index, nada que hacer

  // 1) Fetch de datos + plantilla HTML
  const [data, tpl] = await Promise.all([
    fetch(`articles/${file}`).then(r => r.json()),
    fetch('templates/article.html').then(r => r.text())
  ]);

  // 2) Reemplazo de placeholders básicos
  let html = tpl
    .replace(/{{title}}/g, data.title)
    .replace(/{{lead}}/g, data.lead)
    .replace(/{{date}}/g, data.date);

  // 3) Inyectar párrafos donde esté {{content}}
  const contentHtml = data.content.map(p => `<p>${p}</p>`).join('\n');
  html = html.replace('{{content}}', contentHtml);

  // 4) Insertar en el DOM
  document.getElementById('article-container').innerHTML = html;
}

// Al cargar la página, intento ambos (solo uno hará efecto)
document.addEventListener('DOMContentLoaded', () => {
  loadIndex();
  loadDetail();
});

