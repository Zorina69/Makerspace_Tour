/* ── MAIN APPLICATION SCRIPT ── */
console.log("🌍 Makerspace AR Tour - Multi-Language Edition");

var selectedLanguage = "khmer"; // Default language
var activeZone = null;

/* ── LANGUAGE UPDATE ── */
function updateUILanguage() {
  // Update splash screen text
  document.querySelector(".badge").textContent = t("badge");
  document.querySelector(".main-title").innerHTML = t("mainTitle").replace(t("mainTitleAcc"), '<span class="acc">' + t("mainTitleAcc") + '</span>');
  document.querySelector(".sub").textContent = t("sub");
  document.querySelector(".how-title").textContent = t("howTitle");
  var steps = document.querySelectorAll(".how-step span");
  steps[0].textContent = t("step1");
  steps[1].textContent = t("step2");
  steps[2].textContent = t("step3");
  steps[3].textContent = t("step4");
  document.getElementById("startBtn").textContent = t("scanBtn");
  document.querySelector(".scan-hint").textContent = t("scanHint");
  
  // Update HUD text
  document.querySelector(".hud-title").textContent = "MAKERSPACE AR";
  document.querySelector(".hud-rec span").textContent = t("scanning");
  document.querySelector(".scan-label").textContent = t("pointAtQR");
  document.getElementById("detectedBadge").innerHTML = t("detected");
  document.getElementById("stopBtn").textContent = t("backToMenu");
  
  // Update font based on language
  if (selectedLanguage === "khmer") {
    document.body.classList.add("lang-khmer");
    document.body.classList.remove("lang-english");
  } else {
    document.body.classList.add("lang-english");
    document.body.classList.remove("lang-khmer");
  }
  
  // Rebuild zone strip with new language
  var strip = document.getElementById("zoneStrip");
  if (strip) {
    buildStrip();
  }
  
  console.log("✅ Language & Font updated to:", selectedLanguage);
}

/* ── ZONE STRIP ── */
function buildStrip() {
  var strip = document.getElementById("zoneStrip");
  strip.innerHTML = "";
  Object.keys(ZONES).forEach(function(key) {
    var z = ZONES[key];
    var zoneName = t(key + ".name");
    var btn = document.createElement("button");
    btn.className = "zone-pill";
    btn.textContent = z.emoji + " " + zoneName.toUpperCase();
    btn.style.color = z.color;
    btn.style.borderColor = z.color + "55";
    btn.addEventListener("click", function(){ openZone(key); });
    strip.appendChild(btn);
  });
}

/* ── EVENT LISTENERS ── */
document.addEventListener("DOMContentLoaded", function() {
  /* Language Switcher */
  document.getElementById("langKhmerBtn").addEventListener("click", function(){
    selectedLanguage = "khmer";
    document.getElementById("langKhmerBtn").classList.add("active");
    document.getElementById("langEnglishBtn").classList.remove("active");
    updateUILanguage();
  });
  
  document.getElementById("langEnglishBtn").addEventListener("click", function(){
    selectedLanguage = "english";
    document.getElementById("langEnglishBtn").classList.add("active");
    document.getElementById("langKhmerBtn").classList.remove("active");
    updateUILanguage();
  });

  document.getElementById("startBtn").addEventListener("click", function() {
    document.getElementById("splash").classList.add("out");
    setTimeout(function(){
      document.getElementById("splash").style.display = "none";
      document.getElementById("ar-scene-container").classList.add("visible");
      buildStrip();
      initAR();
    }, 600);
  });

  document.getElementById("stopBtn").addEventListener("click", function() {
    stopAR();
    document.getElementById("ar-scene-container").classList.remove("visible");
    var splash = document.getElementById("splash");
    splash.style.display = "flex";
    setTimeout(function(){ splash.classList.remove("out"); }, 50);
  });

  document.getElementById("smClose").addEventListener("click", closeSlideModal);
  document.getElementById("slideModal").addEventListener("click", function(e){
    if (e.target === this) closeSlideModal();
  });

  var startY = 0;
  var sheet = document.getElementById("popupSheet");
  sheet.addEventListener("touchstart", function(e){ startY = e.touches[0].clientY; });
  sheet.addEventListener("touchend", function(e){
    if (e.changedTouches[0].clientY - startY > 70) closePopup();
  });

  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = function(){ window.speechSynthesis.getVoices(); };
  }
  
  // Initialize UI with default Khmer language and font
  document.body.classList.add("lang-khmer");
  updateUILanguage();
});

/* ── QR CODE SCANNER ── */
var qrScanner = null;
var lastDetectedQR = null;
var qrCooldownTimer = null;
var scannerCanvas = null;
var scannerVideo = null;

