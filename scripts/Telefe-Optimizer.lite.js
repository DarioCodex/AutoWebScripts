// ==UserScript==
// @name         Telefe Clean Player UI
// @namespace    telefe.clean.ui
// @version      1.0.1
// @description  UI minimalista para Telefe Vivo
// @match        https://www.mitelefe.com/vivo/*
// @match        https://www.mitelefe.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
(function(){"use strict";function updatePlayerSize(){const player=document.querySelector(".player");if(!player)return;const targetWidth=Math.min(window.innerWidth*.9,window.innerHeight*.85*16/9),targetHeight=targetWidth*9/16;player.style.width=targetWidth+"px";player.style.height=targetHeight+"px"}function waitForPlayer(){const iframe=document.querySelector("#player-container iframe");if(!iframe)return setTimeout(waitForPlayer,500);buildUI()}function buildUI(){const main=document.querySelector("main");if(!main)return;document.querySelectorAll("header, footer, .topics-menu, .ad-slot-billboard").forEach(el=>el.remove());const wrapper=document.createElement("div");wrapper.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:15px;background:#111;color:white;margin:0;padding:0;";const header=document.createElement("div");header.style.cssText="display:flex;align-items:center;gap:10px;font-size:22px;font-weight:bold;letter-spacing:1px;";const logo=document.createElement("img");logo.src="https://www.mitelefe.com/media/cache/logo/logo-telefe-blanco-69286e9c2c776.png";logo.style.height="40px";const title=document.createElement("span");title.textContent="| Telefe en Vivo";header.appendChild(logo);header.appendChild(title);const player=document.querySelector(".player");player&&(player.style.width="100%",player.style.maxWidth="none");wrapper.appendChild(header);player&&wrapper.appendChild(player);main.innerHTML="";main.appendChild(wrapper);document.documentElement.style.background="#111";document.documentElement.style.margin="0";document.documentElement.style.padding="0";document.body.style.background="#111";document.body.style.margin="0";document.body.style.padding="0";updatePlayerSize();window.addEventListener("resize",updatePlayerSize)}waitForPlayer()})();
