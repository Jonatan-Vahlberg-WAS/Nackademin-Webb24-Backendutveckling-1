// Form submission handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Thank you for your message! This is a demo form - in a real application, this would send your message to the server."
      );
    });
  }

  // Gallery image click handling
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      // In a real application, this could open a lightbox or modal
      const imgSrc = this.querySelector("img").src;
      const title = this.querySelector("h3").textContent;
      console.log(`Clicked gallery item: ${title}`);
    });
  });

  // Blog post read more handling
  const readMoreLinks = document.querySelectorAll(".read-more");
  readMoreLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const blogPost = this.closest(".blog-post");
      const title = blogPost.querySelector("h2").textContent;
      alert(`This would navigate to the full article: "${title}"`);
    });
  });
});
