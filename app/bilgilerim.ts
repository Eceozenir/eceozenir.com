// ─────────────────────────────────────────────────────────────
// BİLGİLERİNİ BURADAN DÜZENLE
// Sitedeki bütün yazılar bu dosyada. Köşeli parantez [ ] içindeki
// örnek yazıları kendi bilgilerinle değiştir, parantezleri sil.
// Yeni bir proje / eğitim / sertifika eklemek için { ... } bloğunu
// kopyalayıp altına yapıştır (sonuna virgül koymayı unutma).
// ─────────────────────────────────────────────────────────────

export const giris = {
  video: "/aycicegi.mp4",
  baslik: "MERHABA",
  altBaslik: "Ben Ece Özenir.",
  altBaslikVurgu: "Ece Özenir", // alt başlıkta renkli ve altı çizili kısım
  etiket: "PROJE YÖNETİCİSİ",
  slogan: "Dağınık fikirleri, zamanında teslim edilen projelere dönüştürüyorum.",
  sloganVurgu: "zamanında teslim edilen projelere", // sloganda renkli kısım
}

// Fotoğrafını public klasörüne bu adla koy (jpg, png veya webp olabilir;
// farklı bir ad/uzantı kullanırsan burayı da değiştir).
export const fotograf = "/ece.jpg"

export const hakkimda =
  "Büyük küçük fark etmeksizin yazılım projelerini yönetiyorum. "

export const firma = {
  ad: "Webadası Bilgi Teknolojileri",
  metin:
    "Proje yöneticiliğinin yanında Webadası Bilgi Teknolojileri ile işletmelere özel yazılımlar geliştiriyorum. Fikri dinliyor, planlıyor, kodluyor ve teslim ediyoruz.",
  site: "", // örn: "https://webadasi.com"
}

