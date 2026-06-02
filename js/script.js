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
function openZone(key) {
  var z = ZONES[key];
  if (!z) return;
  activeZone = key;
  
  var zoneName = t(key + ".name");
  var zoneTag = t(key + ".tag");
  var zoneDesc = t(key + ".desc");

  var bgC = z.color + "18";
  document.getElementById("popupHead").innerHTML =
    '<div class="popup-icon-box" style="background:' + bgC + ';border:1px solid ' + z.color + '44">' + z.emoji + '</div>' +
    '<div><div class="popup-zone-name" style="color:' + z.color + '">' + zoneName + '</div>' +
    '<div class="popup-zone-tag">' + zoneTag + ' ZONE</div></div>' +
    '<button class="popup-close" id="popupCloseBtn">&#10005;</button>';
  document.getElementById("popupCloseBtn").addEventListener("click", closePopup);

  document.getElementById("popupHero").style.background = bgC;
  document.getElementById("popupHero").textContent = z.emoji;

  var audioHTML = '<div class="audio-row" id="audioRowEl" style="border-color:' + z.color + '55">' +
    '<div class="audio-play-icon">🔊</div>' +
    '<div class="audio-info"><div class="audio-title">' + t("audioGuide") + '</div><div class="audio-sub">' + t("tapToHear") + '</div></div>' +
    '<div class="wave">' +
    '<div class="wb" style="background:' + z.color + '"></div>' +
    '<div class="wb" style="background:' + z.color + '"></div>' +
    '<div class="wb" style="background:' + z.color + '"></div>' +
    '<div class="wb" style="background:' + z.color + '"></div>' +
    '</div></div>';

  var slidesHTML = '';
  if (z.slides && z.slides.length > 0) {
    slidesHTML = '<div class="section-label">' + t("infoSlides") + '</div><div class="slides-row">';
    z.slides.forEach(function(s, i) {
      slidesHTML += '<div class="slide-card" data-zone="' + key + '" data-idx="' + i + '" style="border-color:' + z.color + '33">' +
        '<div class="sc-icon">' + s.icon + '</div>' +
        '<div class="sc-title">' + s.title + '</div>' +
        '<div class="sc-sub">' + t("tapToExpand") + '</div></div>';
    });
    slidesHTML += '</div>';
  }

  var tagsHTML = '';
  if (z.tags && z.tags.length > 0) {
    tagsHTML = '<div class="tags">';
    z.tags.forEach(function(tag){ tagsHTML += '<span class="tag" style="color:' + z.color + ';border-color:' + z.color + '44">' + tag + '</span>'; });
    tagsHTML += '</div>';
  }

  document.getElementById("popupBody").innerHTML =
    '<p class="popup-desc">' + zoneDesc + '</p>' +
    audioHTML + slidesHTML + tagsHTML;

  document.getElementById("audioRowEl").addEventListener("click", function(){
    var audioFile = selectedLanguage === "english" ? z.audioFileEn : z.audioFile;
    speakText(z.audio, audioFile);
  });
  document.querySelectorAll(".slide-card").forEach(function(card){
    card.addEventListener("click", function(){
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

function speakText(text, audioFile) {
  stopSpeech();
  
  if (audioFile) {
    console.log("🎵 Playing audio:", audioFile);
    var audio = new Audio(audioFile);
    currentAudio = audio;
    audio.onerror = function() {
      console.error("❌ Audio file not found:", audioFile);
      alert("Audio file not found: " + audioFile);
    };
    audio.play();
    return;
  }
  
  console.log("⚠️ No audio file configured for this zone");
}

function stopSpeech() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
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
