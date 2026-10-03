import Link from 'next/link'
import { festivals } from '@/lib/catalog'
import { Header, Footer } from '@/components/storefront'
import { ArrowRight } from 'lucide-react'
export default function Festivals(){return <><Header/><main className="section festivals-page"><div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / Festivals</nav><p className="eyebrow">Celebrate together</p><h1>Shop by Festival</h1><p className="intro">Find useful essentials for the moments your family gathers around.</p><div className="festival-grid">{festivals.map(f=><Link className="festival-card" href={`/festivals/${f.slug}`} key={f.slug}><span className="festival-image"><img src={f.image} alt="" width="600" height="600"/></span><span className="festival-card-title">{f.name}<ArrowRight/></span><small>{f.description}</small></Link>)}</div></div></main><Footer/></>}
