const passport = document.querySelector(".passport");

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
const form = document.querySelector(".passport-form");
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
// this is to change the RSVP
const backgrounds = {

  AliceAlessandro: "img/PASSPORT/Nomi/AliceAlessandro.jpg",
  Andrea: "img/PASSPORT/Nomi/Andrea.jpg",
  Arianna: "img/PASSPORT/Nomi/Arianna.jpg"
};
const backgrounds_s = {

  AliceAlessandro: "img/PASSPORT/Page_02_P.jpg",
  Andrea: "img/PASSPORT/Page_02_S.jpg",
  Arianna: "img/PASSPORT/Page_02_S.jpg"
};

if (guest && backgrounds[guest]) {
  document.querySelector(".page-rsvp").style.backgroundImage =
    `url("${backgrounds[guest]}")`;
}

if (guest && backgrounds_s[guest]) {
  document.querySelector(".page-1").style.backgroundImage =
    `url("${backgrounds_s[guest]}")`;
}