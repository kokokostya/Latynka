document.addEventListener("DOMContentLoaded", function(e) {
  let textArea = document.getElementById("source");
  let resultPlaceholder = document.getElementById("placeholder");
  let resultText = document.getElementById("destination");
  let resetIcon =  document.querySelector("#sourceContainer .icon-reset");
  let copyIcon =  document.querySelector("#destinationContainer .icon-copy");
  let t = new Transliterator(new ConfigReader());
  let latinType;

  // Render source template options
  Object.keys(SOURCE_TEMPLATES).forEach(function(t) {
    let a = document.createElement("a");
    a.className = "nav-link";
    a.href = "#";
    a.id = t;
    a.innerHTML = SOURCE_TEMPLATES[t]["name"];
    // Bind selection on click
    a.addEventListener("click", function(e) {
      document.getElementById("source").value = SOURCE_TEMPLATES[this.id]["text"];
      inputUpdated();
      setActiveTab(this);
      e.preventDefault();
    });
    let li = document.createElement("li");
    li.className = "nav-item";
    li.appendChild(a);
    document.getElementById("sourceTemplate").appendChild(li);
  });
  document.querySelector("#sourceTemplate li:first-child a").classList.add("active");

  // Render latin options
  Object.keys(LATIN_CONFIGS).forEach(function(c) {
    let a = document.createElement("a");
    a.className = "nav-link";
    a.href = "#";
    a.id = c;
    a.innerHTML = LATIN_CONFIGS[c]["name"];
    // Bind selection on click
    a.addEventListener("click", function(e) {
      latinType = this.id;
      populateLatinDesc();
      translateInput();
      setActiveTab(this);
      e.preventDefault();
    });
    let li = document.createElement("li");
    li.className = "nav-item";
    li.appendChild(a);
    document.getElementById("latinType").appendChild(li);
  });
  let latinTab = document.querySelector("#latinType li:first-child a");
  latinTab.classList.add("active");
  latinType = latinTab.id;
  
  // Page load initial actions
  document.getElementById("source").focus();
  populateLatinDesc();
  translateInput();

  // Mark tab as active
  function setActiveTab(a) {
    a.closest(".nav").querySelectorAll(".nav-link").forEach((sibling) => (sibling.classList.remove("active")));
    a.classList.add("active");
  };

  // Populate selected latin description
  function populateLatinDesc() {
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

    // Populate desc
    document.querySelector("#desc p").innerHTML = LATIN_CONFIGS[latinType]["desc"];

    // Populate table
    for (let i = 1; i <= 33; i++) {
      let equivalentStr = "";
      let equivalent = LATIN_CONFIGS[latinType]["dict"][LETTER_INDEX[i]];
      
      // Multi-letter equivalents
      if (equivalent.constructor === Array) { 
        let uniqueEquivalents = equivalent.flat(1).filter(function(item, pos) {
          return equivalent.flat(1).indexOf(item) == pos;
        });
        uniqueEquivalents.forEach( function(variant) {
          if (variant) equivalentStr += variant.charAt(0).toUpperCase() + variant.slice(1) + " " + variant + ", ";
        });
        equivalentStr = equivalentStr.substring(0, equivalentStr.length - 2);
      // Single-letter equivalent
      } else {
        equivalentStr = equivalent.charAt(0).toUpperCase() + equivalent.slice(1) + " " + equivalent;
      }   
      document.getElementById("letter-" + i).innerHTML = (equivalentStr.trim().length) ? equivalentStr : "—";
    }

    // Extra chars, if exist
    if (LATIN_CONFIGS[latinType]["softedDict"] && Object.keys(LATIN_CONFIGS[latinType]["softedDict"]).length) {
      let extraStr = "";

      console.log(LATIN_CONFIGS[latinType]["softedDict"])
      
      for (let key in LATIN_CONFIGS[latinType]["softedDict"]) {
        let char = LATIN_CONFIGS[latinType]["softedDict"][key];
        if (char.constructor === Array) { 
          char.forEach( function(c) {
            extraStr += c + ", ";
          });
        // Single-letter equivalent
        } else {
          extraStr += char + ", ";
        }
      }
      extraStr = extraStr.substring(0, extraStr.length - 2);
      document.querySelector("#desc dd").innerHTML = extraStr;
      document.querySelector("#desc dl").classList.remove("d-none");
    } else {
      document.querySelector("#desc dl").classList.add("d-none");
    }

    // Link
    document.querySelector("#desc a").href = LATIN_CONFIGS[latinType]["link"];
  }

  // Translate input
  function translateInput() {   
    t.useConfig(latinType);
    if (textArea.value.trim().length) {
      resultText.innerHTML = t.transliterate(textArea.value);
    } else {
      resultPlaceholder.innerHTML = t.transliterate(textArea.placeholder);
    }
  }

  // Respond to input
  function inputUpdated() {
    // If empty
    if (!textArea.value.trim().length) {
      textArea.value = "";
      textArea.style.height = "0px";
      resetIcon.classList.add("d-none");
      copyIcon.classList.add("d-none");
      resultPlaceholder.classList.remove("d-none");
      resultText.classList.add("d-none");

      // Reset template tabs
      document.querySelectorAll("#sourceTemplate .nav-link").forEach((link) => (link.classList.remove("active")));
      document.getElementById("custom").classList.add("active");
    // If not empty
    } else {
      resetIcon.classList.remove("d-none");
      copyIcon.classList.remove("d-none");
      resultPlaceholder.classList.add("d-none");
      resultText.classList.remove("d-none");
    }

    // Textarea auto-height
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px" ;

    translateInput();
  }
  
  textArea.addEventListener("input", inputUpdated);
  textArea.addEventListener("keypress", function(e) {
    setActiveTab(document.querySelector("#sourceTemplate li:first-child a"));
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

  // Tab scroll behavior
  document.querySelectorAll(".h-scroll-container").forEach( function(scrollContainer) {
    let containerWidth = scrollContainer.clientWidth;
    let lastElementPositionLeft = scrollContainer.querySelector("ul li:last-child").getBoundingClientRect().left - scrollContainer.getBoundingClientRect().left;
    let lastElementWidth = scrollContainer.querySelector("ul li:last-child").clientWidth;

    // Fade out edges on scroll
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
  });
});