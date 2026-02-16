const passport = document.querySelector(".passport");
const form = document.querySelector(".passport-form");
const popup = document.querySelector(".rsvp-popup");
const closeBtn = document.querySelector(".close-popup");
const iframe = document.querySelector('iframe[name="hidden_iframe"]');
let iframeLoadedOnce = false; 

let formSubmitted = false;

let state = 0;
// 0 = closed
// 1 = page 1 (intro)
// 2 = page 2 (icons) 
// 3 = page 3 (RSVP)
// 4 = page 4 (end of passport)
let startX = 0;
let isDragging = false;

/* =========================
   OPEN PASSPORT (TAP / CLICK)
========================= */

passport.addEventListener("click", () => {
  if (state === 0) {
    passport.classList.add("open");
    state = 1;
  }
});

/* =========================
   TOUCH GESTURES (MOBILE)
========================= */
passport.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

passport.addEventListener("touchend", (e) => {
  if (!isDragging) return;

  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;

  handleSwipe(diffX);
  isDragging = false;
});

/* =========================
   MOUSE GESTURES (DESKTOP)
========================= */
passport.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  isDragging = true;
});

passport.addEventListener("mouseup", (e) => {
  if (!isDragging) return;

  const diffX = e.clientX - startX;
  handleSwipe(diffX);
  isDragging = false;
});


/* =========================
   SWIPE HANDLER
========================= */
function handleSwipe(diffX) {
  if (Math.abs(diffX) < 50) return;

  if (diffX < 0) {
    swipeLeft();
  } else {
    swipeRight();
  }
}

/* =========================
   STATE MACHINE
========================= */
function swipeLeft() {

    document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("flip-back")
  );

  if (state === 1) {
    // intro to icons
    passport.classList.add("page-2-open");
    state = 2;
  } else if (state === 2) {
    // intro to rsvp
    passport.classList.add("page-3-open");
    state = 3;
  }
  else if (state === 3) {
    // intro to rsvp
    passport.classList.add("page-4-open");
    state = 4;
  }
}

function swipeRight() {
    document.querySelectorAll(".page").forEach(p =>
    p.classList.add("flip-back")
    );

  if (state === 4) {
    passport.classList.remove("page-4-open");
    state = 3;
  } else if (state === 3) {
    passport.classList.remove("page-3-open");
    state = 2;
  } else if (state === 2) {
    passport.classList.remove("page-2-open");
    state = 1;
  }
  else if (state === 1) {
    passport.classList.remove("open");
    state = 0;
  }
}

const thankYou = document.querySelector(".thank-you");

form.addEventListener("submit", () => {
  setTimeout(() => {
    form.style.display = "none";
    thankYou.classList.remove("hidden");
  }, 500);
});

const tapLeft = document.querySelector(".tap-left");
const tapRight = document.querySelector(".tap-right");

tapRight.addEventListener("click", (e) => {
  e.stopPropagation();
  swipeLeft();   // go forward
});

tapLeft.addEventListener("click", (e) => {
  e.stopPropagation();
  swipeRight();  // go back
});

const params = new URLSearchParams(window.location.search);
const guest = params.get("rsvp");

