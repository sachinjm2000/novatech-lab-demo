(function () {
  "use strict";
  var LAB = window.LAB;
  var PAGE = document.body.getAttribute("data-page") || "home";   // "home" (lean) or "tests" (everything else)
  var NOOP = document.createElement("input");                        // stand-in so shared code can run on pages without an element
  var lang = "en";
  var selected = new Set();           // English names of chosen packages/tests; sent to WhatsApp as the "cart"
  var area = "", cat = "popular", pkgTag = "all";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try { var saved = localStorage.getItem("lab_lang"); if (saved === "mr" || saved === "en") lang = saved; } catch (e) {}
  try { (JSON.parse(sessionStorage.getItem("lab_sel") || "[]")).forEach(function (n) { selected.add(n); }); } catch (e) {}
  var params = new URLSearchParams(location.search);

  /* ---------- text (English / Marathi) ---------- */
  var T = {
    en: {
      brandSub: "Pathology Laboratory · Sangli", navPackages: "Packages", navTests: "Tests", navHome: "Home collection", navContact: "Contact",
      eyebrow: "Inside Novatech Multispeciality Hospital, Sangli",
      heroPre: "Your blood tests,", rot1: "under one roof", rot2: "at your doorstep", rot3: "reports on WhatsApp",
      heroSub: "Walk in at the hospital, or book home sample collection in Sangli, Miraj and Kupwad. Reports come to your WhatsApp.",
      ctaWhatsapp: "Book on WhatsApp", ctaCall: "Call the lab",
      statTests: "tests you can book", statPkgs: "health packages", statAreas: "home-collection areas",
      areaTitle: "Is home collection available in your area?", areaPick: "Choose your area",
      areaBook: "Book home collection", uploadRx: "Have a prescription? Send a photo on WhatsApp",
      tilesTitle: "What are you looking for?", tilesSub: "Tap an option to jump straight to the right tests.",
      s1t: "Book", s1d: "On WhatsApp, by phone, or walk in.", s2t: "Sample", s2d: "Collected at the hospital or at your home.",
      s3t: "Test", s3d: "Tested in the hospital laboratory.", s4t: "Report", s4d: "Sent on WhatsApp; also at the lab counter.",
      pkgTitle: "Health checkup packages", pkgSub: "Tap a package to see what is inside. Tap Add to put it on your list, then send everything in one WhatsApp message.",
      testTitle: "All tests", testSub: "Every test our hospital consultants and referring doctors commonly request. Tap a test to learn about it, or Add it to your list. Cannot find yours? Send the prescription photo.",
      testNote: "Some specialised tests may be sent to a partner reference laboratory; we will confirm price and report time when you book. Which tests you need is for your doctor to decide.",
      popularTab: "Popular", testSearch: "Search all tests, e.g. thyroid", testEmpty: "No match. Send us the test name on WhatsApp and we will check.",
      homeTitle: "Home sample collection", homeSub: "A trained phlebotomist visits you. We collect in these areas:", homeHours: "Collection time:", homeHow: "How it works",
      homeT1: "Book on WhatsApp or by phone and pick a time.", homeT2: "Be at home; we bring everything needed.", homeT3: "Receive your report on WhatsApp.",
      docTitle: "For referring doctors and clinics", docSub: "Send your patients to a laboratory that is easy to work with.",
      docT1: "Sample pickup from your clinic in Sangli and Miraj.", docT2: "Reports sent to you and your patient on WhatsApp.",
      docT3: "Pathologist available to discuss unusual results.", docT4: "Histopathology, FNAC and biopsy handled in-house.", docCta: "Talk to the lab",
      faqTitle: "Common questions",
      contactTitle: "Find the lab", cAddr: "Address", cLab: "Lab timings", cReport: "Reports", cPhone: "Phone", cPath: "Pathologist", cAccr: "Accreditation", cMap: "Open in Google Maps",
      inHospital: "Inside the hospital", inHospitalD: "The lab is part of Novatech Multispeciality Hospital, so tests advised by our consultants are one corridor away.",
      disclaimer: "Tests should be done as advised by your doctor. This website is information only and does not replace medical advice.",
      selected: "selected", clear: "Clear", sendWa: "Send on WhatsApp",
      add: "Add", added: "Added", includes: "Includes", tatWord: "Report",
      pickArea: "Select your area to check.", availYes: "Home collection is available in {a}.", availNo: "Please call us to confirm collection in your area.",
      otherArea: "Other area", chooseArea: "Choose area…", chooseOpt: "Choose…", confirm: "confirm",
      mClose: "Close", mAbout: "About this test", mNoInfo: "Ask us on WhatsApp if you would like to know more about this test.",
      mAddList: "Add to my list", mInList: "In my list ✓", mBook: "Book on WhatsApp", mMore: "More in this group", mView: "View details →", mAdded: "Added: ", mRemoved: "Removed: ",
      waHello: "Hello, I would like to book a test at {l}, Sangli.", waArea: "Hello, I would like home sample collection. My area: {a}.",
      waRx: "Hello, I am sending my prescription. Please tell me the tests, price and report time.",
      waDoc: "Hello, I am a doctor / clinic. I would like to know about sample pickup and reports.",
      waCart: "Hello, I would like to book:", waAreaLine: "Area: {a}", waName: "Name:", waOne: "Hello, I would like to book: {n}"
    },
    mr: {
      brandSub: "पॅथॉलॉजी लॅब · सांगली", navPackages: "पॅकेजेस", navTests: "तपासण्या", navHome: "घरी नमुना संकलन", navContact: "संपर्क",
      eyebrow: "नोव्हाटेक मल्टिस्पेशालिटी हॉस्पिटल, सांगली येथे",
      heroPre: "तुमच्या रक्त तपासण्या,", rot1: "एकाच छताखाली", rot2: "तुमच्या दारात", rot3: "रिपोर्ट WhatsApp वर",
      heroSub: "हॉस्पिटलमध्ये येऊन तपासणी करा किंवा सांगली, मिरज, कुपवाड येथे घरी नमुना संकलन बुक करा. रिपोर्ट WhatsApp वर.",
      ctaWhatsapp: "WhatsApp वर बुक करा", ctaCall: "लॅबला कॉल करा",
      statTests: "बुक करता येणाऱ्या तपासण्या", statPkgs: "आरोग्य पॅकेजेस", statAreas: "घरी संकलनाचे परिसर",
      areaTitle: "तुमच्या परिसरात घरी नमुना संकलन उपलब्ध आहे का?", areaPick: "परिसर निवडा",
      areaBook: "घरी नमुना संकलन बुक करा", uploadRx: "चिठ्ठी आहे? WhatsApp वर फोटो पाठवा",
      tilesTitle: "तुम्हाला काय हवे आहे?", tilesSub: "पर्यायावर दाबा आणि थेट योग्य तपासण्यांकडे जा.",
      s1t: "बुक करा", s1d: "WhatsApp, फोन किंवा प्रत्यक्ष या.", s2t: "नमुना", s2d: "हॉस्पिटलमध्ये किंवा तुमच्या घरी घेतला जातो.",
      s3t: "तपासणी", s3d: "हॉस्पिटलच्या लॅबमध्ये तपासणी.", s4t: "रिपोर्ट", s4d: "WhatsApp वर; लॅब काउंटरवरही मिळतो.",
      pkgTitle: "आरोग्य तपासणी पॅकेजेस", pkgSub: "पॅकेजमध्ये काय आहे ते पाहण्यासाठी त्यावर दाबा. यादीत टाकण्यासाठी “जोडा” दाबा, मग सर्व एकाच WhatsApp संदेशात पाठवा.",
      testTitle: "सर्व तपासण्या", testSub: "आमचे हॉस्पिटलमधील डॉक्टर आणि संदर्भ देणारे डॉक्टर सामान्यतः सांगतात त्या सर्व तपासण्या. माहिती पाहण्यासाठी तपासणीवर दाबा किंवा यादीत “जोडा”. तुमची तपासणी सापडत नाही? चिठ्ठीचा फोटो पाठवा.",
      testNote: "काही विशेष तपासण्या भागीदार संदर्भ लॅबमध्ये पाठवाव्या लागू शकतात; बुकिंगच्या वेळी दर व रिपोर्टची वेळ कळवू. कोणत्या तपासण्या हव्यात हे तुमच्या डॉक्टरांनी ठरवावे.",
      popularTab: "लोकप्रिय", testSearch: "सर्व तपासण्यांत शोधा, उदा. थायरॉईड", testEmpty: "काही सापडले नाही. तपासणीचे नाव WhatsApp वर पाठवा, आम्ही कळवू.",
      homeTitle: "घरी नमुना संकलन", homeSub: "प्रशिक्षित कर्मचारी तुमच्या घरी येतात. या परिसरांत सेवा उपलब्ध:", homeHours: "संकलनाची वेळ:", homeHow: "कसे चालते",
      homeT1: "WhatsApp किंवा फोनवर बुक करा आणि वेळ निवडा.", homeT2: "घरी थांबा; लागणारे सर्व साहित्य आम्ही आणतो.", homeT3: "रिपोर्ट WhatsApp वर मिळवा.",
      docTitle: "संदर्भ देणारे डॉक्टर व क्लिनिकसाठी", docSub: "तुमच्या रुग्णांना सोयीची लॅब.",
      docT1: "सांगली व मिरजमधील तुमच्या क्लिनिकमधून नमुना संकलन.", docT2: "रिपोर्ट तुम्हाला व रुग्णाला WhatsApp वर.",
      docT3: "वेगळ्या निकालांवर चर्चेसाठी पॅथॉलॉजिस्ट उपलब्ध.", docT4: "हिस्टोपॅथॉलॉजी, एफएनएसी व बायोप्सी इथेच.", docCta: "लॅबशी बोला",
      faqTitle: "नेहमी विचारले जाणारे प्रश्न",
      contactTitle: "लॅब कुठे आहे", cAddr: "पत्ता", cLab: "लॅबची वेळ", cReport: "रिपोर्ट", cPhone: "फोन", cPath: "पॅथॉलॉजिस्ट", cAccr: "मान्यता", cMap: "गुगल मॅपमध्ये उघडा",
      inHospital: "हॉस्पिटलमध्येच", inHospitalD: "ही लॅब नोव्हाटेक मल्टिस्पेशालिटी हॉस्पिटलचाच भाग आहे, त्यामुळे आमच्या डॉक्टरांनी सांगितलेल्या तपासण्या जवळच होतात.",
      disclaimer: "तपासण्या डॉक्टरांच्या सल्ल्यानुसार कराव्यात. ही वेबसाइट फक्त माहितीसाठी आहे, वैद्यकीय सल्ल्याचा पर्याय नाही.",
      selected: "निवडले", clear: "रद्द करा", sendWa: "WhatsApp वर पाठवा",
      add: "जोडा", added: "जोडले", includes: "यात समाविष्ट", tatWord: "रिपोर्ट",
      pickArea: "तपासण्यासाठी परिसर निवडा.", availYes: "{a} मध्ये घरी नमुना संकलन उपलब्ध आहे.", availNo: "तुमच्या परिसरासाठी कृपया कॉल करून खात्री करा.",
      otherArea: "इतर परिसर", chooseArea: "परिसर निवडा…", chooseOpt: "निवडा…", confirm: "निश्चित करा",
      mClose: "बंद करा", mAbout: "या तपासणीबद्दल", mNoInfo: "या तपासणीबद्दल अधिक माहिती हवी असल्यास WhatsApp वर विचारा.",
      mAddList: "माझ्या यादीत जोडा", mInList: "यादीत आहे ✓", mBook: "WhatsApp वर बुक करा", mMore: "या गटातील आणखी", mView: "तपशील पहा →", mAdded: "जोडले: ", mRemoved: "काढले: ",
      waHello: "नमस्कार, मला {l}, सांगली येथे तपासणी बुक करायची आहे.", waArea: "नमस्कार, मला घरी नमुना संकलन हवे आहे. माझा परिसर: {a}.",
      waRx: "नमस्कार, मी माझी चिठ्ठी पाठवत आहे. कृपया तपासण्या, दर आणि रिपोर्टची वेळ कळवा.",
      waDoc: "नमस्कार, मी डॉक्टर / क्लिनिक आहे. नमुना संकलन व रिपोर्टबद्दल माहिती हवी आहे.",
      waCart: "नमस्कार, मला खालील तपासण्या बुक करायच्या आहेत:", waAreaLine: "परिसर: {a}", waName: "नाव:", waOne: "नमस्कार, मला बुक करायचे आहे: {n}"
    }
  };
  var X = window.X || { en: {}, mr: {} };
  Object.keys(X.en).forEach(function (k) { T.en[k] = X.en[k]; });
  Object.keys(X.mr).forEach(function (k) { T.mr[k] = X.mr[k]; });

  function t(k) { return (T[lang] && T[lang][k]) || T.en[k] || k; }
  function L(o, k) { return (lang === "mr" && o[k + "_mr"]) ? o[k + "_mr"] : o[k]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function tbd() { return '<span class="tbd">' + esc(t("confirm")) + "</span>"; }
  function q(sel, root) { return (root || document).querySelector(sel) || NOOP; }
  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var ICONS = {
    clip: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
    shield: '<path d="M12 3l7 3v5c0 5-3.2 8-7 10-3.8-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    water: '<path d="M8 4s4 4 4 7a4 4 0 0 1-8 0c0-3 4-7 4-7zM17 12s3 3 3 5a3 3 0 0 1-6 0c0-2 3-5 3-5z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    butterfly: '<path d="M12 12c-2-4-6-5-8-3s0 6 3 6c2 0 4-1 5-3zM12 12c2-4 6-5 8-3s0 6-3 6c-2 0-4-1-5-3z"/><path d="M12 8v10"/>',
    venus: '<circle cx="12" cy="9" r="5"/><path d="M12 14v7M9 18h6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    thermo: '<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9"/>',
    leaf: '<path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14z"/><path d="M5 19l9-9"/>',
    germ: '<circle cx="12" cy="12" r="5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/><circle cx="10.5" cy="11" r=".8"/><circle cx="13.5" cy="13" r=".8"/>',
    tube: '<path d="M9 3h6M10 3v15a2 2 0 0 0 4 0V3M10 12h4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
    flower: '<circle cx="12" cy="12" r="2.4"/><circle cx="12" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="12" r="2.4"/>',
    lens: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    arrow: '<path d="M7 17L17 7M9 7h8v8"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
  };
  // MarketSmith-style pastel card colours: card background + solid icon circle
  var PAL = [{ bg: "#d9f9e6", ic: "#2fcc55" }, { bg: "#fff0d6", ic: "#ff8a73" }, { bg: "#d8d0fc", ic: "#9b7cf5" }, { bg: "#e3fbbd", ic: "#79c93c" },
             { bg: "#fbe3b0", ic: "#f5a900" }, { bg: "#cdeaf8", ic: "#2bb6ee" }, { bg: "#f4d3fb", ic: "#d95fee" }, { bg: "#d9f9e6", ic: "#2fcc55" }];
  function pal(i) { return PAL[i % PAL.length]; }
  function palStyle(i) { var p = pal(i); return "--bg:" + p.bg + ";--ic:" + p.ic; }
  function pkgIcon(n) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || ICONS.drop) + "</svg>"; }
  function testName(n) { return (lang === "mr" && LAB.mrNames && LAB.mrNames[n]) || n; }
  function isFastTest(n) { return LAB.fastingTests.indexOf(n) > -1; }
  function pkgByName(n) { return LAB.packages.filter(function (p) { return p.name === n; })[0]; }
  function pkgById(id) { return LAB.packages.filter(function (p) { return p.id === id; })[0]; }
  function catOfTest(n) { return LAB.categories.filter(function (c) { return c.tests.indexOf(n) > -1; })[0]; }
  function scrollToEl(sel) { var el = q(sel); if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }

  /* ---------- WhatsApp / call ---------- */
  function waLink(text) {
    var num = LAB.whatsapp ? String(LAB.whatsapp).replace(/\D/g, "") : "";
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(text);
  }
  function waText(kind) {
    var l = LAB.labName;
    if (kind === "area") return area ? t("waArea").replace("{a}", area) : t("waHello").replace("{l}", l);
    if (kind === "rx") return t("waRx");
    if (kind === "doctor") return t("waDoc");
    if (kind === "report") return t("waReport");
    if (kind === "opd") return t("waOpd");
    if (kind === "org") return t("waOrg");
    if (kind === "cart") {
      var lines = [t("waCart")];
      selected.forEach(function (n) { lines.push("• " + n); });
      if (area) lines.push(t("waAreaLine").replace("{a}", area));
      lines.push(t("waName"));
      return lines.join("\n");
    }
    return t("waHello").replace("{l}", l);
  }
  function wireLinks() {
    qa("[data-wa]").forEach(function (a) {
      var kind = a.getAttribute("data-wa");
      a.href = (kind === "report" && LAB.reportUrl) ? LAB.reportUrl : waLink(waText(kind));
      a.target = "_blank"; a.rel = "noopener";
    });
    qa("[data-call]").forEach(function (a) { a.href = LAB.phone ? "tel:" + String(LAB.phone).replace(/[^\d+]/g, "") : "#contact"; });
    var map = q("#mapBtn"); map.hidden = !LAB.mapUrl && !LAB.draft; map.href = LAB.mapUrl || "#contact";
    var rv = q("#reviewLink"); rv.hidden = !LAB.reviewUrl; if (LAB.reviewUrl) rv.href = LAB.reviewUrl;
  }

  /* ---------- static fields ---------- */
  function fillFields() {
    var v = { labName: LAB.labName, hospital: LAB.hospital, city: LAB.city, address: LAB.address, hoursLab: LAB.hours.lab, hoursHome: LAB.hours.homeCollection,
      hoursReport: LAB.hours.reportTime, phone: LAB.phone, pathologist: LAB.pathologist, accreditation: LAB.accreditation };
    qa("[data-lab]").forEach(function (el) {
      var val = v[el.getAttribute("data-lab")], isRow = el.tagName === "DD";
      if (val) { el.textContent = val; if (isRow) { el.hidden = false; el.previousElementSibling.hidden = false; } }
      else if (LAB.draft) { el.innerHTML = tbd(); if (isRow) { el.hidden = false; el.previousElementSibling.hidden = false; } }
      else { el.textContent = ""; if (isRow) { el.hidden = true; el.previousElementSibling.hidden = true; } }
    });
  }
  function renderTrust() {
    var items = [t("eyebrow").replace(/ ?, ?Sangli| येथे/g, ""), lang === "mr" ? "रिपोर्ट WhatsApp वर" : "Reports on WhatsApp",
      lang === "mr" ? "सांगली · मिरज · कुपवाड येथे घरी संकलन" : "Home collection: Sangli · Miraj · Kupwad"];
    var html = items.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
    if (LAB.hours.reportTime) html += "<li>" + esc(LAB.hours.reportTime) + "</li>";
    else if (LAB.draft) html += "<li>" + (lang === "mr" ? "रिपोर्ट वेळ " : "Report time ") + tbd() + "</li>";
    if (LAB.accreditation) html += "<li>" + esc(LAB.accreditation) + "</li>";
    q("#trust").innerHTML = html;
  }
  function fmtNum(n, el) { return (+n).toLocaleString("en-IN") + ((el && el.getAttribute("data-suffix")) || ""); }
  function renderStats() {
    var el = q("#statBand"); if (el === NOOP) return;
    var nTests = LAB.categories.reduce(function (s, c) { return s + c.tests.length; }, 0);
    var defs = [];
    if (LAB.testsDone) defs.push(["check", LAB.testsDone, "bandDone", LAB.testsDoneSuffix || ""]);
    else if (LAB.draft) defs.push(["check", null, "bandDone", ""]);          // demo: placeholder until a real count exists
    defs.push(["tube", nTests, "bandTests", ""], ["shield", LAB.packages.length, "bandPkgs", ""], ["home", LAB.areas.length, "bandAreas", ""], ["user", LAB.consultantCount || 0, "bandDocs", ""]);
    el.setAttribute("data-n", defs.length);
    el.innerHTML = defs.map(function (d) {
      var show = d[1] === null ? "—" : (reduceMotion || statsPlayed ? fmtNum(d[1], { getAttribute: function () { return d[3]; } }) : "0");
      return '<div class="sb-item"><span class="sb-ico">' + pkgIcon(d[0]) + '</span><div><b' + (d[1] === null ? "" : ' data-count="' + d[1] + '" data-suffix="' + esc(d[3]) + '"') + ">" + show + "</b><span>" + esc(t(d[2])) + (d[1] === null ? " " + tbd() : "") + "</span></div></div>";
    }).join("");
    if (reduceMotion || statsPlayed) { statStart = null; return; }
    var started = false;
    function inView() { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight * 0.9; }
    function start() {
      if (started) return; started = true; statsPlayed = true;
      qa("[data-count]", el).forEach(function (n) {
        var end = +n.getAttribute("data-count"), t0 = null;
        function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1200, 1); n.textContent = fmtNum(Math.round(end * (1 - Math.pow(1 - p, 3))), p < 1 ? null : n); if (p < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
        setTimeout(function () { n.textContent = fmtNum(end, n); }, 1600);   // never leave a 0 on screen if animation frames are paused
      });
    }
    statStart = function () { if (inView()) start(); };
    if ("IntersectionObserver" in window) { var io2 = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io2.disconnect(); start(); } }, { threshold: 0.3 }); io2.observe(el); }
    setTimeout(statStart, 1200);
  }
  var statStart = null, statsPlayed = false;
  window.addEventListener("scroll", function () { if (statStart) statStart(); }, { passive: true });

  /* ---------- colourful test-group cards (home) ---------- */
  function renderTiles() {
    q("#tiles").innerHTML = LAB.homeCards.map(function (x, i) {
      var c = x.cat ? LAB.categories.filter(function (k) { return k.id === x.cat; })[0] : null;
      var title = c ? L(c, "name") : L(x, "title"), desc = c ? L(c, "desc") : L(x, "desc"), svg = c ? c.svg : x.svg, meta;
      if (c) meta = c.tests.length + " " + t("testsWord");
      else { var tag = x.to; var n = LAB.packages.filter(function (p) { return tag === "all" || (p.tags || []).indexOf(tag) > -1; }).length; meta = n + " " + t("pkgsWord"); }
      var href = x.type === "cat" ? "tests.html?cat=" + x.to + "#tests" : (x.to === "all" ? "#featured" : "tests.html?pkg=" + x.to + "#packages");
      return '<a class="rcard rv" href="' + esc(href) + '" style="' + palStyle(i) + ";--i:" + i + '"><span class="rc-ico">' + pkgIcon(svg) + "</span><h3>" + esc(title) +
        "</h3><p>" + esc(desc) + '</p><b class="rc-meta">' + esc(meta) + '</b><span class="rc-btn">' + esc(L(x, "cta")) + "</span></a>";
    }).join("");
  }
  function go(spec) {
    var p = spec.split(":"), type = p[0], to = p[1];
    if (type === "cat") { cat = to; q("#testSearch").value = ""; renderTests(); scrollToEl("#tests"); }
    if (type === "pkg") { pkgTag = to; renderPkgFilter(); renderPackages(); scrollToEl("#packages"); }
  }

  /* ---------- areas ---------- */
  function renderAreas() {
    var sel = q("#areaSel");
    sel.innerHTML = '<option value="">' + esc(t("chooseArea")) + "</option>" +
      LAB.areas.map(function (a) { return '<option value="' + esc(a) + '">' + esc(a) + "</option>"; }).join("") +
      '<option value="__other">' + esc(t("otherArea")) + "</option>";
    sel.value = area === "" ? "" : (LAB.areas.indexOf(area) > -1 ? area : "__other");
    renderAreaChips();
    updateAreaResult();
  }
  function renderAreaChips() {
    q("#areaChips").innerHTML = LAB.areas.map(function (a) {
      return '<li><button type="button" class="achip" data-area="' + esc(a) + '" aria-pressed="' + (area === a) + '">' + esc(a) + "</button></li>";
    }).join("");
  }
  function setArea(v) {
    area = v; var sel = q("#areaSel");
    sel.value = v === "" ? "" : (LAB.areas.indexOf(v) > -1 ? v : "__other");
    updateAreaResult(); renderAreaChips(); wireLinks();
  }
  function updateAreaResult() {
    var el = q("#areaResult"), sel = q("#areaSel").value;
    el.className = "area-result";
    if (!sel) { el.textContent = t("pickArea"); return; }
    if (sel === "__other") { el.textContent = t("availNo"); return; }
    el.className = "area-result ok";
    var msg = t("availYes").replace("{a}", sel);
    if (LAB.hours.homeCollection) msg += " " + LAB.hours.homeCollection;
    el.textContent = msg;
  }

  /* ---------- trust grid, season ribbon ---------- */
  function renderTrustGrid() {
    function flag(key) { var v = LAB.claims[key]; return v === true ? "show" : (v === null && LAB.draft ? "tbd" : "hide"); }
    var rows = [], f;
    if (LAB.pathologist) rows.push(["👩‍⚕️", t("trPath") + " — " + LAB.pathologist, ""]);
    else if ((f = flag("pathologistOverseen")) !== "hide") rows.push(["👩‍⚕️", t("trPath"), f === "tbd" ? tbd() : ""]);
    if ((f = flag("reportsChecked")) !== "hide") rows.push(["✅", t("trVerify"), f === "tbd" ? tbd() : ""]);
    if ((f = flag("shareWithDoctor")) !== "hide") rows.push(["🤝", t("trConsult"), f === "tbd" ? tbd() : ""]);
    if (LAB.accreditation) rows.push(["🏅", t("trAccr") + ": " + LAB.accreditation, ""]);
    else if (LAB.draft) rows.push(["🏅", t("trAccr"), tbd()]);
    if ((f = flag("privacy")) !== "hide") rows.push(["🔒", t("trPrivacy"), f === "tbd" ? tbd() : ""]);
    q("#why").hidden = rows.length === 0;
    q("#trustGrid").innerHTML = rows.map(function (r, i) {
      return '<div class="tcard rv" style="--i:' + i + '"><span class="tc-ico">' + r[0] + "</span><p>" + esc(r[1]) + " " + r[2] + "</p></div>";
    }).join("");
  }
  function renderSeason() {
    var s = LAB.seasonal, p = s && pkgById(s.packageId), el = q("#season");
    if (!p) { el.innerHTML = ""; return; }
    el.innerHTML = '<div class="season"><span class="pulse"></span><div><b>' + esc(L(s, "text")) + "</b> · " + esc(L(s, "sub")) + '</div><button type="button" class="btn btn-primary sm" data-open="pkg:' + esc(p.id) + '">' + esc(t("seasonGo")) + "</button></div>";
  }

  /* ---------- packages / tests / faq ---------- */
  function priceHtml(p) { return p ? "₹" + esc(p) : "₹ " + (LAB.draft ? tbd() : "—"); }
  function tatHtml(x) { return x ? esc(x) : (LAB.draft ? t("tatWord") + " " + tbd() : ""); }
  function addBtn(name, big) {
    var on = selected.has(name);
    return '<button type="button" class="add' + (big ? " big" : "") + '" data-add="' + esc(name) + '" aria-pressed="' + on + '">' + esc(on ? t("added") : t("add")) + "</button>";
  }
  function hrs(s) { return lang === "mr" ? String(s).replace("hrs", "तास").replace("as advised", "सांगितल्यानुसार") : s; }
  function fastChip(fasting) {
    fasting = fasting && hrs(fasting);
    if (!fasting) return '<span class="fast no">' + esc(t("fastNo")) + "</span>";
    return '<span class="fast">' + esc(t("fastYes").replace("{h}", fasting)) + "</span>";
  }
  var PKG_TAGS = [["all", "fAll"], ["men", "fMen"], ["women", "fWomen"], ["senior", "fSenior"], ["diabetes", "fDiab"], ["heart", "fHeart"], ["kidney", "fKidney"], ["fever", "fFever"], ["surgery", "fSurgery"]];
  function renderPkgFilter() {
    q("#pkgFilter").innerHTML = PKG_TAGS.map(function (x) {
      return '<button type="button" role="tab" class="tab" data-pkgtag="' + x[0] + '" aria-selected="' + (pkgTag === x[0]) + '">' + esc(t(x[1])) + "</button>";
    }).join("");
  }
  function renderPackages() {
    var list = (PAGE === "home" && pkgTag === "all") ? LAB.packages.filter(function (p) { return p.featured; })
      : LAB.packages.filter(function (p) { return pkgTag === "all" || (p.tags || []).indexOf(pkgTag) > -1; });
    q("#pkgGrid").innerHTML = list.map(function (p, i) {
      return '<article class="card pkg' + (selected.has(p.name) ? " sel" : "") + '" style="--i:' + i + ';--ic:' + pal(i + 1).ic + '" data-open="pkg:' + esc(p.id) + '" tabindex="0" role="button" aria-label="' + esc(L(p, "name")) + '">' +
        '<span class="arrow sm" aria-hidden="true">' + pkgIcon("arrow") + '</span><div class="pkg-head"><span class="pkg-ico" style="--ic:' + pal(i + 1).ic + '">' + pkgIcon(p.icon) + '</span><div><h3>' + esc(L(p, "name")) + '</h3><p class="for">' + esc(L(p, "for")) + "</p></div></div>" +
        '<div class="chips-row">' + fastChip(p.fasting) + '<span class="fast tat">' + tatHtml(p.tat) + "</span></div>" +
        '<ul class="inc">' + p.includes.slice(0, 4).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") +
        (p.includes.length > 4 ? '<li class="more">+' + (p.includes.length - 4) + " …</li>" : "") + "</ul>" +
        '<div class="foot-row"><div class="price">' + priceHtml(p.price) + "</div>" + addBtn(p.name) + "</div>" +
        '<span class="view">' + esc(t("mView")) + "</span></article>";
    }).join("");
  }
  function catList() { return [{ id: "popular", name: t("popularTab"), name_mr: t("popularTab"), svg: "star", tests: LAB.popular }].concat(LAB.categories); }
  function renderTests() {
    var term = q("#testSearch").value.trim().toLowerCase(), list;
    if (term) {
      var seen = {}; list = [];
      LAB.categories.forEach(function (c) { c.tests.forEach(function (n) {
        var mr = (LAB.mrNames && LAB.mrNames[n]) || "";
        if (!seen[n] && (n.toLowerCase().indexOf(term) > -1 || mr.toLowerCase().indexOf(term) > -1)) { seen[n] = 1; list.push(n); }
      }); });
    } else list = catList().filter(function (c) { return c.id === cat; })[0].tests;
    q("#testTabs").innerHTML = catList().map(function (c, i) {
      var on = !term && c.id === cat;
      return '<button type="button" role="tab" class="ctab" data-tab="' + esc(c.id) + '" aria-selected="' + on + '" style="' + palStyle(i) + '"><span class="rc-ico sm">' + pkgIcon(c.svg) + '</span><span class="ct-tx"><b>' + esc(L(c, "name")) + "</b><small>" + c.tests.length + " " + esc(t("testsWord")) + "</small></span>" + '<span class="arrow sm" aria-hidden="true">' + pkgIcon("arrow") + "</span></button>";
    }).join("");
    q("#testList").innerHTML = list.map(function (n, i) {
      var p = LAB.prices && LAB.prices[n], c = catOfTest(n), ci = c ? LAB.categories.indexOf(c) + 1 : 0, info = LAB.testInfo && LAB.testInfo[n];
      var desc = info ? String(info[lang] || info.en).split(/(?<=[.।])\s/)[0] : (c ? L(c, "desc") : "");
      return '<li class="trow' + (selected.has(n) ? " is-sel" : "") + '" data-open="test:' + esc(n) + '" style="--i:' + Math.min(i, 12) + ";--ic:" + pal(ci).ic + '">' +
        '<span class="rc-ico sm">' + pkgIcon(c ? c.svg : "drop") + "</span>" +
        '<button type="button" class="tr-main"><b class="tr-name">' + esc(testName(n)) + (isFastTest(n) ? ' <span class="fast sm">' + esc(t("fastTag")) + "</span>" : "") + '</b><span class="tr-desc">' + esc(desc) + "</span></button>" +
        '<span class="pr">' + priceHtml(p) + "</span>" + addBtn(n) + '<span class="arrow" aria-hidden="true">' + pkgIcon("arrow") + "</span></li>";
    }).join("");
    q("#testEmpty").hidden = list.length > 0;
  }
  function renderFaq() {
    q("#faqList").innerHTML = LAB.faqs.map(function (f) { return "<details><summary>" + esc(L(f, "q")) + "</summary><p>" + esc(L(f, "a")) + "</p></details>"; }).join("");
  }

  /* ---------- detail pop-up ---------- */
  var dlg = q("#detail");
  var openKey = null;
  function openDetail(key) {
    openKey = key;
    var kind = key.split(":")[0], name = key.slice(kind.length + 1), html = "";
    if (kind === "list") {
      q("#dlgBody").innerHTML = listHtml();
      if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); document.documentElement.classList.add("lock"); }
      return;
    }
    if (kind === "pkg") {
      var p = pkgById(name); if (!p) return;
      html = '<div class="d-head"><span class="pkg-ico big" style="--ic:' + pal(LAB.packages.indexOf(p) + 1).ic + '">' + pkgIcon(p.icon) + '</span><div><h3 id="dlgTitle">' + esc(L(p, "name")) + '</h3><p class="for">' + esc(L(p, "for")) + "</p></div></div>" +
        '<div class="chips-row">' + fastChip(p.fasting) + '<span class="fast tat">' + tatHtml(p.tat) + "</span></div>" +
        '<h4>' + esc(t("includes")) + '</h4><ul class="d-list">' + p.includes.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" +
        '<div class="d-foot"><div class="price">' + priceHtml(p.price) + "</div>" + dAdd(p.name) + '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + esc(waLink(t("waOne").replace("{n}", p.name))) + '">' + esc(t("mBook")) + "</a></div>";
    } else {
      var c = catOfTest(name), info = LAB.testInfo[name], price = LAB.prices && LAB.prices[name];
      var more = c ? c.tests.filter(function (n) { return n !== name; }).slice(0, 6) : [];
      html = '<div class="d-head"><span class="pkg-ico big" style="--ic:' + pal(c ? LAB.categories.indexOf(c) + 1 : 0).ic + '">' + pkgIcon(c ? c.svg : "drop") + '</span><div><h3 id="dlgTitle">' + esc(testName(name)) + '</h3><p class="for">' + (c ? esc(L(c, "name")) : "") + "</p></div></div>" +
        '<div class="chips-row">' + (isFastTest(name) ? fastChip("8–12 hrs") : "") + "</div>" +
        '<h4>' + esc(t("mAbout")) + "</h4><p>" + esc(info ? (info[lang] || info.en) : t("mNoInfo")) + "</p>" +
        '<div class="d-foot"><div class="price">' + priceHtml(price) + "</div>" + dAdd(name) + '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + esc(waLink(t("waOne").replace("{n}", name))) + '">' + esc(t("mBook")) + "</a></div>" +
        partOfHtml(name) + (more.length ? '<h4>' + esc(t("mMore")) + '</h4><div class="pills">' + more.map(function (n) { return '<button type="button" class="chip" data-open="test:' + esc(n) + '">' + esc(testName(n)) + "</button>"; }).join("") + "</div>" : "");
    }
    q("#dlgBody").innerHTML = html;
    if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); document.documentElement.classList.add("lock"); }
  }
  function dAdd(name) {
    var on = selected.has(name);
    return '<button type="button" class="btn ' + (on ? "btn-primary" : "btn-ghost") + '" data-add="' + esc(name) + '" data-dlg="1">' + esc(on ? t("mInList") : t("mAddList")) + "</button>";
  }
  function closeDetail() { if (dlg.open) dlg.close(); }
  dlg.addEventListener("close", function () { document.documentElement.classList.remove("lock"); openKey = null; });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDetail(); });
  q("#dlgClose").addEventListener("click", closeDetail);

  /* ---------- selection bar, toast ---------- */
  var toastTimer;
  function toast(msg) {
    var el = q("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove("show"); }, 1500);
  }
  function needsFasting() {
    var yes = false;
    selected.forEach(function (n) { var p = pkgByName(n); if ((p && p.fasting) || isFastTest(n)) yes = true; });
    return yes;
  }
  function updateBar(pop) {
    var n = selected.size, bar = q("#bar");
    q("#selCount").textContent = n;
    try { sessionStorage.setItem("lab_sel", JSON.stringify(Array.from(selected))); } catch (e) {}
    q("#barSel").hidden = n === 0;
    bar.classList.toggle("has-sel", n > 0);
    var hint = q("#fastHint"); hint.hidden = !(n > 0 && needsFasting()); hint.textContent = "⏰ " + t("fastHint");
    if (pop) { bar.classList.remove("pop"); void bar.offsetWidth; bar.classList.add("pop"); }
    document.body.classList.toggle("has-sel", n > 0);
    fitBar();
    wireLinks();
  }
  function fitBar() {   // keep page content clear of the fixed bottom bar on every screen size
    requestAnimationFrame(function () {
      var h = q("#bar").offsetHeight; if (h) document.documentElement.style.setProperty("--bar-h", h + "px");
    });
  }
  window.addEventListener("resize", fitBar);
  function toggle(name) {
    var had = selected.has(name);
    if (had) selected.delete(name); else selected.add(name);
    toast((had ? t("mRemoved") : t("mAdded")) + (pkgByName(name) ? L(pkgByName(name), "name") : testName(name)));
    renderPackages(); renderTests(); renderFinder(); updateBar(true);
    if (openKey) openDetail(openKey);
  }

  /* ---------- quick health checks ---------- */
  function gauge(pos, stops) {
    return '<div class="gauge" style="background:linear-gradient(90deg,' + stops + ')"><i style="left:' + Math.max(2, Math.min(98, pos)) + '%"></i></div>';
  }
  function bmiCalc(e) {
    e.preventDefault();
    var h = parseFloat(q("#bmiH").value), w = parseFloat(q("#bmiW").value), out = q("#bmiOut");
    if (!(h > 50 && w > 10)) { out.innerHTML = '<p class="warn">' + esc(t("idFill")) + "</p>"; return; }
    var b = w / Math.pow(h / 100, 2), label, tone;
    if (b < 18.5) { label = t("bmiUnder"); tone = "blue"; } else if (b < 23) { label = t("bmiNormal"); tone = "green"; } else if (b < 25) { label = t("bmiOver"); tone = "amber"; } else { label = t("bmiObese"); tone = "red"; }
    var pos = (b - 15) / 20 * 100;
    out.innerHTML = '<div class="big-num ' + tone + '">' + b.toFixed(1) + "</div><p><b>" + esc(label) + "</b></p>" +
      gauge(pos, "#60a5fa 0 17.5%,#34d399 17.5% 40%,#fbbf24 40% 50%,#f87171 50% 100%") + '<p class="muted sm">' + esc(t("bmiNote")) + "</p>";
  }
  function idrsCalc(e) {
    e.preventDefault();
    var age = q("#idAge").value, sex = q("#idSex").value, wc = parseFloat(q("#idWaist").value), fam = q("#idFam").value, act = q("#idAct").value, out = q("#idOut");
    if (age === "" || !sex || !(wc > 40) || fam === "" || act === "") { out.innerHTML = '<p class="warn">' + esc(t("idFill")) + "</p>"; return; }
    var waist = sex === "M" ? (wc >= 100 ? 20 : wc >= 90 ? 10 : 0) : (wc >= 90 ? 20 : wc >= 80 ? 10 : 0);
    var score = +age + waist + +fam + +act, key = score >= 60 ? "idHigh" : score >= 30 ? "idMod" : "idLow", tone = score >= 60 ? "red" : score >= 30 ? "amber" : "green";
    out.innerHTML = '<div class="big-num ' + tone + '">' + score + "<small>/100</small></div><p><b>" + esc(t(key).replace("{s}", score)) + "</b></p>" +
      gauge(score, "#34d399 0 30%,#fbbf24 30% 60%,#f87171 60% 100%") +
      (score >= 30 ? '<button type="button" class="btn btn-primary" data-go="pkg:diabetes">' + esc(t("seePkg")) + "</button>" : "");
  }

  /* ---------- photo slots and reviews ---------- */
  function renderPhotos() {
    qa("[data-photo]").forEach(function (el) {
      var key = el.getAttribute("data-photo"), src = LAB.photos && LAB.photos[key];
      if (src) { el.innerHTML = '<img src="' + esc(src) + '" alt="' + esc(t("alt_" + key)) + '" loading="lazy">' + (LAB.photoSamples ? '<span class="sample-badge">' + esc(t("sampleBadge")) + "</span>" : ""); el.classList.remove("empty"); }
      else if (LAB.draft) { el.innerHTML = '<div class="ph"><span>📷</span><b>' + esc(t("addPhoto")) + "</b><small>" + esc(t("ph_" + key)) + "</small></div>"; el.classList.add("empty"); }
      else { el.innerHTML = ""; el.classList.add("empty", "nophoto"); }
    });
  }
  function renderReviews() {
    var sec = q("#reviews"), list = LAB.reviews || [];
    if (!list.length && !LAB.draft) { sec.hidden = true; return; }
    sec.hidden = false;
    q("#reviewGrid").innerHTML = list.length ? list.map(function (r) {
      return '<figure class="card review"><div class="stars">' + "★".repeat(r.stars || 5) + "</div><blockquote>" + esc(L(r, "text")) + "</blockquote><figcaption>" + esc(r.name) + "</figcaption></figure>";
    }).join("") : '<p class="muted ph-note">' + esc(t("reviewsDraft")) + "</p>";
  }

  /* ---------- home search: live suggestions + quick-pick chips ---------- */
  var sgIdx = -1, sgItems = [];
  function searchIndex() {
    var items = LAB.packages.map(function (p) {
      return { key: "pkg:" + p.id, label: L(p, "name"), type: "pkg", svg: p.icon,
        hay: (p.name + " " + (p.name_mr || "") + " " + p.for + " " + p.includes.join(" ")).toLowerCase() };
    }), seen = {};
    LAB.categories.forEach(function (c) { c.tests.forEach(function (n) {
      if (seen[n]) return; seen[n] = 1;
      items.push({ key: "test:" + n, label: testName(n), type: "test", svg: c.svg, hay: (n + " " + ((LAB.mrNames || {})[n] || "")).toLowerCase() });
    }); });
    return items;
  }
  function norm(s) { return " " + String(s).toLowerCase().replace(/[^a-z0-9\u0900-\u097F]+/g, " ").trim(); }
  function runSearch(term) {
    var n = norm(term).trim(); if (!n) return [];
    var idx = searchIndex(), hits = [];
    idx.forEach(function (it) {           // 1st choice: the term starts a word (so "vit" finds Vitamin, not "sensitivity")
      var h = norm(it.hay), pos = h.indexOf(" " + n);
      if (pos > -1) hits.push({ it: it, score: norm(it.label).indexOf(" " + n) === 0 ? 0 : 1 });
    });
    if (!hits.length && n.length >= 3) idx.forEach(function (it) { if (norm(it.hay).indexOf(n) > -1) hits.push({ it: it, score: 2 }); });
    hits.sort(function (x, y) { return x.score - y.score; });
    return hits.slice(0, 8).map(function (x) { return x.it; });
  }
  function renderSuggest() {
    var box = q("#suggest"), input = q("#homeSearch"), term = input.value;
    sgItems = runSearch(term);
    if (!term.trim()) { box.hidden = true; input.setAttribute("aria-expanded", "false"); return; }
    box.innerHTML = sgItems.length ? sgItems.map(function (it, i) {
      return '<li role="option" id="sg-' + i + '" data-sg="' + i + '" aria-selected="' + (i === sgIdx) + '"><span class="sg-ic">' + pkgIcon(it.svg) + '</span><span class="sg-tx">' + esc(it.label) + "</span><small>" + esc(t(it.type === "pkg" ? "typePkg" : "typeTest")) + "</small></li>";
    }).join("") : '<li class="sg-none">' + esc(t("noMatch")) + "</li>";
    box.hidden = false; input.setAttribute("aria-expanded", "true");
  }
  function closeSuggest() { q("#suggest").hidden = true; q("#homeSearch").setAttribute("aria-expanded", "false"); sgIdx = -1; }
  function pickSuggest(i) { var it = sgItems[i]; if (!it) return; closeSuggest(); openDetail(it.key); }
  function renderChips() {
    q("#chipbar").innerHTML = (LAB.searchChips || []).map(function (c) {
      var cls = "schip" + (c.accent ? " accent" : "");
      if (c.href) return '<a class="' + cls + '" href="' + esc(c.href) + '">✨ ' + esc(L(c, "label")) + "</a>";
      return c.open ? '<button type="button" class="' + cls + '" data-open="' + esc(c.open) + '">' + esc(L(c, "label")) + "</button>"
        : '<a class="' + cls + '" href="tests.html?q=' + encodeURIComponent(c.q || c.label) + '#tests">' + esc(L(c, "label")) + "</a>";
    }).join("");
  }

  /* ---------- guided finder (2 taps -> suggested checkup) ---------- */
  var fin = { who: null, why: null };
  var WHO = [["man", "whoMan", "👨"], ["woman", "whoWoman", "👩"], ["senior", "whoSenior", "🧓"]];
  var WHY = [["routine", "whyRoutine", "🩺"], ["diab", "whyDiab", "🍬"], ["heart", "whyHeart", "❤️"], ["thyroid", "whyThyroid", "🦋"], ["fever", "whyFever", "🌡️"], ["surgery", "whySurgery", "🏥"], ["kidney", "whyKidney", "💧"]];
  function recommend(who, why) {
    var ids;
    if (why === "routine") ids = who === "woman" ? ["women", "full"] : who === "senior" ? ["senior", "full"] : ["full", "basic"];
    else if (why === "diab") ids = who === "senior" ? ["diabetes", "senior"] : ["diabetes", "full"];
    else if (why === "heart") ids = who === "senior" ? ["heart", "senior"] : ["heart", "full"];
    else if (why === "thyroid") ids = who === "woman" ? ["thyroid", "women"] : ["thyroid", "full"];
    else if (why === "fever") ids = ["fever"];
    else if (why === "surgery") ids = ["preop"];
    else ids = who === "senior" ? ["kidney", "senior"] : ["kidney", "full"];
    return ids.map(pkgById).filter(Boolean);
  }
  function finderCard(p, i) {
    return '<article class="fres card" data-open="pkg:' + esc(p.id) + '" style="--ic:' + pal(LAB.packages.indexOf(p) + 1).ic + '"><span class="pkg-ico" style="--ic:' + pal(LAB.packages.indexOf(p) + 1).ic + '">' + pkgIcon(p.icon) + "</span>" +
      '<div class="fres-tx"><h3>' + esc(L(p, "name")) + '</h3><p class="for">' + esc(L(p, "for")) + "</p>" + fastChip(p.fasting) + "</div>" +
      '<div class="fres-foot"><div class="price">' + priceHtml(p.price) + "</div>" + addBtn(p.name) + "</div></article>";
  }
  function renderFinder() {
    var box = q("#finderBody"); if (box === NOOP) return;
    function opt(group, o) { return '<button type="button" class="fopt" data-f="' + group + ":" + o[0] + '"><span class="fo-ico" aria-hidden="true">' + o[2] + "</span><b>" + esc(t(o[1])) + "</b></button>"; }
    if (!fin.who) {
      box.innerHTML = '<p class="fstep">' + esc(t("finderStep").replace("{n}", 1)) + '</p><h3>' + esc(t("finderQ1")) + '</h3><div class="fopts">' + WHO.map(function (o) { return opt("who", o); }).join("") + "</div>";
    } else if (!fin.why) {
      box.innerHTML = '<p class="fstep">' + esc(t("finderStep").replace("{n}", 2)) + ' · <button type="button" class="link-sm inl" data-f="back">' + esc(t("finderBack")) + '</button></p><h3>' + esc(t("finderQ2")) + '</h3><div class="fopts">' + WHY.map(function (o) { return opt("why", o); }).join("") + "</div>";
    } else {
      var rec = recommend(fin.who, fin.why), whoLbl = t(WHO.filter(function (o) { return o[0] === fin.who; })[0][1]), whyLbl = t(WHY.filter(function (o) { return o[0] === fin.why; })[0][1]);
      box.innerHTML = '<p class="fstep">' + esc(whoLbl) + " · " + esc(whyLbl) + ' · <button type="button" class="link-sm inl" data-f="reset">' + esc(t("finderReset")) + '</button></p>' +
        '<h3>' + esc(t("finderResult")) + '</h3><div class="fgrid">' + rec.map(finderCard).join("") + "</div>" +
        '<p class="fmore"><a class="btn btn-ghost" href="tests.html#packages">' + esc(t("seeAllPkgs")) + "</a></p>";
    }
  }

  /* ---------- "my list" drawer (reuses the detail dialog) ---------- */
  function itemLabel(n) { var p = pkgByName(n); return p ? L(p, "name") : testName(n); }
  function listHtml() {
    var items = Array.from(selected), body;
    if (!items.length) body = '<p class="muted">' + esc(t("listEmpty")) + "</p>";
    else body = '<ul class="mylist">' + items.map(function (n) {
      return "<li><span>" + esc(itemLabel(n)) + (needsFastFor(n) ? ' <span class="fast sm">' + esc(t("fastTag")) + "</span>" : "") + '</span><button type="button" class="rm" data-add="' + esc(n) + '" aria-label="' + esc(t("remove") + ": " + itemLabel(n)) + '">×</button></li>';
    }).join("") + "</ul>" + (needsFasting() ? '<p class="fast-hint2">⏰ ' + esc(t("fastHint")) + "</p>" : "") +
      '<div class="d-foot"><button type="button" class="btn btn-ghost" id="listClear">' + esc(t("listClear")) + '</button><a class="btn btn-wa" target="_blank" rel="noopener" href="' + esc(waLink(waText("cart"))) + '">' + esc(t("listSend")) + "</a></div>";
    return '<div class="d-head"><span class="pkg-ico big" style="--ic:#8a4bb5"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS.clip + '</svg></span><div><h3 id="dlgTitle">' + esc(t("listTitle")) + " (" + items.length + ")</h3></div></div>" + body;
  }
  function needsFastFor(n) { var p = pkgByName(n); return !!((p && p.fasting) || isFastTest(n)); }
  function partOfHtml(name) {
    var tok = String(name).split(" (")[0].toLowerCase(), hits = LAB.packages.filter(function (p) {
      return p.includes.some(function (i) { var x = i.toLowerCase(); return x.indexOf(tok) > -1 || (tok.length > 3 && tok.indexOf(x) > -1); });
    }).slice(0, 4);
    if (!hits.length) return "";
    return '<h4>' + esc(t("partOf")) + '</h4><div class="pills">' + hits.map(function (p) { return '<button type="button" class="chip" data-open="pkg:' + esc(p.id) + '">' + esc(L(p, "name")) + "</button>"; }).join("") + "</div>";
  }

  /* ---------- i18n apply ---------- */
  function applyText() {
    document.documentElement.lang = lang;
    qa("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    qa("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    q("#langBtn").textContent = lang === "en" ? "मराठी" : "English";
  }
  function renderAll() {
    applyText(); fillFields(); renderTrust(); renderStats(); renderTiles(); renderAreas(); renderTrustGrid(); renderSeason();
    renderPkgFilter(); renderPackages(); renderTests(); renderFaq(); renderPhotos(); renderReviews(); renderChips(); renderFinder(); updateBar(); setRot(rotIdx); fitLead();
    if (openKey) openDetail(openKey);
    observeReveal();
  }

  /* ---------- rotating headline ---------- */
  var rotIdx = 0, rotTimer;
  function setRot(i) {
    q("#rot").textContent = t("rot" + (i + 1));
    var lead = q("#lead"); if (lead !== NOOP) lead.textContent = reduceMotion ? t("heroSub") : t("sub" + (i + 1));
  }
  // reserve the height of the longest of the 3 sub-lines so the hero never jumps while the phrase rotates
  function fitLead() {
    var el = q("#lead"); if (el === NOOP || reduceMotion) return;
    el.style.minHeight = "0"; var max = 0;
    for (var i = 1; i <= 3; i++) { el.textContent = t("sub" + i); max = Math.max(max, el.offsetHeight); }
    el.style.minHeight = max + "px"; el.textContent = t("sub" + (rotIdx + 1));
  }
  var fitTimer;
  window.addEventListener("resize", function () { clearTimeout(fitTimer); fitTimer = setTimeout(fitLead, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitLead);
  function startRot() {
    if (reduceMotion) return;
    rotTimer = setInterval(function () {
      var el = q("#rot"), ld = q("#lead"); el.classList.add("out"); ld.classList.add("out");
      setTimeout(function () { rotIdx = (rotIdx + 1) % 3; setRot(rotIdx); el.classList.remove("out"); ld.classList.remove("out"); }, 280);
    }, 2800);
  }

  /* ---------- scroll effects ---------- */
  var io;
  function observeReveal() {
    if (!("IntersectionObserver" in window) || reduceMotion) { qa(".rv").forEach(function (e) { e.classList.add("in"); }); return; }
    if (!io) io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    qa(".rv:not(.in)").forEach(function (e) { io.observe(e); });
  }
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    q("#progress").style.transform = "scaleX(" + (max > 0 ? h.scrollTop / max : 0) + ")";
  }
  function navSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = qa("#nav a"), map = {};
    links.forEach(function (a) { var h = a.getAttribute("href"); if (h.charAt(0) === "#") map[h.slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { links.forEach(function (a) { a.removeAttribute("aria-current"); }); var a = map[e.target.id]; if (a) a.setAttribute("aria-current", "true"); } });
    }, { rootMargin: "-35% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var fb = e.target.closest("[data-f]");
    if (fb) {
      var spec = fb.getAttribute("data-f");
      if (spec === "reset") { fin.who = fin.why = null; } else if (spec === "back") { fin.who = null; } else { var pr = spec.split(":"); fin[pr[0]] = pr[1]; }
      renderFinder(); return;
    }
    if (e.target.closest("#listClear")) { selected.clear(); renderPackages(); renderTests(); updateBar(); renderFinder(); openDetail("list"); return; }
    var ach = e.target.closest("[data-area]");
    if (ach) { var v = ach.getAttribute("data-area"); setArea(area === v ? "" : v); return; }
    var add = e.target.closest("[data-add]");
    if (add) { e.stopPropagation(); toggle(add.getAttribute("data-add")); return; }
    var go_ = e.target.closest("[data-go]");
    if (go_) { closeDetail(); go(go_.getAttribute("data-go")); return; }
    var op = e.target.closest("[data-open]");
    if (op) { openDetail(op.getAttribute("data-open")); return; }
    var tab = e.target.closest("[data-tab]");
    if (tab) {
      cat = tab.getAttribute("data-tab"); q("#testSearch").value = ""; renderTests();
      if (q("#testList").getBoundingClientRect().top > window.innerHeight * 0.6) scrollToEl("#testList");
      return;
    }
    var pt = e.target.closest("[data-pkgtag]");
    if (pt) { pkgTag = pt.getAttribute("data-pkgtag"); renderPkgFilter(); renderPackages(); return; }
    if (e.target.closest("a[href^='#']") && dlg.open) closeDetail();
  });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("pkg")) { e.preventDefault(); openDetail(e.target.getAttribute("data-open")); }
  });
  q("#selClear").addEventListener("click", function () { selected.clear(); renderPackages(); renderTests(); updateBar(); });
  q("#testSearch").addEventListener("input", renderTests);
  q("#areaSel").addEventListener("change", function () { var v = this.value; area = (v === "__other" || v === "") ? "" : v; updateAreaResult(); renderAreaChips(); wireLinks(); });
  q("#langBtn").addEventListener("click", function () {
    lang = lang === "en" ? "mr" : "en";
    try { localStorage.setItem("lab_lang", lang); } catch (e) {}
    renderAll();
  });
  q("#bmiForm").addEventListener("submit", bmiCalc);
  q("#idrsForm").addEventListener("submit", idrsCalc);
  window.addEventListener("scroll", onScroll, { passive: true });

  q("#homeSearch").addEventListener("input", function () { sgIdx = -1; renderSuggest(); });
  q("#homeSearch").addEventListener("keydown", function (e) {
    var open = !q("#suggest").hidden && sgItems.length;
    if (e.key === "ArrowDown" && open) { e.preventDefault(); sgIdx = (sgIdx + 1) % sgItems.length; renderSuggest(); }
    else if (e.key === "ArrowUp" && open) { e.preventDefault(); sgIdx = (sgIdx - 1 + sgItems.length) % sgItems.length; renderSuggest(); }
    else if (e.key === "Enter" && open && sgIdx > -1) { e.preventDefault(); pickSuggest(sgIdx); }
    else if (e.key === "Escape") closeSuggest();
  });
  q("#suggest").addEventListener("mousedown", function (e) { var li = e.target.closest("[data-sg]"); if (li) { e.preventDefault(); pickSuggest(+li.getAttribute("data-sg")); } });
  document.addEventListener("click", function (e) { if (!e.target.closest("#homeSearchForm")) closeSuggest(); });
  q("#homeSearchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var v = q("#homeSearch").value.trim();
    location.href = "tests.html" + (v ? "?q=" + encodeURIComponent(v) : "") + "#tests";
  });
  if (PAGE === "tests") {
    var pc = params.get("cat"), pp = params.get("pkg"), pq = params.get("q");
    if (pc && catList().some(function (c) { return c.id === pc; })) cat = pc;
    if (pp && PKG_TAGS.some(function (x) { return x[0] === pp; })) pkgTag = pp;
    if (pq) q("#testSearch").value = pq;
  }
  q("#draftBanner").hidden = !LAB.draft;
  renderAll();
  if (PAGE === "tests" && location.hash) setTimeout(function () { scrollToEl(location.hash); }, 250); onScroll(); navSpy(); startRot();
})();
