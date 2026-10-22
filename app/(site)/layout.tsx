import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { Etkilesim } from "@/components/site/etkilesim"

// Ana sayfa, Projeler, Galeri ve Hakkımda sayfalarının ortak çerçevesi
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <Etkilesim />
    </>
  )
}
