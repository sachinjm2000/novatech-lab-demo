/*
  ALL EDITABLE CONTENT LIVES HERE. Staff can change prices, timings, phone numbers
  without touching the page code (same idea as Orange Health's CMS-driven price JSON).

  Rules:
  - Anything left as null shows a yellow "confirm" tag while draft = true.
  - Set draft = false only after every null is filled and the owner has signed off.
  - Do not claim NABL/CAP/ISO until the certificate exists (accreditation stays null until then).
*/
window.LAB = {
  draft: true,

  hospital: "Novatech Multispeciality Hospital",
  labName: "Novatech Hospital Laboratory",     // [confirm] final lab name
  city: "Sangli",
  address: null,                                // [confirm] full street address + landmark
  mapUrl: null,                                 // [confirm] Google Maps share link
  phone: null,                                  // [confirm] e.g. "02332XXXXXX"
  whatsapp: null,                               // [confirm] digits only with country code, e.g. "919XXXXXXXXX"
  email: null,
  accreditation: null,                          // e.g. "NABL accredited (Cert. no. ...)" ONLY when held
  pathologist: null,                            // [confirm] e.g. "Dr ___, MD Pathology (Reg. no. ___)"

  hours: {
    lab: null,                                  // [confirm] e.g. "24 x 7" or "7:00 AM – 9:00 PM"
    homeCollection: null,                       // [confirm] e.g. "7:00 AM – 11:00 AM"
    reportTime: null                            // [confirm] e.g. "Most routine reports within 6 hours"
  },

  // Areas where home collection will run. Edit freely.
  areas: ["Sangli", "Miraj", "Kupwad", "Vishrambag", "Vasant Colony", "Shivaji Nagar", "Chandanwadi"],

  // Health packages. price/tat null until confirmed. `includes` is indicative; pathologist to finalise.
  packages: [
    { id: "basic", name: "Basic Health Checkup", name_mr: "बेसिक आरोग्य तपासणी",
      for: "Yearly routine check", for_mr: "वार्षिक नियमित तपासणी", price: null, tat: null,
      includes: ["CBC", "Fasting blood sugar", "Lipid profile", "Creatinine", "Urine routine"] },
    { id: "full", name: "Full Body Checkup", name_mr: "संपूर्ण शरीर तपासणी",
      for: "Adults, once a year", for_mr: "प्रौढांसाठी, वर्षातून एकदा", price: null, tat: null,
      includes: ["CBC + ESR", "Fasting sugar + HbA1c", "Lipid profile", "Liver function (LFT)", "Kidney function (KFT)", "Thyroid (TSH)", "Vitamin D", "Vitamin B12", "Urine routine"] },
    { id: "diabetes", name: "Diabetes Care", name_mr: "मधुमेह तपासणी",
      for: "Diabetes monitoring", for_mr: "मधुमेहाचे निरीक्षण", price: null, tat: null,
      includes: ["Fasting sugar", "Post-meal sugar", "HbA1c", "Urine microalbumin", "Creatinine", "Lipid profile"] },
    { id: "thyroid", name: "Thyroid Profile", name_mr: "थायरॉईड तपासणी",
      for: "Fatigue, weight change, irregular periods", for_mr: "थकवा, वजनातील बदल, अनियमित पाळी", price: null, tat: null,
      includes: ["T3", "T4", "TSH"] },
    { id: "heart", name: "Heart Health", name_mr: "हृदय आरोग्य तपासणी",
      for: "Cholesterol and heart-risk markers", for_mr: "कोलेस्टेरॉल व हृदयाचे जोखीम घटक", price: null, tat: null,
      includes: ["Lipid profile", "hs-CRP", "HbA1c", "Creatinine", "Homocysteine"] },
    { id: "women", name: "Women's Health", name_mr: "महिला आरोग्य तपासणी",
      for: "PCOD, anaemia, bone and thyroid screen", for_mr: "पीसीओडी, ॲनिमिया, हाडे व थायरॉईड", price: null, tat: null,
      includes: ["CBC", "TSH", "Vitamin D", "Vitamin B12", "Iron profile", "LH / FSH / Prolactin"] },
    { id: "senior", name: "Senior Citizen Checkup", name_mr: "ज्येष्ठ नागरिक तपासणी",
      for: "Above 60 years", for_mr: "६० वर्षांवरील", price: null, tat: null,
      includes: ["CBC", "Sugar + HbA1c", "Lipid profile", "LFT", "KFT", "Calcium", "Vitamin D", "Vitamin B12", "TSH", "PSA (men)"] },
    { id: "kidney", name: "Kidney Care", name_mr: "किडनी तपासणी",
      for: "Kidney function monitoring", for_mr: "किडनी कार्यक्षमता तपासणी", price: null, tat: null,
      includes: ["KFT", "Electrolytes", "Uric acid", "Urine routine", "Urine albumin / creatinine ratio"] },
    { id: "preop", name: "Pre-operative Panel", name_mr: "शस्त्रक्रियापूर्व तपासणी",
      for: "Before surgery or anaesthesia", for_mr: "शस्त्रक्रिया / भूलपूर्वी", price: null, tat: null,
      includes: ["CBC", "PT / INR", "Blood group", "Fasting sugar", "KFT", "HIV, HBsAg, HCV screening"] },
    { id: "fever", name: "Monsoon Fever Panel", name_mr: "पावसाळी ताप तपासणी",
      for: "Fever with body ache", for_mr: "ताप व अंगदुखी", price: null, tat: null,
      includes: ["CBC", "Dengue NS1", "Malaria antigen", "Typhoid (Widal / Typhidot)", "CRP"] }
  ],

  // TEST CATALOGUE: every test the hospital's consultants and referring doctors may request, grouped into tabs.
  // Prices live in `prices` below (name -> rupees). Missing price = shows a "confirm" tag while draft.
  // Some specialised tests (immunology, IHC, drug levels, TB IGRA ...) may go to a partner reference lab: confirm which are in-house.
  categories: [
    { id: "haem", name: "Blood counts & haematology", name_mr: "रक्त तपासण्या", tests: ["CBC (Complete Blood Count)", "ESR", "Absolute eosinophil count", "Peripheral blood smear", "Reticulocyte count", "Blood group & Rh", "Indirect Coombs", "Iron profile", "Ferritin"] },
    { id: "coag", name: "Clotting", name_mr: "रक्त गोठणे", tests: ["PT / INR", "aPTT", "BT / CT", "D-dimer"] },
    { id: "diab", name: "Diabetes", name_mr: "मधुमेह", tests: ["Fasting sugar", "Post-meal sugar", "Random sugar", "HbA1c", "Glucose tolerance test (75 g)", "Fasting insulin", "Urine microalbumin", "Urine albumin / creatinine ratio"] },
    { id: "heart", name: "Heart & cholesterol", name_mr: "हृदय व कोलेस्टेरॉल", tests: ["Lipid profile", "hs-Troponin", "CK-MB", "NT-proBNP", "hs-CRP", "Homocysteine", "Lipoprotein(a)"] },
    { id: "liver", name: "Liver & pancreas", name_mr: "यकृत व स्वादुपिंड", tests: ["LFT (Liver function)", "ALP", "Serum albumin", "Serum amylase / lipase", "Serum ammonia"] },
    { id: "kidney", name: "Kidney & electrolytes", name_mr: "किडनी व क्षार", tests: ["KFT (urea, creatinine, eGFR)", "Electrolytes (Na, K, Cl)", "Magnesium", "Uric acid", "PTH", "24-hour urine protein"] },
    { id: "hormone", name: "Thyroid & hormones", name_mr: "थायरॉईड व हार्मोन्स", tests: ["TSH", "Thyroid profile (T3, T4, TSH)", "Anti-TPO", "LH / FSH / Prolactin", "AMH", "Estradiol", "Progesterone", "Testosterone", "DHEAS", "Beta-hCG", "Cortisol"] },
    { id: "vit", name: "Vitamins & bone", name_mr: "जीवनसत्त्वे व हाडे", tests: ["Vitamin D", "Vitamin B12", "Folate", "Calcium", "Phosphorus"] },
    { id: "fever", name: "Fever & infection", name_mr: "ताप व संसर्ग", tests: ["Dengue NS1 / IgM", "Malaria antigen", "Typhoid (Widal / Typhidot)", "CRP", "Procalcitonin"] },
    { id: "viral", name: "Viral markers & serology", name_mr: "विषाणू व सेरॉलॉजी", tests: ["HIV", "HBsAg", "Anti-HCV", "Anti-HBs", "HIV, HBsAg, HCV screening (pre-op)", "VDRL / TPHA", "TORCH panel", "ASO titre"] },
    { id: "micro", name: "Culture & microbiology", name_mr: "कल्चर व जंतुसंसर्ग", tests: ["Urine culture & sensitivity", "Blood culture", "Pus / wound swab culture", "Throat / ear swab culture", "Sputum culture & sensitivity", "Conjunctival swab culture", "Fungal smear (KOH)", "Sputum AFB", "TB CBNAAT", "TB IGRA (QuantiFERON)"] },
    { id: "urine", name: "Urine, stool & body fluids", name_mr: "लघवी, शौच व द्रव", tests: ["Urine routine", "Urine cytology", "Stool routine", "Stool occult blood", "Semen analysis", "CSF analysis", "Pleural fluid analysis (incl. ADA)", "Synovial fluid analysis", "ABG (arterial blood gas)"] },
    { id: "tumour", name: "Tumour markers", name_mr: "ट्यूमर मार्कर्स", tests: ["PSA (total / free)", "CEA", "CA 15-3", "CA-125", "CA 19-9", "AFP"] },
    { id: "immuno", name: "Immunology & allergy", name_mr: "इम्युनोलॉजी व ॲलर्जी", tests: ["ANA", "Anti-dsDNA", "C3 / C4", "RA factor", "Anti-CCP", "HLA-B27", "Total IgE / allergy panel", "Antiepileptic drug levels"] },
    { id: "histo", name: "Biopsy & cytology", name_mr: "बायोप्सी व सायटॉलॉजी", tests: ["Biopsy / histopathology", "FNAC", "Fluid cytology", "Pap smear", "Immunohistochemistry (ER / PR / HER2)"] }
  ],

  // Shown first, in the "Popular" tab.
  popular: ["CBC (Complete Blood Count)", "HbA1c", "Fasting sugar", "Lipid profile", "LFT (Liver function)", "KFT (urea, creatinine, eGFR)", "TSH", "Thyroid profile (T3, T4, TSH)", "Vitamin D", "Vitamin B12", "Urine routine", "Uric acid", "CRP", "ESR", "Iron profile", "Dengue NS1 / IgM", "Typhoid (Widal / Typhidot)", "Malaria antigen", "PSA (total / free)", "Urine culture & sensitivity"],

  // Fill in as you confirm each price, e.g.  "HbA1c": 450
  prices: {},

  // Optional Marathi display names (search also matches these).
  mrNames: {
    "CBC (Complete Blood Count)": "सीबीसी", "ESR": "ईएसआर", "HbA1c": "एचबीए१सी", "Fasting sugar": "उपाशी साखर", "Post-meal sugar": "जेवणानंतर साखर",
    "Lipid profile": "लिपिड प्रोफाइल", "LFT (Liver function)": "यकृत तपासणी (एलएफटी)", "KFT (urea, creatinine, eGFR)": "किडनी तपासणी (केएफटी)",
    "TSH": "थायरॉईड (टीएसएच)", "Thyroid profile (T3, T4, TSH)": "थायरॉईड प्रोफाइल", "Vitamin D": "व्हिटॅमिन डी", "Vitamin B12": "व्हिटॅमिन बी१२",
    "Urine routine": "लघवी तपासणी", "Uric acid": "यूरिक ॲसिड", "CRP": "सीआरपी", "Dengue NS1 / IgM": "डेंग्यू", "Typhoid (Widal / Typhidot)": "टायफॉईड",
    "Malaria antigen": "मलेरिया", "Iron profile": "आयर्न प्रोफाइल", "PSA (total / free)": "पीएसए", "Urine culture & sensitivity": "लघवी कल्चर",
    "Biopsy / histopathology": "बायोप्सी / हिस्टोपॅथॉलॉजी", "FNAC": "एफएनएसी"
  },

  faqs: [
    { q: "Do I need a doctor's prescription?", q_mr: "डॉक्टरांची चिठ्ठी आवश्यक आहे का?",
      a: "Many routine tests can be booked without one. Some tests need a prescription; we will tell you when you book.",
      a_mr: "अनेक नियमित तपासण्या चिठ्ठीशिवाय करता येतात. काही तपासण्यांसाठी चिठ्ठी लागते; बुकिंगच्या वेळी आम्ही सांगू." },
    { q: "Do I have to fast?", q_mr: "उपाशी राहावे लागते का?",
      a: "Sugar and lipid tests usually need 8–10 hours of fasting. Water is fine. We will confirm for your exact tests.",
      a_mr: "साखर व लिपिड तपासण्यांसाठी साधारण ८–१० तास उपाशी राहावे लागते. पाणी पिऊ शकता. तुमच्या तपासण्यांनुसार आम्ही खात्री करून सांगू." },
    { q: "How do I get my report?", q_mr: "रिपोर्ट कसा मिळेल?",
      a: "Reports are sent on WhatsApp and can be collected from the hospital lab counter.",
      a_mr: "रिपोर्ट WhatsApp वर पाठवला जातो आणि हॉस्पिटलच्या लॅब काउंटरवरूनही घेता येतो." },
    { q: "Is home collection available?", q_mr: "घरी नमुना संकलन उपलब्ध आहे का?",
      a: "Yes, in the areas listed above. Choose your area at the top of this page or call us to confirm.",
      a_mr: "होय, वर नमूद केलेल्या परिसरांत. पानाच्या वरच्या भागात परिसर निवडा किंवा कॉल करून खात्री करा." },
    { q: "Are all tests done in your lab?", q_mr: "सर्व तपासण्या तुमच्या लॅबमध्येच होतात का?",
      a: "Routine tests are done in the hospital laboratory. A few specialised tests may be sent to a partner reference laboratory; we will tell you the price and report time when you book.",
      a_mr: "नियमित तपासण्या हॉस्पिटलच्या लॅबमध्येच होतात. काही विशेष तपासण्या भागीदार संदर्भ लॅबमध्ये पाठवाव्या लागू शकतात; बुकिंगच्या वेळी दर व रिपोर्टची वेळ कळवू." },
    { q: "Can I bring a doctor's prescription from another hospital?", q_mr: "दुसऱ्या हॉस्पिटलची चिठ्ठी चालते का?",
      a: "Yes. Send a photo of it on WhatsApp and we will tell you the tests, price and time.",
      a_mr: "होय. चिठ्ठीचा फोटो WhatsApp वर पाठवा; आम्ही तपासण्या, दर आणि वेळ कळवू." }
  ]
};

