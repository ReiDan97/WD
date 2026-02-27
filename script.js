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
  FKB90LP: "img/PASSPORT/Nomi/Caldari",
  EEM93IK: "img/PASSPORT/Nomi/Cibba.jpg",
  XKGZV9N: "img/PASSPORT/Nomi/DaniFamily.jpg",
  GGB9V8A: "img/PASSPORT/Nomi/DaniNonniM.jpg",
  GGB9V8B: "img/PASSPORT/Nomi/DaniNonniP.jpg",
  HJKL777: "img/PASSPORT/Nomi/Davide.jpg",
  LOP679V: "img/PASSPORT/Nomi/DenisJessica.jpg",
  KK2412L: "img/PASSPORT/Nomi/EllieNonni.jpg",
  EEE88K2: "img/PASSPORT/Nomi/Ema.jpg",
  F9113RS: "img/PASSPORT/Nomi/FrancescoAlessia.jpg",
  G19LUBS: "img/PASSPORT/Nomi/Giorgio.jpg",
  GLS1L0K: "img/PASSPORT/Nomi/GiulioLisa.jpg",
  IM45K1S: "img/PASSPORT/Nomi/Irene.jpg",
  MDD45HK: "img/PASSPORT/Nomi/Martina.jpg",
  CNHO999: "img/PASSPORT/Nomi/NicoKiki.jpg",
  PCH7134: "img/PASSPORT/Nomi/PaoloAmanda.jpg",
  RK39M79: "img/PASSPORT/Nomi/RiccardoMarti.jpg",
  RDD45HK: "img/PASSPORT/Nomi/Roberta.jpg",
  R69B0PC: "img/PASSPORT/Nomi/Roby.jpg",
  SH99I97: "img/PASSPORT/Nomi/ShaqYle.jpg",
  SEA89F3: "img/PASSPORT/Nomi/Simone.jpg",
  SEA85F0: "img/PASSPORT/Nomi/SimoneElena.jpg",
  TCU12K4: "img/PASSPORT/Nomi/Tiziana",
  TMLR749: "img/PASSPORT/Nomi/Tullia.jpg",
  VMBIS01: "img/PASSPORT/Nomi/Vale.jpg"


};
const backgrounds_s = {

  AA012X1: "img/PASSPORT/Page_02_P.jpg",
  BB0O2X1: "img/PASSPORT/Page_02_S.jpg",
  CX0OZ71: "img/PASSPORT/Page_02_S.jpg",
  DF0OZ81: "img/PASSPORT/Page_02_P.jpg",
  DE0OZ28: "img/PASSPORT/Page_02_S.jpg",
  FKB90LP: "img/PASSPORT/Page_02_S.jpg",
  EEM93IK: "img/PASSPORT/Page_02_S.jpg",
  XKGZV9N: "img/PASSPORT/Page_02_P.jpg",
  GGB9V8A: "img/PASSPORT/Page_02_P.jpg",
  GGB9V8B: "img/PASSPORT/Page_02_P.jpg",
  HJKL777: "img/PASSPORT/Page_02_S.jpg",
  LOP679V: "img/PASSPORT/Page_02_P.jpg",
  KK2412L: "img/PASSPORT/Page_02_P.jpg",
  EEE88K2: "img/PASSPORT/Page_02_S.jpg",
  F9113RS: "img/PASSPORT/Page_02_P.jpg",
  G19LUBS: "img/PASSPORT/Page_02_S.jpg",
  GLS1L0K: "img/PASSPORT/Page_02_P.jpg",
  IM45K1S: "img/PASSPORT/Page_02_S.jpg",
  MDD45HK: "img/PASSPORT/Page_02_S.jpg",
  CNHO999: "img/PASSPORT/Page_02_P.jpg",
  PCH7134: "img/PASSPORT/Page_02_P.jpg",
  RK39M79: "img/PASSPORT/Page_02_P.jpg",
  RDD45HK: "img/PASSPORT/Page_02_S.jpg",
  R69B0PC: "img/PASSPORT/Page_02_S.jpg",
  SH99I97: "img/PASSPORT/Page_02_P.jpg",
  SEA89F3: "img/PASSPORT/Page_02_S.jpg",
  SEA85F0: "img/PASSPORT/Page_02_P.jpg",
  TCU12K4: "img/PASSPORT/Page_02_S.jpg",
  TMLR749: "img/PASSPORT/Page_02_P.jpg",
  VMBIS01: "img/PASSPORT/Page_02_P.jpg"

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
      noArea.style.backgroundImage = "none";
      console.log('click yes');
    }
  });

  no.addEventListener("change", () => {
    if (no.checked) {
      noArea.style.backgroundImage  = "url('img/PASSPORT/No.png')";
      yesArea.style.backgroundImage = "none";
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
  e.preventDefault(); 

  const selected = form.querySelector('input[name="entry.877086558"]:checked');

  if (!selected) {
    alert("Please select Yes or No before sending 💙");
    return;
  }

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    mode: "no-cors", // required for Google Forms
    body: formData
  })
  .then(() => {
    popup.classList.remove("hidden");
    form.reset();
    form.querySelector("button").disabled = true;
  })
  .catch(() => {
    alert("Something went wrong. Please try again.");
  });
});

closeBtn.addEventListener("click", function () {
  popup.classList.add("hidden");
});