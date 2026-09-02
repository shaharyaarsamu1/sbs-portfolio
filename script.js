/* =========================================================
   VANTA EFFECTS
   ========================================================= */

let vantaEffect = null;
let topologyEffect = null;


/* =========================================================
   PAGE ELEMENTS
   ========================================================= */

const buttons = document.querySelectorAll(
  "nav button[data-page]"
);

const pages = document.querySelectorAll(
  "main section.page"
);


/* =========================================================
   MUSIC ELEMENTS
   ========================================================= */

const bgMusic = document.getElementById("bg-music");
const musicPlayBtn = document.getElementById("music-play");
const musicMuteBtn = document.getElementById("music-mute");
const musicVolume = document.getElementById("music-volume");
const volumeValue = document.getElementById("volume-value");
const musicIndicator = document.getElementById("music-indicator");


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  setupMusicPlayer();

  setupFooterYear();

  const alreadyEntered =
    sessionStorage.getItem("sbsEntered") === "true";

  const preloaderBg =
    document.getElementById("preloader-bg");


  /*
    Only create the NET preloader animation
    on a fresh entrance.
  */

  if (
    !alreadyEntered &&
    preloaderBg &&
    window.VANTA &&
    window.VANTA.NET
  ) {

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


/* =========================================================
   PRELOADER
   ========================================================= */

function setupPreloader() {

  const preloader =
    document.getElementById("preloader");

  const enterBtn =
    document.getElementById("enter-btn");

  const logoWrap =
    document.querySelector(".preloader-logo");

  const alreadyEntered =
    sessionStorage.getItem("sbsEntered") === "true";


  /*
    REFRESH / ALREADY ENTERED
  */

  if (alreadyEntered) {

    if (preloader) {

      preloader.remove();

    }

    setupSiteTopology();

    attemptMusicPlayback();

    return;

  }


  /*
    PRELOADER MISSING
  */

  if (
    !preloader ||
    !enterBtn ||
    !logoWrap
  ) {

    setupSiteTopology();

    return;

  }


  /*
    ENTER WEBSITE
  */

  enterBtn.addEventListener("click", () => {

    sessionStorage.setItem(
      "sbsEntered",
      "true"
    );

    attemptMusicPlayback();

    logoWrap.classList.add(
      "spin-once"
    );


    /*
      Wait for logo animation.
    */

    setTimeout(() => {

      preloader.classList.add(
        "preloader-hidden"
      );


      /*
        Open Home.
      */

      switchPage(
        "home",
        false
      );


      /*
        Destroy preloader Vanta effect.
      */

      if (
        vantaEffect &&
        typeof vantaEffect.destroy === "function"
      ) {

        vantaEffect.destroy();

        vantaEffect = null;

      }


      /*
        Start portfolio topology.
      */

      setupSiteTopology();


      /*
        Remove preloader after fade.
      */

      setTimeout(() => {

        if (preloader) {

          preloader.remove();

        }

      }, 600);

    }, 1500);

  });

}


/* =========================================================
   MAIN WEBSITE VANTA TOPOLOGY
   ========================================================= */

function setupSiteTopology() {

  const topologyBg =
    document.getElementById("topology-bg");

  if (
    !topologyBg ||
    topologyEffect ||
    !window.VANTA ||
    !window.VANTA.TOPOLOGY
  ) {

    return;

  }

  topologyEffect = VANTA.TOPOLOGY({

    el: topologyBg,

    mouseControls: true,
    touchControls: true,
    gyroControls: false,

    minHeight: 200,
    minWidth: 200,

    scale: 1,
    scaleMobile: 1,

    color: 0x2563eb,
    backgroundColor: 0x050816

  });

}


/* =========================================================
   HEADER NAVIGATION
   ========================================================= */

buttons.forEach((button) => {

  button.addEventListener("click", () => {

    const page =
      button.getAttribute("data-page");

    switchPage(page);

  });

});


/* =========================================================
   INTERNAL PAGE NAVIGATION
   ========================================================= */

document
  .querySelectorAll("[data-page-jump]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const page =
        button.getAttribute("data-page-jump");

      switchPage(page);

    });

  });


/* =========================================================
   SWITCH PAGE
   ========================================================= */

