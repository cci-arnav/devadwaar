import Link from 'next/link'
import { Header } from '@/components/storefront'
export default function About(){return <><Header/><main className="about-page section"><p className="eyebrow">The PoojaSetu approach</p><h1>Care in the essentials. Meaning in the ritual.</h1><p className="intro">We are building a more considered way to prepare for worship: browse by occasion, understand what is included, and find everyday essentials that make a ritual feel like your own.</p><Link className="button primary" href="/shop">Explore the shop</Link></main></>}
