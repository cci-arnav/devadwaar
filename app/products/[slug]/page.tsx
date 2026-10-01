import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/catalog'
import { Storefront } from '@/components/storefront'
export default async function Product({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getProduct(slug))notFound();return <Storefront kind="product" slug={slug}/>}
