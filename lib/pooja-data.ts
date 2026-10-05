export const brand = {
  name: 'Aashirvaadam',
  tagline: 'Essentials for Every Sacred Occasion',
  colors: { vermilion: '#c44727', maroon: '#681e26', ivory: '#fff9f0', brass: '#b78a42' },
}

export type Category = 'Pooja Kits' | 'Daily Essentials' | 'Prasad & Bhog' | 'Diyas & Lamps' | 'Dhoop & Incense' | 'Gifts'
export type Product = { id: string; name: string; category: Category; festivals: string[]; image: string; alt: string; price: number; unit: string; description: string; contents?: string[]; edible?: boolean }

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=720&q=82`
export const products: Product[] = [
  { id:'daily-kit', name:'Daily Pooja Starter Kit', category:'Pooja Kits', festivals:['Daily Pooja'], image:'/pooja-hero.png', alt:'Daily pooja essentials arranged on a brass thali', price:499, unit:'12 essential pieces', description:'A considered starting point for everyday worship.', contents:['Brass diya · 1','Cotton wicks · 25','Kumkum and haldi · 2 bowls','Camphor · 10 tablets'] },
  { id:'navratri-kit', name:'Navratri Pooja Essentials Kit', category:'Pooja Kits', festivals:['Navratri'], image:img('photo-1604608672516-f1b9c1a15f5e'), alt:'Festive diya and flowers for Navratri', price:799, unit:'14 curated pieces', description:'A thoughtful set for Navratri preparations.', contents:['Kalash · 1','Moli thread · 1 roll','Chunri · 1','Dhoop cones · 12'] },
  { id:'diwali-kit', name:'Diwali Lakshmi–Ganesh Pooja Kit', category:'Pooja Kits', festivals:['Diwali'], image:img('photo-1603006905003-be475563bc59'), alt:'Brass lamps and flowers for Diwali pooja', price:899, unit:'16 curated pieces', description:'Bring the essentials together for a festive evening.', contents:['Roli and akshat · 1 set','Brass diya · 2','Moli thread · 1 roll','Lakshmi–Ganesh chowki cloth · 1'] },
  { id:'bhaidooj', name:'Bhai Dooj Roli–Akshat Set', category:'Gifts', festivals:['Bhai Dooj'], image:img('photo-1598095757542-2f5c8a8a4f3a'), alt:'Roli and rice thali for Bhai Dooj', price:249, unit:'1 festive set', description:'A simple, graceful thali for the tilak ritual.' },
  { id:'chhath', name:'Chhath Offering Accessories Set', category:'Gifts', festivals:['Chhath'], image:img('photo-1519710887729-9a0c3b6f9ec5'), alt:'Natural offering basket with fruit and flowers', price:549, unit:'5 accessories', description:'Useful accessories for preparing seasonal offerings.' },
  { id:'kapoor', name:'Bhimseni Kapoor', category:'Daily Essentials', festivals:['Daily Pooja','Diwali'], image:img('photo-1601050690597-df0568f70950'), alt:'Camphor tablets in a small bowl', price:169, unit:'50 g', description:'Aromatic camphor for daily aarti and offerings.', edible:true },
  { id:'agarbatti', name:'Chandan Agarbatti', category:'Dhoop & Incense', festivals:['Daily Pooja','Diwali'], image:img('photo-1602523961358-f9f03dd557db'), alt:'Sandalwood incense sticks', price:129, unit:'30 sticks', description:'A warm sandalwood fragrance for quiet rituals.' },
  { id:'dhoop', name:'Natural Dhoop Cones', category:'Dhoop & Incense', festivals:['Daily Pooja','Navratri'], image:img('photo-1616627985693-6f4e9f3f31c6'), alt:'Natural incense cones and flowers', price:149, unit:'24 cones', description:'Hand-rolled dhoop cones with a grounding aroma.' },
  { id:'wicks', name:'Cotton Diya Wicks', category:'Diyas & Lamps', festivals:['Daily Pooja','Diwali'], image:img('photo-1549887534-1541e9326642'), alt:'Cotton wicks beside a brass diya', price:79, unit:'100 wicks', description:'Soft cotton wicks for diyas and aarti lamps.' },
  { id:'clay-diyas', name:'Clay Diyas', category:'Diyas & Lamps', festivals:['Diwali'], image:img('photo-1604948501466-4e9c339b9c24'), alt:'Handmade clay diyas with warm light', price:199, unit:'Pack of 12', description:'Unpainted earthen diyas for a warm festive glow.' },
  { id:'thali', name:'Brass Pooja Thali', category:'Daily Essentials', festivals:['Daily Pooja','Diwali'], image:img('photo-1609619385002-f40f1df9b7b8'), alt:'Polished brass pooja thali', price:699, unit:'1 thali · 9 inch', description:'A timeless base for arranging daily essentials.' },
  { id:'kumkum', name:'Kumkum and Haldi Set', category:'Daily Essentials', festivals:['Daily Pooja','Navratri'], image:img('photo-1591206369811-4eeb2f7c5e7c'), alt:'Kumkum and turmeric powders in brass bowls', price:99, unit:'2 x 20 g', description:'Bright, simple powders for tilak and offerings.', edible:true },
  { id:'hawan', name:'Hawan Samagri', category:'Daily Essentials', festivals:['Navratri','Diwali'], image:img('photo-1606041008023-472dfb5e530f'), alt:'Hawan ingredients and dried botanicals', price:249, unit:'250 g', description:'A fragrant blend of traditional havan ingredients.' },
  { id:'panchmeva', name:'Panchmeva Offering Mix', category:'Prasad & Bhog', festivals:['Daily Pooja','Navratri'], image:img('photo-1599599810694-b5ac6b2e06d4'), alt:'Dried fruits and nuts for bhog', price:299, unit:'200 g', description:'A sample mix of nuts and dried fruit for bhog.', edible:true },
  { id:'mishri', name:'Mishri for Bhog', category:'Prasad & Bhog', festivals:['Daily Pooja','Diwali'], image:img('photo-1581441363689-1f3c3c414635'), alt:'Mishri crystals in a brass bowl', price:119, unit:'250 g', description:'Crystallised sugar traditionally offered as bhog.', edible:true },
  { id:'gift-box', name:'Festive Pooja Gift Box', category:'Gifts', festivals:['Diwali','Bhai Dooj'], image:img('photo-1602173574767-37ac01994b2a'), alt:'Festive gift box with diyas and flowers', price:999, unit:'8 thoughtful pieces', description:'A warm, ready-to-give assortment for festive moments.' },
]

export const categories: {label: string; icon: string; image: string}[] = [
  {label:'Pooja Kits', icon:'✦', image:'/pooja-hero.png'}, {label:'Prasad & Bhog', icon:'◌', image:img('photo-1599599810694-b5ac6b2e06d4')}, {label:'Dhoop & Agarbatti', icon:'∿', image:img('photo-1602523961358-f9f03dd557db')}, {label:'Diyas & Wicks', icon:'✧', image:img('photo-1604948501466-4e9c339b9c24')}, {label:'Hawan Samagri', icon:'⌁', image:img('photo-1606041008023-472dfb5e530f')}, {label:'Pooja Accessories', icon:'○', image:img('photo-1609619385002-f40f1df9b7b8')},
]
export const festivals = ['Navratri','Dussehra','Diwali','Bhai Dooj','Chhath']
export const faqs = [
 ['What is included in a pooja kit?','Each sample kit lists its contents and quantities in View Kit. Contents are illustrative and may vary by family or regional tradition.'], ['Can I purchase individual samagri items?','Yes. Browse the catalogue by category to explore individual essentials.'], ['Are these products temple-offered prasad?','No claim is made here about temple origin. Prasad & Bhog products are ingredients intended for preparing or offering bhog.'], ['How do I find products for a particular festival?','Select a festival card or use the festival filter in the catalogue.'], ['Can I customise a kit?','Custom kits will be confirmed in a later phase. For now, individual items can be added to the demo cart.'], ['Where can I check delivery and return details?','Operational policies will be confirmed before launch.']
]
export const checklist: Record<string, {name:string; productId?:string; note?:string}[]> = {
 'Daily Pooja': [{name:'Diya and cotton wicks',productId:'wicks'},{name:'Kumkum and haldi',productId:'kumkum'},{name:'Incense',productId:'agarbatti'},{name:'Flowers or fresh offerings',note:'Arrange separately'}],
 Navratri: [{name:'Kalash and chunri',productId:'navratri-kit'},{name:'Dhoop cones',productId:'dhoop'},{name:'Hawan samagri',productId:'hawan'},{name:'Fresh flowers',note:'Arrange separately'}],
 Diwali: [{name:'Lakshmi–Ganesh pooja kit',productId:'diwali-kit'},{name:'Clay diyas',productId:'clay-diyas'},{name:'Cotton wicks',productId:'wicks'},{name:'Fresh flowers',note:'Arrange separately'}],
 'Bhai Dooj': [{name:'Roli–akshat thali',productId:'bhaidooj'},{name:'Mishri for offering',productId:'mishri'},{name:'Gift for bhai',productId:'gift-box'}],
 Chhath: [{name:'Offering accessories',productId:'chhath'},{name:'Seasonal fruits',note:'Arrange separately'},{name:'Natural offerings',note:'Arrange separately'}],
}
export const kitIds = ['daily-kit','navratri-kit','diwali-kit']
export const money = (value:number) => `₹${value.toLocaleString('en-IN')}`
export const productById = (id:string) => products.find(p=>p.id===id)
export const assistantSuggestions = ['Find a Diwali kit','Browse daily pooja essentials','What is included in a kit?','Explore prasad ingredients','Help with my pooja checklist']

export function assistantReply(input:string) {
 const q=input.toLowerCase()
 if(q.includes('diwali')) return {text:'For Diwali, the Lakshmi–Ganesh kit, clay diyas, cotton wicks and mishri are a helpful starting point.', productIds:['diwali-kit','clay-diyas','wicks']}
 if(q.includes('daily')) return {text:'For daily worship, explore the starter kit, cotton wicks, chandan agarbatti and kumkum–haldi.', productIds:['daily-kit','wicks','agarbatti','kumkum']}
 if(q.includes('prasad')||q.includes('bhog')) return {text:'Our preview catalogue includes panchmeva and mishri for preparing or offering bhog. These are not represented as temple-offered prasad.', productIds:['panchmeva','mishri']}
 if(q.includes('kit')||q.includes('include')) return {text:'Kit contents and quantities are shown in each View Kit panel. Sample contents may vary by regional tradition.', productIds:['daily-kit','navratri-kit','diwali-kit']}
 if(q.includes('checklist')) return {text:'The checklist can help you mark what you already have and shop for what remains. Find it in the Essentials Checklist section.', productIds:[]}
 return {text:'I can currently help with the demo catalogue, festival filters, kit contents and the pooja checklist. Try one of the suggestions below.', productIds:[]}
}

export const festivalImages: Record<string,string> = { Navratri:img('photo-1604608672516-f1b9c1a15f5e'), Dussehra:img('photo-1519710887729-9a0c3b6f9ec5'), Diwali:img('photo-1603006905003-be475563bc59'), 'Bhai Dooj':img('photo-1598095757542-2f5c8a8a4f3a'), Chhath:img('photo-1500530855697-b586d89ba3ee') }

export const navGroups = { shop:['Complete Pooja Kits','Prasad & Bhog Ingredients','Dhoop & Agarbatti','Diyas, Wicks & Pooja Oil','Hawan Samagri','Pooja Accessories','Idols & Sacred Decor','Festive Gift Sets'], festival:festivals }

export type CartItem = { productId:string; quantity:number }

export const safeImage = (event: React.SyntheticEvent<HTMLImageElement>) => { event.currentTarget.src='/placeholder.svg' }

export const isFood = (p:Product) => p.edible
export const disclaimer = 'Preview catalogue — products and prices are illustrative.'
export const heroSlides = [{eyebrow:'Celebrate with devotion',heading:'Every ritual, thoughtfully prepared.',body:'Discover pooja essentials, festive kits, and prasad ingredients for the moments that bring us together.',primary:'Explore Festival Essentials',secondary:'Discover Pooja Kits'}, {eyebrow:'For everyday worship',heading:'Small essentials. Meaningful moments.',body:'Build a simple daily practice with considered products for a calm, connected home.',primary:'Browse Daily Essentials',secondary:'Explore the checklist'}]