// "İşletmeniz için ne yapabiliriz?" bölümü (içerikler webadasi.com'dan).
// ikon seçenekleri: "sepet" | "restoran" | "b2b" | "erp" | "tur" | "web" | "sunucu" | "mobil"
// gorsel: webadasi.com'daki görselin adresi ya da public/hizmetler klasörüne koyduğun
//         görselin yolu (örn: "/hizmetler/eticaret.jpg"; jpg, png, webp ya da mp4).
//         Boş bırakırsan o hizmete özel hareketli çizim gösterilir.
export const cozumler = [
  {
    ikon: "sepet",
    baslik: "E-Ticaret",
    aciklama: "Ürünlerinizi online satmanız için hızlı, güvenli ve yönetmesi kolay e-ticaret siteleri.",
    detay:
      "Ada Start'tan Ada Max'e kadar her bütçeye uygun paketlerle mağazanızı kuruyoruz. Sanal pos, kargo, e-fatura ve pazaryeri entegrasyonlarıyla siparişten faturaya kadar tüm süreç tek panelden yönetiliyor.",
    maddeler: [
      "Sınırsız ürün & kategori",
      "Ücretsiz sanal pos entegrasyonu",
      "Gelişmiş kargo entegrasyonları",
      "Pazaryeri entegrasyonu & kâr raporu",
      "e-Logo ile e-Fatura",
      "CRM, sadakat & hediye kartı",
    ],
    gorsel: "https://odoo.webadasi.net/web/image/706-92fc394a/Ekran%20Resmi%202025-04-16%2010.22.33.webp", // webadasi.com'dan
  },
  {
    ikon: "restoran",
    baslik: "Restoran & Kafe Otomasyonu",
    aciklama: "Sipariş, masa, mutfak ve kasa süreçlerini tek ekrandan yönetin.",
    detay:
      "Palmiye Restoran yazılımı ile restoran ve kafelerin günlük operasyonunu dijitale taşıyoruz. Palmiye QR Menü ile misafirleriniz menüye telefonundan ulaşıyor. Yazılımlar alan adınıza lisanslı, tek ödemeyle ömür boyu kullanım.",
    maddeler: ["Palmiye Restoran otomasyonu", "Palmiye QR Menü", "Masa & sipariş yönetimi", "Mobil uyumlu", "Ömür boyu lisans"],
    gorsel: "https://www.webadasi.com/resources/uploads/software/2024-10-23/ccaf03402ac08d46dd02497.png", // webadasi.com'dan
  },
  {
    ikon: "b2b",
    baslik: "B2B Çözümleri",
    aciklama: "Bayi ve tedarikçilerinizle çalışmayı kolaylaştıran sipariş ve cari takip sistemleri.",
    detay:
      "Bayileriniz kendi panelinden sipariş verir, cari hesabını ve size özel fiyat listelerini görür. Mobil uyumlu ve sınırsız dil desteğiyle yurt dışındaki iş ortaklarınızla da aynı sistemden çalışırsınız.",
    maddeler: ["Bayi sipariş portalı", "Cari hesap & fiyat listeleri", "Sınırsız dil desteği", "Mobil uyumlu", "ERP entegrasyonu"],
    gorsel: "https://www.webadasi.com/resources/uploads/software/2026-09-30/e0ac8fa4c10507bca77a8b0.png", // webadasi.com'dan
  },
  {
    ikon: "erp",
    baslik: "Odoo ERP & e-Dönüşüm",
    aciklama: "Muhasebeden stok yönetimine kadar işinizi tek panelden yönetin.",
    detay:
      "İhtiyaç analiziyle başlıyor, işletmenize özel Odoo modüllerini geliştiriyor, kurulumdan sonra bakım ve danışmanlıkla yanınızda oluyoruz. e-Logo iş ortaklığıyla e-fatura ve e-dönüşüm süreçlerinizi hızlandırıyor, hataları en aza indiriyoruz.",
    maddeler: [
      "Odoo kurulum & özel modül",
      "Muhasebe & stok yönetimi",
      "e-Logo e-Fatura / e-Dönüşüm",
      "Döviz, çek & senet modülleri",
      "Üretim & finansal raporlama",
      "Bakım ve destek",
    ],
    gorsel: "https://www.webadasi.com/resources/uploads/slides/2025-04-29/b7dd7ccac76869c701ab762.webp", // webadasi.com'dan
  },
  {
    ikon: "tur",
    baslik: "Turizm: Otel & Tur",
    aciklama: "Otel resepsiyonundan tur rezervasyonuna turizm işletmelerine özel yazılımlar.",
    detay:
      "Palmiye Otel Yazılımı ile resepsiyon ve oda yönetimini kolaylaştırıyoruz. Tur şirketleri için otel/tur rezervasyonu, bilet satışı ve envanter yönetimini tek sistemde topluyoruz.",
    maddeler: ["Palmiye Otel resepsiyon yazılımı", "Otel & tur rezervasyonu", "Bilet satışı", "Envanter yönetimi", "Mobil uyumlu"],
    gorsel: "https://www.webadasi.com/resources/uploads/software/2024-08-08/fa17ae792e9278c0238b607.png", // webadasi.com'dan
  },
  {
    ikon: "web",
    baslik: "Kurumsal Web Siteleri",
    aciklama: "Markanızı en iyi şekilde anlatan, mobil uyumlu ve hızlı kurumsal siteler.",
    detay:
      "Tek sayfalık tanıtım sitesinden kapsamlı kurumsal siteye kadar One Page, Basic ve Pro paketleriyle her ihtiyaca bir çözüm sunuyoruz. Haber siteleri (Palmiye Haber) ve poliklinikler (Palmiye Poliklinik) için hazır yazılımlarımız da var.",
    maddeler: ["One Page · Basic · Pro paketler", "Mobil uyumlu tasarım", "SEO hizmeti", "Palmiye Haber & Poliklinik", "Ücretsiz site taşıma"],
    gorsel: "https://www.webadasi.com/resources/uploads/software/2024-08-08/c58320db198056d19e01570.jpeg", // webadasi.com'dan
  },
  {
    ikon: "sunucu",
    baslik: "Hosting & Altyapı",
    aciklama: "Alan adından sunucuya, sitenizin ihtiyaç duyduğu tüm altyapı tek yerde.",
    detay:
      "SSD hosting ve Türkiye, Fransa, Almanya lokasyonlu bulut sunucularla siteniz hızlı ve güvenli çalışır. Günlük otomatik yedekleme ve 7/24 sunucu izlemenin yanında kurumsal e-posta, SSL ve e-imza hizmetleri de sunuyoruz.",
    maddeler: ["Alan adı tescili", "SSD hosting & bulut sunucu", "Kurumsal e-posta", "SSL sertifikası", "Günlük yedekleme", "7/24 destek"],
    gorsel: "", // örn: "/hizmetler/hosting.jpg"
  },
]

