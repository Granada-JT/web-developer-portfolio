// This code block hides the navbar when in the landing section
document.addEventListener("DOMContentLoaded", function() {
    const landingSection = document.getElementById("landing");
    const brandElement = document.getElementById("brand");
    const navbarToggler = document.querySelectorAll(".navbar-toggler");
    const navItems = Array.from(document.querySelectorAll(".nav-item"));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.target === landingSection) {
                if (entry.isIntersecting) {
                    navbarToggler.forEach(element => {
                        element.classList.remove("show");
                    })
                    brandElement.classList.add("hidden"); // Apply the hidden class to trigger the fade animation
                    navItems.forEach(navItem => {
                        navItem.style.transitionDelay = ""; // Reset the transition delay
                        navItem.classList.add("hidden"); // Remove the show class from each nav item
                    });
                } else {
                    navbarToggler.forEach(element => {
                        element.classList.add("show");
                    })
                    brandElement.classList.remove("hidden"); // Remove the hidden class to show the brand element
                    navItems.forEach((navItem, index) => {
                        navItem.style.transitionDelay = `${(index + 1) * 0.05}s`; // Delay each nav item by 0.5 seconds
                        navItem.classList.remove("hidden"); // Add the show class to reveal the nav item with a delay
                    });
                }
            }
        });
    }, { rootMargin: "-200px" });

    observer.observe(landingSection);
});

// This code block zooms into the carousel at the contact form when it is clicked
document.addEventListener("DOMContentLoaded", function() {
    // Get the carousel element
    const carousel = document.getElementById("carouselExampleCaptions");

    // Get the prev and next buttons
    const prevButton = carousel.querySelector(".carousel-control-prev");
    const nextButton = carousel.querySelector(".carousel-control-next");

    // Add a mousedown event listener to the carousel
    carousel.addEventListener("mousedown", function(event) {
        // Check if the clicked element is the prev or next icon
        if (
            event.target.classList.contains("carousel-control-prev-icon") ||
            event.target.classList.contains("carousel-control-next-icon")
        ) {
            return; // Do not toggle full-screen mode
        }

        // Toggle the full-screen class on the carousel
        carousel.classList.toggle("full-screen");
        // Lock scrolling when the carousel is in full-screen mode
        const html = document.documentElement;
        if (carousel.classList.contains("full-screen")) {
            html.classList.add("no-scroll");
        } else {
            html.classList.remove("no-scroll");

        }
    });
    console.log(carousel)
});

// This code block does the animation of generating random characters back into a desired set of characters
document.addEventListener("DOMContentLoaded", function genChar() {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "0123456789";
  var symbols = "!@#$%^&*()_+=-";
  var string = numbers + letters + symbols;
  var allCounters = document.querySelectorAll("#fullName > i");

  function count() {

    allCounters.forEach((allCounter, index) => {
      allCounter.style.transitionDelay = `${(index + 1) * 0.05}s`;
      allCounter.classList.add("show");
    });

    allCounters.forEach(function(el) {
      var duration = 100 + Array.from(allCounters).indexOf(el) * 60;
      var interval = setInterval(function() {
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

  // Create a new IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Check if the landing section is visible
      if (entry.isIntersecting) {
        // Call the count function here
        count()
      } else {
        // Call the reset function here
        resetCount()
      }
    });
  },{ rootMargin: "-1px" });

  // Select the landing section element
  const landingSection = document.getElementById("landing");

  // Start observing the landing section
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

    allCounters.forEach(function(el) {
      var duration = 100 + Array.from(allCounters).indexOf(el) * 60;
      var interval = setInterval(function() {
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

  // Create a new IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Check if the landing section is visible
      if (entry.isIntersecting) {
        // Call the count function here
        count()
      } else {
        // Call the reset function here
        resetCount()
      }
    });
  },{ rootMargin: "-1px" });

  // Select the landing section element
  const landingSection = document.getElementById("landing");

  // Start observing the landing section
  observer.observe(landingSection);
});

// This code block animates the arrow down pointer
document.addEventListener("DOMContentLoaded", function() {
  const landingSection = document.getElementById("landing");
  const delay = 6000;
  const arrowDown = document.getElementById("arrowDown");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
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
  }, { rootMargin: "-1px" });

  observer.observe(landingSection);
});

