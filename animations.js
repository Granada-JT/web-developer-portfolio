// This code block hides the navbar when in the landing section
document.addEventListener("DOMContentLoaded", function () {
  const landingSection = document.getElementById("landing");
  const brandElement = document.getElementById("brand");
  const navbarToggler = document.querySelectorAll(".navbar-toggler");
  const navItems = Array.from(document.querySelectorAll(".nav-item"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === landingSection) {
          if (entry.isIntersecting) {
            navbarToggler.forEach((element) => {
              element.classList.remove("show");
            });
            brandElement.classList.add("hidden");
            navItems.forEach((navItem) => {
              navItem.style.transitionDelay = "";
              navItem.classList.add("hidden");
            });
          } else {
            navbarToggler.forEach((element) => {
              element.classList.add("show");
            });
            brandElement.classList.remove("hidden");
            navItems.forEach((navItem, index) => {
              navItem.style.transitionDelay = `${(index + 1) * 0.05}s`;
              navItem.classList.remove("hidden");
            });
          }
        }
      });
    },
    { rootMargin: "-20px" },
  );

  observer.observe(landingSection);
});

// This code block zooms into the carousel at the contact form when it is clicked
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel-example-captions");
  carousel.addEventListener("mousedown", function (event) {
    if (
      event.target.classList.contains("carousel-control-prev-icon") ||
      event.target.classList.contains("carousel-control-next-icon")
    ) {
      return;
    }

    carousel.classList.toggle("full-screen");
    carousel.classList.toggle("full-screen");
    carousel.classList.toggle("full-screen");
    const html = document.documentElement;

    if (carousel.classList.contains("full-screen")) {
      html.classList.add("no-scroll");
    } else {
      html.classList.remove("no-scroll");
    }
  });
});

// This code block does the animation of generating random characters back into a desired set of characters
document.addEventListener("DOMContentLoaded", function genChar() {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "0123456789";
  var symbols = "!@#$%^&*()_+=-";
  var string = numbers + letters + symbols;
  var allCounters = document.querySelectorAll("#full-name > i");

  function count() {
    allCounters.forEach((allCounter, index) => {
      allCounter.style.transitionDelay = `${(index + 1) * 0.05}s`;
      allCounter.classList.add("show");
    });

    allCounters.forEach(function (el) {
      var duration = 100 + Array.from(allCounters).indexOf(el) * 60;
      var interval = setInterval(function () {
        el.innerText = string.charAt(Math.random() * string.length);
        duration = duration - 50;
        if (duration <= 0) {
          clearInterval(interval);
          el.innerText = el.getAttribute("data-final");
        }
      }, 50);
    });
  }

  function resetCount() {
    allCounters.forEach((allCounter, index) => {
      allCounter.style.transitionDelay = `${(index + 1) * 0.05}s`;
      allCounter.classList.remove("show");
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          count();
        } else {
          resetCount();
        }
      });
    },
    { rootMargin: "-1px" },
  );

  const landingSection = document.getElementById("landing");

  observer.observe(landingSection);
});

// This code block does the animation of generating random characters back into a desired set of characters
document.addEventListener("DOMContentLoaded", function genChar() {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "0123456789";
  var symbols = "!@#$%^&*()_+=-";
  var string = numbers + letters + symbols;
  var allCounters = document.querySelectorAll("#profession > i");

  function count() {
    allCounters.forEach((allCounter, index) => {
      allCounter.style.transitionDelay = `${(index + 1) * 0.05}s`;
      allCounter.classList.add("show");
    });

    allCounters.forEach(function (el) {
      var duration = 100 + Array.from(allCounters).indexOf(el) * 60;
      var interval = setInterval(function () {
        el.innerText = string.charAt(Math.random() * string.length);
        duration = duration - 50;
        if (duration <= 0) {
          clearInterval(interval);
          el.innerText = el.getAttribute("data-final");
        }
      }, 50);
    });
  }

  function resetCount() {
    allCounters.forEach((allCounter, index) => {
      allCounter.style.transitionDelay = `${(index + 1) * 0.05}s`;
      allCounter.classList.remove("show");
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          count();
        } else {
          resetCount();
        }
      });
    },
    { rootMargin: "-1px" },
  );

  const landingSection = document.getElementById("landing");

  observer.observe(landingSection);
});

