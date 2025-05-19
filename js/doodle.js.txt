const canvas = document.getElementById('doodle-canvas');
const ctx = canvas.getContext('2d');
// Ajustar tamaño
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.6;
}
window.addEventListener('resize', resize);
resize();

// Aquí cargarás la imagen/gif o animación
const headlineEl = document.getElementById('headline');
const leadEl = document.getElementById('lead');
// Ejemplo sencillo:
headlineEl.textContent = 'Expedition Clair Obscur 33: Indie GOTY?';
leadEl.textContent = '¿Será este el primer indie GOTY de la historia? Prueba su sistema de parry…';

// Más adelante: mini-juego de parry en canvas