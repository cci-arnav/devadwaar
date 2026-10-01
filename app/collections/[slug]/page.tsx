import { notFound } from 'next/navigation'
import { getCategory } from '@/lib/catalog'
import { Storefront } from '@/components/storefront'
export default async function Collection({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getCategory(slug))notFound();return <Storefront kind="collection" slug={slug}/>}