export const rakamlar = [
  { deger: "12+", aciklama: "Yürütülen proje" },
  { deger: "%95", aciklama: "Zamanında teslim oranı" },
]

// Yürüttüğün projeler. Ana sayfada ilk 4 tanesi görünür, hepsi /projeler sayfasında.
// canli: false yazarsan "Siteyi burada gez" butonu o projede gizlenir.
// Önizleme: sitenin ekran görüntüsünü ya da kısa ekran kaydını public/onizlemeler
// klasörüne koy ve "onizleme" alanına yolunu yaz (jpg, png, webp, mp4 olabilir).
export const projeler = [
  {
    ad: "Fujifilm Printer Projesi",
    aciklama: "Fujifilm'in Türkiye'deki ofis yazıcıları ve endüstriyel baskı makineleri için kurumsal ürün sitesi. Ürün kataloğu, referanslar, yetkili satıcı rehberi ve iletişim formları.",
    etiketler: ["Kurumsal site", "Ürün kataloğu", "B2B"],
    link: "https://fujifilmbaskicozumleri.com/",
    onizleme: "",
  },
  {
    ad: "CNS Woman",
    aciklama: "Kadın giyim markası için e-ticaret sitesi ve pazaryeri entegrasyonu. Üst giyimden mayoya geniş ürün kategorileri, pazaryerleriyle senkron stok ve siteye özel indirim kurgusu.",
    etiketler: ["E-ticaret", "Pazaryeri entegrasyonu", "Moda"],
    link: "https://www.cnswoman.com.tr/",
    onizleme: "",
  },
  {
    ad: "NATO Concept",
    aciklama: "Araç koltuk kılıfı, paspas ve döşeme ürünleri satan marka için e-ticaret sitesi. 100'den fazla araç modeline göre ürün seçimi ve online alışveriş indirimi.",
    etiketler: ["E-ticaret", "Otomotiv"],
    link: "https://www.natoconcept.com/",
    onizleme: "",
  },
  {
    ad: "E&N Butik",
    aciklama: "E&N Butik için e-ticaret sitesi. Ürün kataloğu, online sipariş ve ödeme altyapısı.",
    etiketler: ["E-ticaret", "Moda"],
    link: "https://enbutik.com",
    canli: false, // site pencere içinde açılmıyor; açılırsa bu satırı sil
    onizleme: "",
  },
  {
    ad: "Cihat Arslan Athletic Performance Center",
    aciklama: "İstanbul'daki atletik performans merkezi için kurumsal site. Antrenman paketleri, randevu ve hizmet tanıtımları; kuvvet, kondisyon ve rehabilitasyon programları.",
    etiketler: ["Kurumsal site", "Randevu", "Spor"],
    link: "https://cihatarslan.com.tr/",
    onizleme: "",
  },
  {
    ad: "Arya Yapı Cephe",
    aciklama: "Doğal taş kaplama, fibercement cephe sistemleri ve şömine uygulamaları yapan yapı firması için kurumsal site. Hizmetler, referans projeler ve ücretsiz keşif talebi.",
    etiketler: ["Kurumsal site", "İnşaat"],
    link: "https://www.aryayapicephe.com/",
    onizleme: "",
  },
  {
    ad: "Düzce Bambu Oyun Atölyesi",
    aciklama: "Çocuklar için doğal malzemeli oyun ve keşif atölyesi sitesi. Ebeveyn-çocuk grupları, okul öncesi hazırlık, doğum günü ve sanat atölyeleri; entegre mağaza ve rezervasyon.",
    etiketler: ["Kurumsal site", "E-ticaret", "Rezervasyon"],
    link: "https://www.duzcebambu.com/",
    onizleme: "",
  },
  {
    ad: "Uğur Usta Otomotiv",
    aciklama: "Bolu'da Mercedes ağır vasıta servisi için kurumsal site. Motor, şanzıman, diferansiyel ve fren tamiri ile 7/24 yol yardımı hizmetlerinin tanıtımı.",
    etiketler: ["Kurumsal site", "Otomotiv"],
    link: "https://ugurustabolu.com/",
    onizleme: "",
  },
  {
    ad: "STSİZ Toptancı Projesi",
    aciklama: "[Toptan satış platformu — kısa açıklamayı sen kontrol et/düzenle.]",
    etiketler: ["B2B", "Toptan satış"],
    link: "https://stsiz.com/",
    canli: false, // site pencere içinde açılmıyor; açılırsa bu satırı sil
    onizleme: "",
  },
  {
    ad: "Dr. Özgür Sabah",
    aciklama: "Estetik tıp ve tamamlayıcı tedaviler alanında çalışan hekim için kişisel site. Online randevu, tedavi sayfaları, hasta yorumları ve blog.",
    etiketler: ["Kurumsal site", "Sağlık", "Online randevu"],
    link: "https://www.drozgursabah.com/",
    onizleme: "",
  },
]

