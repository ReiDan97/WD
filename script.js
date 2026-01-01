const passport = document.querySelector(".passport");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

let state = 0;
// 0 = closed
// 1 = page 1 (intro)
// 2 = page 2 (icons) => i want rsvp
// 3 = page 3 (RSVP) => i want icon

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
   ARROW BUTTONS
========================= */
if (rightArrow) {
  rightArrow.addEventListener("click", swipeLeft);
}

if (leftArrow) {
  leftArrow.addEventListener("click", swipeRight);
}

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
  if (state === 1) {
    // intro to icons
    passport.classList.add("page-2-open");
    state = 2;
  } else if (state === 2) {
    // intro to rsvp
    passport.classList.add("page-3-open");
    state = 3;
  }
}

function swipeRight() {
  if (state === 3) {
    passport.classList.remove("page-3-open");
    state = 2;
  } else if (state === 2) {
    passport.classList.remove("page-2-open");
    state = 1;
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


// https://docs.google.com/forms/d/e/1FAIpQLSfxLXK072wAoglEhpFfRyprwhvNuvRqu2R2jwaADOWkB9auCQ/formResponse
// name = entry.127661582
// si/no = entry.2606285
// intolleranze = entry.877086558