function switchPage(
  pageId,
  updateHash = true
) {

  const requestedPage =
    document.getElementById(pageId);


  /*
    Make sure the requested page exists.
  */

  if (
    !requestedPage ||
    !requestedPage.classList.contains("page")
  ) {

    pageId = "home";

  }


  /*
    Update navigation button.
  */

  buttons.forEach((button) => {

    const isActive =
      button.getAttribute("data-page") === pageId;

    button.classList.toggle(
      "active",
      isActive
    );

  });


  /*
    Display only the requested page.
  */

  pages.forEach((page) => {

    page.classList.toggle(
      "active-page",
      page.id === pageId
    );

  });


  /*
    Update URL hash.
  */

  if (
    updateHash &&
    window.location.hash !== `#${pageId}`
  ) {

    history.pushState(
      null,
      "",
      `#${pageId}`
    );

  }


  /*
    Always begin a newly selected page at the top.
  */

  window.scrollTo({

    top: 0,
    left: 0,
    behavior: "auto"

  });

}


/* =========================================================
   HASH / BACK BUTTON SUPPORT
   ========================================================= */

function loadPageFromHash() {

  const hash =
    window.location.hash.replace(
      "#",
      ""
    );

  const validPage =
    Array.from(pages).some(
      (page) =>
        page.id === hash
    );

  switchPage(
    validPage
      ? hash
      : "home",
    false
  );

}


window.addEventListener(
  "load",
  loadPageFromHash
);


window.addEventListener(
  "hashchange",
  loadPageFromHash
);


window.addEventListener(
  "popstate",
  loadPageFromHash
);


/* =========================================================
   PROJECT RENDERER
   ========================================================= */

function renderProjects() {

  const projectsGrid =
    document.getElementById(
      "projects-grid"
    );

  if (
    !projectsGrid ||
    typeof projects === "undefined"
  ) {

    return;

  }

  projectsGrid.innerHTML = "";


  projects.forEach((project) => {

    const card =
      document.createElement(
        "article"
      );

    card.className =
      "project-card";


    /*
      IMAGE
    */

    let imageHTML = "";

    if (project.image) {

      imageHTML = `

        <div class="project-image-wrap">

          <img
            src="${project.image}"
            alt="${project.title}"
            loading="lazy"
          />

        </div>

      `;

    }


    /*
      LAYERS
    */

    let layersHTML = "";

    if (
      Array.isArray(project.layers) &&
      project.layers.length > 0
    ) {

      const layerItems =
        project.layers
          .map(
            (layer) =>
              `<li>${layer}</li>`
          )
          .join("");

      layersHTML = `

        <div class="project-layers">

          <h3>
            Layers
          </h3>

          <ul>

            ${layerItems}

          </ul>

        </div>

      `;

    }


    /*
      LINKS
    */

    let linksHTML = "";

    if (
      project.github ||
      project.demo
    ) {

      const githubHTML =
        project.github

          ? `

            <a
              class="project-link"
              href="${project.github}"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>

          `

          : "";


      const demoHTML =
        project.demo

          ? `

            <a
              class="project-link"
              href="${project.demo}"
              target="_blank"
              rel="noopener"
            >
              View Project
            </a>

          `

          : "";


      linksHTML = `

        <div class="project-links">

          ${githubHTML}

          ${demoHTML}

        </div>

      `;

    }


    /*
      BUILD CARD
    */

    card.innerHTML = `

      ${imageHTML}

      <div class="project-content">

        <div class="project-heading-row">

          <h2 class="project-title">

            ${project.title}

          </h2>

          ${
            project.status

              ? `

                <span class="project-status">

                  ${project.status}

                </span>

              `

              : ""
          }

        </div>

        <p class="project-description">

          ${project.description}

        </p>

        ${layersHTML}

        ${linksHTML}

      </div>

    `;

    projectsGrid.appendChild(card);

  });

}


/*
  Build projects.
*/

renderProjects();


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
  document.getElementById(
    "contact-form"
  );

const formStatus =
  document.getElementById(
    "form-status"
  );

const submitBtn =
  document.getElementById(
    "submit-btn"
  );