/* ======================================================================
   EXTRA SETTINGS (tiles, icons, fasting info, test explanations, claims)
   ====================================================================== */
(function () {
  var LAB = window.LAB;

  // Set to true ONLY when the hospital confirms the statement is real. null = shows a "confirm" tag in draft, hidden when live.
  LAB.claims = { pathologistOverseen: null, reportsChecked: null, shareWithDoctor: null, privacy: null };
  LAB.reportUrl = null;   // online report portal link, if any (otherwise "Get my report" opens WhatsApp)
  LAB.reviewUrl = null;   // Google review link, once the Google Business Profile exists

  // Seasonal ribbon above the packages. Update by season.
  LAB.seasonal = { packageId: "fever",
    text: "Post-monsoon fever season", text_mr: "पावसानंतरचा तापाचा हंगाम",
    sub: "Dengue, malaria and typhoid screening", sub_mr: "डेंग्यू, मलेरिया व टायफॉईड तपासणी" };

  // Package extras: who it is for (filter chips), fasting, icon.
  var pk = {
    basic:    { tags: ["men", "women"],  fasting: "8–10 hrs", icon: "clip" },
    full:     { tags: ["men", "women"],  fasting: "8–12 hrs", icon: "shield" },
    diabetes: { tags: ["diabetes"],      fasting: "8–10 hrs", icon: "drop" },
    thyroid:  { tags: ["women"],         fasting: null,       icon: "butterfly" },
    heart:    { tags: ["heart", "men"],  fasting: "9–12 hrs", icon: "heart" },
    women:    { tags: ["women"],         fasting: "8–10 hrs", icon: "venus" },
    senior:   { tags: ["senior"],        fasting: "8–12 hrs", icon: "user" },
    kidney:   { tags: ["kidney"],        fasting: null,       icon: "water" },
    preop:    { tags: ["surgery"],       fasting: "as advised", icon: "plus" },
    fever:    { tags: ["fever"],         fasting: null,       icon: "thermo" }
  };
  LAB.packages.forEach(function (p) { Object.assign(p, pk[p.id] || {}); });

  var ci = { haem: "🩸", coag: "⏱️", diab: "🍬", heart: "❤️", liver: "🧪", kidney: "💧", hormone: "🦋", vit: "🌞", fever: "🌡️", viral: "🛡️", micro: "🦠", urine: "🧫", tumour: "🎗️", immuno: "🌼", histo: "🔬" };
  LAB.categories.forEach(function (c) { c.icon = ci[c.id] || "🧪"; });

  // Tests that need fasting (tag shown on the test and in the cart).
  LAB.fastingTests = ["Fasting sugar", "Fasting insulin", "Lipid profile", "Iron profile", "Glucose tolerance test (75 g)"];

  // Clickable "lab option" tiles. type: cat (open a test tab) | pkg (filter packages) | link | wa
  LAB.tiles = [
    { icon: "👤", label: "Full body checkup", label_mr: "संपूर्ण शरीर तपासणी", type: "pkg", to: "all" },
    { icon: "🍬", label: "Diabetes", label_mr: "मधुमेह", type: "cat", to: "diab" },
    { icon: "🦋", label: "Thyroid & hormones", label_mr: "थायरॉईड व हार्मोन्स", type: "cat", to: "hormone" },
    { icon: "❤️", label: "Heart", label_mr: "हृदय", type: "cat", to: "heart" },
    { icon: "💧", label: "Kidney", label_mr: "किडनी", type: "cat", to: "kidney" },
    { icon: "🧪", label: "Liver", label_mr: "यकृत", type: "cat", to: "liver" },
    { icon: "🌞", label: "Vitamins & bone", label_mr: "जीवनसत्त्वे व हाडे", type: "cat", to: "vit" },
    { icon: "🤰", label: "Women's health", label_mr: "महिला आरोग्य", type: "pkg", to: "women" },
    { icon: "🌡️", label: "Fever & infection", label_mr: "ताप व संसर्ग", type: "cat", to: "fever" },
    { icon: "🎗️", label: "Cancer markers", label_mr: "कर्करोग मार्कर्स", type: "cat", to: "tumour" },
    { icon: "🦠", label: "Culture tests", label_mr: "कल्चर तपासण्या", type: "cat", to: "micro" },
    { icon: "🔬", label: "Biopsy & cytology", label_mr: "बायोप्सी व सायटॉलॉजी", type: "cat", to: "histo" },
    { icon: "🏠", label: "Home collection", label_mr: "घरी नमुना संकलन", type: "link", to: "#home" },
    { icon: "📄", label: "Send prescription", label_mr: "चिठ्ठी पाठवा", type: "wa", to: "rx" },
    { icon: "📲", label: "Get my report", label_mr: "माझा रिपोर्ट", type: "wa", to: "report" },
    { icon: "✅", label: "How to prepare", label_mr: "तयारी कशी करावी", type: "link", to: "#prepare" }
  ];

  // One-line explanations shown when a test is opened. Pathologist to review before going live.
  LAB.testInfo = {
    "CBC (Complete Blood Count)": { en: "Counts red cells, white cells and platelets. Helps check for anaemia, infection and clotting problems. No fasting needed.", mr: "लाल पेशी, पांढऱ्या पेशी व प्लेटलेट्स मोजते. ॲनिमिया, संसर्ग व रक्त गोठण्याच्या समस्या तपासण्यास मदत. उपाशी राहण्याची गरज नाही." },
    "HbA1c": { en: "Shows your average blood sugar over the last 2–3 months. Used to diagnose and monitor diabetes. Usually no fasting needed.", mr: "गेल्या २–३ महिन्यांतील सरासरी रक्तशर्करा दाखवते. मधुमेहाचे निदान व निरीक्षणासाठी. सहसा उपाशी राहण्याची गरज नाही." },
    "Fasting sugar": { en: "Blood sugar after an overnight fast of 8–10 hours. Plain water is allowed.", mr: "८–१० तास रात्रभर उपाशी राहिल्यानंतरची रक्तशर्करा. साधे पाणी पिऊ शकता." },
    "Post-meal sugar": { en: "Blood sugar about 2 hours after a meal. You will be told when to eat and when to come.", mr: "जेवणानंतर सुमारे २ तासांनी रक्तशर्करा. कधी जेवायचे व कधी यायचे ते सांगितले जाईल." },
    "Lipid profile": { en: "Cholesterol and triglycerides, which show heart-risk. Your doctor may ask for 9–12 hours of fasting.", mr: "कोलेस्टेरॉल व ट्रायग्लिसराइड्स, ज्यावरून हृदयाची जोखीम समजते. डॉक्टर ९–१२ तास उपाशी राहण्यास सांगू शकतात." },
    "LFT (Liver function)": { en: "Checks liver enzymes and bilirubin to see how the liver is working. Ask your doctor whether fasting is needed.", mr: "यकृत कसे काम करते हे पाहण्यासाठी एन्झाइम्स व बिलीरुबिन तपासते. उपाशी राहावे का ते डॉक्टरांना विचारा." },
    "KFT (urea, creatinine, eGFR)": { en: "Urea, creatinine and eGFR show how well the kidneys filter the blood. Drink water as usual.", mr: "युरिया, क्रिएटिनिन व इजीएफआर किडनी रक्त किती चांगले गाळते ते दाखवतात. नेहमीप्रमाणे पाणी प्या." },
    "TSH": { en: "Screens how well the thyroid gland works. No fasting needed; tell us about any thyroid tablets you take.", mr: "थायरॉईड ग्रंथी कशी काम करते ते तपासते. उपाशी राहण्याची गरज नाही; थायरॉईडच्या गोळ्या घेत असल्यास सांगा." },
    "Vitamin D": { en: "Checks your vitamin D level, which matters for bones and muscles. No fasting needed.", mr: "हाडे व स्नायूंसाठी महत्त्वाची व्हिटॅमिन डी पातळी तपासते. उपाशी राहण्याची गरज नाही." },
    "Vitamin B12": { en: "Low B12 can cause tiredness, tingling and anaemia. Follow the instruction given at booking.", mr: "बी१२ कमी असल्यास थकवा, मुंग्या व ॲनिमिया होऊ शकतो. बुकिंगच्या वेळी दिलेल्या सूचनेनुसार करा." },
    "Urine routine": { en: "A physical, chemical and microscopic check of urine. Give a clean mid-stream sample, preferably the first one in the morning.", mr: "लघवीची भौतिक, रासायनिक व सूक्ष्मदर्शी तपासणी. स्वच्छ मध्यधारेचा नमुना द्या, शक्यतो सकाळचा पहिला." },
    "CRP": { en: "A marker of inflammation or infection in the body. No fasting needed.", mr: "शरीरातील दाह किंवा संसर्गाचे निदर्शक. उपाशी राहण्याची गरज नाही." },
    "ESR": { en: "A general marker of inflammation, often used along with CBC. No fasting needed.", mr: "दाहाचे सर्वसाधारण निदर्शक, सहसा सीबीसीसोबत केले जाते. उपाशी राहण्याची गरज नाही." },
    "Dengue NS1 / IgM": { en: "NS1 antigen is most useful in the first few days of fever; IgM antibodies appear later. Your doctor decides which one you need.", mr: "तापाच्या पहिल्या काही दिवसांत एनएस१ उपयुक्त; आयजीएम प्रतिपिंडे नंतर दिसतात. कोणती हवी ते डॉक्टर ठरवतात." },
    "Typhoid (Widal / Typhidot)": { en: "Supports the diagnosis of typhoid fever. Blood culture is more specific early in the illness; your doctor will advise.", mr: "टायफॉईड तापाच्या निदानास मदत. आजाराच्या सुरुवातीला ब्लड कल्चर अधिक निश्चित; डॉक्टर सल्ला देतील." },
    "Urine culture & sensitivity": { en: "Finds the germ behind a urine infection and which antibiotics work. Give a clean mid-stream sample, ideally before starting antibiotics.", mr: "लघवीच्या संसर्गामागील जंतू व कोणती प्रतिजैविके चालतात ते शोधते. शक्यतो प्रतिजैविके सुरू करण्यापूर्वी स्वच्छ मध्यधारेचा नमुना द्या." },
    "PSA (total / free)": { en: "A prostate marker. Tell us about any recent prostate procedure or infection, and follow your urologist's advice.", mr: "प्रोस्टेटचा मार्कर. अलीकडील प्रोस्टेट प्रक्रिया किंवा संसर्ग असल्यास सांगा; युरॉलॉजिस्टच्या सल्ल्यानुसार करा." },
    "Iron profile": { en: "Iron, TIBC and saturation to check for iron deficiency. Often best done in the morning after fasting.", mr: "लोहाची कमतरता तपासण्यासाठी आयर्न, टीआयबीसी व सॅच्युरेशन. सहसा सकाळी उपाशी असताना उत्तम." },
    "Biopsy / histopathology": { en: "A small tissue sample is examined under the microscope by the pathologist. Your surgeon will explain how the sample is taken.", mr: "ऊतींचा छोटा नमुना पॅथॉलॉजिस्ट सूक्ष्मदर्शकाखाली तपासतात. नमुना कसा घेतात ते तुमचे सर्जन समजावतील." },
    "FNAC": { en: "A thin needle takes a few cells from a lump, which are examined under the microscope. Usually quick, without anaesthesia.", mr: "गाठीतून बारीक सुईने काही पेशी घेऊन सूक्ष्मदर्शकाखाली तपासल्या जातात. सहसा जलद, भूल न देता." }
  };

  // Extra FAQs
  LAB.faqs.push(
    { q: "Which tests need fasting?", q_mr: "कोणत्या तपासण्यांसाठी उपाशी राहावे लागते?",
      a: "Fasting sugar, lipid profile and a few others usually need 8–12 hours of fasting. Each package and test shows a fasting tag. Plain water is fine.",
      a_mr: "उपाशी साखर, लिपिड प्रोफाइल व काही इतर तपासण्यांसाठी सहसा ८–१२ तास उपाशी राहावे लागते. प्रत्येक पॅकेज व तपासणीवर उपाशी राहण्याचा टॅग दिसतो. साधे पाणी चालते." },
    { q: "Can I discuss my report with a doctor?", q_mr: "रिपोर्टबद्दल डॉक्टरांशी बोलता येईल का?",
      a: "Yes. You can book a consultation with the right Novatech consultant on WhatsApp or at the hospital reception.",
      a_mr: "होय. WhatsApp वर किंवा हॉस्पिटलच्या रिसेप्शनवर संबंधित नोव्हाटेक डॉक्टरांची भेट बुक करता येते." },
    { q: "Is my report private?", q_mr: "माझा रिपोर्ट गोपनीय राहतो का?",
      a: "Your report is sent only to the mobile number you give us, and to your treating doctor if you ask us to share it.",
      a_mr: "तुमचा रिपोर्ट फक्त तुम्ही दिलेल्या मोबाईल क्रमांकावर आणि तुम्ही सांगितल्यास तुमच्या उपचार करणाऱ्या डॉक्टरांना पाठवला जातो." }
  );
})();

