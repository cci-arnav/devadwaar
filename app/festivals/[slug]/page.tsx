import { notFound } from 'next/navigation'
import { getFestival } from '@/lib/catalog'
import { Storefront } from '@/components/storefront'
export default async function Festival({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getFestival(slug))notFound();return <Storefront kind="festival" slug={slug}/>}