// This code block animates the box icons and their descriptions
document.addEventListener("DOMContentLoaded", function() {
  const landingSection = document.getElementById("landing");
  const boxIcons = Array.from(document.querySelectorAll("#icons > i"));
  const iconDes = Array.from(document.querySelectorAll("#iconDes > i"));

  const applyAnimation = function() {
    setTimeout(() => {
      boxIcons.forEach((boxIcon, index) => {
        boxIcon.style.transitionDelay = `${(index + 1) * 0.5}s`; // Delay each nav item by 0.05 seconds
        boxIcon.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
      iconDes.forEach((iconDes, index) => {
        iconDes.style.transitionDelay = `${(index + 1) * 0.5}s`; // Delay each nav item by 0.05 seconds
        iconDes.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
    }, 2000); // Add a delay of 1 second (1000 milliseconds) before starting the animation
  };
  

  const resetAnimation = function() {
    boxIcons.forEach(boxIcon => {
      boxIcon.style.transitionDelay = ""; // Reset the transition delay
      boxIcon.classList.remove("show"); // Remove the show class from each nav item
    });
    iconDes.forEach(iconDes => {
      iconDes.style.transitionDelay = ""; // Reset the transition delay
      iconDes.classList.remove("show"); // Remove the show class from each nav item
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === landingSection) {
        if (entry.isIntersecting) {
          applyAnimation();
        } else {
          resetAnimation();
        }
      }
    });
  },{ rootMargin: "-1px" });

  const refreshPage = function() {
    resetAnimation();
    setTimeout(applyAnimation,0);
  };

  observer.observe(landingSection);

  window.addEventListener("beforeunload", refreshPage);
},{ rootMargin: "-1px" });

// This code block animates the home section.
document.addEventListener("DOMContentLoaded", function() {
  const homeSection = document.getElementById("home");
  const aboutMe = Array.from(document.querySelectorAll("#about-me-header, #about-me-caption"));
  const socialsPics = Array.from(document.querySelectorAll("#carouselSocials img"));
  const socials = Array.from(document.querySelectorAll("#carouselSocials"));
  const carouselPics = Array.from(document.querySelectorAll("#carouselPicture"));

  const applyAnimation = function() {
    setTimeout(() => {
      carouselPics.forEach((carouselPic, index) => {
        carouselPic.style.transitionDelay = `${(index + 1) * 0.05}s`; // Delay each nav item by 0.05 seconds
        carouselPic.classList.add("show", "slide-in-right"); // Add the show class to reveal the nav item with a delay
      });
      aboutMe.forEach((caption, index) => {
        caption.style.transitionDelay = `${(index + 1) * 0.05}s`; // Delay each nav item by 0.05 seconds
        caption.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
      socialsPics.forEach((socialsPic, index) => {
        socialsPic.style.transitionDelay = `${(index + 1) * 0.05}s`; // Delay each nav item by 0.05 seconds
        socialsPic.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
      socials.forEach((socials, index) => {
        socials.style.transitionDelay = `${(index + 1) * 0.05}s`; // Delay each nav item by 0.05 seconds
        socials.classList.add("slide-in-left"); // Add the show class to reveal the nav item with a delay
      });
    }, 500); // Add a delay before starting the animation
  };
  

  const resetAnimation = function() {
    carouselPics.forEach(carouselPic => {
      carouselPic.style.transitionDelay = ""; // Reset the transition delay
      carouselPic.classList.remove("show", "slide-in-right"); // Remove the show class from each nav item
    });
    aboutMe.forEach(caption => {
      caption.style.transitionDelay = ""; // Reset the transition delay
      caption.classList.remove("show"); // Remove the show class from each nav item
    });
    socialsPics.forEach(socialsPic => {
      socialsPic.style.transitionDelay = ""; // Reset the transition delay
      socialsPic.classList.remove("show"); // Remove the show class from each nav item
    });
    socials.forEach(socials => {
      socials.style.transitionDelay = ""; // Reset the transition delay
      socials.classList.remove("slide-in-left"); // Remove the show class from each nav item
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === homeSection) {
        if (entry.isIntersecting) {
          applyAnimation();
        } else {
          resetAnimation();
        }
      }
    });
  },{ rootMargin: "-1px" });

  const refreshPage = function() {
    resetAnimation();
    setTimeout(applyAnimation,0);
  };

  observer.observe(homeSection);

  window.addEventListener("beforeunload", refreshPage);
},{ rootMargin: "-1px" });

// This code block animates the projects section.
document.addEventListener("DOMContentLoaded", function() {
  const projectSection = document.getElementById("projects");
  const project = Array.from(document.querySelectorAll(".project"));
  const projectsHeader = Array.from(document.querySelectorAll("#projectsHeader > i"));

  const applyAnimation = function() {
    setTimeout(() => {
      setTimeout (() => {
        project.forEach((project, index) => {
          project.style.transitionDelay = `${(index + 1) * 0.05}s`; // Delay each nav item by 0.05 seconds
          project.classList.add("show"); // Add the show class to reveal the nav item with a delay
        });
      }, 300);
      projectsHeader.forEach((projectsHeader, index) => {
        projectsHeader.classList.add("show", "slide-down-up"); // Add the show class to reveal the nav item with a delay
      });
    }, 500); // Add a delay before starting the animation
  };
  

  const resetAnimation = function() {
    project.forEach(project => {
      project.style.transitionDelay = ""; // Reset the transition delay
      project.classList.remove("show", "slide-in-right"); // Remove the show class from each nav item
    });
    projectsHeader.forEach(projectsHeader => {
      projectsHeader.style.transitionDelay = ""; // Reset the transition delay
      projectsHeader.classList.remove("show");
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === projectSection) {
        if (entry.isIntersecting) {
          applyAnimation();
        } else {
          resetAnimation();
        }
      }
    });
  },{ rootMargin: "-1px" });

  const refreshPage = function() {
    resetAnimation();
    setTimeout(applyAnimation,0);
  };

  observer.observe(projectSection);

  window.addEventListener("beforeunload", refreshPage);
},{ rootMargin: "-1px" });

// This code block animates the skills section
document.addEventListener("DOMContentLoaded", function() {
  const skillSection = document.getElementById("skills");
  const skillIcons = Array.from(document.querySelectorAll("#skillIcons > i"));
  const title = Array.from(document.querySelectorAll(".title"));
  const skillDes = Array.from(document.querySelectorAll("#skillDes > i"));

  const applyAnimation = function() {
    setTimeout(() => {
      skillIcons.forEach((skillIcon, index) => {
        skillIcon.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
      title.forEach((title, index) => {
        title.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
      skillDes.forEach((skillDes, index) => {
        skillDes.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
    }, 500); // Add a delay of 1 second (1000 milliseconds) before starting the animation
  };
  

  const resetAnimation = function() {
    skillIcons.forEach(skillIcon => {
      skillIcon.classList.remove("show"); // Remove the show class from each nav item
    });
    title.forEach(title => {
      title.classList.remove("show"); // Remove the show class from each nav item
    });
    skillDes.forEach(skillDes => {
      skillDes.classList.remove("show"); // Remove the show class from each nav item
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === skillSection) {
        if (entry.isIntersecting) {
          applyAnimation();
        } else {
          resetAnimation();
        }
      }
    });
  },{ rootMargin: "-1px" });

  const refreshPage = function() {
    resetAnimation();
    setTimeout(applyAnimation,0);
  };

  observer.observe(skillSection);

  window.addEventListener("beforeunload", refreshPage);
},{ rootMargin: "-1px" });

// This code block animates the contact section
document.addEventListener("DOMContentLoaded", function() {
  const contactSection = document.getElementById("contact");
  const formCol = Array.from(document.querySelectorAll("#form-col"));
  const formGroup = Array.from(document.querySelectorAll(".form-group"));
  const clientReviewsCarousel = Array.from(document.querySelectorAll("#clientReviews-carousel"));
  const footer = Array.from(document.querySelectorAll("#footer"));

  const applyAnimation = function() {
    setTimeout(() => {
      formCol.forEach((formCol) => {
        formCol.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
      formGroup.forEach((formGroup) => {
        formGroup.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
      clientReviewsCarousel.forEach((clientReviewsCarousel) => {
        clientReviewsCarousel.classList.add("show"); // Add the show class to reveal the nav item with a delay
      });
      setTimeout (() => {
        footer.forEach((footer) => {
          footer.classList.add("show"); // Add the show class to reveal the nav item with a delay
        });
      },1000)
    }, 500); // Add a delay of 1 second (1000 milliseconds) before starting the animation
  };
  

  const resetAnimation = function() {
    formCol.forEach(formCol => {
      formCol.classList.remove("show"); // Remove the show class from each nav item
    });
    formGroup.forEach(formGroup => {
      formGroup.classList.remove("show"); // Remove the show class from each nav item
    });
    clientReviewsCarousel.forEach(clientReviewsCarousel => {
      clientReviewsCarousel.classList.remove("show"); // Remove the show class from each nav item
    });
    footer.forEach(footer => {
      footer.classList.remove("show"); // Remove the show class from each nav item
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === contactSection) {
        if (entry.isIntersecting) {
          applyAnimation();
        } else {
          resetAnimation();
        }
      }
    });
  },{ rootMargin: "-1px" });

  const refreshPage = function() {
    resetAnimation();
    setTimeout(applyAnimation,0);
  };

  observer.observe(contactSection);

  window.addEventListener("beforeunload", refreshPage);
},{ rootMargin: "-1px" });

// This code block executes the project cards feature
document.addEventListener("DOMContentLoaded", function () {
  const previewContainer = document.querySelector('.project-details');
  const previewBox = previewContainer.querySelectorAll('.detail');
  const detailCards = Array.from(document.querySelectorAll(".project-details .detail"));
  const brandElement = document.getElementById("brand");
  const navbarToggler = document.querySelectorAll(".navbar-toggler");
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const aboutMeSection = document.getElementById("aboutMe");
  const skillsSection = document.getElementById("skills");

  document.querySelectorAll('.projects-container .project').forEach(product => {
    product.onclick = () => {
      previewContainer.style.display = 'flex';
      let name = product.getAttribute('data-name');
      previewBox.forEach(preview => {
        let target = preview.getAttribute('data-target');
        if (name == target) {
          preview.classList.add('active');
          html.classList.add('no-scroll');
          aboutMeSection.classList.add('hidden');
          skillsSection.classList.add('hidden');
        } else {
          preview.classList.remove('active');
        }
      });

      navbarToggler.forEach(element => {
        element.classList.remove("show");
      });
      brandElement.classList.add("hidden");
      navItems.forEach(navItem => {
        navItem.style.transitionDelay = ""; // Reset the transition delay
        navItem.classList.add("hidden"); // Remove the show class from each nav item
      });
    };
  });

  previewBox.forEach(preview => {
    let closeIcon = preview.querySelector('.closeIcon');
    if (closeIcon) {
      closeIcon.onclick = () => {
        preview.classList.remove('active');
        previewContainer.style.display = 'none';
        html.classList.remove('no-scroll');
        aboutMeSection.classList.remove('hidden');
        skillsSection.classList.remove('hidden');
        navbarToggler.forEach(element => {
          element.classList.add("show");
        });
        brandElement.classList.remove("hidden"); // Remove the hidden class to show the brand element
        navItems.forEach((navItem, index) => {
          navItem.style.transitionDelay = `${(index + 1) * 0.05}s`; // Delay each nav item by 0.5 seconds
          navItem.classList.remove("hidden"); // Add the show class to reveal the nav item with a delay
        });
      };
    }
  });

  const html = document.documentElement;
});

