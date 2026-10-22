import { Mail, Phone } from "lucide-react"
import { Kartvizit } from "@/components/business-card"
import { iletisim, kartvizit } from "@/app/bilgilerim"
import { Kap } from "./ui"

export function IletisimBolum() {
  const tel = iletisim.telefon ? `tel:+9${iletisim.telefon.replace(/\D/g, "")}` : ""
  return (
    <section id="iletisim" className="scroll-mt-24 pt-24">
      <Kap>
        <div className="grid items-center gap-12 rounded-[32px] bg-white p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-16">
          <div>
            <h2 className="text-[clamp(32px,4.4vw,52px)] leading-[1.05] font-semibold">
              Projeniz mi var? <span className="vurgu">Konuşalım.</span>
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#6b665e]">
              E-ticaret, kurumsal site, B2B ya da işletmenize özel bir yazılım için bana doğrudan ulaşabilirsiniz.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${iletisim.eposta}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3.5 text-[15px] font-medium text-[#f6f4ef] transition-colors hover:bg-[#c2410c]"
              >
                <Mail className="size-4" /> {iletisim.eposta}
              </a>
              {tel && (
                <a
                  href={tel}
                  className="mono inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] ring-1 ring-[#141414]/15 transition-colors hover:ring-[#141414]/40"
                >
                  <Phone className="size-4" /> {iletisim.telefon}
                </a>
              )}
            </div>
          </div>
          {kartvizit.on && (
            <div className="mx-auto w-full max-w-[480px]">
              <Kartvizit on={kartvizit.on} arka={kartvizit.arka} />
            </div>
          )}
        </div>
      </Kap>
    </section>
  )
}
