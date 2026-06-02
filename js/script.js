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
  Object.keys(EXHIBITS).forEach(function(key) {
    var ex = EXHIBITS[key];
    var color = CATEGORY_COLORS[ex.category] || "#00ff88";
    var btn = document.createElement("button");
    btn.className = "zone-pill";
    btn.textContent = ex.emoji + " " + ex.name.toUpperCase();
    btn.style.color = color;
    btn.style.borderColor = color + "55";
    btn.addEventListener("click", function(){ openExhibit(key); });
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

var scanCtx = null; // create context once, outside the loop

function scanLoop() {
  if (!scannerCanvas || !scannerVideo) return;
  
  if (scannerVideo.videoWidth === 0 || scannerVideo.videoHeight === 0) {
    requestAnimationFrame(scanLoop);
    return;
  }
  
  try {
    scannerCanvas.width = scannerVideo.videoWidth;
    scannerCanvas.height = scannerVideo.videoHeight;
    
    if (!scanCtx) {
      scanCtx = scannerCanvas.getContext("2d", { willReadFrequently: true });
    }
    scanCtx.drawImage(scannerVideo, 0, 0);
    
    var imageData = scanCtx.getImageData(0, 0, scannerCanvas.width, scannerCanvas.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert"
    });
    
    if (code) {
      var zoneKey = code.data.trim().toUpperCase(); // EXHIBITS keys are uppercase: "MS-R-001"
      console.log("📱 QR Scanned:", code.data, "→", zoneKey);
      
      if (EXHIBITS[zoneKey]) {
        console.log("✅ Exhibit found:", zoneKey);
        
        if (lastDetectedQR !== zoneKey) {
          lastDetectedQR = zoneKey;
          showDetectedBadge(EXHIBITS[zoneKey].name);
          openExhibit(zoneKey);
          
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

function openExhibit(key) {
  var ex = EXHIBITS[key];
  if (!ex) return;
  activeZone = key;

  var color = CATEGORY_COLORS[ex.category] || "#00ff88";
  var bgC = color + "18";

  /* ── Header ── */
  document.getElementById("popupHead").innerHTML =
    '<div class="popup-icon-box" style="background:' + bgC + ';border:1px solid ' + color + '44">' + ex.emoji + '</div>' +
    '<div><div class="popup-zone-name" style="color:' + color + '">' + ex.name + '</div>' +
    '<div class="popup-zone-tag">' + ex.category + '</div></div>' +
    '<button class="popup-close" id="popupCloseBtn">&#10005;</button>';
  document.getElementById("popupCloseBtn").addEventListener("click", closePopup);

  /* ── Hero: image gallery + YouTube ── */
  var heroEl = document.getElementById("popupHero");
  heroEl.style.background = bgC;
  heroEl.innerHTML = "";

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
    heroEl.appendChild(imgEl);

    if (imgArr.length > 1) {
      var dotsDiv = document.createElement("div");
      dotsDiv.className = "hero-dots";
      imgArr.forEach(function(src, idx) {
        var dot = document.createElement("button");
        dot.className = "hero-dot" + (idx === 0 ? " active" : "");
        dot.style.borderColor = color;
        if (idx === 0) dot.style.background = color;
        dot.addEventListener("click", function() {
          imgEl.src = src;
          document.querySelectorAll(".hero-dot").forEach(function(d) {
            d.classList.remove("active");
            d.style.background = "transparent";
          });
          dot.classList.add("active");
          dot.style.background = color;
        });
        dotsDiv.appendChild(dot);
      });
      heroEl.appendChild(dotsDiv);
    }
  } else {
    heroEl.style.fontSize = "4.5rem";
    heroEl.textContent = ex.emoji;
  }

  if (embedUrl) {
    var ytWrap = document.createElement("div");
    ytWrap.className = "popup-yt-wrap";
    ytWrap.innerHTML = '<iframe src="' + embedUrl + '" class="popup-yt-frame" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
    heroEl.appendChild(ytWrap);
  }

  /* ── Language tabs ── */
  var langTabsHTML =
    '<div class="lang-tabs" id="popupLangTabs">' +
      '<button class="lang-tab' + (selectedLanguage !== "english" ? " active" : "") + '" data-lang="khmer" style="--tc:' + color + '">ខ្មែរ</button>' +
      '<button class="lang-tab' + (selectedLanguage === "english" ? " active" : "") + '" data-lang="english" style="--tc:' + color + '">English</button>' +
    '</div>';

  var zoneDesc = selectedLanguage === "english" ? ex.descEng : ex.descKhm;

  /* ── Audio row ── */
  var audioHTML =
    '<div class="audio-row" id="audioRowEl" style="border-color:' + color + '55">' +
      '<div class="audio-play-icon" id="audioPlayIcon">🔊</div>' +
      '<div class="audio-info"><div class="audio-title">' + t("audioGuide") + '</div>' +
      '<div class="audio-sub">' + t("tapToHear") + '</div></div>' +
      '<div class="wave">' +
        '<div class="wb" style="background:' + color + '"></div>' +
        '<div class="wb" style="background:' + color + '"></div>' +
        '<div class="wb" style="background:' + color + '"></div>' +
        '<div class="wb" style="background:' + color + '"></div>' +
      '</div>' +
    '</div>';

  /* ── Tags ── */
  var tagsHTML = "";
  if (ex.tags && ex.tags.length > 0) {
    tagsHTML = '<div class="tags">';
    ex.tags.forEach(function(tag) {
      tagsHTML += '<span class="tag" style="color:' + color + ';border-color:' + color + '44">' + tag + '</span>';
    });
    tagsHTML += '</div>';
  }

  document.getElementById("popupBody").innerHTML =
    langTabsHTML +
    '<p class="popup-desc" id="popupDesc">' + zoneDesc + '</p>' +
    audioHTML + tagsHTML;

  /* ── Language tab handlers ── */
  document.querySelectorAll(".lang-tab").forEach(function(tab) {
    tab.addEventListener("click", function() {
      document.querySelectorAll(".lang-tab").forEach(function(t) { t.classList.remove("active"); });
      tab.classList.add("active");
      var chosenLang = tab.getAttribute("data-lang");
      document.getElementById("popupDesc").textContent =
        chosenLang === "english" ? ex.descEng : ex.descKhm;
      stopSpeech();
    });
  });

  /* ── Audio: TTS fallback ── */
  document.getElementById("audioRowEl").addEventListener("click", function() {
    var activeLangTab = document.querySelector(".lang-tab.active");
    var ttsLang = activeLangTab ? activeLangTab.getAttribute("data-lang") : selectedLanguage;
    var ttsText = ttsLang === "english" ? ex.descEng : ex.descKhm;
    var langCode = ttsLang === "english" ? "en-US" : "km-KH";
    speakTTS(ttsText, langCode);
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