function initAR() {
  console.log("🔍 Initializing QR Scanner...");
  
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      console.log("✅ CAMERA ACCESS GRANTED!");
      stream.getTracks().forEach(function(track) { track.stop(); });
      startQRScanner();
    })
    .catch(function(err) {
      console.error("❌ CAMERA ACCESS DENIED:", err.name, err.message);
      alert("⚠️ Camera access blocked!\n\n" + err.message);
    });
}

function startQRScanner() {
  console.log("🚀 Starting QR Scanner with jsQR...");
  
  if (typeof jsQR === 'undefined') {
    console.error("❌ jsQR library not loaded!");
    alert("QR Scanner library failed to load. Reload the page.");
    return;
  }
  
  var qrContainer = document.getElementById("qr-reader");
  scannerVideo = document.createElement("video");
  scannerVideo.style.width = "100%";
  scannerVideo.style.height = "100%";
  scannerVideo.style.objectFit = "cover";
  scannerVideo.setAttribute("playsinline", "true");
  qrContainer.innerHTML = "";
  qrContainer.appendChild(scannerVideo);
  
  scannerCanvas = document.createElement("canvas");
  
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  }).then(function(stream) {
    console.log("✅ Camera stream started");
    scannerVideo.srcObject = stream;
    scannerVideo.play();
    scanLoop();
  }).catch(function(err) {
    console.error("❌ Camera error:", err);
    alert("Could not access camera: " + err.message);
  });
}

function scanLoop() {
  if (!scannerCanvas || !scannerVideo) return;
  
  if (scannerVideo.videoWidth === 0 || scannerVideo.videoHeight === 0) {
    requestAnimationFrame(scanLoop);
    return;
  }
  
  try {
    scannerCanvas.width = scannerVideo.videoWidth;
    scannerCanvas.height = scannerVideo.videoHeight;
    
    var ctx = scannerCanvas.getContext("2d");
    ctx.drawImage(scannerVideo, 0, 0);
    
    var imageData = ctx.getImageData(0, 0, scannerCanvas.width, scannerCanvas.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert"
    });
    
    if (code) {
      var zoneKey = code.data.trim().toLowerCase();
      console.log("📱 QR Scanned:", code.data, "→", zoneKey);
      
      if (ZONES[zoneKey]) {
        console.log("✅ Zone found:", zoneKey);
        
        if (lastDetectedQR !== zoneKey) {
          lastDetectedQR = zoneKey;
          var zoneName = t(zoneKey + ".name");
          showDetectedBadge(zoneName);
          openZone(zoneKey);
          
          var rec = document.querySelector(".hud-rec span");
          if (rec) rec.textContent = t("detected");
          
          clearTimeout(qrCooldownTimer);
          qrCooldownTimer = setTimeout(function() {
            lastDetectedQR = null;
          }, 2000);
        }
      }
    }
  } catch (err) {
    console.error("Scan error:", err);
  }
  
  requestAnimationFrame(scanLoop);
}

function stopAR() {
  console.log("Stopping QR Scanner...");
  
  if (scannerVideo && scannerVideo.srcObject) {
    scannerVideo.srcObject.getTracks().forEach(function(track) {
      track.stop();
    });
    console.log("✓ Camera stream stopped");
  }
  
  closePopup();
  var rec = document.querySelector(".hud-rec span");
  if (rec) rec.textContent = t("scanning");
}

/* ── DETECTED BADGE ── */
var badgeTimer = null;
function showDetectedBadge(name) {
  var badge = document.getElementById("detectedBadge");
  badge.textContent = name.toUpperCase() + " " + t("detected");
  badge.classList.add("show");
  if (badgeTimer) clearTimeout(badgeTimer);
  badgeTimer = setTimeout(function(){ badge.classList.remove("show"); }, 2500);
}

/* ── ZONE POPUP ── */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  var m = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
  return m ? "https://www.youtube.com/embed/" + m[1] + "?playsinline=1" : null;
}

