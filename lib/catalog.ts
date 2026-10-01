export type Product = { id:string; slug:string; name:string; category:string; categorySlug:string; festivals:string[]; price:number; unit:string; description:string; image:string; details:string[] }
export const categories = [
  { name:'Pooja Kits', slug:'pooja-kits', description:'Thoughtfully gathered essentials for a complete ritual.', image:'/pooja-hero.png' },
  { name:'Prasad & Bhog', slug:'prasad-bhog', description:'Ingredients for offering and sharing at home.', image:'/pooja-hero.png' },
  { name:'Dhoop & Incense', slug:'dhoop-incense', description:'Fragrant essentials for quiet moments.', image:'/pooja-hero.png' },
  { name:'Diyas & Lamps', slug:'diyas-lamps', description:'Light your altar with timeless forms.', image:'/pooja-hero.png' },
  { name:'Daily Essentials', slug:'daily-essentials', description:'The small samagri pieces every altar needs.', image:'/pooja-hero.png' },
  { name:'Gifts', slug:'gifts', description:'Simple gestures for sacred celebrations.', image:'/pooja-hero.png' },
]
export const festivals = [
  { name:'Navratri', slug:'navratri', description:'Kalash, chunri, and essentials for nine sacred days.', image:'/pooja-hero.png' },
  { name:'Dussehra', slug:'dussehra', description:'A considered poojan arrangement for the festival of victory.', image:'/pooja-hero.png' },
  { name:'Diwali', slug:'diwali', description:'Diyas, Lakshmi–Ganesh essentials, and offerings.', image:'/pooja-hero.png' },
  { name:'Bhai Dooj', slug:'bhai-dooj', description:'Roli, akshat, and thoughtful festive sets.', image:'/pooja-hero.png' },
  { name:'Chhath', slug:'chhath', description:'Accessories for offering preparations and family rituals.', image:'/pooja-hero.png' },
]
const item = (id:string,name:string,category:string,categorySlug:string,price:number,unit:string,description:string,festivals:string[]):Product => ({ id, slug:id, name, category, categorySlug, price, unit, description, festivals, image:'/pooja-hero.png', details:['Contents are illustrative and may vary by family and regional tradition.','Operational details will be confirmed before launch.'] })
export const products:Product[] = [
 item('daily-kit','Daily Pooja Starter Kit','Pooja Kits','pooja-kits',699,'18 essentials','A thoughtful foundation for everyday worship.',['daily']),
 item('navratri-kit','Navratri Pooja Essentials Kit','Pooja Kits','pooja-kits',899,'14 essentials','A considered collection for the nine sacred days.',['navratri']),
 item('diwali-kit','Diwali Lakshmi–Ganesh Pooja Kit','Pooja Kits','pooja-kits',1299,'22 essentials','Prepare your home for a luminous Diwali ritual.',['diwali']),
 item('bhai-dooj-set','Bhai Dooj Roli–Akshat Set','Gifts','gifts',349,'1 festive set','A graceful set for a treasured tradition.',['bhai-dooj']),
 item('chhath-set','Chhath Offering Accessories Set','Gifts','gifts',499,'5 pieces','Simple accessories for offering preparations.',['chhath']),
 item('kapoor','Bhimseni Kapoor','Daily Essentials','daily-essentials',189,'50 g','Pure, aromatic camphor for your daily aarti.',['daily','diwali']),
 item('agarbatti','Chandan Agarbatti','Dhoop & Incense','dhoop-incense',149,'40 sticks','A gentle sandalwood fragrance for quiet moments.',['daily']),
 item('dhoop','Natural Dhoop Cones','Dhoop & Incense','dhoop-incense',229,'30 cones','Hand-shaped cones with a warm, grounding aroma.',['daily']),
 item('wicks','Cotton Diya Wicks','Diyas & Lamps','diyas-lamps',99,'100 wicks','Soft cotton wicks for diyas and lamps.',['daily','diwali']),
 item('diyas','Clay Diyas','Diyas & Lamps','diyas-lamps',249,'Pack of 12','Unfired earthen diyas with a timeless form.',['diwali']),
 item('thali','Brass Pooja Thali','Daily Essentials','daily-essentials',1099,'1 thali','A lasting brass centrepiece for your altar.',['daily','diwali']),
 item('kumkum','Kumkum and Haldi Set','Daily Essentials','daily-essentials',179,'2 x 25 g','Everyday auspicious essentials in a neat pair.',['daily','bhai-dooj']),
 item('hawan','Hawan Samagri','Daily Essentials','daily-essentials',299,'250 g','A fragrant blend for hawan preparations.',['navratri','dussehra']),
 item('panchmeva','Panchmeva Offering Mix','Prasad & Bhog','prasad-bhog',279,'200 g','A wholesome mix for offering and sharing.',['daily','navratri']),
 item('mishri','Mishri for Bhog','Prasad & Bhog','prasad-bhog',129,'250 g','Crystalline sweetness for your bhog thali.',['daily','diwali']),
 item('gift-box','Festive Pooja Gift Box','Gifts','gifts',999,'1 curated box','A warm gesture for a sacred celebration.',['diwali','bhai-dooj']),
]
export const getProduct=(slug:string)=>products.find(p=>p.slug===slug)
export const getCategory=(slug:string)=>categories.find(c=>c.slug===slug)
export const getFestival=(slug:string)=>festivals.find(f=>f.slug===slug)
export const formatPrice=(price:number)=>`₹${price.toLocaleString('en-IN')}`
export const guideItems:Record<string,string[]>={Daily:['wicks','kapoor','agarbatti','kumkum'],Navratri:['navratri-kit','hawan','panchmeva'],Diwali:['diwali-kit','diyas','wicks','mishri'],'Bhai Dooj':['bhai-dooj-set','kumkum'],Chhath:['chhath-set','panchmeva']}
export const faqs=[['What is included in a pooja kit?','Kit contents can be viewed in each product detail. Sample contents are illustrative and may vary by regional tradition.'],['Can I purchase individual samagri items?','Yes. Browse individual daily essentials, incense, lamps, offerings, and gifts.'],['Are these products temple-offered prasad?','No claim is made here. Temple origin and product details will be verified before launch.'],['Can I customise a kit?','Custom kits will be confirmed before launch.']]
