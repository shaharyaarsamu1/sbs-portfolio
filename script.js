/* ========= VANTA PRELOADER SETUP ========= */
let vantaEffect;

document.addEventListener("DOMContentLoaded", () => {
  const preloaderBg = document.getElementById("preloader-bg");

  // Init VANTA.NET on the preloader background if available
  if (preloaderBg && window.VANTA && window.VANTA.NET) {
    vantaEffect = VANTA.NET({
      
      el: preloaderBg,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x2563eb,
      backgroundColor: 0x050816,
      points: 10.0,
      maxDistance: 20.0,
      spacing: 18.0
    });


  }

  setupPreloader();
});




// document.addEventListener("DOMContentLoaded", () => {
//   const preloaderBg = document.getElementById("preloader-bg");

//   // Init VANTA.HALO on the preloader background
// if (preloaderBg && window.VANTA && window.VANTA.HALO) {
//   vantaEffect = VANTA.HALO({
//     el: preloaderBg,
//     mouseControls: true,
//     touchControls: true,
//     gyroControls: false,
//     minHeight: 200.0,
//     minWidth: 200.0,
//     scale: 1.0,
//     scaleMobile: 1.0,

//     backgroundColor: 0x050816,   // your site's dark background
//     baseColor: 0x2563eb,         // blue halo glow
//     highlightColor: 0xffffff,    // white accents
//     shininess: 80.0,             // how glossy the halo looks
//     waveHeight: 22.0,
//     waveSpeed: 0.6,
//     zoom: 1.0
//   });
// }


//   setupPreloader();
// });



// document.addEventListener("DOMContentLoaded", () => {
//   const preloaderBg = document.getElementById("preloader-bg");

//   // Init VANTA.GLOBE on the preloader background if available
//   if (preloaderBg && window.VANTA && window.VANTA.GLOBE) {
//     vantaEffect = VANTA.GLOBE({
//       el: preloaderBg,
//       mouseControls: true,
//       touchControls: true,
//       gyroControls: false,
//       minHeight: 200.0,
//       minWidth: 200.0,
//       scale: 1.0,
//       scaleMobile: 1.0,
//       color: 0xffffff,       // wire color
//       color2: 0x2563eb,      // accent color
//       backgroundColor: 0x050816
//     });
//   }

//   setupPreloader();
// });


















function setupPreloader() {
  const preloader = document.getElementById("preloader");
  const enterBtn = document.getElementById("enter-btn");
  const logoWrap = document.querySelector(".preloader-logo");
  const audioEl = document.getElementById("bg-audio");

  if (!preloader || !enterBtn || !logoWrap) return;

  
enterBtn.addEventListener("click", () => {
  // 1) Start logo spin
  logoWrap.classList.add("spin-once");

  // 2) Start audio with fade-in synced to the spin duration (1.5s)
  if (audioEl) {
    audioEl.volume = 0;     // start silent
    audioEl.play().catch(() => {});

    const fadeDuration = 2000; // match your spin time (ms)
    const steps = 30;          // smoother fade
    const stepTime = fadeDuration / steps;
    let currentStep = 0;

    const fadeIn = setInterval(() => {
      currentStep++;
      const newVol = currentStep / steps;
      audioEl.volume = Math.min(newVol, 1);

      if (currentStep >= steps) clearInterval(fadeIn);
    }, stepTime);
  }

  // 3) Hide preloader exactly when the spin finishes
  setTimeout(() => {
    preloader.classList.add("preloader-hidden");

    if (typeof switchPage === "function") {
      switchPage("home");
    }

    if (vantaEffect && vantaEffect.destroy) {
      vantaEffect.destroy();
    }
  }, 1500);
});

}

/* ========= NAVIGATION (SPA-style) ========= */
const buttons = document.querySelectorAll("nav button");
const pages = document.querySelectorAll("main section");

// Top nav buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchPage(btn.getAttribute("data-page"));
  });
});

// "View Projects" / "About Me" buttons on Home
document.querySelectorAll("[data-page-jump]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-page-jump");
    switchPage(target);
  });
});