const submitBtnLabel =
  submitBtn

    ? submitBtn.querySelector(
        ".btn-label"
      )

    : null;


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const name =
        contactForm.elements[
          "name"
        ].value.trim();

      const email =
        contactForm.elements[
          "email"
        ].value.trim();

      const message =
        contactForm.elements[
          "message"
        ].value.trim();


      /*
        Validation.
      */

      if (
        !name ||
        !email ||
        !message
      ) {

        showStatus(
          "Please fill in all fields.",
          "error"
        );

        return;

      }


      /*
        Sending state.
      */

      if (submitBtn) {

        submitBtn.disabled = true;

      }

      if (submitBtnLabel) {

        submitBtnLabel.textContent =
          "Sending…";

      }


      /*
        Formspree request.
      */

      try {

        const response =
          await fetch(
            contactForm.action,
            {

              method: "POST",

              headers: {

                Accept:
                  "application/json"

              },

              body:
                new FormData(
                  contactForm
                )

            }
          );


        /*
          Success.
        */

        if (response.ok) {

          showStatus(
            "Message sent! I'll get back to you soon.",
            "success"
          );

          contactForm.reset();

        }


        /*
          Error.
        */

        else {

          let errorMessage =
            "Something went wrong. Try emailing me directly.";

          try {

            const data =
              await response.json();

            if (
              data.errors &&
              Array.isArray(
                data.errors
              )
            ) {

              errorMessage =
                data.errors
                  .map(
                    (error) =>
                      error.message
                  )
                  .join(", ");

            }

          }

          catch (parseError) {

            /*
              Use default error message.
            */

          }

          showStatus(
            errorMessage,
            "error"
          );

        }

      }


      /*
        Network failure.
      */

      catch (error) {

        showStatus(
          "Network error. Try emailing me directly.",
          "error"
        );

      }


      /*
        Restore button.
      */

      finally {

        if (submitBtn) {

          submitBtn.disabled = false;

        }

        if (submitBtnLabel) {

          submitBtnLabel.textContent =
            "Send Message";

        }

      }

    }
  );

}


/* =========================================================
   CONTACT FORM STATUS
   ========================================================= */

function showStatus(
  message,
  type
) {

  if (!formStatus) {

    return;

  }

  formStatus.textContent =
    message;

  formStatus.className =
    `form-status ${type}`;


  setTimeout(() => {

    formStatus.textContent = "";

    formStatus.className =
      "form-status";

  }, 6000);

}


/* =========================================================
   BACKGROUND MUSIC
   ========================================================= */

function setupMusicPlayer() {

  if (!bgMusic) {

    return;

  }


  /*
    Load saved volume.
  */

  const savedVolume =
    localStorage.getItem(
      "sbsMusicVolume"
    );

  const parsedVolume =
    savedVolume !== null

      ? Number(
          savedVolume
        )

      : 12;

  const safeVolume =
    Number.isFinite(
      parsedVolume
    )

      ? Math.min(
          100,
          Math.max(
            0,
            parsedVolume
          )
        )

      : 12;

  bgMusic.volume =
    safeVolume / 100;


  if (musicVolume) {

    musicVolume.value =
      safeVolume;

  }


  if (volumeValue) {

    volumeValue.textContent =
      Math.round(
        safeVolume
      );

  }


  /*
    Load saved mute state.
  */

  const savedMuted =
    localStorage.getItem(
      "sbsMusicMuted"
    ) === "true";

  bgMusic.muted =
    savedMuted;

  updateMusicButtons();


  /*
    Play / Pause.
  */

  if (musicPlayBtn) {

    musicPlayBtn.addEventListener(
      "click",
      () => {

        if (bgMusic.paused) {

          bgMusic
            .play()
            .then(
              updateMusicButtons
            )
            .catch(
              updateMusicButtons
            );

        }

        else {

          bgMusic.pause();

          updateMusicButtons();

        }

      }
    );

  }


  /*
    Mute / Unmute.
  */

  if (musicMuteBtn) {

    musicMuteBtn.addEventListener(
      "click",
      () => {

        bgMusic.muted =
          !bgMusic.muted;

        localStorage.setItem(
          "sbsMusicMuted",
          String(
            bgMusic.muted
          )
        );

        updateMusicButtons();

      }
    );

  }


  /*
    Volume.
  */

  if (musicVolume) {

    musicVolume.addEventListener(
      "input",
      () => {

        const value =
          Number(
            musicVolume.value
          );

        const safeValue =
          Math.min(
            100,
            Math.max(
              0,
              value
            )
          );

        bgMusic.volume =
          safeValue / 100;


        if (volumeValue) {

          volumeValue.textContent =
            Math.round(
              safeValue
            );

        }


        localStorage.setItem(
          "sbsMusicVolume",
          String(
            safeValue
          )
        );


        /*
          Raising volume automatically unmutes.
        */

        if (
          safeValue > 0 &&
          bgMusic.muted
        ) {

          bgMusic.muted =
            false;

          localStorage.setItem(
            "sbsMusicMuted",
            "false"
          );

        }

        updateMusicButtons();

      }
    );

  }


  /*
    Audio events.
  */

  bgMusic.addEventListener(
    "play",
    updateMusicButtons
  );

  bgMusic.addEventListener(
    "pause",
    updateMusicButtons
  );

  bgMusic.addEventListener(
    "volumechange",
    updateMusicButtons
  );

}