// This code block animates the arrow down pointer
document.addEventListener("DOMContentLoaded", function () {
  const landingSection = document.getElementById("landing");
  const arrowDown = document.getElementById("arrow-down");
  let delay;

  if (
    window.matchMedia(
      "(min-width: 768px) and (max-width: 992px), (max-width: 450px)",
    ).matches
  ) {
    delay = 3000;
  } else {
    delay = 6000;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === landingSection) {
          if (entry.isIntersecting) {
            arrowDown.classList.add("hidden");
            setTimeout(() => {
              arrowDown.classList.remove("hidden");
            }, delay);
          } else {
            arrowDown.classList.add("hidden");
          }
        }
      });
    },
    { rootMargin: "-1px" },
  );

  observer.observe(landingSection);
});

// This code block animates the box icons and their descriptions
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const landingSection = document.getElementById("landing");
    const boxIcons = Array.from(document.querySelectorAll("#icons > i"));
    const iconDes = Array.from(document.querySelectorAll("#icon-des > i"));

    const applyAnimation = function () {
      setTimeout(() => {
        boxIcons.forEach((boxIcon, index) => {
          boxIcon.style.transitionDelay = `${(index + 1) * 0.5}s`;
          boxIcon.classList.add("show");
        });
        iconDes.forEach((iconDes, index) => {
          iconDes.style.transitionDelay = `${(index + 1) * 0.5}s`;
          iconDes.classList.add("show");
        });
      }, 2000);
    };

    const resetAnimation = function () {
      boxIcons.forEach((boxIcon) => {
        boxIcon.style.transitionDelay = "";
        boxIcon.classList.remove("show");
      });
      iconDes.forEach((iconDes) => {
        iconDes.style.transitionDelay = "";
        iconDes.classList.remove("show");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === landingSection) {
            if (entry.isIntersecting) {
              applyAnimation();
            } else {
              resetAnimation();
            }
          }
        });
      },
      { rootMargin: "-1px" },
    );

    const refreshPage = function () {
      resetAnimation();
      setTimeout(applyAnimation, 0);
    };

    observer.observe(landingSection);

    window.addEventListener("beforeunload", refreshPage);
  },
  { rootMargin: "-1px" },
);

// This code block animates the home section.
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const homeSection = document.getElementById("home");
    const aboutMe = Array.from(
      document.querySelectorAll("#about-me-header, #about-me-caption"),
    );
    const socialsPics = Array.from(
      document.querySelectorAll("#carousel-socials img"),
    );
    const socials = Array.from(document.querySelectorAll("#carousel-socials"));
    const carouselPics = Array.from(
      document.querySelectorAll("#carousel-picture"),
    );

    const applyAnimation = function () {
      setTimeout(() => {
        carouselPics.forEach((carouselPic, index) => {
          carouselPic.style.transitionDelay = `${(index + 1) * 0.05}s`;
          carouselPic.classList.add("show", "slide-in-right");
        });
        aboutMe.forEach((caption, index) => {
          caption.style.transitionDelay = `${(index + 1) * 0.05}s`;
          caption.classList.add("show");
        });
        socialsPics.forEach((socialsPic, index) => {
          socialsPic.style.transitionDelay = `${(index + 1) * 0.05}s`;
          socialsPic.classList.add("show");
        });
        socials.forEach((socials, index) => {
          socials.style.transitionDelay = `${(index + 1) * 0.05}s`;
          socials.classList.add("slide-in-left");
        });
      }, 500);
    };

    const resetAnimation = function () {
      carouselPics.forEach((carouselPic) => {
        carouselPic.style.transitionDelay = "";
        carouselPic.classList.remove("show", "slide-in-right");
      });
      aboutMe.forEach((caption) => {
        caption.style.transitionDelay = "";
        caption.classList.remove("show");
      });
      socialsPics.forEach((socialsPic) => {
        socialsPic.style.transitionDelay = "";
        socialsPic.classList.remove("show");
      });
      socials.forEach((socials) => {
        socials.style.transitionDelay = "";
        socials.classList.remove("slide-in-left");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === homeSection) {
            if (entry.isIntersecting) {
              applyAnimation();
            } else {
              resetAnimation();
            }
          }
        });
      },
      { rootMargin: "-1px" },
    );

    const refreshPage = function () {
      resetAnimation();
      setTimeout(applyAnimation, 0);
    };

    observer.observe(homeSection);

    window.addEventListener("beforeunload", refreshPage);
  },
  { rootMargin: "-1px" },
);

