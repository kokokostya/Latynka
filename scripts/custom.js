document.addEventListener("DOMContentLoaded", function(e) {
  let textArea = document.getElementById("source");
  let resultText = document.getElementById("destination");
  let resetIcon =  document.querySelector("#sourceContainer .icon-reset");
  let copyIcons =  document.querySelector("#destinationContainer .icons");

  class ConfigReader {
    getConfigObject(cfgName) {
      return T_LITERATOR_CONFIGS[cfgName];
    }
  }
  let t = new Transliterator(new ConfigReader());
  let latinType;

  // Page title animation
  let pt = "Українська латинка";
  let ptPos = 0;
  let ptCycles = 0;
  let ptInt = setInterval(function() {
    if (ptCycles < 2) {
      if (ptCycles % 2 == 0) {
        document.title = t.transliterate(pt.substring(0, ptPos)) + pt.substring(ptPos, pt.length);
      } else {
        document.title = pt.substring(0, ptPos) + t.transliterate(pt.substring(ptPos, pt.length));
      }
  
      if (ptPos == pt.length) {
        ptPos = 0;
        ptCycles++;
      }
      ptPos++;
      if (pt.substring(ptPos, ptPos + 1) == " " || "а") ptPos++;
    } else {
      clearInterval(ptInt);
    }
  }, 300);

  // Generate tab list item
  function makeTab(list, key, clickHandler) {
    let a = document.createElement("a");
    a.className = "nav-link";
    a.id = key;
    a.innerHTML = list[key]["name"];
    // Bind selection on click
    a.addEventListener("click", clickHandler);
    let li = document.createElement("li");
    li.className = "nav-item";
    li.appendChild(a);
    return li;
  }

  // Render source template tabs
  Object.keys(SOURCE_TEMPLATES).forEach(function(key) {
    let li = makeTab(SOURCE_TEMPLATES, key, function(e) {
      if (!this.classList.contains("active")) {
        let txt = SOURCE_TEMPLATES[this.id]["text"];
        document.getElementById("source").value = txt;
        if (!txt) {
          textArea.focus();
        }
        setActiveTab(this);
        inputUpdated();
      }
      e.preventDefault();
    });

    document.getElementById("sourceTemplate").appendChild(li);
  });
  document.querySelector("#sourceTemplate li:first-child a").classList.add("active");

  // Render latin tabs
  Object.keys(T_LITERATOR_CONFIGS).forEach(function(key) {
    let li = makeTab(T_LITERATOR_CONFIGS, key, function(e) {
      if (!this.classList.contains("active")) {
        latinType = this.id;
        t.useConfig(latinType);
        translateInput();
        populateLatinDesc();
        setActiveTab(this);
        if (textArea.value) updateURL();
      }
      e.preventDefault();
    });

    if (!T_LITERATOR_CONFIGS[key]["isEssential"]) li.classList.add("hidden");    
    document.getElementById("latinType").insertBefore(li, document.querySelector("#latinType .expandable-control"));
  });

  // Expand/collapse latin tabs
  document.querySelector("#latinType .expandable-control a").addEventListener("click", function(e) {
    document.getElementById("latinType").classList.toggle("expanded");
    e.preventDefault();
  });

  // Mark tab as active
  function setActiveTab(a) {
    a.closest(".nav").querySelectorAll(".nav-link").forEach((sibling) => (sibling.classList.remove("active")));
    a.classList.add("active");

    let expandableContainer = a.closest(".expandable");
    if (expandableContainer) {
      expandableContainer.querySelectorAll(".nav-item").forEach((sibling) => (sibling.classList.remove("has-active")));
      a.closest(".nav-item").classList.add("has-active");
    }
  };

  // Set theme from cookies
  if (document.cookie.indexOf("theme=dark") >= 0) document.querySelector("body").classList.add("dark");
  
  // React to URL params
  let url = new URL(window.location.href);
  if (url.searchParams.get("l")) {
    latinType = url.searchParams.get("l");
    setActiveTab(document.getElementById(latinType));

    let sourceTemplate = url.searchParams.get("t"); 
    if (sourceTemplate) {
      setActiveTab(document.getElementById(sourceTemplate));
      textArea.value = SOURCE_TEMPLATES[sourceTemplate]["text"];
    } else {
      textArea.value = url.searchParams.get("s");
    }
  } else {
    let latinTab = document.querySelector("#latinType li:first-child a");
    latinType = latinTab.id;
    setActiveTab(latinTab);
    textArea.focus();
  }
  t.useConfig(latinType);
  inputUpdated(true);
  populateLatinDesc();

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

  // Apply browser history
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
    inputUpdated(true);
  });

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
    document.querySelector("#desc p").innerHTML = T_LITERATOR_CONFIGS[latinType]["desc"];

    let dic = t.getConfigTransliterationInfo();
    let html = "<tr><td colspan=6></td></tr>";

    // Populate table
    for (let i = 1; i <= 11; i++) {
      html += "<tr>";
      for (let j = 0; j <= 2; j++) {
        let letter = LETTER_INDEX[i + j*11].toUpperCase() + " " + LETTER_INDEX[i + j*11];
        html += "<th>" + letter + "</th><td>" + dic[letter] + "</td>";
      }
      html += "</tr>";
    }
    document.querySelector("#desc tbody").innerHTML = html;

    // Extra chars, if exist
    if (dic["_others_"]) {
      document.querySelector("#desc dd").innerHTML = dic["_others_"];
      document.querySelector("#desc dl").classList.remove("d-none");
    } else {
      document.querySelector("#desc dl").classList.add("d-none");
    }

    // Link
    if (T_LITERATOR_CONFIGS[latinType]["link"]) {
      document.querySelector("#desc a").href = T_LITERATOR_CONFIGS[latinType]["link"];
      document.querySelector("#desc a").classList.remove("d-none");
    } else {
      document.querySelector("#desc a").classList.add("d-none");
    }
  }

  // Translate input
  function translateInput() {
    resultText.innerHTML = (textArea.value.trim().length) ? t.transliterate(textArea.value).replaceAll("\n", "<br/>") : t.transliterate(textArea.placeholder).replaceAll("\n", "<br/>");
  }

  // Respond to input
  function inputUpdated(skipHistory = false) {
    // If empty
    if (!textArea.value.trim().length) {
      textArea.value = "";
      textArea.style.height = "0px";
      resetIcon.classList.add("d-none");
      copyIcons.classList.add("d-none");
      resultText.classList.add("text-muted");

      // Reset template tabs
      document.querySelectorAll("#sourceTemplate .nav-link").forEach((link) => (link.classList.remove("active")));
      document.getElementById("custom").classList.add("active");
    // If not empty
    } else {
      resetIcon.classList.remove("d-none");
      copyIcons.classList.remove("d-none");
      resultText.classList.remove("text-muted");
    }

    // Textarea auto font size
    let destination = document.getElementById("destination");
    if (textArea.value.trim().length > 200) {
      textArea.classList.remove("fs-5");
      textArea.classList.add("fs-6");
      destination.classList.remove("fs-5");
      destination.classList.add("fs-6");
    } else {
      textArea.classList.remove("fs-6");
      textArea.classList.add("fs-5");
      destination.classList.remove("fs-6");
      destination.classList.add("fs-5");
    }

    // Textarea auto-height
    textArea.style.minHeight = "8rem";
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px" ;
    textArea.style.minHeight = "100%";

    if (!skipHistory) updateURL();
    translateInput();
  }
  
  textArea.addEventListener("input", inputUpdated);
  textArea.addEventListener("keyup", function(e) {
    setActiveTab(document.querySelector("#sourceTemplate li:first-child a"));
    inputUpdated();
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

  // Toggle theme
  document.querySelector(".theme-control").addEventListener("click", function(e) {
    document.querySelector("body").classList.toggle("dark");

    let date = new Date();
    date.setTime(date.getTime() + (365*24*60*60*1000));
    if (document.querySelector("body").classList.contains("dark")) {
      document.cookie = "theme=dark; expires=" + date.toUTCString() + "; path=/";
    } else {
      document.cookie = "theme=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    
    e.preventDefault();
  });
});