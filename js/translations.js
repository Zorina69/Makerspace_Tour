/* ── TRANSLATIONS ── */
var translations = {
  khmer: {
    badge: "ប្រព័ន្ធទស្សនកិច្ចឌីជីថល",
    mainTitle: "ទស្សនកិច្ច រោងជាងឌីជីថល",
    mainTitleAcc: "ទស្សនកិច្ច",
    sub: "ស្កេនលេខ QR ដើម្បីរកការបង្ហាញ",
    howTitle: "-> របៀបដែលវាដំណើរការ៖​",
    step1: "ចុច ចាប់ផ្តើម ហើយអនុញ្ញាតដល់ការបើកកាមេរ៉ា",
    step2: "បែរកាមេរ៉ាទៅរក QR - ព័ត៌មាននឹងលេចឡើងភ្លាមៗ",
    step3: "មើលលម្អិតនិងស្លាកសញ្ញា",
    scanBtn: "ចាប់ផ្ដើម",
    scanHint: "// អនុញ្ញាតដល់ការប្រើប្រាស់កាមេរ៉ាលុះត្រាតែមានការស្នើសុំ",
    backToMenu: "ត្រឡប់ទៅទំព័រដើម",
    scanning: "ការស្កេនដំណើរការ",
    detected: "រកឃើញ",
    pointAtQR: "ចង្អុលកាមេរ៉ាទៅលេខ QR"
  },
  english: {
    badge: "DIGITAL TOUR",
    mainTitle: "MAKERSPACE TOUR",
    mainTitleAcc: "SPACE",
    sub: "Scan QR codes to explore exhibits",
    howTitle: "// HOW IT WORKS",
    step1: "Tap START and allow camera access",
    step2: "Point camera at any QR code — exhibit info pops up instantly",
    step3: "View exhibit description and tags",
    scanBtn: "START",
    scanHint: "// allow camera when prompted",
    backToMenu: "BACK TO MENU",
    scanning: "SCANNING",
    detected: "DETECTED",
    pointAtQR: "POINT AT QR CODE"
  }
};

function t(key) {
  // Get translation by key: "zone.name" or "scanBtn"
  var parts = key.split(".");
  var obj = translations[selectedLanguage];
  for (var i = 0; i < parts.length; i++) {
    obj = obj[parts[i]];
  }
  return obj || key;
}
