"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ExternalLink, MousePointerClick, X } from "lucide-react"

// Bir projenin site önizlemesi: tarayıcı penceresi görünümünde.
// Masaüstü: kart ekrandayken site CANLI açılır ve kendi kendine yavaşça kayar.
//           "Tıkla, aşağı kaydır" ile imleçle gezilebilir.
// Mobil:    telefon çökmesin diye siteler kendiliğinden açılmaz; kapak görünür,
//           dokununca o site açılır. Aynı anda yalnızca bir site açık kalır.
// "onizleme" (public/onizlemeler içindeki görsel/video) verilirse kapak olarak o kullanılır.

const VIDEO = /\.(mp4|webm|mov)$/i
const SANAL_GENISLIK = 1280 // sitenin masaüstü genişliği; pencereye sığacak şekilde küçültülür
const KAYMA_YUKSEKLIGI = 3 // otomatik kaymada sitenin kaç ekran boyu gösterileceği
const AKTIF_OLAY = "onizleme-aktif"


function Iskelet() {
  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-4 text-[#2a1708]">
      <div className="flex items-center justify-between">
        <span className="h-2.5 w-14 rounded-full bg-[#2a1708]/25" />
        <span className="flex gap-1.5">
          <span className="h-2 w-6 rounded-full bg-[#2a1708]/15" />
          <span className="h-2 w-6 rounded-full bg-[#2a1708]/15" />
          <span className="h-2 w-6 rounded-full bg-[#2a1708]/15" />
        </span>
      </div>
      <div className="mt-2 flex flex-1 gap-3">
        <div className="flex flex-1 flex-col justify-center gap-2">
          <span className="h-3 w-4/5 rounded-full bg-[#2a1708]/30" />
          <span className="h-3 w-3/5 rounded-full bg-[#2a1708]/30" />
          <span className="mt-1 h-2 w-full rounded-full bg-[#2a1708]/12" />
          <span className="h-2 w-5/6 rounded-full bg-[#2a1708]/12" />
          <span className="mt-2 h-4 w-16 rounded-[4px] bg-[#ff8a1f]" />
        </div>
        <div className="w-2/5 rounded-[8px] bg-gradient-to-br from-[#ffc21a] via-[#ff8a1f] to-[#ff4f8b] opacity-80" />
      </div>
    </div>
  )
}