/* =========================================================
   ATTEMPT MUSIC PLAYBACK
   ========================================================= */

function attemptMusicPlayback() {

  if (!bgMusic) {

    return;

  }

  bgMusic
    .play()
    .then(
      updateMusicButtons
    )
    .catch(
      updateMusicButtons
    );

}


/* =========================================================
   UPDATE MUSIC CONTROLS
   ========================================================= */

function updateMusicButtons() {

  if (!bgMusic) {

    return;

  }


  /*
    Play / Pause icon.
  */

  if (musicPlayBtn) {

    if (bgMusic.paused) {

      musicPlayBtn.textContent =
        "▶";

      musicPlayBtn.setAttribute(
        "aria-label",
        "Play background music"
      );

    }

    else {

      musicPlayBtn.textContent =
        "❚❚";

      musicPlayBtn.setAttribute(
        "aria-label",
        "Pause background music"
      );

    }

  }


  /*
    Mute icon.
  */

  if (musicMuteBtn) {

    if (
      bgMusic.muted ||
      bgMusic.volume === 0
    ) {

      musicMuteBtn.textContent =
        "🔇";

      musicMuteBtn.setAttribute(
        "aria-label",
        "Unmute background music"
      );

    }

    else {

      musicMuteBtn.textContent =
        "🔊";

      musicMuteBtn.setAttribute(
        "aria-label",
        "Mute background music"
      );

    }

  }


  /*
    Animated indicator.
  */

  if (musicIndicator) {

    musicIndicator.classList.toggle(

      "playing",

      !bgMusic.paused &&
      !bgMusic.muted &&
      bgMusic.volume > 0

    );

  }

}


/* =========================================================
   FOOTER YEAR
   ========================================================= */

