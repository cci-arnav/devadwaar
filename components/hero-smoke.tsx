'use client'

import { useEffect, useRef, useState } from 'react'

export function HeroSmoke() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [documentVisible, setDocumentVisible] = useState(true)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.08 })
    if (ref.current) observer.observe(ref.current)
    const onVisibility = () => setDocumentVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])
  return <div ref={ref} className={`hero-smoke ${visible && documentVisible ? 'is-active' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 180 260" preserveAspectRatio="none">
      <path className="smoke-wisp smoke-wisp-a" d="M76 248 C51 205 98 180 75 138 C53 99 111 77 79 23" />
      <path className="smoke-wisp smoke-wisp-b" d="M106 250 C136 211 82 187 109 139 C137 94 80 72 103 8" />
      <path className="smoke-wisp smoke-wisp-c" d="M91 252 C83 218 121 184 91 151 C62 118 97 85 87 49" />
    </svg>
  </div>
}
