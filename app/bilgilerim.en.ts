// ─────────────────────────────────────────────────────────────
// ENGLISH VERSION OF bilgilerim.ts
// Sitenin İngilizce içeriği. Türkçe dosyada (bilgilerim.ts) bir şeyi
// değiştirince buradaki karşılığını da güncelle. Dilden bağımsız alanlar
// (linkler, görseller, e-posta, telefon) doğrudan Türkçe dosyadan gelir.
// ─────────────────────────────────────────────────────────────
import * as tr from "./bilgilerim"

export const giris: typeof tr.giris = {
  ...tr.giris,
  baslik: "HELLO",
  altBaslik: "I'm Ece Özenir.",
  etiket: "PROJECT MANAGER",
  slogan: "I turn scattered ideas into projects delivered on time.",
  sloganVurgu: "projects delivered on time",
}

export const fotograf = tr.fotograf

export const hakkimda = "I manage software projects, big and small. "

export const firma: typeof tr.firma = {
  ...tr.firma,
  metin:
    "Alongside project management, I build custom software for businesses with Webadası Bilgi Teknolojileri. We listen to the idea, plan it, code it and deliver it.",
}

const g = (i: number) => tr.cozumler[i].gorsel
export const cozumler: typeof tr.cozumler = [
  {
    ikon: "sepet",
    baslik: "E-Commerce",
    aciklama: "Fast, secure and easy-to-manage online stores to sell your products.",
    detay:
      "From Ada Start to Ada Max, we set up your store with packages for every budget. With virtual POS, shipping, e-invoice and marketplace integrations, everything from order to invoice is managed from a single panel.",
    maddeler: [
      "Unlimited products & categories",
      "Free virtual POS integration",
      "Advanced shipping integrations",
      "Marketplace integration & profit reports",
      "e-Invoice with e-Logo",
      "CRM, loyalty & gift cards",
    ],
    gorsel: g(0),
  },
  {
    ikon: "restoran",
    baslik: "Restaurant & Café Automation",
    aciklama: "Manage orders, tables, kitchen and checkout from a single screen.",
    detay:
      "With Palmiye Restaurant software, we bring the daily operations of restaurants and cafés online. With Palmiye QR Menu, guests open the menu on their phones. The software is licensed to your domain: pay once, use it for life.",
    maddeler: ["Palmiye Restaurant automation", "Palmiye QR Menu", "Table & order management", "Mobile friendly", "Lifetime license"],
    gorsel: g(1),
  },
  {
    ikon: "b2b",
    baslik: "B2B Solutions",
    aciklama: "Ordering and account tracking systems that make working with dealers and suppliers easy.",
    detay:
      "Your dealers place orders from their own panel and see their account balance and their own price lists. Mobile friendly with unlimited language support, so you can work with partners abroad on the same system.",
    maddeler: ["Dealer ordering portal", "Account balances & price lists", "Unlimited language support", "Mobile friendly", "ERP integration"],
    gorsel: g(2),
  },
  {
    ikon: "erp",
    baslik: "Odoo ERP & e-Transformation",
    aciklama: "Run your business from accounting to inventory on a single panel.",
    detay:
      "We start with a needs analysis, develop Odoo modules tailored to your business and stay with you after setup with maintenance and consulting. As an e-Logo partner, we speed up your e-invoice and e-transformation processes and keep errors to a minimum.",
    maddeler: [
      "Odoo setup & custom modules",
      "Accounting & inventory",
      "e-Logo e-Invoice / e-Transformation",
      "Currency, cheque & bill modules",
      "Production & financial reporting",
      "Maintenance and support",
    ],
    gorsel: g(3),
  },
  {
    ikon: "tur",
    baslik: "Tourism: Hotels & Tours",
    aciklama: "Software built for tourism businesses, from hotel reception to tour bookings.",
    detay:
      "With Palmiye Hotel Software we make reception and room management easy. For tour companies, we bring hotel/tour bookings, ticket sales and inventory management together in one system.",
    maddeler: ["Palmiye Hotel reception software", "Hotel & tour bookings", "Ticket sales", "Inventory management", "Mobile friendly"],
    gorsel: g(4),
  },
  {
    ikon: "web",
    baslik: "Corporate Websites",
    aciklama: "Fast, mobile-friendly corporate websites that tell your brand's story at its best.",
    detay:
      "From a one-page showcase to a full corporate site, our One Page, Basic and Pro packages have an answer for every need. We also have ready-made software for news sites (Palmiye News) and clinics (Palmiye Clinic).",
    maddeler: ["One Page · Basic · Pro packages", "Mobile-friendly design", "SEO service", "Palmiye News & Clinic", "Free site migration"],
    gorsel: g(5),
  },
  {
    ikon: "sunucu",
    baslik: "Hosting & Infrastructure",
    aciklama: "From domain names to servers, all the infrastructure your site needs in one place.",
    detay:
      "With SSD hosting and cloud servers in Türkiye, France and Germany, your site runs fast and secure. Along with daily automatic backups and 24/7 server monitoring, we also offer business e-mail, SSL and e-signature services.",
    maddeler: ["Domain registration", "SSD hosting & cloud servers", "Business e-mail", "SSL certificates", "Daily backups", "24/7 support"],
    gorsel: g(6),
  },
]

