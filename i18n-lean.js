/* Text for the lean home page + tests page. Merged into window.X before app.js runs. */
(function () {
  var en = {
    navHomeLink: "Home", navCheckups: "Checkups", navAllTests: "All tests", callShort: "Call",
    bookTest: "Book a test", bookCheckup: "Book a checkup",
    qCall: "Call", qWa: "WhatsApp", qRx: "Prescription", qReport: "Report",
    searchHome: "Search a test or checkup, e.g. thyroid", searchGo: "Search",
    areaShort: "Home collection in your area?",
    browseTitle: "Browse tests by need", allTestsTile: "All tests",
    featTitle: "Popular health checkups", seeAllPkgs: "See all packages and tests →",
    meetTitle: "Meet your lab",
    ph_hero: "Photo: the lab entrance or the team", ph_lab: "Photo: the laboratory", ph_team: "Photo: pathologist and technicians",
    ph_collection: "Photo: collection staff in uniform", ph_building: "Photo: hospital building",
    addPhoto: "Add photo",
    alt_hero: "Novatech Hospital Laboratory", alt_lab: "Inside the laboratory", alt_team: "Our laboratory team", alt_collection: "Sample collection staff", alt_building: "Novatech Multispeciality Hospital",
    reviewsTitle: "What patients say", reviewsDraft: "Real Google reviews will appear here after launch. We never invent reviews.",
    moreTitle: "Packages, tests and guides", moreSub: "Everything in one place. Tap a package or test for details.",
    snPackages: "Packages", snTests: "Tests", snPrepare: "Prepare", snCheck: "Health check", snDoctors: "For doctors & companies", snFaq: "FAQ",
    docCompTitle: "For doctors, clinics and companies",
    testsWord: "tests", pkgsWord: "packages", allTestsBtn: "See all tests →",
    noMatch: "No match yet. Press Enter to search all tests.", typePkg: "Package", typeTest: "Test",
    sub1: "Walk in at the hospital and get tested right next to your doctor. Everything under one roof.",
    sub2: "Book home sample collection in Sangli, Miraj and Kupwad. A trained phlebotomist comes to you.",
    sub3: "Get your reports on WhatsApp as soon as they are ready. No extra trip to collect them.",
    demoBanner: "DEMO PAGE: sample content, not the official Novatech website. Yellow “confirm” tags and 📷 boxes mark details still to be added.",
    demoNote: "This is a demo page for review. It is not the official website of Novatech Multispeciality Hospital. Prices, contacts and photos are placeholders.",
    backHome: "← Back to home"
  };
  var mr = {
    navHomeLink: "मुख्यपृष्ठ", navCheckups: "तपासण्या", navAllTests: "सर्व तपासण्या", callShort: "कॉल",
    bookTest: "तपासणी बुक करा", bookCheckup: "चेकअप बुक करा",
    qCall: "कॉल", qWa: "WhatsApp", qRx: "चिठ्ठी", qReport: "रिपोर्ट",
    searchHome: "तपासणी किंवा चेकअप शोधा, उदा. थायरॉईड", searchGo: "शोधा",
    areaShort: "तुमच्या परिसरात घरी संकलन?",
    browseTitle: "गरजेनुसार तपासण्या पहा", allTestsTile: "सर्व तपासण्या",
    featTitle: "लोकप्रिय आरोग्य चेकअप", seeAllPkgs: "सर्व पॅकेजेस व तपासण्या पहा →",
    meetTitle: "तुमची लॅब पहा",
    ph_hero: "फोटो: लॅबचे प्रवेशद्वार किंवा टीम", ph_lab: "फोटो: प्रयोगशाळा", ph_team: "फोटो: पॅथॉलॉजिस्ट व तंत्रज्ञ",
    ph_collection: "फोटो: गणवेशातील नमुना संकलन कर्मचारी", ph_building: "फोटो: हॉस्पिटलची इमारत",
    addPhoto: "फोटो जोडा",
    alt_hero: "नोव्हाटेक हॉस्पिटल लॅबोरेटरी", alt_lab: "प्रयोगशाळेच्या आत", alt_team: "आमची लॅब टीम", alt_collection: "नमुना संकलन कर्मचारी", alt_building: "नोव्हाटेक मल्टिस्पेशालिटी हॉस्पिटल",
    reviewsTitle: "रुग्ण काय म्हणतात", reviewsDraft: "सुरू झाल्यानंतर खरे गुगल रिव्ह्यू इथे दिसतील. आम्ही रिव्ह्यू कधीही बनवत नाही.",
    moreTitle: "पॅकेजेस, तपासण्या व मार्गदर्शन", moreSub: "सर्व एका ठिकाणी. तपशीलासाठी पॅकेज किंवा तपासणीवर दाबा.",
    snPackages: "पॅकेजेस", snTests: "तपासण्या", snPrepare: "तयारी", snCheck: "आरोग्य तपासा", snDoctors: "डॉक्टर व कंपन्यांसाठी", snFaq: "प्रश्नोत्तरे",
    docCompTitle: "डॉक्टर, क्लिनिक व कंपन्यांसाठी",
    testsWord: "तपासण्या", pkgsWord: "पॅकेजेस", allTestsBtn: "सर्व तपासण्या पहा →",
    noMatch: "अजून काही जुळले नाही. सर्व तपासण्यांत शोधण्यासाठी Enter दाबा.", typePkg: "पॅकेज", typeTest: "तपासणी",
    sub1: "हॉस्पिटलमध्ये येऊन तुमच्या डॉक्टरांच्या जवळच तपासणी करा. सर्व काही एकाच छताखाली.",
    sub2: "सांगली, मिरज आणि कुपवाड येथे घरी नमुना संकलन बुक करा. प्रशिक्षित कर्मचारी तुमच्या घरी येतात.",
    sub3: "रिपोर्ट तयार होताच WhatsApp वर मिळवा. घेण्यासाठी वेगळी चक्कर नको.",
    demoBanner: "डेमो पेज: नमुना मजकूर, नोव्हाटेकची अधिकृत वेबसाइट नाही. पिवळे “निश्चित करा” टॅग व 📷 चौकटी म्हणजे अजून भरायची माहिती.",
    demoNote: "हे पुनरावलोकनासाठी डेमो पेज आहे. ही नोव्हाटेक मल्टिस्पेशालिटी हॉस्पिटलची अधिकृत वेबसाइट नाही. दर, संपर्क व फोटो नमुना आहेत.",
    backHome: "← मुख्यपृष्ठावर परत"
  };
  window.X = window.X || { en: {}, mr: {} };
  Object.assign(window.X.en, en); Object.assign(window.X.mr, mr);
})();
