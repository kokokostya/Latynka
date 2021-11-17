document.addEventListener("DOMContentLoaded", function(e) {
  let textArea = document.getElementById("source");
  let resultPlaceholder = document.getElementById("placeholder");
  let resultText = document.getElementById("destination");
  let resetIcon =  document.querySelector("#sourceContainer .icon-reset");
  let copyIcon =  document.querySelector("#destinationContainer .icon-copy");

  document.getElementById("source").focus();

  // Text transform
  function toLatin(sourceText, latinType) {
    return sourceText.toUpperCase();
  }
  
  // Decorations: no text entered
  function textEntered() {
    resetIcon.classList.remove("d-none");
    copyIcon.classList.remove("d-none");
    resultPlaceholder.classList.add("d-none");
    resultText.classList.remove("d-none");
  }

  // Decorations: some text entered
  function noTextEntered() {
    textArea.value = "";
    textArea.style.height = "0px";
    resetIcon.classList.add("d-none");
    copyIcon.classList.add("d-none");
    resultPlaceholder.classList.remove("d-none");
    resultText.classList.add("d-none");
  }

  // Decorations: custom input
  function customTextExpected() {
    document.querySelectorAll("#sourceTemplate .nav-link").forEach( (link) => ( link.classList.remove("active")));
    document.querySelector("#sourceTemplate .nav-link").classList.add("active");
  }

  // Respond to input
  function inputUpdated() {
    if (!textArea.value.trim().length) {
      noTextEntered();
    } else {
      textEntered();
    }
    textArea.style.height = "";
    textArea.style.height = textArea.scrollHeight + "px" ;
    resultText.innerHTML = toLatin(textArea.value, document.querySelector("#latinType .active").id);
  }
  
  // Textarea input processing
  textArea.addEventListener("input", inputUpdated);

  // Text area reset
  resetIcon.addEventListener("click", function(e) {   
    noTextEntered();
    customTextExpected();
    document.getElementById("source").focus();
    e.preventDefault();
  });

  // Copy to clipboard
  copyIcon.addEventListener("click", function(e) {
    let el = document.createElement("textarea");
    el.value = resultText.innerHTML;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    let msg = document.createElement("div");
    msg.classList.add("alert", "alert-success", "small");
    msg.innerHTML = "Скопійовано в буфер";
    document.body.append(msg);
    setTimeout(function() {
      msg.remove();
    }, 3000);

    e.preventDefault();
  });

  // Tab selection
  document.querySelectorAll(".nav .nav-link").forEach( (link) => {
    link.addEventListener("click", function(e) {   
      link.closest(".nav").querySelectorAll(".nav-link").forEach( (sibling) => ( sibling.classList.remove("active")));
      link.classList.add("active");

      if (link.closest("#sourceTemplate")) {
        document.getElementById("source").value = sourceTemplates[link.id];
        inputUpdated();
      } else {
        document.querySelectorAll("#desc .tab").forEach( (tab) => { tab.classList.remove("active"); });
        document.getElementById(link.id + "-desc").classList.add("active");
      }
      e.preventDefault();
    });
  });

  // Tab scroll behavior
  document.querySelectorAll(".h-scroll-container").forEach( (scrollContainer) => {
    let containerWidth = scrollContainer.clientWidth;
    let selectedElementPositionLeft = scrollContainer.querySelector(".active").getBoundingClientRect().left;
    let selectedElementWidth = scrollContainer.querySelector(".active").clientWidth;
    let lastElementPositionLeft = scrollContainer.querySelector("ul li:last-child").getBoundingClientRect().left - scrollContainer.getBoundingClientRect().left;
    let lastElementWidth = scrollContainer.querySelector("ul li:last-child").clientWidth;

    // Fade out edges on dates scroll
    scrollContainer.addEventListener("scroll", function(e) {
      let scrollOffset = scrollContainer.querySelector(".h-scroll-content").getBoundingClientRect().left - scrollContainer.getBoundingClientRect().left;
      if (scrollOffset < 0) {
        this.closest(".h-scroll").querySelector(".fadeout-left").classList.remove("d-none");
      } else {
        this.closest(".h-scroll").querySelector(".fadeout-left").classList.add("d-none");
      }

      let scrolledTo = -(scrollOffset - containerWidth);
      let lastElementEdge = lastElementPositionLeft + lastElementWidth - 10; // Removing extra for confidence
      if (scrolledTo < lastElementEdge) {
        this.closest(".h-scroll").querySelector(".fadeout-right").classList.remove("d-none");
      } else {
        this.closest(".h-scroll").querySelector(".fadeout-right").classList.add("d-none");
      }
    });

    // Initial check
    if (scrollContainer.querySelector(".h-scroll-content").getBoundingClientRect().left - scrollContainer.getBoundingClientRect().left >= 0) {
      scrollContainer.closest(".h-scroll").querySelector(".fadeout-left").classList.add("d-none");
    }
  });
});