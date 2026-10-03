'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, CheckCircle2, ClipboardList, Plus, Printer, RotateCcw, ShoppingBag } from 'lucide-react'
import { formatPrice, getProduct, guideItems } from '@/lib/catalog'
import { generateGuide, resolveOccasion, selectedSubtotal, supportedOccasions, type GeneratedGuide, type GuidePreference } from '@/lib/guide-builder'

type Mode = 'ready' | 'custom'

export function PoojaGuide({ add }: { add: (id: string) => void }) {
  const [mode, setMode] = useState<Mode>('ready')
  const [readyOccasion, setReadyOccasion] = useState('Daily')
  const [readyChecked, setReadyChecked] = useState<string[]>([])
  const [occasionChoice, setOccasionChoice] = useState('Daily')
  const [customType, setCustomType] = useState('')
  const [participants, setParticipants] = useState('')
  const [budget, setBudget] = useState('')
  const [preference, setPreference] = useState<GuidePreference>('kit')
  const [availableIds, setAvailableIds] = useState<string[]>([])
  const [generated, setGenerated] = useState<GeneratedGuide | null>(null)
  const [unsupported, setUnsupported] = useState(false)
  const [editing, setEditing] = useState(true)
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [cartNotice, setCartNotice] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('mode') === 'custom') setMode('custom')
    const requested = params.get('occasion')
    const resolved = requested && resolveOccasion(requested)
    if (resolved) { setOccasionChoice(resolved); setReadyOccasion(resolved) }
  }, [])

  const readyGuide = useMemo(() => generateGuide({ occasion: readyOccasion, availableIds: [], preference: 'individual' })!, [readyOccasion])
  const chosenType = occasionChoice === 'other' ? customType : occasionChoice
  const knownType = resolveOccasion(chosenType)
  const homeOptions = knownType ? guideItems[knownType].map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p)) : []
  const visibleProducts = generated?.recommendedProducts.filter(p => !checkedIds.includes(p.id)) || []
  const chosenProducts = visibleProducts.filter(p => selectedIds.includes(p.id))
  const subtotal = selectedSubtotal(chosenProducts.map(p => p.id))
  const budgetValue = generated?.budget

  const toggle = (ids: string[], id: string, update: (ids: string[]) => void) => update(ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id])
  const request = () => ({
    occasion: chosenType,
    participants: participants ? Math.min(50, Math.max(1, Number(participants))) : undefined,
    budget: budget ? Math.max(0, Number(budget)) : undefined,
    availableIds,
    preference,
  })
  const build = (basicFallback = false) => {
    const result = generateGuide(request(), basicFallback)
    if (!result) { setUnsupported(true); setGenerated(null); return }
    setGenerated(result); setUnsupported(false); setEditing(false)
    setCheckedIds(result.availableIds); setSelectedIds([]); setCartNotice('')
  }

  return <main className="pooja-guide-page">
    <div className="guide-intro"><div className="container guide-intro-grid"><div><p className="eyebrow">Your preparation companion</p><h1>Prepare your pooja, your way.</h1><p>Choose a ready checklist or create a personalised checklist preview from the supported occasions in this catalogue. Practices vary by family and region.</p></div><DecorativeThali /></div></div>
    <div className="container guide-workspace"><div className="guide-mode-tabs" role="tablist" aria-label="Guide mode"><button role="tab" aria-selected={mode === 'ready'} className={mode === 'ready' ? 'active' : ''} onClick={() => setMode('ready')}><ClipboardList /> Choose a Ready Guide</button><button role="tab" aria-selected={mode === 'custom'} className={mode === 'custom' ? 'active' : ''} onClick={() => setMode('custom')}><Plus /> Create My Guide</button></div>
      {mode === 'ready' ? <section className="guide-content" aria-label="Ready guide"><div className="guide-content-heading"><p className="eyebrow">Ready guides</p><h2>Start with an occasion</h2><p>Tick what you have and add only what you need.</p></div><div className="occasion-tabs">{supportedOccasions.map(name => <button key={name} className={readyOccasion === name ? 'active' : ''} onClick={() => { setReadyOccasion(name); setReadyChecked([]) }}>{name}</button>)}</div><div className="guide-progress"><span>{readyChecked.length} of {readyGuide.essentials.length} essentials checked</span><div role="progressbar" aria-valuenow={readyChecked.length} aria-valuemin={0} aria-valuemax={readyGuide.essentials.length} aria-label="Checklist progress"><span style={{ width: `${readyGuide.essentials.length ? readyChecked.length / readyGuide.essentials.length * 100 : 0}%` }} /></div></div><div className="guide-list">{readyGuide.essentials.map(p => <div className={`guide-item ${readyChecked.includes(p.id) ? 'done' : ''}`} key={p.id}><button aria-pressed={readyChecked.includes(p.id)} onClick={() => toggle(readyChecked, p.id, setReadyChecked)}><span>{readyChecked.includes(p.id) && <Check />}</span><strong>{p.name}</strong><small>{p.unit}</small></button>{!readyChecked.includes(p.id) && <button className="text-button dark-text" onClick={() => add(p.id)}>Add to cart</button>}</div>)}</div>{readyChecked.length === readyGuide.essentials.length && <div className="complete"><CheckCircle2 /> Your catalogue checklist is complete.</div>}<SeparateItems items={readyGuide.separateItems} /></section> : <section className="guide-content" aria-label="Custom guide"><div className="guide-content-heading"><p className="eyebrow">Personalised checklist preview</p><h2>Create My Guide</h2><p>Built from supported checklists and sample catalogue prices. No live AI or priest verification is involved.</p></div>
      {editing ? <form className="custom-guide-form" onSubmit={event => { event.preventDefault(); build() }}><div className="form-grid"><label>Choose a pooja or occasion<select value={occasionChoice} onChange={event => { setOccasionChoice(event.target.value); setAvailableIds([]); setUnsupported(false) }}>{supportedOccasions.map(name => <option key={name} value={name}>{name}</option>)}<option value="other">Another pooja type</option></select></label>{occasionChoice === 'other' && <label>Type its name<input value={customType} onChange={event => setCustomType(event.target.value)} placeholder="e.g. Diwali pooja" /></label>}<label>Participants <span>optional</span><input type="number" min="1" max="50" step="1" value={participants} onChange={event => setParticipants(event.target.value)} placeholder="How many people?" /></label><label>Budget in ₹ <span>optional</span><input type="number" min="0" step="1" value={budget} onChange={event => setBudget(event.target.value)} placeholder="For catalogue products" /></label></div><fieldset className="guide-preference"><legend>How would you like to shop?</legend><label><input type="radio" name="preference" value="kit" checked={preference === 'kit'} onChange={() => setPreference('kit')} /> Prefer a kit where listed</label><label><input type="radio" name="preference" value="individual" checked={preference === 'individual'} onChange={() => setPreference('individual')} /> Prefer individual essentials</label></fieldset><fieldset className="guide-at-home"><legend>Already available at home <span>optional</span></legend>{homeOptions.length ? <div className="at-home-grid">{homeOptions.map(p => <label key={p.id}><input type="checkbox" checked={availableIds.includes(p.id)} onChange={() => toggle(availableIds, p.id, setAvailableIds)} /> {p.name}</label>)}</div> : <p>Choose a supported occasion to see matching checklist items.</p>}</fieldset>{unsupported && <div className="guide-unsupported" role="alert"><strong>A tailored guide is not available for “{chosenType || 'this pooja'}” yet.</strong><p>Choose Daily, Navratri, Diwali, Bhai Dooj, or Chhath, or use a clearly labelled basic preparation checklist. We will not invent ritual steps for an unfamiliar pooja.</p><button type="button" className="button secondary" onClick={() => build(true)}>Use basic preparation checklist</button></div>}<button className="button primary" type="submit">Generate checklist <ArrowRight /></button></form> : generated && <div className="guide-result"><div className="guide-result-heading"><div><p className="eyebrow">Personalised checklist preview</p><h3>{generated.isBasicFallback ? 'Basic preparation checklist' : `${generated.occasion} preparation`}</h3><p>{generated.isBasicFallback ? 'This is a general starting point based on the Daily template, not a tailored ritual guide.' : 'Based on the existing supported checklist.'}</p></div><div className="guide-result-actions"><button className="button secondary" onClick={() => setEditing(true)}>Edit preferences</button><button className="button secondary" onClick={() => build(generated.isBasicFallback)}><RotateCcw /> Regenerate</button><button className="button secondary" onClick={() => window.print()}><Printer /> Print</button></div></div>{generated.participants && <p className="guide-note">For {generated.participants} {generated.participants === 1 ? 'participant' : 'participants'}. Quantities are not multiplied because this preview has no confirmed scaling rules.</p>}<div className="guide-progress"><span>{checkedIds.length} of {generated.essentials.length} essentials checked</span><div role="progressbar" aria-valuenow={checkedIds.length} aria-valuemin={0} aria-valuemax={generated.essentials.length} aria-label="Checklist progress"><span style={{ width: `${generated.essentials.length ? checkedIds.length / generated.essentials.length * 100 : 0}%` }} /></div></div><div className="guide-list">{generated.essentials.map(p => <div className={`guide-item ${checkedIds.includes(p.id) ? 'done' : ''}`} key={p.id}><button aria-pressed={checkedIds.includes(p.id)} onClick={() => { toggle(checkedIds, p.id, setCheckedIds); setSelectedIds(ids => ids.filter(id => id !== p.id)) }}><span>{checkedIds.includes(p.id) && <Check />}</span><strong>{p.name}</strong><small>{p.unit}</small></button></div>)}</div>{checkedIds.length === generated.essentials.length && <div className="complete"><CheckCircle2 /> Your catalogue checklist is complete.</div>}<SeparateItems items={generated.separateItems} /><div className="guide-products"><h3>Matching catalogue products</h3><p>Select only the products you want to add. Prices are illustrative; shipping and other charges are not included.</p>{visibleProducts.length ? <div className="guide-product-list">{visibleProducts.map(p => <label key={p.id}><input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggle(selectedIds, p.id, setSelectedIds)} /><img src={p.image} alt="" width="58" height="58" /><span><strong>{p.name}</strong><small>{p.unit}{p.categorySlug === 'prasad-bhog' ? ' · ingredient for home-prepared bhog' : ''}</small></span><b>{formatPrice(p.price)}</b></label>)}</div> : <p className="guide-none">All matching catalogue items are marked as available at home.</p>}<div className="guide-purchase"><div><span>Selected merchandise subtotal</span><strong>{formatPrice(subtotal)}</strong>{budgetValue !== undefined && <small>Budget: {formatPrice(budgetValue)}</small>}</div><button className="button primary" disabled={!chosenProducts.length} onClick={() => { chosenProducts.forEach(p => add(p.id)); setCartNotice(`${chosenProducts.length} selected ${chosenProducts.length === 1 ? 'product' : 'products'} added to cart.`) }}><ShoppingBag /> Add selected to cart</button></div>{budgetValue !== undefined && subtotal > budgetValue && <p className="guide-budget-warning" role="status">Selected products exceed your budget by {formatPrice(subtotal - budgetValue)}. Essential checklist items remain visible; adjust your selection if needed.</p>}{cartNotice && <p className="success-note" role="status"><Check /> {cartNotice} <Link href="/cart">View cart</Link></p>}</div><p className="guide-note">Family and regional practices vary. Exact kit contents and quantities still need confirmation.</p></div>}</section>}
    </div>
  </main>
}

