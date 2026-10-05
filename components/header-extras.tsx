'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Pause, Play, Search, UserRound, X } from 'lucide-react'
import { categories, formatPrice, matchesProductQuery, products } from '@/lib/catalog'

const announcement = 'Preview catalogue · Illustrative products and prices · No orders or payments'

export function Announcement() {
  const [paused, setPaused] = useState(false)
  return <div className={`announcement-marquee ${paused ? 'is-paused' : ''}`}>
    <span className="sr-only">{announcement}</span>
    <span className="announcement-static" aria-hidden="true">{announcement}</span>
    <div className="announcement-viewport" aria-hidden="true"><div className="announcement-track">
      <span className="announcement-copy">{announcement}<span>✺</span>{announcement}<span>✺</span></span>
      <span className="announcement-copy" aria-hidden="true">{announcement}<span>✺</span>{announcement}<span>✺</span></span>
    </div></div>
    <button className="announcement-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume announcement' : 'Pause announcement'} title={paused ? 'Resume announcement' : 'Pause announcement'}>{paused ? <Play /> : <Pause />}</button>
  </div>
}

function useDialog(open: boolean, onClose: () => void, dialogRef: React.RefObject<HTMLDivElement | null>, firstFocusRef: React.RefObject<HTMLElement | null>, restoreRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => firstFocusRef.current?.focus())
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(element => element.getClientRects().length > 0)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey); requestAnimationFrame(() => restoreRef.current?.focus()) }
    // Mount and unmount are the dialog's open and close boundaries.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
}

export function SearchDialog({ onClose, triggerRef }: { onClose: () => void; triggerRef: React.RefObject<HTMLButtonElement | null> }) {
  const [query, setQuery] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useDialog(true, onClose, dialogRef, inputRef, triggerRef)
  const trimmed = query.trim().toLowerCase()
  const matches = useMemo(() => trimmed ? products.filter(product => matchesProductQuery(product, trimmed)) : [], [trimmed])
  return <div className="search-overlay" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="search-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="search-title">
      <div className="search-dialog-head"><div><p className="eyebrow">Explore Aashirvaadam</p><h2 id="search-title">Search essentials</h2></div><button className="icon-btn" type="button" onClick={onClose} aria-label="Close search"><X /></button></div>
      <label className="search-dialog-field"><Search aria-hidden="true" /><input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Try diyas, kapoor, Diwali…" aria-label="Search the catalogue" />{query && <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus() }} aria-label="Clear search"><X /></button>}</label>
      <div className="search-dialog-results" aria-live="polite">
        {!trimmed ? <><p className="search-caption">Browse a collection</p><div className="search-categories">{categories.map(category => <Link key={category.slug} href={`/collections/${category.slug}`} onClick={onClose}>{category.name}<ArrowRight /></Link>)}</div></> : matches.length ? <><p className="search-caption">{matches.length} {matches.length === 1 ? 'match' : 'matches'} for “{query.trim()}”</p><div className="search-result-list">{matches.slice(0, 7).map(product => <Link className="search-result" href={`/products/${product.slug}`} key={product.id} onClick={onClose}><img src={product.image} alt="" width="62" height="62" /><span><strong>{product.name}</strong><small>{product.unit} · {product.category}</small></span><b>{formatPrice(product.price)}</b></Link>)}</div><Link className="search-view-all" href={`/shop?q=${encodeURIComponent(query.trim())}`} onClick={onClose}>View all results <ArrowRight /></Link></> : <div className="search-no-results"><Search /><strong>No essentials found</strong><p>Try another product, category, or festival name.</p><Link href="/shop" onClick={onClose}>Browse all essentials <ArrowRight /></Link></div>}
      </div>
    </div>
  </div>
}

export function AccountPanel({ onClose, triggerRef }: { onClose: () => void; triggerRef: React.RefObject<HTMLButtonElement | null> }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useDialog(true, onClose, dialogRef, closeRef, triggerRef)
  return <div className="account-overlay" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><div className="account-panel" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="account-title"><div className="account-panel-top"><span className="account-glyph"><UserRound /></span><button className="icon-btn" ref={closeRef} onClick={onClose} aria-label="Close account panel"><X /></button></div><h2 id="account-title">Account features are coming soon.</h2><p>Saved orders and account access will be available after setup.</p><button className="button secondary" onClick={onClose}>Continue browsing</button></div></div>
}