// This code block animates the projects section.
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const projectSection = document.getElementById("projects");
    const project = Array.from(document.querySelectorAll(".project"));
    const projectsHeader = Array.from(
      document.querySelectorAll("#projects-header > i"),
    );

    const applyAnimation = function () {
      setTimeout(() => {
        setTimeout(() => {
          project.forEach((project, index) => {
            project.style.transitionDelay = `${(index + 1) * 0.05}s`;
            project.classList.add("show");
          });
        }, 300);
        projectsHeader.forEach((projectsHeader) => {
          projectsHeader.classList.add("show", "slide-down-up");
        });
      }, 500);
    };

    const resetAnimation = function () {
      project.forEach((project) => {
        project.style.transitionDelay = "";
        project.classList.remove("show", "slide-in-right");
      });
      projectsHeader.forEach((projectsHeader) => {
        projectsHeader.style.transitionDelay = "";
        projectsHeader.classList.remove("show");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === projectSection) {
            if (entry.isIntersecting) {
              applyAnimation();
            } else {
              resetAnimation();
            }
          }
        });
      },
      { rootMargin: "-1px" },
    );

    const refreshPage = function () {
      resetAnimation();
      setTimeout(applyAnimation, 0);
    };

    observer.observe(projectSection);

    window.addEventListener("beforeunload", refreshPage);
  },
  { rootMargin: "-1px" },
);

// This code block animates the skills section
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const skillSection = document.getElementById("skills");
    const skillIcons = Array.from(document.querySelectorAll(".skill-icons"));
    const title = Array.from(document.querySelectorAll(".title"));
    const skillDes = Array.from(document.querySelectorAll(".skill-des"));

    const applyAnimation = function () {
      setTimeout(() => {
        skillIcons.forEach((skillIcon) => {
          skillIcon.classList.add("show");
        });
        title.forEach((title) => {
          title.classList.add("show");
        });
        skillDes.forEach((skillDes) => {
          skillDes.classList.add("show");
        });
      }, 500);
    };

    const resetAnimation = function () {
      skillIcons.forEach((skillIcon) => {
        skillIcon.classList.remove("show");
      });
      title.forEach((title) => {
        title.classList.remove("show");
      });
      skillDes.forEach((skillDes) => {
        skillDes.classList.remove("show");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === skillSection) {
            if (entry.isIntersecting) {
              applyAnimation();
            } else {
              resetAnimation();
            }
          }
        });
      },
      { rootMargin: "-1px" },
    );

    const refreshPage = function () {
      resetAnimation();
      setTimeout(applyAnimation, 0);
    };

    observer.observe(skillSection);

    window.addEventListener("beforeunload", refreshPage);
  },
  { rootMargin: "-1px" },
);

// This code block animates the contact section
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const contactSection = document.getElementById("contact");
    const formCol = Array.from(document.querySelectorAll("#form-col"));
    const formGroup = Array.from(document.querySelectorAll(".form-group"));
    const clientReviewsCarousel = Array.from(
      document.querySelectorAll("#client-reviews-carousel"),
    );
    const footer = Array.from(document.querySelectorAll("#footer"));

    const applyAnimation = function () {
      setTimeout(() => {
        formCol.forEach((formCol) => {
          formCol.classList.add("show");
        });
        formGroup.forEach((formGroup) => {
          formGroup.classList.add("show");
        });
        clientReviewsCarousel.forEach((clientReviewsCarousel) => {
          clientReviewsCarousel.classList.add("show");
        });
        setTimeout(() => {
          footer.forEach((footer) => {
            footer.classList.add("show");
          });
        }, 1000);
      }, 500);
    };

    const resetAnimation = function () {
      formCol.forEach((formCol) => {
        formCol.classList.remove("show");
      });
      formGroup.forEach((formGroup) => {
        formGroup.classList.remove("show");
      });
      clientReviewsCarousel.forEach((clientReviewsCarousel) => {
        clientReviewsCarousel.classList.remove("show");
      });
      footer.forEach((footer) => {
        footer.classList.remove("show");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === contactSection) {
            if (entry.isIntersecting) {
              applyAnimation();
            } else {
              resetAnimation();
            }
          }
        });
      },
      { rootMargin: "-1px" },
    );

    const refreshPage = function () {
      resetAnimation();
      setTimeout(applyAnimation, 0);
    };

    observer.observe(contactSection);

    window.addEventListener("beforeunload", refreshPage);
  },
  { rootMargin: "-1px" },
);