function switchPage(pageId) {
  // Update nav active state
  buttons.forEach((b) => {
    if (b.getAttribute("data-page") === pageId) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });

  // Show correct section (smoothly via CSS transitions)
  pages.forEach((page) => {
    if (page.id === pageId) {
      page.classList.add("active-page");
    } else {
      page.classList.remove("active-page");
    }
  });

  // Optional: update hash
  window.location.hash = pageId;
}

// Restore page from hash on refresh
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    switchPage(hash);
  }
});

/* ========= CONTACT FORM (front-end only shell) ========= */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // This is just a shell. You can later hook this up to an API or email service.
    alert("This form is just a front-end placeholder for now.");
  });
}

/* ========= TIMEZONES ========= */

// Cities + time zones (change these as you like)
const timezoneList = [
  { city: "Dallas", tz: "America/Chicago" },
  { city: "Zurich", tz: "Europe/Zurich" },
  { city: "Addis Ababa", tz: "Africa/Addis_Ababa" },
  { city: "Shenzhen", tz: "Asia/Shanghai" } // Shenzhen uses the same time zone as Shanghai (CST/GMT+8)
];

// Pre-build formatters for each zone
const tzFormatters = timezoneList.map((zone) => ({
  digital: new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: zone.tz
  }),
  parts: new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: zone.tz
  })
}));

// Build the DOM for the clocks once
function initTimezones() {
  const container = document.getElementById("timezones");
  if (!container) return;
  container.innerHTML = "";

  timezoneList.forEach((zone, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "tz-item";

    // Clock element
    const clock = document.createElement("div");
    clock.className = "clock";

    // Ticks (12 around the dial, SBB style)
    for (let i = 0; i < 12; i++) {
      const tick = document.createElement("div");
      tick.className = "clock-tick";
      tick.style.transform = `translate(-50%, 0) rotate(${i * 30}deg)`;
      clock.appendChild(tick);
    }

    // Center
    const center = document.createElement("div");
    center.className = "clock-center";
    clock.appendChild(center);

    // Hands
    const hourHand = document.createElement("div");
    hourHand.className = "hand hour";
    hourHand.id = `hour-${index}`;

    const minuteHand = document.createElement("div");
    minuteHand.className = "hand minute";
    minuteHand.id = `minute-${index}`;

    const secondHand = document.createElement("div");
    secondHand.className = "hand second";
    secondHand.id = `second-${index}`;

    clock.appendChild(hourHand);
    clock.appendChild(minuteHand);
    clock.appendChild(secondHand);

    // Digital text
    const textWrap = document.createElement("div");
    textWrap.className = "tz-text";

    const city = document.createElement("div");
    city.className = "tz-city";
    city.textContent = zone.city;

    const digital = document.createElement("div");
    digital.className = "tz-digital";
    digital.id = `digital-${index}`;

    textWrap.appendChild(city);
    textWrap.appendChild(digital);

    // Combine
    wrapper.appendChild(clock);
    wrapper.appendChild(textWrap);
    container.appendChild(wrapper);
  });
}

// Update all clocks every second
function updateTimezones() {
  const now = new Date();

  timezoneList.forEach((zone, index) => {
    const { digital, parts } = tzFormatters[index];

    // Digital time string
    const digitalEl = document.getElementById(`digital-${index}`);
    if (digitalEl) {
      digitalEl.textContent = digital.format(now);
    }

    // Extract h/m/s for analog
    const timeParts = parts.formatToParts(now);
    let h, m, s;

    timeParts.forEach((p) => {
      if (p.type === "hour") h = parseInt(p.value, 10);
      if (p.type === "minute") m = parseInt(p.value, 10);
      if (p.type === "second") s = parseInt(p.value, 10);
    });

    if (h == null || m == null || s == null) return;

    const hourAngle = (h % 12 + m / 60) * 30; // 360/12
    const minuteAngle = (m + s / 60) * 6;     // 360/60
    const secondAngle = s * 6;                // 360/60

    const hourHand = document.getElementById(`hour-${index}`);
    const minuteHand = document.getElementById(`minute-${index}`);
    const secondHand = document.getElementById(`second-${index}`);

    if (hourHand) {
      hourHand.style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
    }
    if (minuteHand) {
      minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
    }
    if (secondHand) {
      secondHand.style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;
    }
  });
}

// Init + start ticking
initTimezones();
updateTimezones();
setInterval(updateTimezones, 1000);
