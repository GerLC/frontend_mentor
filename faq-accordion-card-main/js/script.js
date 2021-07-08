let acc = document.querySelectorAll(".faq__button");

console.log(acc)

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("faq__button--highlight");
    
    let panel = this.nextElementSibling;
    panel.classList.toggle("faq__panel--expanded");

  });
}