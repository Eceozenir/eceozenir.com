// Sitedeki sabit yazılar (menü, düğmeler, başlıklar) iki dilde.
// İçerik (projeler, galeri, hakkımda...) app/bilgilerim.ts ve app/bilgilerim.en.ts dosyalarında.
// {ad} gibi süslü parantezli yerler sayfada doldurulur.

export type Dil = "tr" | "en"

const tr = {
  // Menü
  anaSayfa: "Ana Sayfa",
  projeler: "Projeler",
  galeri: "Galeri",
  hakkimda: "Hakkımda",
  iletisim: "İletişim",
  iletisimeGec: "İletişime geç",
  rol: "Proje Yöneticisi",
  anaMenu: "Ana menü",
  mobilMenu: "Mobil menü",
  menuAc: "Menüyü aç",
  menuKapat: "Menüyü kapat",
  dilDegistir: "Switch to English",

  // Giriş
  projeleriGor: "Projeleri gör",
  referanslar: "Referanslar",

  // Ana sayfa
  merhaba: "Merhaba,",
  ben: "ben",
  egitimSaati: "Saat yazılım eğitimi",
  fikirden: "Fikirden",
  teslimata: "teslimata",
  oneCikan: "Öne çıkan projeler",
  oneCikanAciklama: "Yönettiğim {n} projeden bazıları. Önizlemeye tıklayıp siteyi buradan gezebilirsiniz.",
  tumProjeler: "Tüm projeler",
  referansAciklama: "Birlikte çalıştığımız markalardan bazıları.",
  galeriAciklama: "Ofisten, ralli parkurlarından ve toplantılardan kareler.",
  galeriyeGit: "Galeriye git",

  // Hizmetler
  hizmetBaslik: "{firma} ile neler yapıyoruz?",
  hizmetAciklama: "İşletmelere fikirden canlıya kadar uçtan uca yazılım çözümleri. Bir alan seçin, ne sunduğumuza yakından bakın.",
  bilgiAl: "Bilgi al",
  hemenAra: "Hemen ara",
  mailKonu: "{b} hakkında bilgi almak istiyorum",

  // İletişim bölümü ve alt bilgi
  projenizMiVar: "Projeniz mi var?",
  konusalim: "Konuşalım.",
  iletisimMetin: "E-ticaret, kurumsal site, B2B ya da işletmenize özel bir yazılım için bana doğrudan ulaşabilirsiniz.",
  birProjenizMiVar: "Bir projeniz mi var?",
  rolFirma: "Proje Yöneticisi, {firma}.",
  sayfalar: "Sayfalar",
  haklar: "Tüm hakları saklıdır.",
  webSitesi: "{ad} web sitesi",

  // Proje kartı ve önizleme
  siteyiGez: "Siteyi gez",
  siteyiZiyaret: "Siteyi ziyaret et",
  tiklaKaydir: "Tıkla, aşağı kaydır",
  yeniSekmede: "Siteyi yeni sekmede aç",
  yeniSekmedeAd: "{ad} sitesini yeni sekmede aç",
  buradaGez: "{ad} sitesini burada gez",
  gezinmeyiBitir: "Gezinmeyi bitir",
  onizlemesi: "{ad} önizlemesi",
  canliOnizleme: "{ad} canlı önizleme",

  // Galeri
  ac: "Aç",
  fotograflarYakinda: "Fotoğraflar yakında",
  fotografSayisi: "{n} fotoğraf",
  fotograf: "fotoğraf",
  fotografGoruntuleyici: "{ad} fotoğraf görüntüleyici",
  kapat: "Kapat",
  onceki: "Önceki",
  sonraki: "Sonraki",
  galeriBolumleri: "Galeri bölümleri",
  ofisBaslik: "Ofis görselleri",
  ofisAciklama: "Webadası ofisindeki çalışma ortamımız ve ofisimizin kedisi Ada.",
  ralliBaslik: "Ralli görselleri",
  ralliAciklama: "Zaman Kayıt Netice Sorumlusu olarak görev yaptığım ralli yarışlarından kareler.",
  etkinlikBaslik: "Toplantı görselleri",
  etkinlikAciklama: "Proje toplantılarından ve müşterilerimiz için yaptığımız içerik çekimlerinden kareler.",
  dahaFazla: "Daha fazlasını gör",
  bolumYakinda: "Bu bölümün fotoğrafları yakında eklenecek.",
  albumYakinda: "Bu albümün fotoğrafları yakında eklenecek.",
  digerAlbumler: "Diğer albümler",
  tumGaleri: "Tüm galeri",
  katRalli: "Ralli",
  katEtkinlik: "Toplantı",
  katOfis: "Ofis",

  // Projeler sayfası
  projeKatki: "{p} proje · {k} katkı",
  projelerBaslik: "Yönettiğim",
  projelerVurgu: "projeler",
  projelerAciklama: "E-ticaret, kurumsal site ve B2B alanlarında fikir aşamasından yayına kadar yürüttüğüm işler. Önizlemeye tıklayarak siteleri buradan gezebilirsiniz.",
  katkilar: "Katkıda bulunduklarım",
  katkiAciklama: "Ekibin bir parçası olarak geliştirilmesine katkı sağladığım siteler.",

  // Hakkımda
  merhabaBen: "Merhaba, ben",
  ralliMetin: "Bunun yanında Türkiye'nin dört bir yanındaki ralli yarışlarında zaman kayıt ekibinde görev alıyorum; parkurdan kareleri galeride bulabilirsiniz.",
  cvIndir: "CV'mi indir",
  yolculuk: "Bugüne kadarki yolculuğum",
  suAn: "Şu an",
  saat: "saat",
  uzmanlik: "Uzmanlık alanlarım",

  // Sertifika
  sertifikasi: "{ad} sertifikası",
  sertifikaEtiket: "SERTİFİKA",
  sertifikaIpucu: "Sürükleyerek çevir · tıklayınca büyüsün",
  yakinlastir: "Yakınlaştır",
  uzaklastir: "Uzaklaştır",
  yakinIpucu: "Gezmek için imleci gezdir · tekrar tıkla",
  uzakIpucu: "Yakınlaştırmak için tıkla",

  // Kartvizit
  kartvizit: "Kartvizit",
  kartviziCevir: "Kartviziti çevir",
  kartvizitOn: "Ece Özenir kartviziti, Türkçe",
  kartvizitArka: "Ece Özenir kartviziti, İngilizce",
  tiklaCevir: "Tıkla, çevir",

  // Sayfa bilgileri (tarayıcı sekmesi ve arama motorları)
  metaBaslik: "Ece Özenir | Proje Yöneticisi",
  metaAciklama: "Ece Özenir: Webadası Bilgi Teknolojileri'nde proje yöneticisi. Projeler, referanslar, galeri ve iletişim.",
  metaHakkimda: "Ece Özenir'in deneyimi, eğitimi, sertifikaları ve uzmanlık alanları.",
  metaProjeler: "Ece Özenir'in yönettiği e-ticaret, kurumsal site ve B2B projeleri.",
  metaGaleri: "Ofisten, ralli parkurlarından ve toplantılardan fotoğraflar.",
}