export const rakamlar: typeof tr.rakamlar = [
  { deger: "12+", aciklama: "Projects delivered" },
  { deger: "%95", aciklama: "On-time delivery rate" },
]

const p = (ad: string) => tr.projeler.find((x) => x.ad === ad)!
export const projeler: typeof tr.projeler = [
  {
    ...p("Fujifilm Printer Projesi"),
    ad: "Fujifilm Printer Project",
    aciklama: "Corporate product site for Fujifilm's office printers and industrial printing machines in Türkiye. Product catalog, references, authorized dealer finder and contact forms.",
    etiketler: ["Corporate site", "Product catalog", "B2B"],
  },
  {
    ...p("CNS Woman"),
    aciklama: "Online store and marketplace integration for a women's fashion brand. Wide product categories from tops to swimwear, stock synced with marketplaces and site-exclusive discounts.",
    etiketler: ["E-commerce", "Marketplace integration", "Fashion"],
  },
  {
    ...p("NATO Concept"),
    aciklama: "Online store for a brand selling car seat covers, floor mats and upholstery. Products matched to more than 100 car models and an online shopping discount.",
    etiketler: ["E-commerce", "Automotive"],
  },
  {
    ...p("E&N Butik"),
    aciklama: "Online store for E&N Butik. Product catalog, online ordering and payment infrastructure.",
    etiketler: ["E-commerce", "Fashion"],
  },
  {
    ...p("Cihat Arslan Athletic Performance Center"),
    aciklama: "Corporate site for an athletic performance center in Istanbul. Training packages, appointments and services; strength, conditioning and rehabilitation programs.",
    etiketler: ["Corporate site", "Appointments", "Sports"],
  },
  {
    ...p("Arya Yapı Cephe"),
    aciklama: "Corporate site for a construction company specializing in natural stone cladding, fiber cement facades and fireplaces. Services, reference projects and free site survey requests.",
    etiketler: ["Corporate site", "Construction"],
  },
  {
    ...p("Düzce Bambu Oyun Atölyesi"),
    ad: "Düzce Bambu Play Workshop",
    aciklama: "Site for a children's play and discovery workshop built with natural materials. Parent-child groups, preschool prep, birthday parties and art workshops; integrated shop and bookings.",
    etiketler: ["Corporate site", "E-commerce", "Bookings"],
  },
  {
    ...p("Uğur Usta Otomotiv"),
    aciklama: "Corporate site for a Mercedes heavy vehicle service in Bolu. Engine, gearbox, differential and brake repair, plus 24/7 roadside assistance.",
    etiketler: ["Corporate site", "Automotive"],
  },
  {
    ...p("STSİZ Toptancı Projesi"),
    ad: "STSİZ Wholesale Project",
    aciklama: "B2B ordering platform for wholesalers and dealers. Dealer login, product catalog and bulk order management.",
    etiketler: ["B2B", "Wholesale"],
  },
  {
    ...p("Dr. Özgür Sabah"),
    aciklama: "Personal site for a physician working in aesthetic medicine and complementary therapies. Online appointments, treatment pages, patient reviews and a blog.",
    etiketler: ["Corporate site", "Healthcare", "Online appointments"],
  },
]

const k = (ad: string) => tr.katkilar.find((x) => x.ad === ad)!
export const katkilar: typeof tr.katkilar = [
  {
    ...k("Tevekkel Yedek Parça"),
    ad: "Tevekkel Spare Parts",
    aciklama: "B2B ordering platform for dealers of Tevekkel, in the automotive business since 1978. Original and aftermarket spare parts listed brand by brand.",
    etiketler: ["B2B", "Automotive"],
  },
  {
    ...k("QuickSnap Türkiye"),
    aciklama: "Website for FUJIFILM QuickSnap single-use film cameras. Product features, shooting tips and photo lab information.",
    etiketler: ["FUJIFILM"],
  },
  {
    ...k("Ala by Konsopa"),
    aciklama: "Showcase site for a bar & lounge inside a boutique hotel in Düzce. Live music, cocktail menu and reservations.",
    etiketler: ["Corporate site", "Tourism"],
  },
  {
    ...k("Acoustera"),
    aciklama: "Online store for modular systems that combine acoustic panels with lighting.",
    etiketler: ["E-commerce", "Interior design"],
  },
]

