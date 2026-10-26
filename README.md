> **DEMO PAGE.** Sample content for review. Not the official website of Novatech Multispeciality Hospital.

# Novatech Hospital Laboratory — website draft

Single-page, mobile-first, English + Marathi site for the pathology lab inside Novatech Multispeciality Hospital, Sangli.
No build step, no backend. All content is in `data.js`.

## Preview
```
cd ~/Documents/NovatechLab-site && python3 -m http.server 8791
# open http://localhost:8791
```

## Before going live (every yellow "confirm" tag in the page)
1. `data.js`: `phone`, `whatsapp` (digits, with 91), `address`, `mapUrl`, `hours.*`, `pathologist`, final `labName`.
2. Fill every `price` and `tat` for packages and tests. Pathologist to finalise the `includes` lists.
3. `accreditation`: leave `null` until a NABL/CAP certificate is actually held.
4. Review the test catalogue (`categories` in `data.js`, 15 tabs / 106 tests, built from what the hospital's 14 consultants may request). Ask the pathologist which tests are in-house vs sent to a reference lab, and remove any you will not offer. Add prices in `prices`, e.g. `"HbA1c": 450`.
5. Get the hospital's compliance person or lawyer to review the copy against NMC advertising rules; no testimonials or superlatives ("best", "No.1").
6. Review the Marathi text with a native reader.
7. Set `draft: false`, remove `<meta name="robots" content="noindex">` in `index.html`, and fill the JSON-LD block.
8. Host it (Netlify / GitHub Pages / hospital server) on a domain, then:
   - claim the Google Business Profile (hospital lab) and link this URL,
   - add Google Analytics + a WhatsApp-click conversion.

## Two pages
- `index.html` (lean home): hero (big purple headline, pill search with live suggestions for tests and packages, quick-pick chips from `LAB.searchChips`, four round buttons: Book a test / Checkups / Home collection / Report), area check,
  7 browse tiles, 6 featured checkups, "Meet your lab" photos + trust, 4 steps, reviews (only real ones), contact.
- `tests.html`: all 10 packages with filters, all 106 tests in tabs, preparation guide, BMI and diabetes-risk checks,
  doctors and companies, FAQ. Links such as `tests.html?cat=heart#tests` and `?pkg=women#packages` open the right tab.
- The "my list" is carried between the two pages for the session.

## Call-to-action rules used (and what to A/B test after launch)
Applied: one dominant action (Book on WhatsApp: pinned bar on phones, chat button on desktop, large hero button), labels start with a verb and name the outcome,
button text contrast >= 4.5:1 (WhatsApp green is #15803d, 5.0:1), tap targets >= 44px, and a note saying what happens on tap ("Opens WhatsApp with your message already written").
Not proven for this lab: the advice comes from design guidelines and marketing blogs, not tests on your visitors. After launch, test ONE change at a time with real traffic:
1. "Book on WhatsApp" vs first-person "Book my test" (the "+90%" claim is from one old test; treat as a hypothesis).
2. Hero order: search first (current) vs the Book button first.
3. Number of chips under the search bar (7 now) vs 4.
4. "Add to list" vs "Book now" directly on package cards.
Track with analytics events: WhatsApp click, Call click, Add click, finder completed.

## Engagement features
- **Find your checkup in 2 taps** (home page, `#finder`): who it is for -> what matters most -> 1-2 suggested checkups with Add. Rules are in `recommend()` in `app.js`
  (they use package ids). It is a suggestion only; the page says the doctor decides. Review the rules with the pathologist.
- **Audience chips** (Men / Women / 60+ / Diabetes / Heart / Kidney / Fever / Before surgery) now filter the featured checkups on the home page too.
- **My list drawer:** the bar's "N selected · View list" opens the list with remove buttons and a WhatsApp send button.
- **Part of these checkups:** a test's pop-up links to the checkups that include it (matched from each package's `includes`).
- **Chat button** on desktop (phones already have the bottom bar).
- Add analytics events at launch (WhatsApp click, finder completed, Add clicked) so you can see what actually keeps people clicking.

## Hero headline
The second headline line rotates through three phrases (`rot1`-`rot3`), and the sentence under it changes with it (`sub1`-`sub3`).
All six strings (English and Marathi) are in `app.js` / `i18n-lean.js`. The height is reserved for the longest version so nothing jumps.
With "reduce motion" turned on in the visitor's device, it shows one fixed line instead.

## Look and feel
Inspired by MarketSmith India's "routine" card grid: deep purple (`--brand` in `styles.css`, #6e2a8f) for headings and buttons,
Nunito headings + Inter text, pastel cards with a solid round icon, bold count, purple button. Card colours are the `PAL` list in `app.js`;
test-group names, one-line descriptions and icons are in `data.js` (`categories`, `homeCards`). WhatsApp buttons stay green on purpose.
Change the whole colour scheme by editing the `:root` variables at the top of `styles.css`.

## Works on all devices
Checked at 320, 375, 390, 414, 768, 1024, 1280 and 1440 px: no sideways scroll, tap targets >= 44px, 16px form fields (no iOS zoom),
no sticky hover on touch screens, safe-area padding for notched phones, test-group cards become a swipe row on phones,
`prefers-reduced-motion` respected, print hides the bars. Test on real devices before launch (an old Android phone and an iPhone if you can).

## Numbers banner ("Tests done" and the rest)
The banner on the home page reads its figures from the site's own data (tests available, packages, areas, `consultantCount`).
**"Tests done"** comes from `LAB.testsDone` in `data.js` and is `null` until the lab has a REAL count (from the lab software or registers).
While `null`: the demo shows a dash with a "confirm" tag; the live site (`draft: false`) hides the tile. When you have a real count, enter it rounded
down (e.g. `1200`) and it shows as "1,200+" (Indian digit grouping, e.g. 25,00,000+). Refresh it every month or two. Never enter a number you cannot back up.

## Sample illustrations (current images)
`img/hero.svg`, `lab.svg`, `team.svg`, `collection.svg`, `building.svg` are original illustrations drawn for this demo (no stock photos, no licences, no real people).
They fill the five photo spots and show a small "Sample illustration" label. To switch to real photos: put them in `img/`, change the file names in
`LAB.photos` (`data.js`), and set `LAB.photoSamples = false` to remove the label.

## Photos (the biggest upgrade you can make)
Take phone photos in good daylight, landscape, and put them in `img/`. Then set the file names in `LAB.photos` in `data.js`:
`hero` (lab entrance or team), `lab` (analysers, clean bench), `team` (pathologist + technicians, with consent),
`collection` (collection staff in uniform), `building` (hospital front). Until set, draft shows a dashed 📷 box that says what to shoot.
Only real photos; no stock images of "doctors", and get written consent from anyone shown.

## What was on the long page (now split across the two pages)
Hero with rotating headline and live counts, 16 clickable lab-option tiles (jump to a test group or package filter),
trust block, 10 packages (filter by who it is for, fasting/report tags, tap for a detail pop-up), 106 tests in 15 tabs
(tap a test for a plain-language explanation), prepare-for-your-test guide, BMI and diabetes-risk calculators, home
collection, doctors, companies/camps, FAQ, contact. English + Marathi. Research notes: `RESEARCH.md`.

## Extra review items
- Pathologist/clinician must review: `testInfo` explanations, fasting hours, and the two calculators
  (BMI uses Asian-Indian cut-offs; diabetes score is the Indian Diabetes Risk Score). They are screening aids only.
- Fill `LAB.claims` (data.js) with `true` only for statements the hospital will stand behind
  (pathologist oversight, reports checked, sharing with the treating doctor, privacy). `null` shows a "confirm" tag in draft and hides when live.
- Update `LAB.seasonal` each season; add `reportUrl` and `reviewUrl` when they exist.

## How booking works
No cart backend. "Add" builds a list in the browser and the WhatsApp button sends it as one prefilled message
(selected tests + area). The lab staff replies with the time and price. Add a real booking system later if volume needs it.
