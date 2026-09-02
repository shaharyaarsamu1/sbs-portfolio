


/* =========================================================
   VANTA EFFECTS
   ========================================================= */

let vantaEffect = null;
let topologyEffect = null;



/* =========================================================
   PAGE ELEMENTS
   ========================================================= */

const buttons =
  document.querySelectorAll(
    "nav button[data-page]"
  );


const pages =
  document.querySelectorAll(
    "main section.page"
  );


const mainElement =
  document.querySelector(
    "main"
  );



/* =========================================================
   MUSIC ELEMENTS
   ========================================================= */

const bgMusic =
  document.getElementById(
    "bg-music"
  );


const musicPlayBtn =
  document.getElementById(
    "music-play"
  );


const musicMuteBtn =
  document.getElementById(
    "music-mute"
  );


const musicVolume =
  document.getElementById(
    "music-volume"
  );


const volumeValue =
  document.getElementById(
    "volume-value"
  );


const musicIndicator =
  document.getElementById(
    "music-indicator"
  );



/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


    /* =====================================================
       MUSIC PLAYER
       ===================================================== */

    setupMusicPlayer();



    /* =====================================================
       FOOTER YEAR
       ===================================================== */

    setupFooterYear();



    /* =====================================================
       PRELOADER VANTA NET
       ===================================================== */

    const alreadyEntered =
      sessionStorage.getItem(
        "sbsEntered"
      ) === "true";


    const preloaderBg =
      document.getElementById(
        "preloader-bg"
      );



    /*
      Only create the NET preloader animation if this is
      actually a fresh entrance.

      This prevents a hidden Vanta animation from running
      unnecessarily after refresh.
    */

    if (
      !alreadyEntered &&
      preloaderBg &&
      window.VANTA &&
      window.VANTA.NET
    ) {


      vantaEffect =
        VANTA.NET({

          el:
            preloaderBg,


          mouseControls:
            true,

          touchControls:
            true,

          gyroControls:
            false,


          minHeight:
            200.0,

          minWidth:
            200.0,


          scale:
            1.0,

          scaleMobile:
            1.0,


          /* WEBSITE BLUE */

          color:
            0x2563eb,


          /* WEBSITE DARK NAVY */

          backgroundColor:
            0x050816,


          points:
            10.0,

          maxDistance:
            20.0,

          spacing:
            18.0

        });


    }



    setupPreloader();


  }
);



/* =========================================================
   PRELOADER
   ========================================================= */

function setupPreloader() {


  const preloader =
    document.getElementById(
      "preloader"
    );


  const enterBtn =
    document.getElementById(
      "enter-btn"
    );


  const logoWrap =
    document.querySelector(
      ".preloader-logo"
    );



  const alreadyEntered =
    sessionStorage.getItem(
      "sbsEntered"
    ) === "true";



  /* =======================================================
     REFRESH / ALREADY ENTERED
     ======================================================= */

  if (alreadyEntered) {


    /*
      Completely remove the preloader so it does not
      sit invisibly above anything.
    */

    if (preloader) {

      preloader.remove();

    }



    /*
      Start actual site background immediately.
    */

    setupSiteTopology();



    /*
      Attempt to resume the music.

      Browsers may block audible autoplay after a refresh.
      If that happens, the user simply presses Play.
    */

    attemptMusicPlayback();


    return;

  }



  /* =======================================================
     PRELOADER MISSING
     ======================================================= */

  if (
    !preloader ||
    !enterBtn ||
    !logoWrap
  ) {


    setupSiteTopology();


    return;

  }



  /* =======================================================
     ENTER WEBSITE
     ======================================================= */

  enterBtn.addEventListener(
    "click",
    () => {


      /*
        Remember that this tab/session has entered
        SBSDynamics.
      */

      sessionStorage.setItem(
        "sbsEntered",
        "true"
      );



      /*
        User interaction lets us start background audio.
      */

      attemptMusicPlayback();



      /*
        Logo spin.
      */

      logoWrap.classList.add(
        "spin-once"
      );



      /*
        Wait for spin animation.
      */

      setTimeout(
        () => {


          /* HIDE PRELOADER */

          preloader.classList.add(
            "preloader-hidden"
          );



          /* OPEN HOME */

          switchPage(
            "home",
            false
          );



          /* DESTROY PRELOADER VANTA */

          if (
            vantaEffect &&
            typeof vantaEffect.destroy === "function"
          ) {


            vantaEffect.destroy();

            vantaEffect =
              null;


          }



          /* START SITE TOPOLOGY */

          setupSiteTopology();



          /*
            Remove preloader from DOM once fade completes.
          */

          setTimeout(
            () => {


              if (preloader) {

                preloader.remove();

              }


            },
            600
          );


        },
        1500
      );


    }
  );


}