export const egitim: typeof tr.egitim = [
  { ...tr.egitim[0], okul: "Istanbul Nişantaşı University", bolum: "Management Information Systems (English), Bachelor's" },
  { ...tr.egitim[1], okul: "TED College", bolum: "High School" },
]

export const sertifikalar: typeof tr.sertifikalar = [
  {
    ...tr.sertifikalar[0],
    ad: "Frontend Software Specialization",
    kurum: "Acunmedya Academy × Istanbul Nişantaşı University",
    aciklama: "Completed the Extended Software Specialization Frontend Training Program.",
  },
  { ...tr.sertifikalar[1], aciklama: "English B1 level certificate." },
]

export const deneyim: typeof tr.deneyim = [
  {
    ...tr.deneyim[0],
    tarih: "2025-Present",
    rol: "Project Manager",
    aciklama: "I manage e-commerce, corporate website and B2B projects from the idea stage to delivery.",
  },
  { ...tr.deneyim[1], rol: "Website Designer (Intern)", sirket: "Overlook Agency" },
  { ...tr.deneyim[2], rol: "Website Designer" },
]

export const yetkinlikler: typeof tr.yetkinlikler = [
  {
    ikon: "yonetim",
    baslik: "Project Management",
    aciklama: "I plan the process from idea to delivery, spot risks early and keep the team focused on the same goal.",
    maddeler: ["Project planning", "Crisis management", "Stakeholder management", "Team coordination"],
  },
  {
    ikon: "kod",
    baslik: "Frontend Development",
    aciklama: "I build modern, fast and mobile-friendly interfaces.",
    maddeler: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Bootstrap"],
  },
  {
    ikon: "arac",
    baslik: "Design & Tools",
    aciklama: "The tools I use, from design to business processes.",
    maddeler: ["Figma", "Odoo", "Microsoft Office"],
  },
  {
    ikon: "ekip",
    baslik: "Leadership & Communication",
    aciklama: "Clear, regular communication with the team and with clients.",
    maddeler: ["Team leadership", "Client communication", "Presentations & reporting"],
  },
]

export const iletisim = tr.iletisim

// İngilizcede kartvizitin İngilizce yüzü önde
export const kartvizit: typeof tr.kartvizit = { on: tr.kartvizit.arka, arka: tr.kartvizit.on }

export const tosfed = tr.tosfed

const RALLI = "From the rally where I served as Timing and Results Officer: "
const a = (slug: string) => tr.galeri.find((x) => x.slug === slug)!
export const galeri: typeof tr.galeri = [
  {
    ...a("ofisten-kareler"),
    baslik: "From the office",
    aciklama: "Our workspace at the Webadası office, and Ada, our office cat.",
  },
  { ...a("2026-eskisehir-esok-rally"), tarih: "18-20 September 2026", aciklama: RALLI + "ETİ Odunpazarı Esok Rally." },
  { ...a("2026-kapadokya-ralli"), baslik: "Cappadocia Rally", yer: "Nevşehir", tarih: "21-23 August 2026", aciklama: RALLI + "Cappadocia Rally." },
  { ...a("2026-bursa-ralli"), baslik: "50th Green Bursa Rally", tarih: "5-7 June 2026", aciklama: RALLI + "50th Green Bursa Rally." },
  { ...a("2026-bodrum-ralli"), tarih: "May 2026", aciklama: RALLI + "Rally Bodrum." },
  { ...a("2026-marmaris-ege-rallisi"), baslik: "Marmaris Aegean Rally", tarih: "April 2026", aciklama: RALLI + "Marmaris Aegean Rally." },
  {
    ...a("fujifilm-toplantisi"),
    baslik: "Fujifilm meeting",
    aciklama: "From the project meetings we hold with Fujifilm.",
  },
  {
    ...a("flora-natural-cekimi"),
    baslik: "Flora Natural content shoot",
    aciklama: "From the content shoot for Flora Natural, whose social media we also manage.",
  },
]

export const referanslar: typeof tr.referanslar = tr.referanslar.map((r) =>
  r.ad === "Tevekkel Yedek Parça" ? { ...r, ad: "Tevekkel Spare Parts" } : r
)
