const box = document.querySelector(".heart-box-inner"); // div interior
const chocolatesContainer = box.querySelector(".chocolates");

const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const popupContent = document.getElementById("popupContent");
const popupImage = document.getElementById("popupImage");

const closePopupBtn = document.getElementById("closePopup");
const closeBoxBtn = document.getElementById("closeBox");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const heartsBg = document.getElementById("hearts-bg");
let rainInterval;
let opened = false;

/* =========================
   CONFIGURACIÓN
========================= */
const emojis = ["🍫","🍬","🍩","🍪"];

const messages = [
  "Te amo Sarai, esa mirada tuya 💖",
  "Porque siempre a tu lado todo es felicidad✨",
  "Mi persona favorita ❤️",
  "Gracias por existir en mi vida 💕",
  "Contigo lo quiero todo 🫶",
  "Para siempre y por siempre  🍫",
  "Mi lugar favorito eres tú 💘",
  "Eres mi paz y yo tu calma 🌙",
  "La dueña de mis dias llenos de felicidad ❤️",
  "Nunca estaras sola mientras yo respire 💞"
];

const photos = [
  "fotos/img1.png",
  "fotos/img2.png",
  "fotos/img3.png",
  "fotos/img4.png",
  "fotos/img5.png",
  "fotos/img6.png",
  "fotos/img7.png",
  "fotos/img8.png",
  "fotos/img9.png",
  "fotos/img10.png"
];

const positions = [
  {x:30, y:18}, {x:50, y:10}, {x:70, y:18},
  {x:38, y:35}, {x:62, y:35},
  {x:25, y:55}, {x:50, y:60}, {x:75, y:55},
  {x:40, y:78}, {x:60, y:78}
];

/* =========================
   CREAR CHOCOLATES
========================= */
function createChocolates(){
  chocolatesContainer.innerHTML = "";

  positions.forEach((pos,i)=>{
    const btn = document.createElement("button");
    btn.className = "choco";

    btn.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    btn.dataset.text = messages[i % messages.length];
    btn.dataset.img = photos[i % photos.length];

    btn.style.left = pos.x + "%";
    btn.style.top = pos.y + "%";
    btn.style.transform = "translate(-50%, -50%)";

    btn.addEventListener("click", e => {
      e.stopPropagation();
      popupText.textContent = btn.dataset.text;
      if(btn.dataset.img){
        popupImage.src = btn.dataset.img;
        popupImage.classList.remove("hidden");
      } else {
        popupImage.classList.add("hidden");
      }
      popup.classList.remove("hidden");
    });

    chocolatesContainer.appendChild(btn);
  });
}

/* =========================
   ABRIR CAJA + MÚSICA
========================= */
box.addEventListener("click", e => {
  e.stopPropagation();
  if(opened) return;

  opened = true;
  box.classList.add("open");
  closeBoxBtn.classList.remove("hidden");

  createChocolates();
  startHeartsRain();

  music.volume = 0.5;
  music.play().catch(()=>{});
});

/* =========================
   CERRAR CAJA
========================= */
closeBoxBtn.addEventListener("click", e => {
  e.stopPropagation();
  opened = false;
  box.classList.remove("open");
  closeBoxBtn.classList.add("hidden");
  popup.classList.add("hidden");
  music.pause();
  stopHeartsRain();
});

/* =========================
   CONTROL MÚSICA
========================= */
musicBtn.addEventListener("click", () => {
  if(music.paused){
    music.play();
    musicBtn.textContent = "🔊";
  }else{
    music.pause();
    musicBtn.textContent = "🔇";
  }
});

/* =========================
   CERRAR POPUP
========================= */
closePopupBtn.addEventListener("click", e => {
  e.stopPropagation();
  popup.classList.add("hidden");
});

popup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

popupContent.addEventListener("click", e => {
  e.stopPropagation();
});

/* =========================
   LLUVIA DE CORAZONES
========================= */
function startHeartsRain(){
  stopHeartsRain(); // evita duplicados
  heartsBg.classList.remove("hidden");

  rainInterval = setInterval(()=>{
    const h = document.createElement("div");
    h.className = "rain-heart";

    const icons = ["💖","💗","💘","❤️"];
    h.textContent = icons[Math.floor(Math.random()*icons.length)];

    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (14 + Math.random()*26) + "px";
    h.style.animationDuration = (4 + Math.random()*3) + "s";

    heartsBg.appendChild(h);
    setTimeout(()=> h.remove(), 7000);
  }, 250);
}

function stopHeartsRain(){
  clearInterval(rainInterval);
  heartsBg.innerHTML = "";
  heartsBg.classList.add("hidden");
}
