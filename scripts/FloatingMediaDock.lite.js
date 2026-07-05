// ==UserScript==
// @name         Lite - Floating Media Dock (PelotaLibre & Telefe)
// @namespace    UserScript.lite.FloatingDock
// @version      2.0
// @description  Dock lateral flotante, arrastrable y con diseño premium.
// @author       Emanuel
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
// ==/UserScript==

(function(){'use strict';

// ==============================
// ESCALA DEL DOCK
// 1   = Tamaño original
// 1.5 = 50% más grande
// 2   = Doble de tamaño
// 3   = Triple de tamaño
// ==============================
const DOCK_SCALE = 2;

// ==============================
// SITIOS DE FÚTBOL
// ==============================
const footballSites = [
  { name: "PelotaLibre", url: "https://pelotalibretv.com.co/live/" },
  { name: "LibreFutbol", url: "https://librefutbol.online/" },
  { name: "Otra Plataforma", url: "https://ejemplo.com/" }
];

// ==============================
// LONG PRESS CONFIG
// ==============================
const LONG_PRESS_DURATION = 550;
const LONG_PRESS_THRESHOLD = 10;

if(window.self!==window.top)return;

// ==============================
// CREAR DOCK
// ==============================
const dock = document.createElement('div');
dock.id = 'premium-floating-dock';

const savedTop = GM_getValue('dockTop', '40%');
const savedLeft = GM_getValue('dockLeft', 'calc(100vw - 65px)');

dock.style.top = savedTop;
dock.style.left = savedLeft;
dock.style.willChange = "transform";
dock.style.transform = "translateZ(0)";
dock.style.setProperty('--dock-scale', DOCK_SCALE);

// Obtener sitio predeterminado
const defaultSite = GM_getValue('footballDefaultSite', footballSites[0].name);
const defaultSiteData = footballSites.find(s => s.name === defaultSite) || footballSites[0];

dock.innerHTML = `<div class="dock-drag-handle"><svg viewBox="0 0 24 24"><path d="M10 9h2V7h-2v2zm0 5h2v-2h-2v2zm0 5h2v-2h-2v2zm4-12v2h2V7h-2zm0 7h2v-2h-2v2zm0 5h2v-2h-2v2z"/></svg></div><button class="dock-btn btn-football" type="button" title="${defaultSiteData.name}" data-url="${defaultSiteData.url}"><svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 17.9c-4-.5-7-3.9-7-7.9 0-.6.1-1.2.2-1.8L9 15v1c0 1.1.9 2 2 2v1.9zm6.9-2.5c-.3-.8-1-1.4-1.9-1.4h-1v-3c0-.5-.5-1-1-1h-6v-2h2c.5 0 1-.5 1-1V7h2c1.1 0 2-.9 2-2v-.4c2.9 1.2 5 4.1 5 7.4 0 2.1-.8 4-2.1 5.4z"/></svg></button><a href="https://www.mitelefe.com/telefe-en-vivo/" class="dock-btn btn-telefe" title="Streaming Telefe"><svg viewBox="0 0 24 24"><path d="M21 6h-7.59l3.29-3.29L16 1.41 11.59 5.82 7.17 1.41 5.76 2.83 9.05 6H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z"/></svg></a>`;

// ==============================
// ESTILOS
// ==============================
const style = document.createElement('style');
style.textContent = `html,body,*,*::before,*::after{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}*:focus,*:focus-visible,*:active{outline:none!important}#premium-floating-dock{all:initial;position:fixed;z-index:2147483647;display:flex;flex-direction:column;align-items:center;gap:calc(10px * var(--dock-scale));padding:calc(10px * var(--dock-scale)) calc(8px * var(--dock-scale));width:calc(64px * var(--dock-scale));min-width:calc(64px * var(--dock-scale));max-width:calc(64px * var(--dock-scale));box-sizing:border-box;flex:0 0 auto;background:rgba(20,20,25,.68);backdrop-filter:blur(10px) saturate(140%);-webkit-backdrop-filter:blur(10px) saturate(140%);border:1px solid rgba(255,255,255,.15);border-radius:calc(16px * var(--dock-scale));box-shadow:0 4px 14px rgba(0,0,0,.45),inset 0 1px 1px rgba(255,255,255,.12);user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;transition:opacity .3s ease,border-color .3s ease;opacity:.85;contain:paint;backface-visibility:hidden;-webkit-backface-visibility:hidden;isolation:isolate;--dock-scale:1;-webkit-tap-highlight-color:transparent}.dock-drag-handle{width:100%;height:calc(14px * var(--dock-scale));display:flex;justify-content:center;align-items:center;cursor:move;opacity:.4;transition:opacity .2s}#premium-floating-dock:hover .dock-drag-handle{opacity:.8}.dock-drag-handle svg{width:calc(20px * var(--dock-scale));height:calc(20px * var(--dock-scale));fill:#fff}.dock-btn{all:initial;width:calc(42px * var(--dock-scale));height:calc(42px * var(--dock-scale));border-radius:calc(12px * var(--dock-scale));display:flex;justify-content:center;align-items:center;text-decoration:none;transition:background .25s cubic-bezier(.4,0,.2,1),border-color .25s cubic-bezier(.4,0,.2,1),box-shadow .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1);position:relative;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.05);-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;cursor:pointer;box-sizing:border-box;padding:0;margin:0;font-size:inherit;color:inherit;-webkit-user-drag:none;-webkit-user-modify:read-only;-webkit-appearance:none}.dock-btn svg{width:calc(22px * var(--dock-scale));height:calc(22px * var(--dock-scale));fill:#fff;transition:transform .25s cubic-bezier(.4,0,.2,1);pointer-events:none}.btn-football:hover{background:linear-gradient(135deg,#00b4db,#0083b0);box-shadow:0 0 15px rgba(0,180,219,.6);border-color:rgba(255,255,255,.2)}.btn-telefe:hover{background:linear-gradient(135deg,#ff416c,#ff4b2b);box-shadow:0 0 15px rgba(255,65,108,.6);border-color:rgba(255,255,255,.2)}.dock-btn:hover svg{transform:scale(1.15)}.dock-btn:active{transform:scale(.92)}.football-menu{all:initial;position:fixed;z-index:2147483646;background:rgba(20,20,25,.68);backdrop-filter:blur(10px) saturate(140%);-webkit-backdrop-filter:blur(10px) saturate(140%);border:1px solid rgba(255,255,255,.15);border-radius:calc(12px * var(--dock-scale));box-shadow:0 4px 14px rgba(0,0,0,.45),inset 0 1px 1px rgba(255,255,255,.12);padding:calc(8px * var(--dock-scale));display:flex;flex-direction:column;gap:calc(6px * var(--dock-scale));min-width:calc(160px * var(--dock-scale));animation:menuSlideIn .15s cubic-bezier(.4,0,.2,1) forwards;--dock-scale:1;opacity:0;transform-origin:center;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}@keyframes menuSlideIn{from{opacity:0;transform:scale(.85) translateY(-8px)}to{opacity:1;transform:scale(1) translateY(0)}}.football-menu.menu-left{animation:menuSlideInLeft .15s cubic-bezier(.4,0,.2,1) forwards}@keyframes menuSlideInLeft{from{opacity:0;transform:scale(.85) translateX(8px)}to{opacity:1;transform:scale(1) translateX(0)}}.football-menu.menu-right{animation:menuSlideInRight .15s cubic-bezier(.4,0,.2,1) forwards}@keyframes menuSlideInRight{from{opacity:0;transform:scale(.85) translateX(-8px)}to{opacity:1;transform:scale(1) translateX(0)}}.football-menu-item{all:initial;display:block;padding:calc(10px * var(--dock-scale)) calc(12px * var(--dock-scale));border-radius:calc(8px * var(--dock-scale));background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.05);color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:calc(14px * var(--dock-scale));font-weight:500;cursor:pointer;text-decoration:none;transition:background .2s,border-color .2s,transform .2s;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;box-sizing:border-box;-webkit-touch-callout:none;-webkit-user-drag:none}@media(hover:hover){.football-menu-item:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.1);transform:translateX(4px)}}.football-menu-item:active{transform:scale(.96)}.football-menu-item.default-item{background:rgba(0,180,219,.15);border-color:rgba(0,180,219,.3)}.football-menu-item.default-item::before{content:'✓ ';color:#00b4db;font-weight:bold;margin-right:calc(4px * var(--dock-scale))}`;

(document.head || document.documentElement).appendChild(style);
document.documentElement.appendChild(dock);

// ==============================
// CREAR MENÚ (reutilizable)
// ==============================
let menu = null;
let isMenuOpen = false;

function createMenu() {
  if (menu) return menu;

  menu = document.createElement('div');
  menu.className = 'football-menu';
  menu.style.setProperty('--dock-scale', DOCK_SCALE);

  footballSites.forEach(site => {
    const item = document.createElement('a');
    item.className = 'football-menu-item';
    item.href = '#';
    item.textContent = site.name;

    if (site.name === defaultSite) {
      item.classList.add('default-item');
    }

    item.addEventListener('click', (e) => {
      e.preventDefault();
      selectFootballSite(site);
    });

    menu.appendChild(item);
  });

  document.documentElement.appendChild(menu);
  return menu;
}

function selectFootballSite(site) {
  // Actualizar favorito
  GM_setValue('footballDefaultSite', site.name);

  // Actualizar el data-url del botón y el title
  const footballBtn = dock.querySelector('.btn-football');
  footballBtn.setAttribute('data-url', site.url);
  footballBtn.title = site.name;

  // Cerrar menú
  closeMenu();

  // Abrir sitio
  window.open(site.url, '_blank');
}

function positionMenu() {
  if (!menu) return;

  const dockRect = dock.getBoundingClientRect();
  const menuHeight = menu.offsetHeight;
  const menuWidth = menu.offsetWidth;
  const padding = 10;

  const spaceLeft = dockRect.left;
  const spaceRight = window.innerWidth - dockRect.right;

  let top = dockRect.top + (dockRect.height - menuHeight) / 2;
  let left;

  // Detectar lado con más espacio
  if (spaceLeft > spaceRight) {
    // Abrir hacia la izquierda
    left = dockRect.left - menuWidth - padding;
    menu.classList.remove('menu-right');
    menu.classList.add('menu-left');
  } else {
    // Abrir hacia la derecha
    left = dockRect.right + padding;
    menu.classList.remove('menu-left');
    menu.classList.add('menu-right');
  }

  // Ajustar si se sale de pantalla verticalmente
  if (top < padding) top = padding;
  if (top + menuHeight > window.innerHeight - padding) {
    top = window.innerHeight - menuHeight - padding;
  }

  // Ajustar si se sale horizontalmente
  if (left < padding) left = padding;
  if (left + menuWidth > window.innerWidth - padding) {
    left = window.innerWidth - menuWidth - padding;
  }

  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
}

function openMenu() {
  if (isMenuOpen) return;

  createMenu();
  positionMenu();
  menu.style.display = 'flex';
  isMenuOpen = true;
}

function closeMenu() {
  if (!menu || !isMenuOpen) return;

  menu.style.display = 'none';
  isMenuOpen = false;
}

// ==============================
// LONG PRESS EN BOTÓN DE FÚTBOL (BUTTON ELEMENT)
// ==============================
let longPressTimer = null;
let isLongPressing = false;
let longPressStartX = 0;
let longPressStartY = 0;

const footballBtn = dock.querySelector('.btn-football');

// Bloquear todos los eventos que pueden causar menú contextual
footballBtn.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  e.stopPropagation();
}, false);