// This code block executes the project cards feature
document.addEventListener("DOMContentLoaded", function () {
  const previewContainer = document.querySelector(".project-details");
  const previewBox = previewContainer.querySelectorAll(".detail");
  const aboutMeSection = document.getElementById("about-me");
  const skillsSection = document.getElementById("skills");
  const navbar = document.getElementById("nav-bar");

  document
    .querySelectorAll(".projects-container .project")
    .forEach((product) => {
      product.onclick = () => {
        previewContainer.style.display = "flex";
        let name = product.getAttribute("data-name");
        previewBox.forEach((preview) => {
          let target = preview.getAttribute("data-target");
          if (name == target) {
            preview.classList.add("active");
            html.classList.add("no-scroll");
            aboutMeSection.classList.add("hidden");
            skillsSection.classList.add("hidden");
          } else {
            preview.classList.remove("active");
          }
        });
        navbar.classList.add("hide-navbar-nav");
      };
    });

  previewBox.forEach((preview) => {
    let closeIcon = preview.querySelector(".close-icon");
    if (closeIcon) {
      closeIcon.onclick = () => {
        preview.classList.remove("active");
        previewContainer.style.display = "none";
        html.classList.remove("no-scroll");
        aboutMeSection.classList.remove("hidden");
        skillsSection.classList.remove("hidden");
        navbar.classList.remove("hide-navbar-nav");
      };
    }
  });

  const html = document.documentElement;
});

// This code block dynamically changes the background of the nav bar when it is clicked
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const navBar = document.getElementById("nav-bar");
    const toggler = document.querySelector(".navbar-toggler");
    const togglerIcon = document.querySelector(".navbar-toggler-icon");
    const brand = document.getElementById("brand");

    toggler.addEventListener("click", () => {
      if (navBar.classList.contains("bg-black")) {
        setTimeout(() => {
          navBar.classList.remove("bg-black");
        }, 100);
        toggler.classList.add("hide-toggler");
        toggler.classList.remove("align-toggler");
        setTimeout(() => {
          toggler.classList.remove("hide-toggler");
          brand.classList.remove("hide-brand");
        }, 350);
        togglerIcon.style.background = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30' width='30' height='30'%3e%3cpath stroke='rgba(255, 63, 74, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`;
      } else {
        navBar.classList.add("bg-black");
        toggler.classList.add("align-toggler");
        togglerIcon.style.background = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30' width='30' height='30'%3e%3cpath stroke='rgba(255, 63, 74, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 4L26 26M4 26L26 4'/%3e%3c/svg%3e")`;
        brand.classList.add("hide-brand");
      }
    });
  },
  { rootMargin: "-1px" },
);

