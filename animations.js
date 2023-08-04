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
