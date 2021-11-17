document.addEventListener("DOMContentLoaded", function(e) {
  let textArea = document.getElementById("source");
  let resultPlaceholder = document.getElementById("placeholder");
  let resultText = document.getElementById("destination");
  let resetIcon =  document.querySelector("#sourceContainer .icon-reset");
  let copyIcon =  document.querySelector("#destinationContainer .icon-copy");

  // Page load actions
  document.getElementById("source").focus();
  populateAlphabet();

  // Populate alphabet table
  function populateAlphabet() {
    const LETTER_INDEX = {
      1 : "а",
      2 : "б",
      3 : "в",
      4 : "г",
      5 : "ґ",
      6 : "д",
      7 : "е",
      8 : "є",
      9 : "ж",
      10 : "з",
      11 : "и",
      12 : "і",
      13 : "ї",
      14 : "й",
      15 : "к",
      16 : "л",
      17 : "м",
      18 : "н",
      19 : "о",
      20 : "п",
      21 : "р",
      22 : "с",
      23 : "т",
      24 : "у",
      25 : "ф",
      26 : "х",
      27 : "ц",
      28 : "ч",
      29 : "ш",
      30 : "щ",
      31 : "ь",
      32 : "ю",
      33 : "я"
    }

    for (let i = 1; i <= 33; i++) {
      let equivalentStr = "";
      let equivalent = LATIN_CONFIGS[document.querySelector("#latinType .active").id]["dict"][LETTER_INDEX[i]];
      
      if (equivalent.constructor === Array) { 
        let uniqueEquivalents = equivalent.flat(1).filter(function(item, pos) {
          return equivalent.flat(1).indexOf(item) == pos;
        });
        uniqueEquivalents.forEach( (variant) => {
          if (variant) equivalentStr += variant.charAt(0).toUpperCase() + variant.slice(1) + " " + variant + ", ";
        });
        equivalentStr = equivalentStr.substring(0, equivalentStr.length - 2);
      } else {
        equivalentStr = equivalent.charAt(0).toUpperCase() + equivalent.slice(1) + " " + equivalent;
      }   

      document.getElementById("letter-" + i).innerHTML = (equivalentStr.trim().length) ? equivalentStr : "—";
    }
  }

  // Translate input
  function translateInput() {
    let t = new Transliterator(new ConfigReader());
    t.useConfig(document.querySelector("#latinType .active").id);
    resultText.innerHTML = t.transliterate(textArea.value);
  }

  // Respond to input
  function inputUpdated() {
    // Empty
    if (!textArea.value.trim().length) {
      textArea.value = "";
      textArea.style.height = "0px";
      resetIcon.classList.add("d-none");
      copyIcon.classList.add("d-none");
      resultPlaceholder.classList.remove("d-none");
      resultText.classList.add("d-none");

      // Reset template tabs
      document.querySelectorAll("#sourceTemplate .nav-link").forEach( (link) => ( link.classList.remove("active")));
      document.getElementById("custom").classList.add("active");
    // Not empty
    } else {
      resetIcon.classList.remove("d-none");
      copyIcon.classList.remove("d-none");
      resultPlaceholder.classList.add("d-none");
      resultText.classList.remove("d-none");
    }

    textArea.style.height = "";
    textArea.style.height = textArea.scrollHeight + "px" ;

    translateInput();
  }
  
  textArea.addEventListener("input", inputUpdated);
  textArea.addEventListener("keypress", function(e) {
    document.querySelectorAll("#sourceTemplate .nav-link").forEach( (link) => ( link.classList.remove("active")));
    document.getElementById("custom").classList.add("active");
  });

  // Text area reset
  resetIcon.addEventListener("click", function(e) {  
    textArea.value = ""; 
    inputUpdated();
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

    // Render message
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
      this.closest(".nav").querySelectorAll(".nav-link").forEach( (sibling) => ( sibling.classList.remove("active")));
      this.classList.add("active");

      // Selecting source template
      if (this.closest("#sourceTemplate")) {
        document.getElementById("source").value = SOURCE_TEMPLATES[link.id];
        inputUpdated();
      // Selecting latin type
      } else {
        document.querySelectorAll("#desc .tab").forEach( (tab) => { tab.classList.remove("active"); });
        document.getElementById(this.id + "-desc").classList.add("active");
        populateAlphabet();
        translateInput();
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