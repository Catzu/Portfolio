document.addEventListener('DOMContentLoaded', function() {
  const accordions = document.getElementsByClassName("accordion");
  
  for (let i = 0; i < accordions.length; i++) {
      accordions[i].addEventListener("click", function() {
          // Toggle the active class for the clicked button
          this.classList.toggle("active");
          
          // Get the panel element
          const panel = this.nextElementSibling;
          
          // Toggle the panel
          if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
          } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
          }
      });
  }
});