/* ======================================================================
   LEAN-SITE SETTINGS (photos, featured packages, home tiles, reviews)
   ====================================================================== */
(function () {
  var LAB = window.LAB;

  // PHOTOS. Put your real photos in the img/ folder and set the file name here, e.g. hero: "img/lab-front.jpg".
  // While null, the draft shows a placeholder that says which photo to take. Real photos beat icons: use them.
  LAB.photos = { hero: "img/hero.svg", lab: "img/lab.svg", team: "img/team.svg", collection: "img/collection.svg", building: "img/building.svg" };
  // true while the images above are sample illustrations. A small "Sample illustration" label is shown on each.
  // When you replace them with REAL photos (img/lab.jpg etc.), set this to false and remove the label.
  LAB.photoSamples = true;

  // The 6 packages shown on the home page (all packages are on tests.html).
  var featured = ["full", "basic", "diabetes", "thyroid", "women", "heart"];
  LAB.packages.forEach(function (p) { p.featured = featured.indexOf(p.id) > -1; });

  // Tiles shown on the home page (the rest live on tests.html).
  var homeTiles = ["Full body checkup", "Diabetes", "Thyroid & hormones", "Heart", "Women's health", "Vitamins & bone", "Fever & infection"];
  LAB.tiles.forEach(function (x) { x.home = homeTiles.indexOf(x.label) > -1; });

  // REAL Google reviews only. Leave empty until you have them. Format: { name: "A. Patil", stars: 5, text: "...", text_mr: "..." }
  LAB.reviews = [];
})();


