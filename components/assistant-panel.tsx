'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw, Send, X } from 'lucide-react'
import { getProduct } from '@/lib/catalog'
import { resolveOccasion } from '@/lib/guide-builder'

type Message = { role: 'user' | 'assistant'; text: string; productIds?: string[] }
const welcome: Message = { role: 'assistant', text: 'Namaste. I can help you explore this sample catalogue and the supported pooja checklists.' }
const suggestions = ['Find a Diwali kit', 'Browse daily essentials', 'Explore prasad ingredients', 'Create a pooja guide']

function replyTo(input: string): Message {
  const q = input.toLowerCase()
  if (q.includes('guide') || q.includes('checklist')) return { role: 'assistant', text: 'You can create a personalised checklist preview from supported occasions. It uses local catalogue data and does not provide priest-verified instructions.' }
  if (q.includes('diwali')) return { role: 'assistant', text: 'Explore the Diwali pooja kit, clay diyas, and cotton wicks.', productIds: ['diwali-kit', 'diyas', 'wicks'] }
  if (q.includes('daily')) return { role: 'assistant', text: 'A daily starting point includes the starter kit, kapoor, and agarbatti.', productIds: ['daily-kit', 'kapoor', 'agarbatti'] }
  if (q.includes('prasad') || q.includes('bhog')) return { role: 'assistant', text: 'Panchmeva and mishri are ingredients for offerings prepared at home. They are not represented as temple-offered prasad.', productIds: ['panchmeva', 'mishri'] }
  if (q.includes('kit')) return { role: 'assistant', text: 'These are the available sample kits. Exact itemised kit contents still need confirmation.', productIds: ['daily-kit', 'navratri-kit', 'diwali-kit'] }
  return { role: 'assistant', text: 'I can help with kits, daily essentials, prasad ingredients, or a supported pooja checklist. Try a suggestion below.' }
}

export function AssistantPanel({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([welcome])
  const [lastOccasion, setLastOccasion] = useState<string | undefined>()
  const launcher = useRef<HTMLButtonElement>(null)
  const composer = useRef<HTMLTextAreaElement>(null)
  const messageList = useRef<HTMLDivElement>(null)
  const stickToBottom = useRef(true)
  const close = () => { setOpen(false); requestAnimationFrame(() => launcher.current?.focus()) }

  useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => composer.current?.focus())
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  useEffect(() => {
    if (!open || !stickToBottom.current || !messageList.current) return
    requestAnimationFrame(() => messageList.current?.scrollTo({ top: messageList.current.scrollHeight, behavior: 'smooth' }))
  }, [messages, open])

  const send = (raw: string) => {
    const text = raw.trim()
    if (!text) return
    const list = messageList.current
    stickToBottom.current = !list || list.scrollHeight - list.scrollTop - list.clientHeight < 70
    setMessages(old => [...old, { role: 'user', text }, replyTo(text)])
    const found = ['Daily', 'Navratri', 'Diwali', 'Bhai Dooj', 'Chhath'].find(name => text.toLowerCase().includes(name.toLowerCase()))
    setLastOccasion(found && resolveOccasion(found))
    setInput('')
  }
  const guideUrl = `/pooja-guide?mode=custom${lastOccasion ? `&occasion=${encodeURIComponent(lastOccasion)}` : ''}`
  const reset = () => { setMessages([welcome]); setInput(''); setLastOccasion(undefined); stickToBottom.current = true }

  return <><button ref={launcher} className="assistant-launcher" onClick={() => setOpen(!open)} aria-label={open ? 'Close Pooja Assistant' : 'Open Pooja Assistant'} aria-expanded={open} aria-controls="pooja-assistant"><span>Need a hand?</span><span aria-hidden="true">✺</span></button>{open && <aside className="assistant assistant-v2" id="pooja-assistant" aria-label="Pooja assistant"><div className="assistant-head"><div><strong>Pooja Assistant</strong><small>Guided demo · automated suggestions</small></div><div className="assistant-head-actions"><button className="icon-btn" onClick={reset} aria-label="Reset conversation" title="Reset conversation"><RotateCcw /></button><button className="icon-btn" onClick={close} aria-label="Close assistant"><X /></button></div></div><div className="assistant-messages" ref={messageList} onScroll={event => { const el = event.currentTarget; stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 70 }} aria-live="polite">{messages.map((message, index) => <div className={`assistant-message from-${message.role}`} key={index}><span className="assistant-message-label">{message.role === 'user' ? 'You' : 'Aashirvaadam guide'}</span><p>{message.text}</p>{message.productIds?.map(id => { const p = getProduct(id); if (!p) return null; return <Link className="assistant-product" href={`/products/${p.slug}`} key={id} onClick={close}><img src={p.image} alt="" width="44" height="44" /><span><strong>{p.name}</strong><small>{p.unit}</small></span><ArrowRight /></Link> })}</div>)}</div><div className="assistant-bottom"><div className="assistant-suggestions">{suggestions.map(label => label === 'Create a pooja guide' ? <Link className="assistant-suggestion" key={label} href={guideUrl} onClick={close}>{label}</Link> : <button className="assistant-suggestion" key={label} onClick={() => send(label)}>{label}</button>)}</div><form className="assistant-composer" onSubmit={event => { event.preventDefault(); send(input) }}><textarea ref={composer} rows={1} value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(input) } }} aria-label="Ask the guided assistant" placeholder="Ask about essentials" /><button type="submit" aria-label="Send message" disabled={!input.trim()}><Send /></button></form></div></aside>}</>
}