/* =========================================================
   MAIN WEBSITE VANTA TOPOLOGY
   ========================================================= */

// function setupSiteTopology() {


//   const siteShell =
//     document.getElementById(
//       "site-shell"
//     );



//   if (
//     !siteShell ||
//     !window.VANTA ||
//     !window.VANTA.TOPOLOGY
//   ) {


//     return;

//   }



//   /*
//     Prevent duplicate topology canvases.
//   */

//   if (topologyEffect) {

//     return;

//   }



//   topologyEffect =
//     VANTA.TOPOLOGY({

//       el:
//         siteShell,


//       mouseControls:
//         true,

//       touchControls:
//         true,

//       gyroControls:
//         false,


//       minHeight:
//         200.0,

//       minWidth:
//         200.0,


//       scale:
//         1.0,

//       scaleMobile:
//         1.0,


//       /*
//         SBSDynamics Blue
//         #2563EB
//       */

//       color:
//         0x2563eb,


//       /*
//         SBSDynamics Dark Navy
//         #050816
//       */

//       backgroundColor:
//         0x050816

//     });


// }

function setupSiteTopology() {
  const topologyBg = document.getElementById("topology-bg");

  if (!topologyBg || topologyEffect) return;

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

buttons.forEach(
  (button) => {


    button.addEventListener(
      "click",
      () => {


        const page =
          button.getAttribute(
            "data-page"
          );


        switchPage(
          page
        );


      }
    );


  }
);



/* =========================================================
   INTERNAL PAGE NAVIGATION
   ========================================================= */

document
  .querySelectorAll(
    "[data-page-jump]"
  )
  .forEach(
    (button) => {


      button.addEventListener(
        "click",
        () => {


          const page =
            button.getAttribute(
              "data-page-jump"
            );


          switchPage(
            page
          );


        }
      );


    }
  );



/* =========================================================
   SWITCH PAGE
   ========================================================= */

function switchPage(
  pageId,
  updateHash = true
) {


  /*
    Make sure requested page actually exists.
  */

  const requestedPage =
    document.getElementById(
      pageId
    );


  if (
    !requestedPage ||
    !requestedPage.classList.contains("page")
  ) {

    pageId =
      "home";

  }



  /* =======================================================
     NAV BUTTON
     ======================================================= */

  buttons.forEach(
    (button) => {


      const isActive =
        button.getAttribute(
          "data-page"
        ) === pageId;


      button.classList.toggle(
        "active",
        isActive
      );


    }
  );



  /* =======================================================
     PAGE
     ======================================================= */

  pages.forEach(
    (page) => {


      const isActive =
        page.id === pageId;


      page.classList.toggle(
        "active-page",
        isActive
      );


    }
  );



  /* =======================================================
     URL HASH
     ======================================================= */

  if (
    updateHash &&
    window.location.hash !==
      `#${pageId}`
  ) {


    history.pushState(
      null,
      "",
      `#${pageId}`
    );


  }



  /* =======================================================
     SCROLL TOP
     ======================================================= */

  window.scrollTo({

    top:
      0,

    behavior:
      "smooth"

  });



  /* =======================================================
     RESIZE MAIN TO CURRENT PAGE
     ======================================================= */

  requestAnimationFrame(
    syncMainHeight
  );


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
    Array.from(
      pages
    ).some(
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
  () => {


    loadPageFromHash();

    requestAnimationFrame(() => {
  syncMainHeight();
});


  }
);



window.addEventListener(
  "hashchange",
  () => {


    loadPageFromHash();


  }
);



window.addEventListener(
  "popstate",
  () => {


    loadPageFromHash();


  }
);



/* =========================================================
   MAIN HEIGHT
   =========================================================

   The pages use absolute positioning so only one appears.

   This function adjusts MAIN so the footer always sits
   below the active page instead of overlapping it.
   ========================================================= */

// function syncMainHeight() {


//   if (!mainElement) {

//     return;

//   }



//   const activePage =
//     document.querySelector(
//       ".page.active-page"
//     );


//   if (!activePage) {

//     return;

//   }



//   const pageInner =
//     activePage.querySelector(
//       ".page-inner"
//     );


//   if (!pageInner) {

//     return;

//   }



//   const viewportMinimum =
//     Math.max(
//       window.innerHeight - 190,
//       500
//     );



//   const contentHeight =
//     pageInner.scrollHeight + 70;



//   mainElement.style.minHeight =
//     `${Math.max(
//       viewportMinimum,
//       contentHeight
//     )}px`;



//   /*
//     If Vanta exposes its resize method,
//     update the background after page-height changes.
//   */

//   if (
//     topologyEffect &&
//     typeof topologyEffect.resize === "function"
//   ) {


//     topologyEffect.resize();


//   }


// }

function syncMainHeight() {
  const main = document.querySelector("main");
  const activePage = document.querySelector(".page.active-page");
  const pageInner = activePage?.querySelector(".page-inner");

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (!main || !activePage || !pageInner) return;

  const headerHeight = header ? header.offsetHeight : 0;
  const footerHeight = footer ? footer.offsetHeight : 0;

  const mainStyles = window.getComputedStyle(main);

  const paddingTop =
    parseFloat(mainStyles.paddingTop) || 0;

  const paddingBottom =
    parseFloat(mainStyles.paddingBottom) || 0;

  const availableHeight =
    window.innerHeight -
    headerHeight -
    footerHeight;

  const contentHeight =
    pageInner.scrollHeight +
    paddingTop +
    paddingBottom;

const needsScroll =
  contentHeight > availableHeight;

  main.style.height =
    `${Math.max(availableHeight, contentHeight)}px`;

  document.documentElement.classList.toggle(
    "short-page",
    !needsScroll
  );

  document.body.classList.toggle(
    "short-page",
    !needsScroll
  );

  if (!needsScroll) {
    window.scrollTo(0, 0);
  }
}

/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener(
  "resize",
  () => {


    requestAnimationFrame(() => {
  syncMainHeight();
});


  }
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



  projectsGrid.innerHTML =
    "";



  projects.forEach(
    (project) => {


      const card =
        document.createElement(
          "article"
        );


      card.className =
        "project-card";



      /* ===================================================
         IMAGE
         =================================================== */

      let imageHTML =
        "";


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



      /* ===================================================
         LAYERS
         =================================================== */

      let layersHTML =
        "";


      if (
        Array.isArray(
          project.layers
        ) &&
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



      /* ===================================================
         LINKS
         =================================================== */

      let linksHTML =
        "";


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



      /* ===================================================
         BUILD PROJECT CARD
         =================================================== */

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



      projectsGrid.appendChild(
        card
      );


    }
  );



  requestAnimationFrame(
    syncMainHeight
  );


}



/* BUILD PROJECTS */

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



      /* ===================================================
         VALIDATION
         =================================================== */

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



      /* ===================================================
         SENDING STATE
         =================================================== */

      if (submitBtn) {

        submitBtn.disabled =
          true;

      }


      if (submitBtnLabel) {

        submitBtnLabel.textContent =
          "Sending…";

      }



      /* ===================================================
         FORMSPREE REQUEST
         =================================================== */

      try {


        const response =
          await fetch(
            contactForm.action,
            {

              method:
                "POST",

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



        /* SUCCESS */

        if (response.ok) {


          showStatus(
            "Message sent! I'll get back to you soon.",
            "success"
          );


          contactForm.reset();


        }



        /* ERROR */

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



      /* NETWORK FAILURE */

      catch (error) {


        showStatus(
          "Network error. Try emailing me directly.",
          "error"
        );


      }



      /* RESET BUTTON */

      finally {


        if (submitBtn) {

          submitBtn.disabled =
            false;

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


  requestAnimationFrame(() => {
  syncMainHeight();
});


  setTimeout(
    () => {


      formStatus.textContent =
        "";


      formStatus.className =
        "form-status";

requestAnimationFrame(() => {
  syncMainHeight();
});


    },
    6000
  );


}



/* =========================================================
   BACKGROUND MUSIC
   ========================================================= */

function setupMusicPlayer() {


  if (!bgMusic) {

    return;

  }



  /* =======================================================
     LOAD SAVED VOLUME
     ======================================================= */

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



  /* =======================================================
     LOAD SAVED MUTE STATE
     ======================================================= */

  const savedMuted =
    localStorage.getItem(
      "sbsMusicMuted"
    ) === "true";


  bgMusic.muted =
    savedMuted;



  updateMusicButtons();



  /* =======================================================
     PLAY / PAUSE
     ======================================================= */

  if (musicPlayBtn) {


    musicPlayBtn.addEventListener(
      "click",
      () => {


        if (bgMusic.paused) {


          bgMusic
            .play()
            .then(
              () => {


                updateMusicButtons();


              }
            )
            .catch(
              () => {


                updateMusicButtons();


              }
            );


        }


        else {


          bgMusic.pause();

          updateMusicButtons();


        }


      }
    );


  }



  /* =======================================================
     MUTE / UNMUTE
     ======================================================= */

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



  /* =======================================================
     VOLUME
     ======================================================= */

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
          Raising the volume automatically unmutes.
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



  /* =======================================================
     AUDIO EVENTS
     ======================================================= */

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
      () => {


        updateMusicButtons();


      }
    )
    .catch(
      () => {


        /*
          Browser blocked autoplay.

          Nothing is wrong.

          Visitor can press the Play button.
        */

        updateMusicButtons();


      }
    );


}



/* =========================================================
   UPDATE MUSIC CONTROLS
   ========================================================= */

function updateMusicButtons() {


  if (!bgMusic) {

    return;

  }



  /* =======================================================
     PLAY / PAUSE ICON
     ======================================================= */

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



  /* =======================================================
     MUTE ICON
     ======================================================= */

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



  /* =======================================================
     ANIMATED INDICATOR
     ======================================================= */

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



  container.innerHTML =
    "";



  timezoneList.forEach(
    (zone, index) => {


      /* ===================================================
         WRAPPER
         =================================================== */

      const wrapper =
        document.createElement(
          "div"
        );


      wrapper.className =
        "tz-item";



      /* ===================================================
         CLOCK
         =================================================== */

      const clock =
        document.createElement(
          "div"
        );


      clock.className =
        "clock";



      /* ===================================================
         TICKS
         =================================================== */

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



      /* ===================================================
         CENTER
         =================================================== */

      const center =
        document.createElement(
          "div"
        );


      center.className =
        "clock-center";


      clock.appendChild(
        center
      );



      /* ===================================================
         HANDS
         =================================================== */

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



      /* ===================================================
         TEXT
         =================================================== */

      const textWrap =
        document.createElement(
          "div"
        );


      textWrap.className =
        "tz-text";



      /* CITY */

      const city =
        document.createElement(
          "div"
        );


      city.className =
        "tz-city";


      city.textContent =
        zone.city;



      /* DIGITAL */

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



      /* ===================================================
         DIGITAL TIME
         =================================================== */

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



      /* ===================================================
         TIME PARTS
         =================================================== */

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



      /* ===================================================
         HAND ANGLES
         =================================================== */

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



      /* ===================================================
         HAND ELEMENTS
         =================================================== */

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



      /* ===================================================
         ROTATE HANDS
         =================================================== */

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

window.addEventListener("scroll", () => {
  const activePage = document.querySelector(".page.active-page");

  if (!activePage || activePage.id !== "about") return;

  const maxScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;

  if (window.scrollY > maxScroll) {
    window.scrollTo(0, maxScroll);
  }

  if (window.scrollY < 0) {
    window.scrollTo(0, 0);
  }
});

/* =========================================================
   START CLOCKS
   ========================================================= */

initTimezones();

updateTimezones();


setInterval(
  updateTimezones,
  1000
);