if (guest) {
  document.getElementById("GuestID").value = guest;
}
// this is to change the RSVP
const backgrounds = {

  AA012X1: "img/PASSPORT/Nomi/AliceAlessandro.jpg",
  BB0O2X1: "img/PASSPORT/Nomi/Andrea.jpg",
  CX0OZ71: "img/PASSPORT/Nomi/Arianna.jpg",
  DF0OZ81: "img/PASSPORT/Nomi/Betty.jpg",
  DE0OZ28: "img/PASSPORT/Nomi/Bobo.jpg",
  Alessandro: "img/PASSPORT/Nomi/Caldari",
  Francesco: "img/PASSPORT/Nomi/Cibba.jpg",
  XKGZV9N: "img/PASSPORT/Nomi/DaniFamily.jpg",
  BFamily: "img/PASSPORT/Nomi/DaniNonniM.jpg",
  RFamily: "img/PASSPORT/Nomi/DaniNonniP.jpg",
  Davide: "img/PASSPORT/Nomi/Davide.jpg",
  DenisJessica: "img/PASSPORT/Nomi/DenisJessica.jpg",
  EFamilyN: "img/PASSPORT/Nomi/EllieNonni.jpg",
  Emanuele: "img/PASSPORT/Nomi/Ema.jpg",
  FrancescoAlessia: "img/PASSPORT/Nomi/FrancescoAlessia.jpg",
  Giorgio: "img/PASSPORT/Nomi/Giorgio.jpg",
  GiulioLisa: "img/PASSPORT/Nomi/GiulioLisa.jpg",
  Irene: "img/PASSPORT/Nomi/Irene.jpg",
  Martina: "img/PASSPORT/Nomi/Martina.jpg",
  NicoloChristian: "img/PASSPORT/Nomi/NicoKiki.jpg",
  PaoloAmanda: "img/PASSPORT/Nomi/PaoloAmanda.jpg",
  RiccardoMartina: "img/PASSPORT/Nomi/RiccardoMarti.jpg",
  Roberta: "img/PASSPORT/Nomi/Roberta.jpg",
  Roberto: "img/PASSPORT/Nomi/Roby.jpg",
  DavideYlenia: "img/PASSPORT/Nomi/ShaqYle.jpg",
  Simone: "img/PASSPORT/Nomi/Simone.jpg",
  SimoneElena: "img/PASSPORT/Nomi/SimoneElena.jpg",
  Tiziana: "img/PASSPORT/Nomi/Tiziana",
  TulliaF: "img/PASSPORT/Nomi/Tullia.jpg",
  Vale: "img/PASSPORT/Nomi/Vale.jpg"


};
const backgrounds_s = {

  AA012X1: "img/PASSPORT/Page_02_P.jpg",
  BB0O2X1: "img/PASSPORT/Page_02_S.jpg",
  CX0OZ71: "img/PASSPORT/Page_02_S.jpg",
  DF0OZ81: "img/PASSPORT/Page_02_P.jpg",
  DE0OZ28: "img/PASSPORT/Page_02_S.jpg",
  Alessandro: "img/PASSPORT/Page_02_S.jpg",
  Francesco: "img/PASSPORT/Page_02_S.jpg",
  XKGZV9N: "img/PASSPORT/Page_02_P.jpg",
  BFamily: "img/PASSPORT/Page_02_P.jpg",
  RFamily: "img/PASSPORT/Page_02_P.jpg",
  Davide: "img/PASSPORT/Page_02_S.jpg",
  DenisJessica: "img/PASSPORT/Page_02_P.jpg",
  EFamilyN: "img/PASSPORT/Page_02_P.jpg",
  Emanuele: "img/PASSPORT/Page_02_S.jpg",
  FrancescoAlessia: "img/PASSPORT/Page_02_P.jpg",
  Giorgio: "img/PASSPORT/Page_02_S.jpg",
  GiulioLisa: "img/PASSPORT/Page_02_P.jpg",
  Irene: "img/PASSPORT/Page_02_S.jpg",
  Martina: "img/PASSPORT/Page_02_S.jpg",
  NicoloChristian: "img/PASSPORT/Page_02_P.jpg",
  PaoloAmanda: "img/PASSPORT/Page_02_P.jpg",
  RiccardoMartina: "img/PASSPORT/Page_02_P.jpg",
  Roberta: "img/PASSPORT/Page_02_S.jpg",
  Roberto: "img/PASSPORT/Page_02_S.jpg",
  DavideYlenia: "img/PASSPORT/Page_02_P.jpg",
  Simone: "img/PASSPORT/Page_02_S.jpg",
  SimoneElena: "img/PASSPORT/Page_02_P.jpg",
  Tiziana: "img/PASSPORT/Page_02_S.jpg",
  TulliaF: "img/PASSPORT/Page_02_P.jpg",
  Vale: "img/PASSPORT/Page_02_P.jpg"

};

if (guest && backgrounds[guest]) {
  document.querySelector(".page-rsvp").style.backgroundImage =
    `url("${backgrounds[guest]}")`;
}

if (guest && backgrounds_s[guest]) {
  document.querySelector(".page-1").style.backgroundImage =
    `url("${backgrounds_s[guest]}")`;
}
document.addEventListener("DOMContentLoaded", () => {
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");

  const yesArea = document.querySelector(".yes-area");
  const noArea = document.querySelector(".no-area");

  yes.addEventListener("change", () => {
    if (yes.checked) {
      yesArea.style.backgroundImage = "url('img/PASSPORT/Yes.png')";
      noArea.style.backgroundImage  = "url('img/PASSPORT/No_grey.png')";
      console.log('click yes');
    }
  });

  no.addEventListener("change", () => {
    if (no.checked) {
      noArea.style.backgroundImage  = "url('img/PASSPORT/No.png')";
      yesArea.style.backgroundImage = "url('img/PASSPORT/Yes_grey.png')";
      console.log('click no');
    }
  });
});

document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
};

form.addEventListener("submit", function (e) {
  const selected = form.querySelector('input[name="entry.877086558"]:checked');

  if (!selected) {
    e.preventDefault();
    alert("Please select Yes or No before sending 💙");
    return;
  }

  formSubmitted = true;
});

iframe.addEventListener("load", function () {

  // Ignore the FIRST load (page load)
  if (!iframeLoadedOnce) {
    iframeLoadedOnce = true;
    return;
  }

  // Only show popup if form was actually submitted
  if (formSubmitted) {
    popup.classList.remove("hidden");
    formSubmitted = false;
  }
});

closeBtn.addEventListener("click", function () {
  popup.classList.add("hidden");
});