// "Katkıda bulunduklarım" bölümü: ekibin parçası olarak katkı sağladığın siteler.
// Yeni site eklemek için bir { ... } bloğunu kopyala. canli: false → site pencere içinde açılmaz.
export const katkilar = [
  {
    ad: "Tevekkel Yedek Parça",
    aciklama: "1978'den beri otomotiv sektöründe olan Tevekkel için bayilere özel B2B sipariş platformu. Orijinal ve muadil yedek parçalar marka marka listeleniyor.",
    etiketler: ["B2B", "Otomotiv"],
    link: "https://www.tevekkelparca.com.tr/",
    onizleme: "",
  },
  {
    ad: "QuickSnap Türkiye",
    aciklama: "FUJIFILM QuickSnap tek kullanımlık film kameraları için e-ticaret sitesi. Ürün tanıtımı, çekim ipuçları ve baskı merkezi bilgileri.",
    etiketler: ["E-ticaret", "FUJIFILM"],
    link: "https://quicksnapturkiye.com/",
    onizleme: "",
  },
  {
    ad: "Ala by Konsopa",
    aciklama: "Düzce'de butik otel içindeki bar & lounge için tanıtım sitesi. Canlı müzik, kokteyl menüsü ve rezervasyon.",
    etiketler: ["Kurumsal site", "Turizm"],
    link: "https://alakonsopa.com/",
    onizleme: "",
  },
  {
    ad: "Acoustera",
    aciklama: "Akustik paneller ile aydınlatmayı birleştiren modüler sistemler için e-ticaret sitesi.",
    etiketler: ["E-ticaret", "İç mimari"],
    link: "https://www.acoustera.com/",
    onizleme: "",
  },
]

