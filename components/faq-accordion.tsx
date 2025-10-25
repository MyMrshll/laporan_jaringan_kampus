"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition-colors text-left"
          >
            <span className="font-medium text-foreground">{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform ${openId === item.id ? "rotate-180" : ""}`}
            />
          </button>

          {openId === item.id && (
            <div className="px-6 py-4 bg-secondary border-t border-border">
              <p className="text-foreground leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
