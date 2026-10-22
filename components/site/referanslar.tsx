import { referanslar } from "@/app/bilgilerim"

// Logo ızgarası. Logosu eklenmemiş firmalar adlarıyla görünür.
export function ReferansIzgara() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {referanslar.map((r) => {
        const Kap = r.link ? "a" : "div"
        return (
          <Kap
            key={r.ad}
            {...(r.link ? { href: r.link, target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex h-28 items-center justify-center rounded-2xl bg-white px-6 text-center transition-shadow hover:shadow-[0_12px_30px_-18px_rgba(20,20,20,0.35)]"
            title={r.ad}
          >
            {r.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.logo}
                alt={r.ad}
                loading="lazy"
                className="max-h-11 max-w-[80%] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            ) : (
              <span className="text-[15px] leading-snug font-semibold tracking-tight text-[#141414]/55 transition-colors group-hover:text-[#141414]">
                {r.ad}
              </span>
            )}
          </Kap>
        )
      })}
    </div>
  )
}