function openZone(key) {
  var z = ZONES[key];
  if (!z) return;
  activeZone = key;

  /* ── Look up matching exhibit data by zone key or by matching ID/name ── */
  var ex = null;
  /* Try direct key match first (e.g. QR code value = exhibit ID) */
  if (EXHIBITS[key.toUpperCase()]) {
    ex = EXHIBITS[key.toUpperCase()];
  } else {
    /* Fallback: find exhibit whose category matches the zone */
    var exKeys = Object.keys(EXHIBITS);
    for (var i = 0; i < exKeys.length; i++) {
      if (exKeys[i].toLowerCase() === key.toLowerCase()) {
        ex = EXHIBITS[exKeys[i]];
        break;
      }
    }
  }

  var zoneName  = t(key + ".name");
  var zoneTag   = t(key + ".tag");
  var zoneDesc  = ex
    ? (selectedLanguage === "english" ? ex.descEng : ex.descKhm)
    : t(key + ".desc");

  var bgC = z.color + "18";

  /* ── Header ── */
  document.getElementById("popupHead").innerHTML =
    '<div class="popup-icon-box" style="background:' + bgC + ';border:1px solid ' + z.color + '44">' + z.emoji + '</div>' +
    '<div><div class="popup-zone-name" style="color:' + z.color + '">' + zoneName + '</div>' +
    '<div class="popup-zone-tag">' + zoneTag + ' ZONE</div></div>' +
    '<button class="popup-close" id="popupCloseBtn">&#10005;</button>';
  document.getElementById("popupCloseBtn").addEventListener("click", closePopup);

  /* ── Hero: image gallery + YouTube ── */
  var heroEl = document.getElementById("popupHero");
  heroEl.style.background = bgC;
  heroEl.innerHTML = "";          /* clear old emoji */

  if (ex) {
    var imgArr = Array.isArray(ex.image) ? ex.image : (ex.image ? [ex.image] : []);
    var embedUrl = getYouTubeEmbedUrl(ex.youtubeVideo);

    if (imgArr.length > 0) {
      var imgEl = document.createElement("img");
      imgEl.src = imgArr[0];
      imgEl.alt = ex.name;
      imgEl.className = "popup-hero-img";
      imgEl.onerror = function() {
        imgEl.style.display = "none";
        heroEl.style.fontSize = "4.5rem";
        heroEl.textContent = ex.emoji;
      };
      heroEl.style.fontSize = "";
      heroEl.appendChild(imgEl);

      /* dot navigation for multiple images */
      if (imgArr.length > 1) {
        var dotsDiv = document.createElement("div");
        dotsDiv.className = "hero-dots";
        imgArr.forEach(function(src, idx) {
          var dot = document.createElement("button");
          dot.className = "hero-dot" + (idx === 0 ? " active" : "");
          dot.style.borderColor = z.color;
          if (idx === 0) dot.style.background = z.color;
          dot.addEventListener("click", function() {
            imgEl.src = src;
            document.querySelectorAll(".hero-dot").forEach(function(d) {
              d.classList.remove("active");
              d.style.background = "transparent";
            });
            dot.classList.add("active");
            dot.style.background = z.color;
          });
          dotsDiv.appendChild(dot);
        });
        heroEl.appendChild(dotsDiv);
      }
    } else {
      heroEl.style.fontSize = "4.5rem";
      heroEl.textContent = ex.emoji;
    }

    /* YouTube embed below image */
    if (embedUrl) {
      var ytWrap = document.createElement("div");
      ytWrap.className = "popup-yt-wrap";
      ytWrap.innerHTML = '<iframe src="' + embedUrl + '" class="popup-yt-frame" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
      heroEl.appendChild(ytWrap);
    }
  } else {
    heroEl.style.fontSize = "4.5rem";
    heroEl.textContent = z.emoji;
  }

  /* ── Language tabs (only when exhibit data exists) ── */
  var langTabsHTML = "";
  if (ex) {
    langTabsHTML =
      '<div class="lang-tabs" id="popupLangTabs">' +
        '<button class="lang-tab' + (selectedLanguage !== "english" ? " active" : "") + '" data-lang="khmer" style="--tc:' + z.color + '">ខ្មែរ</button>' +
        '<button class="lang-tab' + (selectedLanguage === "english" ? " active" : "") + '" data-lang="english" style="--tc:' + z.color + '">English</button>' +
      '</div>';
  }

  /* ── Audio row ── */
  var audioHTML =
    '<div class="audio-row" id="audioRowEl" style="border-color:' + z.color + '55">' +
      '<div class="audio-play-icon" id="audioPlayIcon">🔊</div>' +
      '<div class="audio-info"><div class="audio-title">' + t("audioGuide") + '</div>' +
      '<div class="audio-sub">' + t("tapToHear") + '</div></div>' +
      '<div class="wave">' +
        '<div class="wb" style="background:' + z.color + '"></div>' +
        '<div class="wb" style="background:' + z.color + '"></div>' +
        '<div class="wb" style="background:' + z.color + '"></div>' +
        '<div class="wb" style="background:' + z.color + '"></div>' +
      '</div>' +
    '</div>';

  /* ── Slides ── */
  var slidesHTML = "";
  if (z.slides && z.slides.length > 0) {
    slidesHTML = '<div class="section-label">' + t("infoSlides") + '</div><div class="slides-row">';
    z.slides.forEach(function(s, i) {
      slidesHTML +=
        '<div class="slide-card" data-zone="' + key + '" data-idx="' + i + '" style="border-color:' + z.color + '33">' +
          '<div class="sc-icon">' + s.icon + '</div>' +
          '<div class="sc-title">' + s.title + '</div>' +
          '<div class="sc-sub">' + t("tapToExpand") + '</div>' +
        '</div>';
    });
    slidesHTML += '</div>';
  }

  /* ── Tags ── */
  var tagsArr = (ex && ex.tags) ? ex.tags : (z.tags || []);
  var tagsHTML = "";
  if (tagsArr.length > 0) {
    tagsHTML = '<div class="tags">';
    tagsArr.forEach(function(tag) {
      tagsHTML += '<span class="tag" style="color:' + z.color + ';border-color:' + z.color + '44">' + tag + '</span>';
    });
    tagsHTML += '</div>';
  }

  /* ── Assemble body ── */
  document.getElementById("popupBody").innerHTML =
    langTabsHTML +
    '<p class="popup-desc" id="popupDesc">' + zoneDesc + '</p>' +
    audioHTML + slidesHTML + tagsHTML;

  /* ── Language tab click handlers ── */
  if (ex) {
    document.querySelectorAll(".lang-tab").forEach(function(tab) {
      tab.addEventListener("click", function() {
        document.querySelectorAll(".lang-tab").forEach(function(t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var chosenLang = tab.getAttribute("data-lang");
        document.getElementById("popupDesc").textContent =
          chosenLang === "english" ? ex.descEng : ex.descKhm;
        /* switch TTS language too */
        stopSpeech();
      });
    });
  }

  /* ── Audio row click: TTS using Web Speech API ── */
  document.getElementById("audioRowEl").addEventListener("click", function() {
    var audioFile = selectedLanguage === "english" ? z.audioFileEn : z.audioFile;
    if (audioFile) {
      speakText(null, audioFile);
    } else if (ex) {
      /* fallback to TTS */
      var activeLangTab = document.querySelector(".lang-tab.active");
      var ttsLang = activeLangTab ? activeLangTab.getAttribute("data-lang") : selectedLanguage;
      var ttsText = ttsLang === "english" ? ex.descEng : ex.descKhm;
      var langCode = ttsLang === "english" ? "en-US" : "km-KH";
      speakTTS(ttsText, langCode);
    } else {
      speakText(z.audio, null);
    }
  });

  /* ── Slide cards ── */
  document.querySelectorAll(".slide-card").forEach(function(card) {
    card.addEventListener("click", function() {
      openSlide(card.getAttribute("data-zone"), parseInt(card.getAttribute("data-idx")));
    });
  });

  document.getElementById("popup").classList.add("open");
}

function closePopup() {
  document.getElementById("popup").classList.remove("open");
  stopSpeech();
  activeZone = null;
}

/* ── AUDIO PLAYBACK ── */
var currentAudio = null;
var currentUtterance = null;

function speakText(text, audioFile) {
  stopSpeech();
  if (audioFile) {
    var audio = new Audio(audioFile);
    currentAudio = audio;
    audio.onerror = function() { console.error("Audio file not found:", audioFile); };
    audio.play();
  }
}

function speakTTS(text, langCode) {
  stopSpeech();
  if (!window.speechSynthesis || !text) return;
  var utter = new SpeechSynthesisUtterance(text);
  utter.lang = langCode;
  utter.rate = 0.9;
  if (langCode === "km-KH") {
    var voices = window.speechSynthesis.getVoices();
    var kmVoice = voices.find(function(v) { return v.lang.startsWith("km"); });
    if (kmVoice) utter.voice = kmVoice;
  }
  currentUtterance = utter;
  var icon = document.getElementById("audioPlayIcon");
  if (icon) icon.textContent = "⏹";
  utter.onend = function() {
    currentUtterance = null;
    if (icon) icon.textContent = "🔊";
  };
  window.speechSynthesis.speak(utter);
}

function stopSpeech() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  currentUtterance = null;
}

/* ── SLIDE MODAL ── */
function openSlide(zoneKey, idx) {
  var z = ZONES[zoneKey];
  if (!z.slides || !z.slides[idx]) {
    console.warn("Slide not found:", zoneKey, idx);
    return;
  }
  var s = z.slides[idx];
  document.getElementById("smIcon").textContent = s.icon;
  document.getElementById("smTitle").style.color = z.color;
  document.getElementById("smTitle").textContent = s.title;
  document.getElementById("smBody").textContent = s.body;
  document.getElementById("slideModal").classList.add("open");
}

function closeSlideModal() {
  document.getElementById("slideModal").classList.remove("open");
}