footballBtn.addEventListener('selectstart', (e) => {
  e.preventDefault();
}, false);

footballBtn.addEventListener('dragstart', (e) => {
  e.preventDefault();
}, false);

footballBtn.addEventListener('pointerdown', (e) => {
  isLongPressing = false;
  longPressStartX = e.clientX;
  longPressStartY = e.clientY;

  longPressTimer = setTimeout(() => {
    isLongPressing = true;
    openMenu();
  }, LONG_PRESS_DURATION);

  e.preventDefault();
}, false);

footballBtn.addEventListener('pointermove', (e) => {
  if (!longPressTimer) return;

  const moveX = Math.abs(e.clientX - longPressStartX);
  const moveY = Math.abs(e.clientY - longPressStartY);

  if (moveX > LONG_PRESS_THRESHOLD || moveY > LONG_PRESS_THRESHOLD) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
}, false);

footballBtn.addEventListener('pointerup', (e) => {
  const wasLongPress = isLongPressing;

  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }

  if (!wasLongPress && !isLongPressing) {
    const url = footballBtn.getAttribute('data-url');
    if (url) {
      window.open(url, '_blank');
    }
  }

  isLongPressing = false;
  e.preventDefault();
}, false);

footballBtn.addEventListener('pointercancel', (e) => {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  isLongPressing = false;
  e.preventDefault();
}, false);

