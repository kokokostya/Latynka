document.addEventListener("DOMContentLoaded", function(e) {
  let textArea = document.getElementById("source");
  let resultPlaceholder = document.getElementById("placeholder");
  let resultText = document.getElementById("destination");
  let resetIcon =  document.querySelector("#sourceContainer .icon-reset");
  let copyIcons =  document.querySelector("#destinationContainer .icons");
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
      updateURL();
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
      if (textArea.value) updateURL();
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

  // Parse URL params
  let url = new URL(window.location.href);
  let sourceTemplate = url.searchParams.get("t"); 
  if (url.searchParams.get("l")) {
    latinType = url.searchParams.get("l");
    setActiveTab(document.getElementById(latinType));
  }
  if (sourceTemplate) {
    setActiveTab(document.getElementById(sourceTemplate));
    textArea.value = SOURCE_TEMPLATES[sourceTemplate]["text"];
  } else {
    textArea.value = url.searchParams.get("s");
  }

  // Page load initial actions
  document.getElementById("source").focus();
  populateLatinDesc();
  inputUpdated()
  translateInput();

  // Update URL
  function updateURL() {
    let params = "";
    let sourceTemplate = document.querySelector("#sourceTemplate .active").id;
    if (textArea.value.length) {
      params += "?l=" + latinType;
      if (document.querySelector("#sourceTemplate li:first-child a").classList.contains("active")) {
        params += "&s=" + textArea.value;
      } else {
        params += "&t=" + sourceTemplate;
      }
    } 
    window.history.pushState(
      {
        l : latinType,
        s : textArea.value,
        t : sourceTemplate
      },
      "Latynka",
      window.location.href.split('?')[0] + params
    );
  }

  // Browser history retrieve
  window.addEventListener("popstate", function(e) {
    if (e.state) {
      latinType = e.state.l;
      if (e.state.t && e.state.t != document.querySelector("#sourceTemplate li:first-child a").id) {
        setActiveTab(document.getElementById(e.state.t));
        textArea.value = SOURCE_TEMPLATES[e.state.t]["text"];
      } else {
        setActiveTab(document.querySelector("#sourceTemplate li:first-child a"));
        textArea.value = e.state.s;
      }
    } else {
      latinType = document.querySelector("#latinType li:first-child a").id;
      textArea.value = "";
    }

    setActiveTab(document.getElementById(latinType));
    populateLatinDesc();
    inputUpdated();
    translateInput();
  });

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
      copyIcons.classList.add("d-none");
      resultPlaceholder.classList.remove("d-none");
      resultText.classList.add("d-none");

      // Reset template tabs
      document.querySelectorAll("#sourceTemplate .nav-link").forEach((link) => (link.classList.remove("active")));
      document.getElementById("custom").classList.add("active");
    // If not empty
    } else {
      resetIcon.classList.remove("d-none");
      copyIcons.classList.remove("d-none");
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
    updateURL();
  });

  // Text area reset
  resetIcon.addEventListener("click", function(e) {  
    textArea.value = ""; 
    inputUpdated();
    document.getElementById("source").focus();
    e.preventDefault();
  });

  // Copy helper
  function copyStr(str, subject) {
    let el = document.createElement("textarea");
    el.value = str;
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
    msg.innerHTML = subject + " скопійовано";
    document.body.append(msg);
    setTimeout(function() {
      msg.remove();
    }, 3000);
  }

  // Copy text
  document.querySelector("#destinationContainer .icon-copy").addEventListener("click", function(e) {
    copyStr(resultText.innerHTML, "Текст");
    e.preventDefault();
  });

  // Copy link
  document.querySelector("#destinationContainer .icon-link").addEventListener("click", function(e) {
    copyStr(window.location.href, "Посилання");
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