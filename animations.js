document.addEventListener("DOMContentLoaded", function() {
    // Get the landing section element
    const landingSection = document.getElementById("landing");
    // Get the brand element
    const brandElement = document.getElementById("brand");

    console.log(landingSection);
    console.log(brandElement);

    // Create a new Intersection Observer with a 1-pixel root margin
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.target === landingSection) {
                if (entry.isIntersecting) {
                    brandElement.style.color = "transparent"; // Set the color to transparent on the landing section
                } else {
                    brandElement.style.color = ""; // Reset the color on other sections
                }
            }
        });
    }, { rootMargin: "-1px" });

    // Observe the landing section
    observer.observe(landingSection);
});

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