/* ======================================================================
   TEST-GROUP CARDS (pastel colour cards, like a "routine" dashboard)
   ====================================================================== */
(function () {
  var LAB = window.LAB;
  var meta = {
    haem:    { svg: "drop",   desc: "Blood counts, anaemia, iron",                 desc_mr: "रक्त पेशी, ॲनिमिया, लोह" },
    coag:    { svg: "clock",  desc: "Clotting and bleeding checks",               desc_mr: "रक्त गोठणे व रक्तस्राव तपासणी" },
    diab:    { svg: "cube",   desc: "Sugar, HbA1c and diabetes care",             desc_mr: "साखर, एचबीए१सी व मधुमेह तपासणी" },
    heart:   { svg: "heart",  desc: "Cholesterol and heart-risk markers",         desc_mr: "कोलेस्टेरॉल व हृदयाचे मार्कर्स" },
    liver:   { svg: "leaf",   desc: "Liver and pancreas health",                  desc_mr: "यकृत व स्वादुपिंडाचे आरोग्य" },
    kidney:  { svg: "water",  desc: "Kidney function and body salts",             desc_mr: "किडनी कार्य व शरीरातील क्षार" },
    hormone: { svg: "butterfly", desc: "Thyroid and hormone profiles",            desc_mr: "थायरॉईड व हार्मोन प्रोफाइल" },
    vit:     { svg: "sun",    desc: "Vitamin D, B12, bones",                      desc_mr: "व्हिटॅमिन डी, बी१२, हाडे" },
    fever:   { svg: "thermo", desc: "Dengue, malaria, typhoid",                   desc_mr: "डेंग्यू, मलेरिया, टायफॉईड" },
    viral:   { svg: "shield", desc: "HIV, hepatitis and infection markers",       desc_mr: "एचआयव्ही, हिपॅटायटिस व संसर्ग मार्कर्स" },
    micro:   { svg: "germ",   desc: "Culture and sensitivity tests",              desc_mr: "कल्चर व सेन्सिटिव्हिटी तपासण्या" },
    urine:   { svg: "tube",   desc: "Urine, stool and body fluids",               desc_mr: "लघवी, शौच व शरीरातील द्रव" },
    tumour:  { svg: "target", desc: "Cancer-marker blood tests",                  desc_mr: "कर्करोग मार्कर रक्त तपासण्या" },
    immuno:  { svg: "flower", desc: "Autoimmune and allergy tests",               desc_mr: "ऑटोइम्यून व ॲलर्जी तपासण्या" },
    histo:   { svg: "lens",   desc: "Biopsy and cytology",                        desc_mr: "बायोप्सी व सायटॉलॉजी" }
  };
  LAB.categories.forEach(function (c) { Object.assign(c, meta[c.id] || {}); });

  // The 8 cards on the home page (type: cat = open that test group; pkg = package filter)
  LAB.homeCards = [
    { svg: "user",   title: "Full body checkups", title_mr: "संपूर्ण शरीर तपासणी", desc: "Complete health screening packages", desc_mr: "संपूर्ण आरोग्य तपासणी पॅकेजेस", cta: "See packages", cta_mr: "पॅकेजेस पहा", type: "pkg", to: "all" },
    { cat: "diab",    cta: "View tests", cta_mr: "तपासण्या पहा", type: "cat", to: "diab" },
    { cat: "hormone", cta: "View tests", cta_mr: "तपासण्या पहा", type: "cat", to: "hormone" },
    { cat: "heart",   cta: "View tests", cta_mr: "तपासण्या पहा", type: "cat", to: "heart" },
    { cat: "kidney",  cta: "View tests", cta_mr: "तपासण्या पहा", type: "cat", to: "kidney" },
    { cat: "vit",     cta: "View tests", cta_mr: "तपासण्या पहा", type: "cat", to: "vit" },
    { cat: "fever",   cta: "View tests", cta_mr: "तपासण्या पहा", type: "cat", to: "fever" },
    { svg: "venus", title: "Women's health", title_mr: "महिला आरोग्य", desc: "PCOD, anaemia, bone and thyroid screen", desc_mr: "पीसीओडी, ॲनिमिया, हाडे व थायरॉईड", cta: "See packages", cta_mr: "पॅकेजेस पहा", type: "pkg", to: "women" }
  ];
})();


