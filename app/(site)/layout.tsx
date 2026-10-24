import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { Etkilesim } from "@/components/site/etkilesim"
import { DilSaglayici } from "@/components/site/dil"
import { dilAl } from "@/lib/dil"

// Ana sayfa, Projeler, Galeri ve Hakkımda sayfalarının ortak çerçevesi
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const dil = await dilAl()
  return (
    <DilSaglayici dil={dil}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <Etkilesim />
    </DilSaglayici>
  )
}