// Bloquear touch events que pueden triggear menú contextual
footballBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
}, false);

footballBtn.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, false);

footballBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
}, false);

footballBtn.addEventListener('touchcancel', (e) => {
  e.preventDefault();
}, false);

// ==============================
// DRAG & DROP (SIN CAMBIOS)
// ==============================
let isDragging = false, startX, startY, startLeft, startTop, pointerId = -1;

const handle = dock.querySelector('.dock-drag-handle');
handle.style.touchAction = "none";

handle.addEventListener('pointerdown', (e) => {
  isDragging = true;
  pointerId = e.pointerId;
  document.body.style.cursor = "grabbing";
  dock.style.transition = 'none';

  startX = e.clientX;
  startY = e.clientY;
  startLeft = dock.offsetLeft;
  startTop = dock.offsetTop;

  handle.setPointerCapture(e.pointerId);
  dock.style.backdropFilter = 'none';
  dock.style.webkitBackdropFilter = 'none';

  document.addEventListener('pointermove', onMouseMove);
  document.addEventListener('pointerup', onMouseUp);
  document.addEventListener('pointercancel', onMouseUp);

  e.preventDefault();
});

function onMouseMove(e) {
  if (!isDragging) return;
  if (e.pointerId !== pointerId) return;

  let newLeft = startLeft + (e.clientX - startX);
  let newTop = startTop + (e.clientY - startY);

  const padding = 10,
    maxLeft = window.innerWidth - dock.offsetWidth - padding,
    maxTop = window.innerHeight - dock.offsetHeight - padding;

  if (newLeft < padding) newLeft = padding;
  if (newLeft > maxLeft) newLeft = maxLeft;
  if (newTop < padding) newTop = padding;
  if (newTop > maxTop) newTop = maxTop;

  if (newLeft < window.innerWidth / 2) {
    if (newLeft < 40) newLeft = padding;
  } else {
    if (newLeft > maxLeft - 40) newLeft = maxLeft;
  }

  dock.style.left = `${newLeft}px`;
  dock.style.top = `${newTop}px`;
}