/* Quick-pick chips under the home search bar. open = pop-up for a package/test; q = search the tests page. */
window.LAB.searchChips = [
  { label: "Full body checkup", label_mr: "संपूर्ण शरीर तपासणी", open: "pkg:full" },
  { label: "Thyroid", label_mr: "थायरॉईड", open: "test:TSH" },
  { label: "Vitamin D", label_mr: "व्हिटॅमिन डी", open: "test:Vitamin D" },
  { label: "HbA1c", label_mr: "एचबीए१सी", open: "test:HbA1c" },
  { label: "Lipid profile", label_mr: "लिपिड प्रोफाइल", open: "test:Lipid profile" },
  { label: "Dengue", label_mr: "डेंग्यू", open: "test:Dengue NS1 / IgM" }
];


/* Count shown in the numbers banner: specialist consultants at the hospital (from the hospital's list of 14). Confirm before launch. */
window.LAB.consultantCount = 14;


/* "Tests done" tile in the numbers banner. Leave null until the lab has a REAL count (from the lab software / registers).
   Then enter it rounded DOWN, e.g. 1200 with the "+" suffix = "1,200+". While null: the demo shows a dash with a "confirm"
   tag, and the live site (draft: false) hides the tile. Update it every month or two. */
window.LAB.testsDone = null;
window.LAB.testsDoneSuffix = "+";


/* First chip under the search bar jumps to the guided finder. */
window.LAB.searchChips.unshift({ label: "Not sure? Find my checkup", label_mr: "कळत नाही? माझे चेकअप शोधा", href: "#finder", accent: true });