function setupFooterYear() {

  const yearElement =
    document.getElementById(
      "copyright-year"
    );

  if (!yearElement) {

    return;

  }

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   TIMEZONES
   ========================================================= */

const timezoneList = [

  {

    city:
      "Dallas",

    tz:
      "America/Chicago"

  },

  {

    city:
      "Zurich",

    tz:
      "Europe/Zurich"

  },

  {

    city:
      "Dubai",

    tz:
      "Asia/Dubai"

  },

  {

    city:
      "Shenzhen",

    tz:
      "Asia/Shanghai"

  }

];


/* =========================================================
   TIME FORMATTERS
   ========================================================= */

const tzFormatters =
  timezoneList.map(
    (zone) => ({

      digital:

        new Intl.DateTimeFormat(
          "en-US",
          {

            hour:
              "2-digit",

            minute:
              "2-digit",

            second:
              "2-digit",

            hour12:
              false,

            timeZone:
              zone.tz

          }
        ),


      parts:

        new Intl.DateTimeFormat(
          "en-US",
          {

            hour:
              "numeric",

            minute:
              "numeric",

            second:
              "numeric",

            hour12:
              false,

            timeZone:
              zone.tz

          }
        )

    })
  );


/* =========================================================
   INITIALIZE CLOCKS
   ========================================================= */

function initTimezones() {

  const container =
    document.getElementById(
      "timezones"
    );

  if (!container) {

    return;

  }

  container.innerHTML = "";


  timezoneList.forEach(
    (zone, index) => {


      /*
        Wrapper.
      */

      const wrapper =
        document.createElement(
          "div"
        );

      wrapper.className =
        "tz-item";


      /*
        Clock.
      */

      const clock =
        document.createElement(
          "div"
        );

      clock.className =
        "clock";


      /*
        Tick marks.
      */

      for (
        let i = 0;
        i < 12;
        i++
      ) {

        const tick =
          document.createElement(
            "div"
          );

        tick.className =
          "clock-tick";

        tick.style.transform =
          `translate(-50%, 0) rotate(${i * 30}deg)`;

        clock.appendChild(
          tick
        );

      }


      /*
        Center.
      */

      const center =
        document.createElement(
          "div"
        );

      center.className =
        "clock-center";

      clock.appendChild(
        center
      );


      /*
        Hands.
      */

      [
        "hour",
        "minute",
        "second"
      ].forEach(
        (type) => {

          const hand =
            document.createElement(
              "div"
            );

          hand.className =
            `hand ${type}`;

          hand.id =
            `${type}-${index}`;

          clock.appendChild(
            hand
          );

        }
      );


      /*
        Text.
      */

      const textWrap =
        document.createElement(
          "div"
        );

      textWrap.className =
        "tz-text";


      const city =
        document.createElement(
          "div"
        );

      city.className =
        "tz-city";

      city.textContent =
        zone.city;


      const digital =
        document.createElement(
          "div"
        );

      digital.className =
        "tz-digital";

      digital.id =
        `digital-${index}`;


      textWrap.appendChild(
        city
      );

      textWrap.appendChild(
        digital
      );

      wrapper.appendChild(
        clock
      );

      wrapper.appendChild(
        textWrap
      );

      container.appendChild(
        wrapper
      );

    }
  );

}


/* =========================================================
   UPDATE CLOCKS
   ========================================================= */

function updateTimezones() {

  const now =
    new Date();

  timezoneList.forEach(
    (zone, index) => {

      const {
        digital,
        parts
      } =
        tzFormatters[index];


      /*
        Digital time.
      */

      const digitalElement =
        document.getElementById(
          `digital-${index}`
        );

      if (digitalElement) {

        digitalElement.textContent =
          digital.format(
            now
          );

      }


      /*
        Extract time parts.
      */

      const timeParts =
        parts.formatToParts(
          now
        );

      let hour;
      let minute;
      let second;


      timeParts.forEach(
        (part) => {

          if (
            part.type === "hour"
          ) {

            hour =
              parseInt(
                part.value,
                10
              );

          }


          if (
            part.type === "minute"
          ) {

            minute =
              parseInt(
                part.value,
                10
              );

          }


          if (
            part.type === "second"
          ) {

            second =
              parseInt(
                part.value,
                10
              );

          }

        }
      );


      if (
        hour == null ||
        minute == null ||
        second == null
      ) {

        return;

      }


      /*
        Hand angles.
      */

      const hourAngle =
        (
          hour % 12 +
          minute / 60
        ) * 30;


      const minuteAngle =
        (
          minute +
          second / 60
        ) * 6;


      const secondAngle =
        second * 6;


      /*
        Hand elements.
      */

      const hourHand =
        document.getElementById(
          `hour-${index}`
        );

      const minuteHand =
        document.getElementById(
          `minute-${index}`
        );

      const secondHand =
        document.getElementById(
          `second-${index}`
        );


      /*
        Rotate hands.
      */

      if (hourHand) {

        hourHand.style.transform =
          `translate(-50%, -100%) rotate(${hourAngle}deg)`;

      }


      if (minuteHand) {

        minuteHand.style.transform =
          `translate(-50%, -100%) rotate(${minuteAngle}deg)`;

      }


      if (secondHand) {

        secondHand.style.transform =
          `translate(-50%, -100%) rotate(${secondAngle}deg)`;

      }

    }
  );

}


/* =========================================================
   START CLOCKS
   ========================================================= */

initTimezones();

updateTimezones();

setInterval(
  updateTimezones,
  1000
);