function onMouseUp() {
  if (!isDragging) return;

  isDragging = false;
  document.body.style.cursor = "";
  dock.style.transition = 'opacity 0.3s ease,border-color 0.3s ease';
  dock.style.backdropFilter = 'blur(10px) saturate(140%)';
  dock.style.webkitBackdropFilter = 'blur(10px) saturate(140%)';

  GM_setValue('dockTop', dock.style.top);
  GM_setValue('dockLeft', dock.style.left);

  document.removeEventListener('pointermove', onMouseMove);
  document.removeEventListener('pointerup', onMouseUp);
  document.removeEventListener('pointercancel', onMouseUp);

  if (handle.hasPointerCapture(pointerId)) {
    handle.releasePointerCapture(pointerId);
  }

  pointerId = -1;
}

// ==============================
// CERRAR MENÚ AL TOCAR FUERA
// ==============================
document.addEventListener('click', (e) => {
  if (isMenuOpen && menu && !menu.contains(e.target) && !dock.contains(e.target)) {
    closeMenu();
  }
});

// ==============================
// REPOSICIONAR MENÚ EN RESIZE
// ==============================
window.addEventListener('resize', () => {
  if (isMenuOpen) {
    positionMenu();
  }

  const currentLeft = parseInt(dock.style.left, 10);
  if (currentLeft > window.innerWidth - dock.offsetWidth) {
    const resetLeft = window.innerWidth - dock.offsetWidth - 10;
    dock.style.left = `${resetLeft}px`;
    GM_setValue("dockLeft", dock.style.left);
  }
});

})();
