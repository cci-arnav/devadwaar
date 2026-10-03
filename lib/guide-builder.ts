import { getProduct, guideItems, products, type Product } from './catalog'

export type GuidePreference = 'kit' | 'individual'
export type GuideRequest = {
  occasion: string
  participants?: number
  budget?: number
  availableIds: string[]
  preference: GuidePreference
}

export type GeneratedGuide = {
  occasion: string
  isBasicFallback: boolean
  essentials: Product[]
  separateItems: string[]
  availableIds: string[]
  recommendedProducts: Product[]
  participants?: number
  budget?: number
}

const aliases: Record<string, string> = {
  daily: 'Daily',
  'daily pooja': 'Daily',
  'daily puja': 'Daily',
  'everyday pooja': 'Daily',
  navratri: 'Navratri',
  'navratri pooja': 'Navratri',
  'navratri puja': 'Navratri',
  diwali: 'Diwali',
  'diwali pooja': 'Diwali',
  'diwali puja': 'Diwali',
  'lakshmi ganesh pooja': 'Diwali',
  'bhai dooj': 'Bhai Dooj',
  bhaidooj: 'Bhai Dooj',
  chhath: 'Chhath',
  'chhath puja': 'Chhath',
  'chhath pooja': 'Chhath',
}

export const supportedOccasions = Object.keys(guideItems)

export function resolveOccasion(value: string): string | undefined {
  const key = value.toLowerCase().trim().replace(/[–—-]/g, ' ').replace(/\s+/g, ' ')
  return aliases[key]
}

const separateByOccasion: Record<string, string[]> = {
  Daily: ['Fresh flowers', 'Clean water', 'Any family-specific offerings'],
  Navratri: ['Fresh flowers', 'Water for the kalash', 'Fresh fruit or household offerings'],
  Diwali: ['Fresh flowers', 'Clean water', 'Fresh offerings prepared at home'],
  'Bhai Dooj': ['Fresh flowers', 'Fresh sweets or household offerings'],
  Chhath: ['Seasonal fruit', 'Clean water', 'Fresh offerings and locally used natural materials'],
}

export function generateGuide(request: GuideRequest, basicFallback = false): GeneratedGuide | null {
  const resolved = resolveOccasion(request.occasion)
  if (!resolved && !basicFallback) return null
  const occasion = resolved || 'Daily'
  const essentials = (guideItems[occasion] || []).map(getProduct).filter((p): p is Product => Boolean(p))
  const availableIds = request.availableIds.filter(id => essentials.some(p => p.id === id))
  const recommendedProducts = essentials
    .filter(p => !availableIds.includes(p.id))
    .sort((a, b) => request.preference === 'kit'
      ? Number(b.categorySlug === 'pooja-kits') - Number(a.categorySlug === 'pooja-kits')
      : Number(a.categorySlug === 'pooja-kits') - Number(b.categorySlug === 'pooja-kits'))
  return {
    occasion,
    isBasicFallback: !resolved,
    essentials,
    separateItems: separateByOccasion[occasion],
    availableIds,
    recommendedProducts,
    participants: request.participants,
    budget: request.budget,
  }
}

export function selectedSubtotal(ids: string[]): number {
  return ids.reduce((sum, id) => sum + (products.find(p => p.id === id)?.price || 0), 0)
}