export const egitim = [
  {
    okul: "İstanbul Nişantaşı Üniversitesi",
    bolum: "Yönetim Bilişim Sistemleri (İngilizce) — Lisans",
    tarih: "2022 — 2026",
    not: "",
  },
  {
    okul: "TED Koleji",
    bolum: "Lise",
    tarih: "2018 — 2022",
    not: "",
  },
]
// Sertifikalar "Yolculuğum" bölümünde gösterilir.
export const sertifikalar = [
  {
    ad: "Yazılım Uzmanlığı — Frontend",
    kurum: "Acunmedya Akademi × İstanbul Nişantaşı Üniversitesi",
    tarih: "2023 — 2024",
    saat: "260", // sağ tarafta büyük yazılan sayı
    aciklama: "Genişletilmiş Yazılım Uzmanlığı – Frontend Eğitimi Programı’nı tamamladım.",
    // Sertifikanın görseli (kimlik ve barkod numarası gizlenmiş hâli).
    // Boş bırakırsan 3B sertifika bölümü görünmez.
    gorsel: "/sertifikalar/acunmedya.jpg",
    link: "",
  },
  {
    ad: "Cambridge English — B1",
    kurum: "Cambridge Assessment English",
    tarih: "2022",
    saat: "",
    aciklama: "İngilizce B1 seviye belgesi.",
    // Belgenin görselini public/sertifikalar klasörüne koyup yolunu yazarsan
    // bu sertifika da 3B kart olarak gösterilir.
    gorsel: "",
    link: "",
  },
]

export const deneyim = [
  {
    tarih: "2025 — Bugün",
    rol: "Proje Yöneticisi",
    sirket: "Webadası Bilgi Teknolojileri",
    aciklama: "E-ticaret, kurumsal site ve B2B projelerini fikir aşamasından teslimata kadar yönetiyorum.",
  },
  {
    tarih: "2024",
    rol: "Website Tasarımcısı (Stajyer)",
    sirket: "Overlook Ajans",
    aciklama: "",
  },
  {
    tarih: "2023",
    rol: "Website Tasarımcısı",
    sirket: "Webadası Bilgi Teknolojileri",
    aciklama: "",
  },
]

// "Uzmanlık alanlarım" bölümü. ikon seçenekleri: "yonetim" | "kod" | "arac" | "ekip"
// İlk grup büyük ve koyu renkli kart olarak gösterilir.
export const yetkinlikler = [
  {
    ikon: "yonetim",
    baslik: "Proje Yönetimi",
    aciklama: "Fikirden teslimata kadar süreci planlıyor, riskleri önceden görüyor ve ekibi aynı hedefe odaklıyorum.",
    maddeler: ["Proje planlama", "Kriz yönetimi", "Paydaş yönetimi", "Ekip koordinasyonu"],
  },
  {
    ikon: "kod",
    baslik: "Frontend Geliştirme",
    aciklama: "Modern, hızlı ve mobil uyumlu arayüzler geliştiriyorum.",
    maddeler: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Bootstrap"],
  },
  {
    ikon: "arac",
    baslik: "Tasarım & Araçlar",
    aciklama: "Tasarımdan iş süreçlerine kadar kullandığım araçlar.",
    maddeler: ["Figma", "Odoo", "Microsoft Office"],
  },
  {
    ikon: "ekip",
    baslik: "Liderlik & İletişim",
    aciklama: "Ekiple ve müşteriyle açık, düzenli iletişim.",
    maddeler: ["Ekip liderliği", "Müşteri iletişimi", "Sunum & raporlama"],
  },
]

export const iletisim = {
  eposta: "ece@webadasi.com",
  telefon: "0549 800 01 81", // örn: "+90 555 555 55 55" — boş bırakırsan görünmez
  linkedin: "https://www.linkedin.com/",
}

// İletişim bölümündeki kartvizit (tıklayınca çevrilir). Görseller public/kartvizit içinde.
export const kartvizit = {
  on: "/kartvizit/tr.jpg",
  arka: "/kartvizit/en.jpg",
}