function SeparateItems({ items }: { items: string[] }) { return <div className="guide-household"><strong>Arrange separately</strong><p>These fresh or household items are outside the preview catalogue. No substitute product has been selected.</p><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div> }

function DecorativeThali() { return <div className="guide-art" aria-hidden="true"><svg viewBox="0 0 440 320"><defs><radialGradient id="thali"><stop stopColor="#f7d28a"/><stop offset=".7" stopColor="#c9994d"/><stop offset="1" stopColor="#a36a30"/></radialGradient></defs><ellipse cx="220" cy="282" rx="186" ry="26" fill="#571e23" opacity=".15"/><ellipse cx="220" cy="208" rx="180" ry="90" fill="#9d622b"/><ellipse cx="220" cy="194" rx="174" ry="83" fill="url(#thali)"/><ellipse cx="220" cy="188" rx="150" ry="65" fill="#8f5b30" opacity=".28"/><g fill="#d44c2f"><ellipse cx="133" cy="186" rx="39" ry="20"/><ellipse cx="309" cy="188" rx="39" ry="20"/></g><g fill="#e7aa37"><path d="M133 180 Q117 148 136 127 Q155 151 133 180"/><path d="M309 180 Q293 148 312 127 Q331 151 309 180"/></g><g fill="#fff3ad"><path d="M134 172 Q125 153 136 142 Q146 155 134 172"/><path d="M310 172 Q301 153 312 142 Q322 155 310 172"/></g><ellipse cx="220" cy="212" rx="42" ry="24" fill="#a16c34"/><ellipse cx="220" cy="203" rx="40" ry="19" fill="#c83d28"/><g fill="#e69b23"><circle cx="189" cy="133" r="11"/><circle cx="207" cy="126" r="12"/><circle cx="226" cy="129" r="11"/><circle cx="245" cy="134" r="12"/></g><path d="M241 133 L266 35 M256 137 L286 42" stroke="#7b4f2d" strokeWidth="4" strokeLinecap="round"/><path d="M265 36 Q247 18 261 5 M286 42 Q303 24 287 11" fill="none" stroke="#f8e4ce" strokeWidth="3" opacity=".6"/></svg></div> }