export function ProjeOnizleme({
  src,
  ad,
  link,
  koyu = false,
  className = "",
}: {
  src?: string
  ad: string
  link?: string
  koyu?: boolean
  className?: string
}) {
  const kimlik = useId()
  const ekranRef = useRef<HTMLDivElement>(null)
  const [mobil, setMobil] = useState(true) // ilk çizimde güvenli taraf: mobil gibi davran
  const [gorunur, setGorunur] = useState(false)
  const [yuklendi, setYuklendi] = useState(false)
  const [geziyor, setGeziyor] = useState(false)
  const [olcek, setOlcek] = useState(0.3)
  const [kapakHata, setKapakHata] = useState(false)
  const [odak, setOdak] = useState(false) // mobil: ekranın ortasındaki kart (canlı açılan tek kart)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px), (pointer: coarse)")
    const guncelle = () => setMobil(mq.matches)
    guncelle()
    mq.addEventListener("change", guncelle)
    return () => mq.removeEventListener("change", guncelle)
  }, [])

  // Pencere genişliğine göre siteyi ölçekle
  useEffect(() => {
    const el = ekranRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setOlcek(el.clientWidth / SANAL_GENISLIK))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Kart ekrandan çıkınca site kapanır
  useEffect(() => {
    const el = ekranRef.current
    if (!el || !link) return
    const io = new IntersectionObserver(
      ([e]) => {
        setGorunur(e.isIntersecting)
        if (!e.isIntersecting) {
          setYuklendi(false)
          setGeziyor(false)
        }
      },
      { rootMargin: "150px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [link])

  // Başka bir önizleme açılınca bu kapanır (mobilde aynı anda tek site)
  useEffect(() => {
    const dinle = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== kimlik) {
        setOdak(false)
        setGeziyor(false)
        setYuklendi(false)
      }
    }
    window.addEventListener(AKTIF_OLAY, dinle)
    return () => window.removeEventListener(AKTIF_OLAY, dinle)
  }, [kimlik])

  const gezmeyeBasla = () => {
    window.dispatchEvent(new CustomEvent(AKTIF_OLAY, { detail: kimlik }))
    setOdak(true)
    setGeziyor(true)
  }

  const cerceve = koyu ? "bg-[#2a1708] text-[#fff8ea]" : "bg-white text-[#2a1708]"
  const alanAdi = link ? link.replace(/^https?:\/\//, "").replace(/\/$/, "") : ad
  // Mobilde site sadece dokununca, masaüstünde kart ekrandayken yüklenir
  const canli = Boolean(link && gorunur && (mobil ? odak && geziyor : true))
  const kapak = src && !kapakHata ? src : ""

  return (
    <div className={`overflow-hidden rounded-[11px] ring-1 ring-black/10 ${cerceve} ${className}`}>
      {/* Pencere üst çubuğu */}
      <div className="flex items-center gap-1.5 px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 flex h-4 flex-1 items-center gap-1.5 truncate rounded-[4px] bg-current/10 px-2 text-[10px] leading-4">
          {link && <span className={`size-1.5 shrink-0 rounded-full ${canli && yuklendi ? "bg-[#28c840]" : "bg-[#febc2e]"}`} />}
          <span className="truncate opacity-60">{alanAdi}</span>
        </span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-6 items-center justify-center rounded opacity-60 hover:opacity-100"
            aria-label="Siteyi yeni sekmede aç"
          >
            <ExternalLink className="size-3.5" />
          </a>
        )}
        {geziyor && (
          <button
            type="button"
            onClick={() => {
              setGeziyor(false)
            }}
            className="flex size-6 items-center justify-center rounded opacity-60 hover:opacity-100"
            aria-label="Gezinmeyi bitir"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div ref={ekranRef} className="relative aspect-[16/10] w-full overflow-hidden bg-[#fff0c2]">
        {/* Kapak: fotoğraf / video / iskelet */}
        {(!canli || !yuklendi) &&
          (kapak ? (
            VIDEO.test(kapak) ? (
              <video src={kapak} autoPlay muted loop playsInline className="absolute inset-0 size-full object-cover object-top" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={kapak}
                alt={`${ad} önizlemesi`}
                loading="lazy"
                onError={() => setKapakHata(true)}
                className="absolute inset-0 size-full bg-white object-cover object-top"
              />
            )
          ) : (
            <Iskelet />
          ))}

        {/* Canlı site */}
        {canli && (
          <div
            className={`absolute top-0 left-0 w-full ${geziyor ? "" : "onizleme-kayma pointer-events-none"}`}
            style={{ height: geziyor ? "100%" : `${KAYMA_YUKSEKLIGI * 100}%`, opacity: yuklendi ? 1 : 0, transition: "opacity .6s" }}
          >
            <iframe
              src={link}
              title={`${ad} canlı önizleme`}
              onLoad={() => setYuklendi(true)}
              tabIndex={geziyor ? 0 : -1}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="absolute top-0 left-0 origin-top-left border-0 bg-white"
              style={{ width: SANAL_GENISLIK, height: `${100 / olcek}%`, transform: `scale(${olcek})` }}
            />
          </div>
        )}

        {/* Yükleniyor */}
        {canli && !yuklendi && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40">
            <span className="size-6 animate-spin rounded-full border-2 border-[#ff8a1f] border-t-transparent" />
          </div>
        )}

        {/* "Tıkla, aşağı kaydır" */}
        {link && !geziyor && (
          <button
            type="button"
            onClick={gezmeyeBasla}
            className="group/gez absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#2a1708]/50 via-transparent to-transparent p-3 sm:p-4"
            aria-label={`${ad} sitesini burada gez`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-[11px] font-extrabold text-[#2a1708] shadow-lg transition-transform group-hover/gez:scale-105 sm:text-xs">
              <MousePointerClick className="onizleme-fare size-4 text-[#e8590c]" />
              Tıkla, aşağı kaydır
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
