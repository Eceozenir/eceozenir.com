import { cookies } from "next/headers"
import * as tr from "@/app/bilgilerim"
import * as en from "@/app/bilgilerim.en"
import { SOZLUK, type Dil } from "./sozluk"

export const DIL_CEREZI = "dil"

// Ziyaretçinin seçtiği dil (çerezde saklanır, yoksa Türkçe)
export async function dilAl(): Promise<Dil> {
  const c = await cookies()
  return c.get(DIL_CEREZI)?.value === "en" ? "en" : "tr"
}

// Seçili dildeki içerik (v) ve sabit yazılar (t)
export async function icerik() {
  const dil = await dilAl()
  return { dil, v: dil === "en" ? en : tr, t: SOZLUK[dil] }
}
