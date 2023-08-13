// This code block hides the navbar when in the landing section
document.addEventListener("DOMContentLoaded", function() {
    const landingSection = document.getElementById("landing");
    const brandElement = document.getElementById("brand");
    const navItems = Array.from(document.querySelectorAll(".nav-item"));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.target === landingSection) {
                if (entry.isIntersecting) {
                    brandElement.classList.add("hidden"); // Apply the hidden class to trigger the fade animation
                    navItems.forEach(navItem => {
                        navItem.style.transitionDelay = ""; // Reset the transition delay
                        navItem.classList.add("hidden"); // Remove the show class from each nav item
                    });
                } else {
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
    });
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

// This code block aniamtes the project cards section.
document.addEventListener("DOMContentLoaded", function() {
// listing vars here so they're in the global scope
var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;

// initiate the process
init();

function init() {
  resize();
  selectElements();
  attachListeners();
}

// select all the elements in the DOM that are going to be used
function selectElements() {
  cards = document.getElementsByClassName('card'),
  nCards = cards.length,
  cover = document.getElementById('cover'),
  openContent = document.getElementById('open-content'),
  openContentText = document.getElementById('open-content-text'),
  openContentImage = document.getElementById('open-content-image')
  closeContent = document.getElementById('close-content');
}

/* Attaching three event listeners here:
  - a click event listener for each card
  - a click event listener to the close button
  - a resize event listener on the window
*/
function attachListeners() {
  for (var i = 0; i < nCards; i++) {
    attachListenerToCard(i);
  }
  closeContent.addEventListener('click', onCloseClick);
  window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
  cards[i].addEventListener('click', function(e) {
    var card = getCardElement(e.target);
    onCardClick(card, i);
  })
}

/* When a card is clicked */
function onCardClick(card, i) {
  // set the current card
  currentCard = card;
  // add the 'clicked' class to the card, so it animates out
  currentCard.className += ' clicked';
  // animate the card 'cover' after a 500ms delay
  setTimeout(function() {animateCoverUp(currentCard)}, 500);
  // animate out the other cards
  animateOtherCards(currentCard, true);
  // add the open class to the page content
  openContent.className += ' open';
}

/*
* This effect is created by taking a separate 'cover' div, placing
* it in the same position as the clicked card, and animating it to
* become the background of the opened 'page'.
* It looks like the card itself is animating in to the background,
* but doing it this way is more performant (because the cover div is
* absolutely positioned and has no children), and there's just less
* having to deal with z-index and other elements in the card
*/
function animateCoverUp(card) {
  // get the position of the clicked card
  var cardPosition = card.getBoundingClientRect();
  // get the style of the clicked card
  var cardStyle = getComputedStyle(card);
  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);
  // update the content of the opened page
  openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText;
  openContentImage.src = card.children[1].src;
  setTimeout(function() {
  // update the scroll position to the bottom of the page
  window.scroll(0, window.innerHeight + 1450);

    // set page to open
    pageIsOpen = true;
  }, 300);
}

function animateCoverBack(card) {
  var cardPosition = card.getBoundingClientRect();
  // the original card may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);
  // animate scale back to the card size and position
  cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';

  setTimeout(function() {
    // set content back to empty
    openContentText.innerHTML = '';
    openContentImage.src = '';
    // style the cover to 0x0 so it is hidden
    cover.style.width = '0px';
    cover.style.height = '0px';
    pageIsOpen = false;
    // remove the clicked class so the card animates back in
    currentCard.className = currentCard.className.replace(' clicked', '');
    
   // Add the window.scroll function call here
   window.scroll(0, window.innerHeight + 720);
  }, 301);
}


function setCoverPosition(cardPosition) {
  // style the cover with custom values
  cover.style.left = (cardPosition.left) + 'px';
  cover.style.top = (cardPosition.top) + 'px';
  cover.style.width = (cardPosition.width) + 'px';
  cover.style.height = (cardPosition.height) + 'px';
}

function setCoverColor(cardStyle) {
  // style the cover to be the same color as the card
  cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  // calculate the scale and position for the card to fill the page,
  var scaleX = windowWidth / cardPosition.width;
  var scaleY = windowHeight / cardPosition.height;
  var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
  // set the transform on the cover - it will animate because of the transition set on it in the CSS
  cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
}


/* When the close is clicked */
function onCloseClick() {
  // remove the open class so the page content animates out
  openContent.className = openContent.className.replace(' open', '');
  // animate the cover back to the original position card and size
  animateCoverBack(currentCard);
  // animate in other cards
  animateOtherCards(currentCard, false);
}

function animateOtherCards(card, out) {
  var delay = 100;
  for (var i = 0; i < nCards; i++) {
    // animate cards on a stagger, 1 each 100ms
    if (cards[i] === card) continue;
    if (out) animateOutCard(cards[i], delay);
    else animateInCard(cards[i], delay);
    delay += 100;
  }
}

// animations on individual cards (by adding/removing card names)
function animateOutCard(card, delay) {
  setTimeout(function() {
    card.className += ' out';
   }, delay);
}

function animateInCard(card, delay) {
  setTimeout(function() {
    card.className = card.className.replace(' out', '');
  }, delay);
}

// this function searches up the DOM tree until it reaches the card element that has been clicked
function getCardElement(el) {
  if (el.className.indexOf('card ') > -1) return el;
  else return getCardElement(el.parentElement);
}

// resize function - records the window width and height
function resize() {
  if (pageIsOpen) {
    // update position of cover
    var cardPosition = currentCard.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

var paragraphText = '<p>Somebody once told me the world is gonna roll me. I ain\'t the sharpest tool in the shed. She was looking kind of dumb with her finger and her thumb in the shape of an "L" on her forehead. Well the years start coming and they don\'t stop coming. Fed to the rules and I hit the ground running. Didn\'t make sense not to live for fun. Your brain gets smart but your head gets dumb. So much to do, so much to see. So what\'s wrong with taking the back streets? You\'ll never know if you don\'t go. You\'ll never shine if you don\'t glow.</p><p>Hey now, you\'re an all-star, get your game on, go play. Hey now, you\'re a rock star, get the show on, get paid. And all that glitters is gold. Only shooting stars break the mold.</p><p>It\'s a cool place and they say it gets colder. You\'re bundled up now, wait till you get older. But the meteor men beg to differ. Judging by the hole in the satellite picture. The ice we skate is getting pretty thin. The water\'s getting warm so you might as well swim. My world\'s on fire, how about yours? That\'s the way I like it and I never get bored.</p>';
});
