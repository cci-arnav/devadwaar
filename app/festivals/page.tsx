import Link from 'next/link'
import { festivals } from '@/lib/catalog'
import { Header } from '@/components/storefront'
export default function Festivals(){return <><Header/><main className="section festivals-page"><p className="eyebrow">Made for the moment</p><h1>Festival collections.</h1><div className="festival-grid">{festivals.map(f=><Link className="festival-card" href={`/festivals/${f.slug}`} key={f.slug}><img src={f.image} alt=""/><span>{f.name}</span><small>{f.description}</small></Link>)}</div></main></>}
