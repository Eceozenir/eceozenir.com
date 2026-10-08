"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// Scroll-scrub video hero
// Sayfa en üstteyken sayfa kilitlenir; tekerlek/dokunma hareketi
// videoyu ileri-geri oynatır. Video sona gelip kullanıcı aşağı
// kaydırmaya devam edince kilit açılır ve site normal şekilde
// devam eder. Kullanıcı tekrar en üste çıkıp yukarı kaydırırsa
// kilit yeniden devreye girer ve video geri sarılır.
// ─────────────────────────────────────────────────────────────

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  /** Başlığın altındaki küçük satır */
  subtitle?: string
  /** Alt başlıkta renkli + altı çizili gösterilecek kısım (örn. isim) */
  subtitleHighlight?: string
  scrollHint?: string
  /** Video sonunda beliren yazının üstündeki küçük etiket */
  taglineEyebrow?: string
  tagline?: string
  /** Sloganda renkli gösterilecek kısım */
  taglineHighlight?: string
  signature?: { name: string; url: string } | false
  /** Videoyu baştan sona oynatmak için gereken kaydırma miktarı (px). */
  scrubDistance?: number
  /** Videoyu tam ekrana germek yerine ortada bir kartta gösterir. */
  framed?: boolean
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_VIDEO = "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4"
const SANS = "var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "THE CITY OPENS",
  subtitle,
  subtitleHighlight,
  scrollHint = "SCROLL",
  taglineEyebrow,
  tagline = "Every door in the city is already open.",
  taglineHighlight,
  signature = false,
  scrubDistance = 3200,
  framed = false,
  className,
  style,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [aspect, setAspect] = useState(16 / 9)
  const [nativeWidth, setNativeWidth] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let duration = 0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    let hasStartedScrolling = false
    let isSeeking = false
    let pendingTime: number | null = null
    let locked = false
    let lockedScrollY = 0
    let touchStartY = 0
    // Telefon/tablet: kaydırma kilidi yok. Video kendiliğinden bir kez oynar,
    // yazılar videoyla birlikte değişir, sayfa baştan normal kayar.
    const mobil =
      window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth < 768

    // Bulanık arka plan (yalnızca framed modunda)
    function drawBg() {
      const c = bgCanvasRef.current
      const v = videoRef.current
      if (!c || !v || !v.videoWidth) return
      const ctx = c.getContext("2d")
      if (!ctx) return
      const s = Math.max(c.width / v.videoWidth, c.height / v.videoHeight)
      const w = v.videoWidth * s
      const h = v.videoHeight * s
      ctx.drawImage(v, (c.width - w) / 2, (c.height - h) / 2, w, h)
    }

    const onLoadedData = () => {
      duration = video.duration || 0
      if (video.videoWidth && video.videoHeight) {
        setAspect(video.videoWidth / video.videoHeight)
        setNativeWidth(video.videoWidth)
      }
      drawBg()
      setReady(true)
      if (reduceMotion) {
        video.currentTime = duration * 0.92
      }
    }
    video.addEventListener("loadeddata", onLoadedData)
    // Video önbellekten gelip bu koddan önce yüklenmiş olabilir.
    if (video.readyState >= 2) onLoadedData()

    // iOS Safari: oynatma başlamadan video verisi yüklemeyebiliyor.
    const p = video.play()
    if (mobil && !reduceMotion) {
      // Mobilde video duraklatılmaz, kendisi oynar
      video.loop = false
      p?.catch?.(() => {})
    } else if (p && typeof p.then === "function") {
      p.then(() => video.pause()).catch(() => {})
    } else {
      video.pause()
    }

    const onSeeked = () => {
      drawBg()
      isSeeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        isSeeking = true
        video.currentTime = t
      }
    }
    video.addEventListener("seeked", onSeeked)

    function seekTo(t: number) {
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      video!.currentTime = t
    }

    function engageLock() {
      if (locked) return
      locked = true
      lockedScrollY = window.scrollY
      const b = document.body.style
      b.position = "fixed"
      b.top = `-${lockedScrollY}px`
      b.left = "0"
      b.right = "0"
      b.width = "100%"
      b.overscrollBehavior = "none"
    }

    function releaseLock() {
      if (!locked) return
      locked = false
      const b = document.body.style
      b.position = ""
      b.top = ""
      b.left = ""
      b.right = ""
      b.width = ""
      b.overscrollBehavior = ""
      window.scrollTo(0, lockedScrollY)
    }

    // Sayfa en üstte açıldıysa kilitle (sayfanın ortasında yenilendiyse kilitleme).
    // Mobilde hiç kilitlenmez.
    if (!reduceMotion && !mobil && window.scrollY < 5) engageLock()

    function addDelta(deltaY: number) {
      targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
      if (targetProgress > 0.001) hasStartedScrolling = true
    }

    // Bir kaydırma hareketini işler. true dönerse tarayıcının normal
    // kaydırması engellenir.
    function handleDelta(deltaY: number): boolean {
      if (reduceMotion || mobil) return false
      if (locked) {
        // Video bitti ve hâlâ aşağı kaydırılıyor → kilidi aç, site devam etsin.
        if (deltaY > 0 && targetProgress >= 1 && currentProgress > 0.98) {
          releaseLock()
          return false
        }
        addDelta(deltaY)
        return true
      }
      // Kilit açık: en üstteyken yukarı kaydırılırsa tekrar kilitle, videoyu geri sar.
      if (deltaY < 0 && window.scrollY <= 0) {
        engageLock()
        addDelta(deltaY)
        return true
      }
      return false
    }

    const onWheel = (e: WheelEvent) => {
      if (handleDelta(e.deltaY)) e.preventDefault()
    }
    // Mobil: videonun tamamı yaklaşık 2 parmak kaydırmasında (~800px) biter,
    // parmak kalkınca video sonuna gelmişse kilit hemen açılır → 3. kaydırmada site akar.
    const MOBIL_MESAFE = 800
    let sonHiz = 0
    let sonZaman = 0
    let acmaZamanlayici = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
      sonHiz = 0
      sonZaman = performance.now()
      window.clearTimeout(acmaZamanlayici)
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchStartY
      const deltaY = touchStartY - y
      touchStartY = y
      const simdi = performance.now()
      sonHiz = deltaY / Math.max(1, simdi - sonZaman) // px/ms
      sonZaman = simdi
      if (handleDelta(deltaY * (scrubDistance / MOBIL_MESAFE))) e.preventDefault()
    }
    const onTouchEnd = () => {
      if (!locked || reduceMotion || mobil) return
      // Hızlı fiske: video biraz daha ilerlesin
      if (sonHiz > 0.4) addDelta(Math.min(0.35, sonHiz * 0.25) * scrubDistance)
      // Video sona geldiyse kilidi aç; bir sonraki kaydırma doğrudan siteyi kaydırır
      if (targetProgress >= 0.999) {
        targetProgress = 1
        acmaZamanlayici = window.setTimeout(() => {
          currentProgress = 1
          releaseLock()
        }, 250)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      const keys: Record<string, number> = {
        ArrowDown: 120, PageDown: 600, " ": 600, ArrowUp: -120, PageUp: -600,
      }
      const d = keys[e.key]
      if (d !== undefined && handleDelta(d)) e.preventDefault()
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("keydown", onKeyDown)

    function frame() {
      if (mobil) {
        // İlerleme videonun kendi oynatmasından gelir (sarma/atlama yok)
        const sure = duration || video!.duration || 0
        currentProgress = sure > 0 ? clamp(video!.currentTime / sure, 0, 1) : 0
        if (window.scrollY > 10 || currentProgress > 0.05) hasStartedScrolling = true
      } else {
        currentProgress += (targetProgress - currentProgress) * 0.18
      }

      if (duration > 0 && !mobil) {
        // Videonun tam sonuna atlamak bazı tarayıcılarda boş kare gösterir.
        seekTo(currentProgress * Math.max(0, duration - 0.05))
      }

      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1 + currentProgress * 0.06})`
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1"
      }
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.7) / 0.25, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.clearTimeout(acmaZamanlayici)
      window.removeEventListener("keydown", onKeyDown)
      cancelAnimationFrame(rafId)
      releaseLock()
    }
  }, [scrubDistance])

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        ...style,
      }}
    >
      {framed && (
        <canvas
          ref={bgCanvasRef}
          width={64}
          height={36}
          aria-hidden
          style={{
            position: "absolute",
            inset: "-10%",
            width: "120%",
            height: "120%",
            filter: "blur(40px) saturate(1.2) brightness(0.7)",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={
          framed
            ? {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: `min(90vw, calc(84dvh * ${aspect})${nativeWidth ? `, ${nativeWidth}px` : ""})`,
                aspectRatio: String(aspect),
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
                pointerEvents: "none",
              }
            : { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }
        }
      >
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: ready ? 1 : 0,
            transformOrigin: "center center",
            willChange: "transform",
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,7,13,0.35), rgba(5,7,13,0.1) 30%, rgba(5,7,13,0.25) 70%, rgba(5,7,13,0.75))",
          pointerEvents: "none",
        }}
      />

      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(10px, 2vw, 20px)",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ filter: "drop-shadow(0 6px 30px rgba(0,0,0,0.45))" }}>
          <h1
            className="hero-title"
            style={{
              margin: 0,
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: "clamp(56px, 15vw, 220px)",
              lineHeight: 0.95,
              paddingBottom: "0.05em",
            }}
          >
            {title}
          </h1>
        </div>
        {subtitle && (
          <p
            className="hero-sub"
            style={{
              margin: 0,
              fontFamily: SANS,
              fontWeight: 500,
              fontSize: "clamp(18px, 2.6vw, 32px)",
              letterSpacing: "-0.01em",
              color: "rgba(242,244,248,0.92)",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {subtitleHighlight && subtitle.includes(subtitleHighlight) ? (
              <>
                {subtitle.split(subtitleHighlight)[0]}
                <span style={{ position: "relative", display: "inline-block", fontWeight: 800 }}>
                  <span className="hero-highlight hero-flow">{subtitleHighlight}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", left: 0, bottom: "-0.35em", width: "100%", height: "0.45em", overflow: "visible" }}
                  >
                    <defs>
                      <linearGradient id="hero-underline" x1="0" x2="1">
                        <stop offset="0" stopColor="#ffc21a" />
                        <stop offset="1" stopColor="#ff4f8b" />
                      </linearGradient>
                    </defs>
                    <path
                      className="hero-underline"
                      d="M2 8 C 40 2, 80 2, 110 6 S 170 11, 198 4"
                      fill="none"
                      stroke="url(#hero-underline)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      pathLength={1}
                    />
                  </svg>
                </span>
                {subtitle.split(subtitleHighlight).slice(1).join(subtitleHighlight)}
              </>
            ) : (
              subtitle
            )}
          </p>
        )}
      </div>

      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {taglineEyebrow && (
            <span
              style={{
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: "clamp(15px, 2vw, 22px)",
                letterSpacing: "0.3em",
                color: "#ffd24a",
                textShadow: "0 2px 6px rgba(0,0,0,0.85), 0 0 28px rgba(0,0,0,0.6)",
              }}
            >
              {taglineEyebrow}
            </span>
          )}
          <span
            style={{
              maxWidth: 1000,
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(26px, 4.6vw, 64px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: COL_TEXT,
              textShadow: "0 4px 30px rgba(0,0,0,0.55)",
            }}
          >
            {taglineHighlight && tagline.includes(taglineHighlight) ? (
              <>
                {tagline.split(taglineHighlight)[0]}
                <span className="hero-highlight hero-flow" style={{ textShadow: "none" }}>
                  {taglineHighlight}
                </span>
                {tagline.split(taglineHighlight).slice(1).join(taglineHighlight)}
              </>
            ) : (
              tagline
            )}
          </span>
        </div>
      )}

      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(240,244,248,0.75)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, #ffc21a, #ff8a1f, #ff4f8b)",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {signature && (
        <a
          href={signature.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: SANS,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            color: "rgba(220,224,232,0.6)",
            textDecoration: "none",
            zIndex: 2,
          }}
        >
          {signature.name}
        </a>
      )}
    </div>
  )
}
