import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"

// Ana sayfa, Projeler, TOSFED, Galeri ve Hakkımda sayfalarının ortak çerçevesi
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