window.addEventListener('load', function() {
  let currentSection = null;
  let particlesInitialized = false;
  let pendingUpdate = null;
  let isTransitioning = false;
  
  // Dynamic particle configuration generator for truly unique sections
  const themeColors = ['#E01E37', '#C41E3A', '#8B0000', '#DC143C', '#B22222', '#FF4500', '#FF6347'];
  const accentColors = ['#9D4EDD', '#7209B7', '#560BAD', '#4CC9F0', '#00B4D8', '#0077B6', '#F72585', '#B5179E'];
  const shapes = ['circle'];
  const interactionModes = ['grab', 'bubble', 'push'];
  
  function getRandomConfig(sectionName) {
    const isLanding = sectionName === 'landing';
    const baseColor = isLanding ? '#FF3F4A' : accentColors[Math.floor(Math.random() * accentColors.length)];
    const secondaryColor = themeColors[Math.floor(Math.random() * themeColors.length)];
    
    return {
      "particles": {
        "number": { "value": Math.floor(Math.random() * 60) + 30 }, // 30-90 particles
        "color": { 
          "value": [baseColor, secondaryColor] // Multi-color particles
        },
        "shape": { 
          "type": shapes[Math.floor(Math.random() * shapes.length)],
          "stroke": {
            "width": Math.floor(Math.random() * 3),
            "color": baseColor
          }
        },
        "opacity": { 
          "value": Math.random() * 0.5 + 0.4, // 0.4-0.9
          "anim": { 
            "enable": true, 
            "speed": Math.random() * 3 + 1, // 1-4
            "opacity_min": Math.random() * 0.3 + 0.1 // 0.1-0.4
          } 
        },
        "size": { 
          "value": Math.floor(Math.random() * 8) + 2, // 2-10
          "random": true,
          "anim": { 
            "enable": Math.random() > 0.3, // 70% chance
            "speed": Math.random() * 5 + 1, // 1-6
            "size_min": Math.floor(Math.random() * 3) + 1 // 1-4
          } 
        },
        "line_linked": {
          "enable": true, // 80% chance
          "distance": Math.floor(Math.random() * 80) + 100, // 100-180
          "color": Math.random() > 0.5 ? baseColor : secondaryColor,
          "opacity": Math.random() * 0.6 + 0.2, // 0.2-0.8
          "width": Math.random() * 3 + 0.5 // 0.5-3.5
        },
        "move": { 
          "enable": true, 
          "speed": Math.random() * 6 + 1, // 1-7
          "direction": Math.random() > 0.7 ? ["top", "bottom", "left", "right"][Math.floor(Math.random() * 4)] : "none",
          "random": Math.random() > 0.3, // 70% random movement
          "straight": Math.random() > 0.8, // 20% straight movement
          "out_mode": Math.random() > 0.5 ? "out" : "bounce",
          "bounce": Math.random() > 0.6 // 40% bounce
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { 
            "enable": Math.random() > 0.1, // 90% chance
            "mode": interactionModes[Math.floor(Math.random() * interactionModes.length)]
          },
          "onclick": { 
            "enable": Math.random() > 0.3, // 70% chance
            "mode": ["push", "remove"][Math.floor(Math.random() * 2)]
          }
        },
        "modes": {
          "repulse": { 
            "distance": Math.floor(Math.random() * 100) + 80, // 80-180
            "duration": Math.random() * 0.8 + 0.2 // 0.2-1.0
          },
          "grab": { 
            "distance": Math.floor(Math.random() * 100) + 120, // 120-220
            "line_linked": { "opacity": Math.random() * 0.8 + 0.4 } // 0.4-1.2
          },
          "bubble": { 
            "distance": Math.floor(Math.random() * 100) + 150, // 150-250
            "size": Math.floor(Math.random() * 6) + 6, // 6-12
            "duration": Math.random() * 3 + 1, // 1-4
            "opacity": Math.random() * 0.6 + 0.6 // 0.6-1.2
          },
          "push": { "particles_nb": Math.floor(Math.random() * 6) + 2 }, // 2-8
          "remove": { "particles_nb": Math.floor(Math.random() * 4) + 1 } // 1-5
        }
      }
    };
  }

  // Generate unique configs for each section
  const particlesConfigs = {
    landing: getRandomConfig('landing'),
    home: getRandomConfig('home'),
    projects: getRandomConfig('projects'),
    skills: getRandomConfig('skills'),
    contact: getRandomConfig('contact')
  };

  function updateParticlesForSection(sectionName) {
    // Clear any pending updates
    if (pendingUpdate) {
      clearTimeout(pendingUpdate);
      pendingUpdate = null;
    }
    
    // If we're already transitioning to this section, skip
    if (currentSection === sectionName || isTransitioning) return;
    
    // Generate fresh random config each time for maximum uniqueness
    const config = getRandomConfig(sectionName);
    if (!config) return;
    
    // Initialize particles if not done yet
    if (!particlesInitialized && typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', config);
      particlesInitialized = true;
      currentSection = sectionName;
      return;
    }
    
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
      isTransitioning = true;
      const canvas = document.querySelector('#particles-js canvas');
      
      if (canvas) {
        // Start fade out
        canvas.classList.add('fading-out');
        canvas.classList.remove('fading-in');
        
        // Set a timeout to actually update the config
        pendingUpdate = setTimeout(() => {
          // Double-check we still want to update to this section
          const pJS = window.pJSDom[0].pJS;
          
          // Update particle properties with smooth interpolation
          pJS.particles.number.value = config.particles.number.value;
          pJS.particles.color.value = config.particles.color.value;
          pJS.particles.opacity.value = config.particles.opacity.value;
          pJS.particles.opacity.anim = config.particles.opacity.anim || {};
          pJS.particles.size.value = config.particles.size.value;
          pJS.particles.size.random = config.particles.size.random || false;
          pJS.particles.size.anim = config.particles.size.anim || {};
          pJS.particles.line_linked.enable = config.particles.line_linked.enable;
          pJS.particles.line_linked.distance = config.particles.line_linked.distance;
          pJS.particles.line_linked.color = config.particles.line_linked.color;
          pJS.particles.line_linked.opacity = config.particles.line_linked.opacity;
          pJS.particles.line_linked.width = config.particles.line_linked.width;
          pJS.particles.move.speed = config.particles.move.speed;
          pJS.particles.move.direction = config.particles.move.direction || "none";
          pJS.particles.move.random = config.particles.move.random || true;
          pJS.particles.move.straight = config.particles.move.straight || false;
          pJS.particles.move.out_mode = config.particles.move.out_mode || "out";
          pJS.particles.move.bounce = config.particles.move.bounce || false;
          
          // Update interactivity with proper fallbacks
          pJS.interactivity.detect_on = config.interactivity.detect_on || "canvas";
          if (config.interactivity.events.onhover) {
            pJS.interactivity.events.onhover.enable = config.interactivity.events.onhover.enable;
            pJS.interactivity.events.onhover.mode = config.interactivity.events.onhover.mode;
          }
          if (config.interactivity.events.onclick) {
            pJS.interactivity.events.onclick.enable = config.interactivity.events.onclick.enable;
            pJS.interactivity.events.onclick.mode = config.interactivity.events.onclick.mode;
          }
          
          // Update interaction modes
          if (config.interactivity.modes) {
            Object.assign(pJS.interactivity.modes, config.interactivity.modes);
          }
          
          // Refresh particles with new config
          pJS.fn.particlesRefresh();
          currentSection = sectionName;
          
          // Start fade in after a brief moment
          setTimeout(() => {
            canvas.classList.remove('fading-out');
            canvas.classList.add('fading-in');
            isTransitioning = false;
            pendingUpdate = null;
          }, 100);
        }, 400); // Wait for fade out to complete
      }
    }
  }

  // Debounced section update to prevent rapid section changes during fast scrolling
  let sectionUpdateTimeout = null;
  let lastTriggeredSection = null;
  
  function debouncedSectionUpdate(sectionId) {
    // Clear any pending section update
    if (sectionUpdateTimeout) {
      clearTimeout(sectionUpdateTimeout);
    }
    
    // Store the latest section that should be updated
    lastTriggeredSection = sectionId;
    
    // Set a new timeout to update after scroll settling
    sectionUpdateTimeout = setTimeout(() => {
      // Only update if this is still the latest triggered section
      if (lastTriggeredSection === sectionId && !isTransitioning) {
        updateParticlesForSection(sectionId);
      }
      sectionUpdateTimeout = null;
    }, 150); // Wait for scroll to settle
  }

  // Section observer for particles
  const particlesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          debouncedSectionUpdate(sectionId);
        }
      });
    },
    { rootMargin: "-1px", threshold: 0.5 }
  );

  // Observe all sections
  const sections = ['landing', 'home', 'projects', 'skills', 'contact'];
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      particlesObserver.observe(section);
    }
  });

  // Initialize with landing particles
  updateParticlesForSection('landing');
});