export type Sozluk = typeof tr

const en: Sozluk = {
  anaSayfa: "Home",
  projeler: "Projects",
  galeri: "Gallery",
  hakkimda: "About",
  iletisim: "Contact",
  iletisimeGec: "Get in touch",
  rol: "Project Manager",
  anaMenu: "Main menu",
  mobilMenu: "Mobile menu",
  menuAc: "Open menu",
  menuKapat: "Close menu",
  dilDegistir: "Türkçeye geç",

  projeleriGor: "See projects",
  referanslar: "Clients",

  merhaba: "Hi,",
  ben: "I'm",
  egitimSaati: "Hours of software training",
  fikirden: "From idea",
  teslimata: "to delivery",
  oneCikan: "Featured projects",
  oneCikanAciklama: "A few of the {n} projects I've managed. Click a preview to browse the site right here.",
  tumProjeler: "All projects",
  referansAciklama: "Some of the brands we've worked with.",
  galeriAciklama: "Moments from the office, rally stages and meetings.",
  galeriyeGit: "Open gallery",

  hizmetBaslik: "What we build at {firma}",
  hizmetAciklama: "End-to-end software for businesses, from the first idea to launch. Pick an area to see what we offer.",
  bilgiAl: "Get info",
  hemenAra: "Call now",
  mailKonu: "I'd like to learn more about {b}",

  projenizMiVar: "Have a project?",
  konusalim: "Let's talk.",
  iletisimMetin: "For an online store, a corporate website, a B2B platform or custom software for your business, you can reach me directly.",
  birProjenizMiVar: "Have a project in mind?",
  rolFirma: "Project Manager at {firma}.",
  sayfalar: "Pages",
  haklar: "All rights reserved.",
  webSitesi: "{ad} website",

  siteyiGez: "Browse site",
  siteyiZiyaret: "Visit site",
  tiklaKaydir: "Click to scroll",
  yeniSekmede: "Open site in a new tab",
  yeniSekmedeAd: "Open {ad} in a new tab",
  buradaGez: "Browse {ad} here",
  gezinmeyiBitir: "Stop browsing",
  onizlemesi: "{ad} preview",
  canliOnizleme: "{ad} live preview",

  ac: "Open",
  fotograflarYakinda: "Photos coming soon",
  fotografSayisi: "{n} photos",
  fotograf: "photo",
  fotografGoruntuleyici: "{ad} photo viewer",
  kapat: "Close",
  onceki: "Previous",
  sonraki: "Next",
  galeriBolumleri: "Gallery sections",
  ofisBaslik: "Office",
  ofisAciklama: "Our workspace at the Webadası office, and Ada, our office cat.",
  ralliBaslik: "Rallies",
  ralliAciklama: "From the rallies where I served as Timing and Results Officer.",
  etkinlikBaslik: "Meetings",
  etkinlikAciklama: "From project meetings and the content shoots we produced for our clients.",
  dahaFazla: "See more",
  bolumYakinda: "Photos for this section are coming soon.",
  albumYakinda: "Photos for this album are coming soon.",
  digerAlbumler: "Other albums",
  tumGaleri: "Full gallery",
  katRalli: "Rally",
  katEtkinlik: "Meeting",
  katOfis: "Office",

  projeKatki: "{p} projects · {k} contributions",
  projelerBaslik: "Projects I've",
  projelerVurgu: "managed",
  projelerAciklama: "Online stores, corporate websites and B2B platforms I've taken from the idea stage to launch. Click a preview to browse the site right here.",
  katkilar: "Contributions",
  katkiAciklama: "Sites I helped build as part of the team.",

  merhabaBen: "Hi, I'm",
  ralliMetin: "I also serve on the timing team at rallies all over Türkiye; you can find photos from the stages in the gallery.",
  cvIndir: "Download my CV",
  yolculuk: "My journey so far",
  suAn: "Now",
  saat: "hours",
  uzmanlik: "Areas of expertise",

  sertifikasi: "{ad} certificate",
  sertifikaEtiket: "CERTIFICATE",
  sertifikaIpucu: "Drag to rotate · click to enlarge",
  yakinlastir: "Zoom in",
  uzaklastir: "Zoom out",
  yakinIpucu: "Move the cursor to explore · click again",
  uzakIpucu: "Click to zoom in",

  kartvizit: "Business card",
  kartviziCevir: "Flip the business card",
  kartvizitOn: "Ece Özenir business card, English",
  kartvizitArka: "Ece Özenir business card, Turkish",
  tiklaCevir: "Click to flip",

  metaBaslik: "Ece Özenir | Project Manager",
  metaAciklama: "Ece Özenir: Project Manager at Webadası Bilgi Teknolojileri. Projects, clients, gallery and contact.",
  metaHakkimda: "Ece Özenir's experience, education, certificates and areas of expertise.",
  metaProjeler: "Online stores, corporate websites and B2B projects managed by Ece Özenir.",
  metaGaleri: "Photos from the office, rally stages and meetings.",
}

export const SOZLUK: Record<Dil, Sozluk> = { tr, en }

// "{n} proje" gibi kalıpları doldurur
export function doldur(metin: string, degerler: Record<string, string | number>) {
  return metin.replace(/\{(\w+)\}/g, (_, k) => String(degerler[k] ?? ""))
}
